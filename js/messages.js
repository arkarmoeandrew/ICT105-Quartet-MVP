import { escapeHtml, getSession, initials, setStatus, supabase } from "./supabase-client.js?v=20260720-4";

const conversationList = document.querySelector("[data-conversation-list]");
const stream = document.querySelector("[data-message-stream]");
const header = document.querySelector("[data-chat-header]");
const form = document.querySelector("[data-message-form]");
const input = document.querySelector("[data-message-input]");
const send = document.querySelector("[data-message-send]");
let userId;
let conversations = [];
let activeId = null;
let channel = null;

function time(value) {
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

async function loadConversations() {
  const { data: memberships, error } = await supabase.from("conversation_participants").select("conversation_id,last_read_at").eq("user_id", userId);
  if (error) throw error;
  const ids = memberships.map((item) => item.conversation_id);
  if (!ids.length) { conversations = []; renderConversationList(); return; }
  const [{ data: rows, error: conversationsError }, { data: participants, error: participantsError }] = await Promise.all([
    supabase.from("conversations").select("id,listing_id,listing_title,listing_image_url,request_status,created_at,updated_at").in("id", ids).order("updated_at", { ascending: false }),
    supabase.from("conversation_participants").select("conversation_id,user_id,profiles(id,display_name,avatar_url,faculty)").in("conversation_id", ids)
  ]);
  if (conversationsError) throw conversationsError;
  if (participantsError) throw participantsError;
  conversations = rows.map((row) => ({ ...row, other: participants.find((item) => item.conversation_id === row.id && item.user_id !== userId)?.profiles || null }));
  renderConversationList();
  const requested = new URLSearchParams(location.search).get("conversation");
  if (requested && conversations.some((item) => item.id === requested)) await selectConversation(requested);
  else if (!activeId && conversations[0]) await selectConversation(conversations[0].id);
}

function renderConversationList() {
  if (!conversations.length) { conversationList.innerHTML = `<div class="empty-state" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.15);color:white"><h3>No conversations yet</h3><p>Start from a listing or member profile.</p></div>`; return; }
  conversationList.innerHTML = conversations.map((item) => `<button class="conversation-button ${item.id === activeId ? "is-active" : ""}" type="button" data-conversation-id="${item.id}"><span class="avatar">${item.other?.avatar_url ? `<img src="${escapeHtml(item.other.avatar_url)}" alt="">` : initials(item.other?.display_name)}</span><span><b>${escapeHtml(item.other?.display_name || "RSU member")}</b><small>${escapeHtml(item.listing_title)}</small><small>${escapeHtml(item.request_status)}</small></span></button>`).join("");
  conversationList.querySelectorAll("[data-conversation-id]").forEach((button) => button.addEventListener("click", () => void selectConversation(button.dataset.conversationId)));
}

async function selectConversation(id) {
  activeId = id;
  renderConversationList();
  const conversation = conversations.find((item) => item.id === id);
  header.innerHTML = `<span class="avatar">${conversation.other?.avatar_url ? `<img src="${escapeHtml(conversation.other.avatar_url)}" alt="">` : initials(conversation.other?.display_name)}</span><div><b>${escapeHtml(conversation.other?.display_name || "RSU member")}</b><small>${escapeHtml(conversation.listing_title)} · ${escapeHtml(conversation.request_status)}</small></div>`;
  input.disabled = false;
  send.disabled = false;
  await loadMessages();
  if (channel) await supabase.removeChannel(channel);
  channel = supabase.channel(`messages:${id}`).on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${id}` }, (payload) => {
    appendMessage(payload.new);
    stream.scrollTop = stream.scrollHeight;
  }).subscribe();
  await supabase.from("conversation_participants").update({ last_read_at: new Date().toISOString() }).eq("conversation_id", id).eq("user_id", userId);
}

async function loadMessages() {
  const { data, error } = await supabase.from("messages").select("id,conversation_id,sender_id,body,created_at").eq("conversation_id", activeId).order("created_at");
  if (error) { stream.innerHTML = `<p class="notice notice--error">${escapeHtml(error.message)}</p>`; return; }
  stream.innerHTML = "";
  if (!data.length) stream.innerHTML = `<div class="empty-state"><h3>Start the conversation</h3><p>Keep personal contact information private until you are comfortable connecting.</p></div>`;
  data.forEach(appendMessage);
  stream.scrollTop = stream.scrollHeight;
}

function appendMessage(message) {
  const empty = stream.querySelector(".empty-state");
  if (empty) empty.remove();
  const createdAt = Date.parse(message.created_at);
  const previous = stream.querySelector(".message-bubble:last-child");
  const isImmediateRepeat = previous
    && previous.dataset.senderId === message.sender_id
    && previous.dataset.body === message.body
    && createdAt - Number(previous.dataset.createdAt) <= 120000;
  if (isImmediateRepeat) {
    const repeatCount = Number(previous.dataset.repeatCount || 1) + 1;
    previous.dataset.repeatCount = String(repeatCount);
    previous.dataset.createdAt = String(createdAt);
    let repeat = previous.querySelector("[data-message-repeat]");
    if (!repeat) {
      repeat = document.createElement("span");
      repeat.className = "message-repeat";
      repeat.dataset.messageRepeat = "";
      previous.append(repeat);
    }
    repeat.textContent = `Sent ${repeatCount} times`;
    previous.querySelector("time").textContent = time(message.created_at);
    return;
  }
  const bubble = document.createElement("div");
  bubble.className = `message-bubble ${message.sender_id === userId ? "is-mine" : ""}`;
  bubble.dataset.senderId = message.sender_id;
  bubble.dataset.body = message.body;
  bubble.dataset.createdAt = String(createdAt);
  bubble.dataset.repeatCount = "1";
  bubble.innerHTML = `${escapeHtml(message.body)}<time>${time(message.created_at)}</time>`;
  stream.append(bubble);
}

async function sendMessage(event) {
  event.preventDefault();
  const body = input.value.trim();
  if (!body || !activeId || send.dataset.sending === "true") return;
  send.dataset.sending = "true";
  send.disabled = true;
  input.value = "";
  try {
    const { error } = await supabase.from("messages").insert({ conversation_id: activeId, sender_id: userId, body });
    if (error) throw error;
  } catch (error) {
    input.value = body;
    alert(error.message);
  } finally {
    send.dataset.sending = "false";
    send.disabled = false;
  }
}

async function loadMembers() {
  const { data } = await supabase.from("profiles").select("id,display_name,faculty").neq("id", userId).order("display_name").limit(100);
  document.querySelector("[data-member-select]").innerHTML = `<option value="">Select a member</option>${(data || []).map((profile) => `<option value="${profile.id}">${escapeHtml(profile.display_name)}${profile.faculty ? ` · ${escapeHtml(profile.faculty)}` : ""}</option>`).join("")}`;
}

async function createConversation(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const status = document.querySelector("[data-new-conversation-status]");
  const { data: id, error } = await supabase.rpc("start_conversation", { p_other_user: data.get("member_id"), p_listing_id: null, p_listing_title: String(data.get("listing_title") || "").trim() || "Direct message", p_listing_image_url: null });
  if (error) { setStatus(status, error.message, "error"); return; }
  document.querySelector("[data-new-conversation-modal]").hidden = true;
  await loadConversations();
  await selectConversation(id);
}

async function initialise() {
  const session = await getSession();
  if (!session) { location.href = `login.html?redirect=${encodeURIComponent(location.pathname + location.search)}`; return; }
  userId = session.user.id;
  await Promise.all([loadConversations(), loadMembers()]);
}

form.addEventListener("submit", sendMessage);
document.querySelector("[data-new-conversation]").addEventListener("click", () => { document.querySelector("[data-new-conversation-modal]").hidden = false; });
document.querySelectorAll("[data-new-conversation-close]").forEach((button) => button.addEventListener("click", () => { document.querySelector("[data-new-conversation-modal]").hidden = true; }));
document.querySelector("[data-new-conversation-form]").addEventListener("submit", createConversation);
window.addEventListener("beforeunload", () => { if (channel) void supabase.removeChannel(channel); });
void initialise();

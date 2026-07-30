import { escapeHtml, getSession, initials, supabase } from "./supabase-client.js?v=20260720-4";

const conversationList = document.querySelector("[data-conversation-list]");
const stream = document.querySelector("[data-message-stream]");
const header = document.querySelector("[data-chat-header]");
const form = document.querySelector("[data-message-form]");
const input = document.querySelector("[data-message-input]");
const send = document.querySelector("[data-message-send]");
const shell = document.querySelector("[data-messages-shell]");
const search = document.querySelector("[data-conversation-search]");
const count = document.querySelector("[data-conversation-count]");
const back = document.querySelector("[data-chat-back]");
const filters = [...document.querySelectorAll("[data-conversation-filter]")];
const chatAvatar = document.querySelector("[data-chat-avatar]");
const chatName = document.querySelector("[data-chat-name]");
const chatContext = document.querySelector("[data-chat-context]");
const chatListing = document.querySelector("[data-chat-listing]");
const chatListingImage = document.querySelector("[data-chat-listing-image]");
const chatListingTitle = document.querySelector("[data-chat-listing-title]");
const chatListingStatus = document.querySelector("[data-chat-listing-status]");
const mobileQuery = window.matchMedia("(max-width: 44rem)");
let userId;
let conversations = [];
let activeId = null;
let activeFilter = "all";
let channel = null;

function time(value) {
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

function conversationTime(value) {
  const date = new Date(value);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return time(value);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
}

function dateKey(value) {
  const date = new Date(value);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function dateLabel(value) {
  const date = new Date(value);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return "Today";
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: date.getFullYear() === today.getFullYear() ? undefined : "numeric" }).format(date);
}

function isUnread(item) {
  return !item.last_read_at || new Date(item.updated_at) > new Date(item.last_read_at);
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
  const membershipByConversation = new Map(memberships.map((item) => [item.conversation_id, item]));
  conversations = rows.map((row) => ({
    ...row,
    last_read_at: membershipByConversation.get(row.id)?.last_read_at || null,
    other: participants.find((item) => item.conversation_id === row.id && item.user_id !== userId)?.profiles || null
  }));
  renderConversationList();
  const requested = new URLSearchParams(location.search).get("conversation");
  if (requested && conversations.some((item) => item.id === requested)) await selectConversation(requested);
  else if (!activeId && conversations[0] && !mobileQuery.matches) await selectConversation(conversations[0].id);
}

function renderConversationList() {
  const unreadCount = conversations.filter(isUnread).length;
  count.textContent = String(activeFilter === "unread" ? unreadCount : conversations.length);
  count.setAttribute("aria-label", activeFilter === "unread" ? `${unreadCount} unread conversations` : `${conversations.length} conversations`);
  if (!conversations.length) {
    conversationList.innerHTML = `<div class="empty-state"><h3>No conversations yet</h3><p>Open a marketplace listing and message its owner.</p><a class="button button--gradient button--small" href="marketplace.html" style="margin-top:.75rem">Browse listings</a></div>`;
    return;
  }
  const query = search.value.trim().toLowerCase();
  const filtered = conversations.filter((item) => {
    const matchesQuery = `${item.other?.display_name || ""} ${item.listing_title || ""}`.toLowerCase().includes(query);
    return matchesQuery && (activeFilter !== "unread" || isUnread(item));
  });
  if (!filtered.length) {
    const message = activeFilter === "unread" && !query
      ? "You are all caught up."
      : "Try a different person or listing.";
    conversationList.innerHTML = `<div class="empty-state"><h3>${activeFilter === "unread" && !query ? "No unread messages" : "No matches"}</h3><p>${message}</p></div>`;
    return;
  }
  conversationList.innerHTML = filtered.map((item) => {
    const unread = isUnread(item);
    const status = item.request_status || "Open";
    const statusClass = String(status).toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `<button class="conversation-button ${item.id === activeId ? "is-active" : ""}" type="button" data-conversation-id="${item.id}" ${item.id === activeId ? 'aria-current="true"' : ""}>${unread && item.id !== activeId ? '<span class="conversation-unread" aria-label="Unread conversation"></span>' : ""}<span class="avatar">${item.other?.avatar_url ? `<img src="${escapeHtml(item.other.avatar_url)}" alt="">` : initials(item.other?.display_name)}</span><span class="conversation-button__content"><span class="conversation-button__top"><b>${escapeHtml(item.other?.display_name || "RSU user")}</b><time>${conversationTime(item.updated_at)}</time></span><small>${escapeHtml(item.listing_title || "Private conversation")}</small><span class="conversation-button__meta"><span class="conversation-status conversation-status--${statusClass}">${escapeHtml(status)}</span></span></span></button>`;
  }).join("");
  conversationList.querySelectorAll("[data-conversation-id]").forEach((button) => button.addEventListener("click", () => void selectConversation(button.dataset.conversationId)));
}

async function selectConversation(id) {
  activeId = id;
  shell.classList.add("has-active-conversation");
  renderConversationList();
  const conversation = conversations.find((item) => item.id === id);
  chatAvatar.innerHTML = conversation.other?.avatar_url ? `<img src="${escapeHtml(conversation.other.avatar_url)}" alt="">` : initials(conversation.other?.display_name);
  chatName.textContent = conversation.other?.display_name || "RSU user";
  chatContext.textContent = conversation.other?.faculty
    ? `${conversation.other.faculty} · RSU Nexus`
    : "RSU Nexus member";
  chatListing.hidden = false;
  chatListing.href = conversation.listing_id
    ? `listing-detail.html?id=${encodeURIComponent(conversation.listing_id)}`
    : "marketplace.html";
  chatListingTitle.textContent = conversation.listing_title || "Marketplace listing";
  chatListingStatus.textContent = conversation.request_status || "Open";
  chatListingStatus.dataset.status = String(conversation.request_status || "Open").toLowerCase();
  chatListingImage.innerHTML = conversation.listing_image_url
    ? `<img src="${escapeHtml(conversation.listing_image_url)}" alt="">`
    : "RS";
  input.disabled = false;
  send.disabled = false;
  await loadMessages();
  if (channel) await supabase.removeChannel(channel);
  channel = supabase.channel(`messages:${id}`).on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${id}` }, (payload) => {
    appendMessage(payload.new);
    stream.scrollTop = stream.scrollHeight;
  }).subscribe();
  const readAt = new Date().toISOString();
  await supabase.from("conversation_participants").update({ last_read_at: readAt }).eq("conversation_id", id).eq("user_id", userId);
  conversation.last_read_at = readAt;
  renderConversationList();
}

async function loadMessages() {
  const { data, error } = await supabase.from("messages").select("id,conversation_id,sender_id,body,created_at").eq("conversation_id", activeId).order("created_at");
  if (error) { stream.innerHTML = `<p class="notice notice--error">${escapeHtml(error.message)}</p>`; return; }
  stream.innerHTML = "";
  delete stream.dataset.messageDate;
  if (!data.length) stream.innerHTML = `<div class="empty-state message-empty"><div class="message-empty__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 18.5 3.5 21l1-4A8 8 0 1 1 7 18.5Z"></path><path d="M8 10h8M8 13h5"></path></svg></div><h3>Start the conversation</h3><p>Ask about availability, pickup, or the listing details. Keep personal contact information private.</p></div>`;
  data.forEach(appendMessage);
  stream.scrollTop = stream.scrollHeight;
}

function appendMessage(message) {
  const empty = stream.querySelector(".empty-state");
  if (empty) empty.remove();
  const createdAt = Date.parse(message.created_at);
  const bubbles = stream.querySelectorAll(".message-bubble");
  const previous = bubbles[bubbles.length - 1];
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
  const messageDate = dateKey(message.created_at);
  if (stream.dataset.messageDate !== messageDate) {
    const divider = document.createElement("div");
    divider.className = "message-date";
    divider.textContent = dateLabel(message.created_at);
    stream.append(divider);
    stream.dataset.messageDate = messageDate;
  }
  const bubble = document.createElement("div");
  bubble.className = `message-bubble ${message.sender_id === userId ? "is-mine" : ""}`;
  bubble.dataset.senderId = message.sender_id;
  bubble.dataset.body = message.body;
  bubble.dataset.createdAt = String(createdAt);
  bubble.dataset.repeatCount = "1";
  bubble.innerHTML = `<span>${escapeHtml(message.body)}</span><time datetime="${escapeHtml(message.created_at)}">${time(message.created_at)}</time>`;
  const row = document.createElement("div");
  const mine = message.sender_id === userId;
  row.className = `message-row ${mine ? "is-mine" : ""}`;
  if (!mine) {
    const conversation = conversations.find((item) => item.id === activeId);
    const avatar = document.createElement("span");
    avatar.className = "message-row__avatar";
    avatar.innerHTML = conversation?.other?.avatar_url
      ? `<img src="${escapeHtml(conversation.other.avatar_url)}" alt="">`
      : initials(conversation?.other?.display_name);
    row.append(avatar);
  }
  row.append(bubble);
  stream.append(row);
}

async function sendMessage(event) {
  event.preventDefault();
  const body = input.value.trim();
  if (!body || !activeId || send.dataset.sending === "true") return;
  send.dataset.sending = "true";
  send.disabled = true;
    input.value = "";
    resizeComposer();
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

function resizeComposer() {
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 128)}px`;
}

function showConversationList() {
  activeId = null;
  shell.classList.remove("has-active-conversation");
  chatListing.hidden = true;
  input.disabled = true;
  send.disabled = true;
  renderConversationList();
  if (channel) {
    void supabase.removeChannel(channel);
    channel = null;
  }
}

async function initialise() {
  const session = await getSession();
  if (!session) { location.href = `login.html?redirect=${encodeURIComponent(location.pathname + location.search)}`; return; }
  userId = session.user.id;
  await loadConversations();
}

form.addEventListener("submit", sendMessage);
search.addEventListener("input", renderConversationList);
filters.forEach((button) => button.addEventListener("click", () => {
  activeFilter = button.dataset.conversationFilter;
  filters.forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  renderConversationList();
}));
back.addEventListener("click", showConversationList);
input.addEventListener("input", resizeComposer);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});
mobileQuery.addEventListener("change", (event) => {
  if (!event.matches && !activeId && conversations[0]) void selectConversation(conversations[0].id);
});
window.addEventListener("beforeunload", () => { if (channel) void supabase.removeChannel(channel); });
void initialise();

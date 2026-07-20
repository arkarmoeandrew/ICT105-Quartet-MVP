import { escapeHtml, formatDate, getSession, setStatus, supabase } from "./supabase-client.js?v=20260720-4";

const list = document.querySelector("[data-request-list]");
const statusBox = document.querySelector("[data-requests-status]");
let currentUserId = null;
let requests = [];
let view = "all";

function badge(status) {
  return `<span class="status-badge status-badge--${status.toLowerCase()}">${escapeHtml(status)}</span>`;
}

function render() {
  const visible = requests.filter((item) => view === "all" || (view === "incoming" ? item.owner_id === currentUserId : item.requester_id === currentUserId));
  if (!visible.length) {
    list.innerHTML = `<div class="empty-state"><h3>No ${view === "all" ? "" : view} requests</h3><p>Requests will appear here when students connect through a listing.</p></div>`;
    return;
  }
  list.innerHTML = visible.map((item) => {
    const incoming = item.owner_id === currentUserId;
    const actions = item.status === "Pending" ? incoming
      ? `<div class="row-actions"><button data-request-action="Approved" data-request-id="${item.id}">Approve</button><button data-request-action="Rejected" data-request-id="${item.id}">Decline</button></div>`
      : `<div class="row-actions"><button data-request-action="Cancelled" data-request-id="${item.id}">Cancel request</button></div>`
      : item.status === "Approved" && incoming ? `<div class="row-actions"><button data-request-action="Completed" data-request-id="${item.id}">Mark complete</button></div>` : "";
    return `<article class="panel request-card"><div class="request-card__top"><div><p class="panel__eyebrow">${incoming ? "Incoming request" : "Your request"}</p><h3>${escapeHtml(item.listings?.title || "Marketplace listing")}</h3></div>${badge(item.status)}</div><p>${escapeHtml(item.message)}</p><div class="request-card__meta"><span>${formatDate(item.created_at)}</span><span>${escapeHtml(item.preferred_time || "Connection time not specified")}</span>${actions}</div></article>`;
  }).join("");
  list.querySelectorAll("[data-request-action]").forEach((button) => button.addEventListener("click", () => void updateRequest(button)));
}

async function updateRequest(button) {
  const { error } = await supabase.from("requests").update({ status: button.dataset.requestAction }).eq("id", button.dataset.requestId);
  if (error) setStatus(statusBox, error.message, "error");
  else {
    const item = requests.find((request) => request.id === button.dataset.requestId);
    if (item) item.status = button.dataset.requestAction;
    setStatus(statusBox, `Request status updated to ${button.dataset.requestAction}.`, "success");
    render();
  }
}

async function initialise() {
  const session = await getSession();
  if (!session) { location.href = `login.html?redirect=${encodeURIComponent(location.pathname)}`; return; }
  currentUserId = session.user.id;
  const { data, error } = await supabase.from("requests").select("id,listing_id,requester_id,owner_id,message,preferred_time,status,created_at,listings(title)").or(`requester_id.eq.${currentUserId},owner_id.eq.${currentUserId}`).order("created_at", { ascending: false });
  if (error) { setStatus(statusBox, error.message, "error"); list.innerHTML = ""; return; }
  requests = data || [];
  render();
}

document.querySelectorAll("[data-request-view]").forEach((button) => button.addEventListener("click", () => {
  view = button.dataset.requestView;
  document.querySelectorAll("[data-request-view]").forEach((item) => item.classList.toggle("is-active", item === button));
  render();
}));
void initialise();

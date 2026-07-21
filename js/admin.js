import { escapeHtml, formatDate, getProfile, getSession, setStatus, supabase } from "./supabase-client.js?v=20260720-4";

const statusBox = document.querySelector("[data-admin-status]");
const listingBody = document.querySelector("[data-admin-listings]");
const memberBody = document.querySelector("[data-admin-members]");
const searchInput = document.querySelector("[data-admin-search]");
const statusFilter = document.querySelector("[data-admin-filter]");
let currentSession;
let allListings = [];
let allMembers = [];

function statusClass(status) {
  return `status-badge--${String(status).toLowerCase()}`;
}

function filteredListings() {
  const term = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  return allListings.filter((item) => {
    const content = `${item.title} ${item.type} ${item.profiles?.display_name || ""}`.toLowerCase();
    return (status === "All" || item.status === status) && (!term || content.includes(term));
  });
}

function listingRow(item) {
  return `<tr>
    <td data-label="Listing"><b>${escapeHtml(item.title)}</b><br><small>${escapeHtml(item.type)}</small></td>
    <td data-label="Owner">${escapeHtml(item.profiles?.display_name || "RSU member")}</td>
    <td data-label="Status"><span class="status-badge ${statusClass(item.status)}">${escapeHtml(item.status)}</span></td>
    <td data-label="Created">${formatDate(item.created_at)}</td>
    <td data-label="Moderation"><div class="row-actions"><button data-admin-action="Available" data-listing-id="${item.id}">Approve</button><button data-admin-action="Rejected" data-listing-id="${item.id}">Reject</button><button data-admin-action="Unavailable" data-listing-id="${item.id}">Hide</button></div></td>
  </tr>`;
}

function renderListings() {
  const listings = filteredListings();
  listingBody.innerHTML = listings.length ? listings.map(listingRow).join("") : `<tr><td colspan="5"><div class="empty-state"><h3>No matching listings</h3><p>Try another search or status.</p></div></td></tr>`;
  listingBody.querySelectorAll("[data-admin-action]").forEach((button) => button.addEventListener("click", () => void moderate(button)));
}

function memberRow(member) {
  const isCurrentAdmin = member.id === currentSession.user.id && member.role === "admin";
  const nextRole = member.role === "admin" ? "member" : "admin";
  const actionLabel = member.role === "admin" ? "Remove admin" : "Make admin";
  return `<tr>
    <td data-label="Member"><b>${escapeHtml(member.display_name || "RSU member")}</b></td>
    <td data-label="Faculty">${escapeHtml(member.faculty || "Not provided")}</td>
    <td data-label="Joined">${formatDate(member.created_at)}</td>
    <td data-label="Role"><span class="role-badge role-badge--${member.role}">${escapeHtml(member.role)}</span></td>
    <td data-label="Access">${isCurrentAdmin ? `<span class="current-admin-label">Current admin</span>` : `<button class="button button--surface button--compact" type="button" data-member-role="${nextRole}" data-member-id="${member.id}">${actionLabel}</button>`}</td>
  </tr>`;
}

function renderMembers() {
  memberBody.innerHTML = allMembers.length ? allMembers.map(memberRow).join("") : `<tr><td colspan="5"><div class="empty-state"><h3>No members found</h3></div></td></tr>`;
  memberBody.querySelectorAll("[data-member-role]").forEach((button) => button.addEventListener("click", () => void updateMemberRole(button)));
}

async function initialiseAdmin() {
  currentSession = await getSession();
  if (!currentSession) {
    location.href = `login.html?redirect=${encodeURIComponent(location.pathname)}`;
    return;
  }
  const profile = await getProfile(currentSession.user.id);
  if (profile?.role !== "admin") {
    setStatus(statusBox, "Admin access is required. Your account does not have a moderation role.", "error");
    document.querySelector("[data-admin-metrics]").innerHTML = "";
    listingBody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><h3>Restricted workspace</h3><p>Return to your member dashboard.</p><a class="button button--gradient button--small" href="dashboard.html">Dashboard</a></div></td></tr>`;
    memberBody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><h3>Admin access required</h3></div></td></tr>`;
    return;
  }
  await loadAdminData();
}

async function loadAdminData() {
  const [listingResult, requestResult, memberResult] = await Promise.all([
    supabase.from("listings").select("id,title,type,status,created_at,profiles!listings_owner_id_fkey(display_name)").order("created_at", { ascending: false }),
    supabase.from("requests").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id,display_name,faculty,role,created_at").order("created_at", { ascending: true })
  ]);
  const error = listingResult.error || requestResult.error || memberResult.error;
  if (error) {
    setStatus(statusBox, error.message, "error");
    return;
  }

  allListings = listingResult.data || [];
  allMembers = memberResult.data || [];
  const pending = allListings.filter((item) => item.status === "Pending").length;
  const available = allListings.filter((item) => item.status === "Available").length;
  document.querySelector("[data-admin-metrics]").innerHTML = [
    [allListings.length, "Total listings"],
    [pending, "Awaiting review"],
    [available, "Public listings"],
    [allMembers.length, "Members"],
    [requestResult.count || 0, "Requests"]
  ].map(([value, label]) => `<div class="metric-card"><b>${value}</b><span>${label}</span></div>`).join("");
  renderListings();
  renderMembers();
}

async function moderate(button) {
  const nextStatus = button.dataset.adminAction;
  button.disabled = true;
  const { error } = await supabase.from("listings").update({ status: nextStatus, reviewed_at: new Date().toISOString() }).eq("id", button.dataset.listingId);
  if (error) {
    setStatus(statusBox, error.message, "error");
    button.disabled = false;
    return;
  }
  setStatus(statusBox, `Listing status changed to ${nextStatus}.`, "success");
  await loadAdminData();
}

async function updateMemberRole(button) {
  const nextRole = button.dataset.memberRole;
  const member = allMembers.find((item) => item.id === button.dataset.memberId);
  const verb = nextRole === "admin" ? "grant admin access to" : "remove admin access from";
  if (!member || !window.confirm(`Are you sure you want to ${verb} ${member.display_name || "this member"}?`)) return;

  button.disabled = true;
  const { error } = await supabase.from("profiles").update({ role: nextRole }).eq("id", member.id);
  if (error) {
    setStatus(statusBox, error.message, "error");
    button.disabled = false;
    return;
  }
  setStatus(statusBox, `${member.display_name || "Member"} is now ${nextRole === "admin" ? "an administrator" : "a member"}.`, "success");
  await loadAdminData();
}

searchInput?.addEventListener("input", renderListings);
statusFilter?.addEventListener("change", renderListings);
void initialiseAdmin();

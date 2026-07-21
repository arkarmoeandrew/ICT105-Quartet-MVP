import { escapeHtml, fetchListings, formatPriceLabel, getProfile, getSession, listingUrl, setStatus, supabase } from "./supabase-client.js?v=20260720-4";

const statusBox = document.querySelector("[data-dashboard-status]");

async function initialiseDashboard() {
  const session = await getSession();
  if (!session) { location.href = `login.html?redirect=${encodeURIComponent(location.pathname)}`; return; }
  try {
    const [profile, listings, requestResult, conversationResult] = await Promise.all([
      getProfile(session.user.id),
      fetchListings({ ownerId: session.user.id, includePrivate: true }),
      supabase.from("requests").select("id,status,listing_id,message,created_at,listings(title)").or(`requester_id.eq.${session.user.id},owner_id.eq.${session.user.id}`).order("created_at", { ascending: false }).limit(6),
      supabase.from("conversation_participants").select("conversation_id").eq("user_id", session.user.id)
    ]);
    document.querySelector("[data-dashboard-name]").textContent = profile?.display_name?.split(" ")[0] || "student";
    if (profile?.role === "admin") document.querySelector("[data-admin-link]").hidden = false;
    const requests = requestResult.data || [];
    const pending = requests.filter((item) => item.status === "Pending").length;
    const available = listings.filter((item) => item.status === "Available").length;
    const metrics = [[listings.length, "Your listings"], [available, "Available now"], [pending, "Pending requests"], [conversationResult.data?.length || 0, "Conversations"]];
    document.querySelector("[data-dashboard-metrics]").innerHTML = metrics.map(([value, label]) => `<div class="metric-card"><b>${value}</b><span>${label}</span></div>`).join("");
    document.querySelector("[data-dashboard-listings]").innerHTML = listings.length ? listings.slice(0, 4).map((item) => `<a class="owner-card" href="${listingUrl(item.id)}"><span class="avatar">${escapeHtml(item.type[0])}</span><span><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.status)} · ${escapeHtml(formatPriceLabel(item.price_label))}</small></span></a>`).join("") : `<div class="empty-state"><h3>No listings yet</h3><p>Offer your first resource to the RSU community.</p><a class="button button--gradient button--small" href="create-listing.html">Create listing</a></div>`;
    document.querySelector("[data-dashboard-requests]").innerHTML = requests.length ? requests.map((item) => `<a class="owner-card" href="requests.html"><span class="avatar">R</span><span><b>${escapeHtml(item.listings?.title || "Resource request")}</b><small>${escapeHtml(item.status)} · ${escapeHtml(item.message.slice(0, 55))}</small></span></a>`).join("") : `<div class="empty-state"><h3>No requests yet</h3><p>Requests you send or receive will appear here.</p></div>`;
  } catch (error) {
    setStatus(statusBox, error.message, "error");
  }
}

void initialiseDashboard();

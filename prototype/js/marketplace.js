import { escapeHtml, fetchListings, formatPriceLabel, getSession, listingUrl, setStatus, supabase } from "./supabase-client.js?v=20260720-4";
import { showToast } from "./ui.js?v=20260720-4";

const grid = document.querySelector("[data-listing-grid]");
const search = document.querySelector("[data-marketplace-search]");
const resultCount = document.querySelector("[data-result-count]");
const categoryList = document.querySelector("[data-category-list]");
const chips = document.querySelector("[data-filter-chips]");
const statusFilter = document.querySelector("[data-status-filter]");
const methodFilter = document.querySelector("[data-method-filter]");
const sortFilter = document.querySelector("[data-sort-filter]");
const params = new URLSearchParams(location.search);

let allListings = [];
let selectedType = params.get("type") || "All";
let layout = "grid";
const types = ["All", "Equipment", "Learning", "Service"];

function accent(type) {
  return type === "Learning" ? "#1677e8" : type === "Service" ? "#c226b8" : "#642b73";
}

function filteredListings() {
  const term = search.value.trim().toLowerCase();
  const status = statusFilter.value;
  const method = methodFilter.value.toLowerCase();
  const output = allListings.filter((listing) => {
    const content = `${listing.title} ${listing.category} ${listing.description} ${listing.owner_name}`.toLowerCase();
    return (selectedType === "All" || listing.type === selectedType)
      && (status === "All" || listing.status === status)
      && (method === "all" || listing.offer_method.toLowerCase().includes(method))
      && (!term || content.includes(term));
  });
  if (sortFilter.value === "title") output.sort((a, b) => a.title.localeCompare(b.title));
  if (sortFilter.value === "price") output.sort((a, b) => parseFloat(a.price_label.replace(/[^0-9.]/g, "")) - parseFloat(b.price_label.replace(/[^0-9.]/g, "")) || 0);
  return output;
}

function renderFilters() {
  const counts = Object.fromEntries(types.map((type) => [type, type === "All" ? allListings.length : allListings.filter((item) => item.type === type).length]));
  categoryList.innerHTML = types.map((type) => `<button type="button" class="${selectedType === type ? "is-active" : ""}" data-type="${type}"><span>${type === "All" ? "All listings" : type === "Learning" ? "Learning resources" : type === "Service" ? "Student services" : type}</span><small>${counts[type]}</small></button>`).join("");
  chips.innerHTML = types.map((type) => `<button type="button" class="filter-chip ${selectedType === type ? "is-active" : ""}" data-type="${type}">${type === "Learning" ? "Learning resources" : type === "Service" ? "Student services" : type}</button>`).join("");
  document.querySelectorAll("[data-type]").forEach((button) => button.addEventListener("click", () => {
    selectedType = button.dataset.type;
    renderFilters();
    renderListings();
  }));
}

function card(listing) {
  const statusClass = listing.status === "Reserved" ? "status-badge--reserved" : "";
  return `<article class="listing-card" style="--listing-accent:${accent(listing.type)}"><div class="listing-card__body"><div class="listing-card__image"><a href="${listingUrl(listing.id)}"><img src="${escapeHtml(listing.image_url || "")}" alt="${escapeHtml(listing.title)}" loading="lazy"></a><span class="listing-card__type">${escapeHtml(listing.type)}</span><button class="listing-card__save" type="button" aria-label="Save ${escapeHtml(listing.title)}" data-save-listing="${escapeHtml(listing.id)}">♡</button></div><p class="listing-card__category">${escapeHtml(listing.category)}</p><h3><a href="${listingUrl(listing.id)}">${escapeHtml(listing.title)}</a></h3><p class="listing-card__method">${escapeHtml(listing.offer_method)}</p><div class="listing-card__footer"><div><b>${escapeHtml(formatPriceLabel(listing.price_label, "Discuss"))}</b><small>${escapeHtml(listing.owner_name)}</small></div><span class="status-badge ${statusClass}">${escapeHtml(listing.status)}</span></div></div></article>`;
}

function renderListings() {
  const results = filteredListings();
  resultCount.textContent = String(results.length);
  grid.classList.toggle("is-dense", layout === "dense");
  if (!results.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><span aria-hidden="true">⌕</span><h3>No matching resources found</h3><p>Try changing your search or browse a different world.</p><button class="text-button" type="button" data-empty-clear>Clear search</button></div>`;
    grid.querySelector("[data-empty-clear]").addEventListener("click", clearFilters);
    return;
  }
  grid.innerHTML = results.map(card).join("");
  grid.querySelectorAll("[data-save-listing]").forEach((button) => button.addEventListener("click", () => void saveListing(button)));
}

async function saveListing(button) {
  const session = await getSession();
  if (!session) {
    location.href = `login.html?redirect=${encodeURIComponent(location.pathname + location.search)}`;
    return;
  }
  if (button.dataset.saveListing.startsWith("sample-")) {
    showToast("Preview listings cannot be saved. Create or approve a live listing first.");
    return;
  }
  const { error } = await supabase.from("saved_listings").upsert({ user_id: session.user.id, listing_id: button.dataset.saveListing });
  if (error) showToast(error.message);
  else { button.textContent = "♥"; showToast("Listing saved to your dashboard."); }
}

function clearFilters() {
  selectedType = "All";
  search.value = "";
  statusFilter.value = "All";
  methodFilter.value = "All";
  sortFilter.value = "recent";
  renderFilters();
  renderListings();
}

async function initialise() {
  search.value = params.get("q") || "";
  statusFilter.value = params.get("status") || "All";
  allListings = await fetchListings();
  document.querySelector("[data-listing-total]").textContent = String(allListings.length);
  renderFilters();
  renderListings();
}

document.querySelector("[data-filter-toggle]")?.addEventListener("click", () => {
  const options = document.querySelector("[data-filter-options]");
  options.hidden = !options.hidden;
});
document.querySelector("[data-clear-filters]")?.addEventListener("click", clearFilters);
document.querySelectorAll("[data-layout]").forEach((button) => button.addEventListener("click", () => { layout = button.dataset.layout; renderListings(); }));
[search, statusFilter, methodFilter, sortFilter].forEach((control) => control?.addEventListener(control === search ? "input" : "change", renderListings));
void initialise();

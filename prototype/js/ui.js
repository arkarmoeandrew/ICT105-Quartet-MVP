import { escapeHtml, getProfile, getSession, initials } from "./supabase-client.js?v=20260720-4";

const onPages = window.location.pathname.includes("/pages/");
const root = onPages ? "../" : "";
let toastTimer;

export function showToast(message) {
  let toast = document.querySelector("[data-toast]");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.dataset.toast = "";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.append(toast);
  }
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
}

export function renderAppHeader(active = "") {
  const mount = document.querySelector("[data-app-header]");
  if (!mount) return;
  mount.className = "app-header";
  mount.innerHTML = `
    <nav class="app-nav app-container" aria-label="Primary navigation">
      <a class="app-brand" href="${root}index.html" aria-label="RSU Nexus home">
        <img src="${root}assets/logo/rsu-nexus-logo.png?v=20260719-2" alt="" width="36" height="36">
        <span><b>RSU Nexus</b><small>Campus marketplace</small></span>
      </a>
      <div class="app-nav__links">
        <a class="${active === "marketplace" ? "is-active" : ""}" href="${root}pages/marketplace.html">Explore</a>
        <a href="${root}pages/marketplace.html?type=Equipment">Equipment</a>
        <a href="${root}pages/marketplace.html?type=Learning">Learning</a>
        <a href="${root}pages/marketplace.html?type=Service">Services</a>
      </div>
      <div class="app-nav__actions">
        <a href="${root}pages/messages.html" data-auth-only>Messages</a>
        <a href="${root}pages/admin.html" data-admin-only hidden>Admin</a>
        <a href="${root}pages/login.html" class="app-profile-link" data-user-link><span data-user-avatar>RS</span><b data-user-name>Log in</b></a>
        <a class="button button--light button--small" href="${root}pages/create-listing.html">Create listing</a>
      </div>
      <button class="app-menu-button" type="button" aria-expanded="false" aria-controls="app-mobile-menu" data-app-menu-open><span class="sr-only">Open menu</span><span>☰</span></button>
    </nav>
    <div class="app-mobile-menu" id="app-mobile-menu" hidden data-app-mobile-menu>
      <a href="${root}pages/marketplace.html">Explore marketplace</a>
      <a href="${root}pages/dashboard.html" data-auth-only>Dashboard</a>
      <a href="${root}pages/requests.html" data-auth-only>Requests</a>
      <a href="${root}pages/messages.html" data-auth-only>Messages</a>
      <a href="${root}pages/admin.html" data-admin-only hidden>Admin panel</a>
      <a href="${root}pages/profile.html" data-mobile-user-link>Log in</a>
      <a class="button button--gradient" href="${root}pages/create-listing.html">Create a listing</a>
    </div>`;
  initialiseAppMenu();
  void hydrateUserNavigation();
}

export function renderAppFooter() {
  const mount = document.querySelector("[data-app-footer]");
  if (!mount) return;
  mount.className = "app-footer";
  mount.innerHTML = `<div class="app-container app-footer__inner"><div><a class="app-brand" href="${root}index.html"><img src="${root}assets/logo/rsu-nexus-logo.png?v=20260719-2" alt="" width="36" height="36"><span><b>RSU Nexus</b><small>Campus resource marketplace</small></span></a><p>A student-focused marketplace built for the RSU community.</p></div><div><b>Marketplace</b><a href="${root}pages/marketplace.html">Explore resources</a><a href="${root}pages/create-listing.html">Offer a resource</a></div><div><b>Account</b><a href="${root}pages/dashboard.html">Dashboard</a><a href="${root}pages/profile.html">My profile</a></div><div><b>Support</b><a href="${root}index.html#how-it-works">How it works</a><a href="${root}pages/requests.html">Request status</a></div></div><div class="app-container app-footer__bottom">© ${new Date().getFullYear()} RSU Nexus · Student project, not an official university service.</div>`;
}

async function hydrateUserNavigation() {
  try {
    const session = await getSession();
    if (!session) {
      document.querySelectorAll("[data-auth-only]").forEach((node) => node.setAttribute("href", `${root}pages/login.html?redirect=${encodeURIComponent(location.pathname + location.search)}`));
      document.querySelectorAll("[data-user-link], [data-mobile-user-link]").forEach((node) => {
        node.setAttribute("href", `${root}pages/login.html?redirect=${encodeURIComponent(location.pathname + location.search)}`);
      });
      return;
    }
    const profile = await getProfile(session.user.id);
    const name = profile?.display_name || "My profile";
    if (profile?.role === "admin") {
      document.querySelectorAll("[data-admin-only]").forEach((node) => { node.hidden = false; });
    }
    document.querySelectorAll("[data-user-link], [data-mobile-user-link]").forEach((node) => {
      node.setAttribute("href", `${root}pages/profile.html`);
    });
    document.querySelectorAll("[data-user-name]").forEach((node) => { node.textContent = name; });
    document.querySelectorAll("[data-user-avatar]").forEach((node) => {
      if (profile?.avatar_url) node.innerHTML = `<img src="${escapeHtml(profile.avatar_url)}" alt="">`;
      else node.textContent = initials(name);
    });
    document.querySelectorAll("[data-mobile-user-link]").forEach((node) => { node.textContent = "My profile"; });
  } catch (error) {
    console.warn("Could not load the signed-in navigation state.", error.message);
  }
}

function initialiseAppMenu() {
  const button = document.querySelector("[data-app-menu-open]");
  const menu = document.querySelector("[data-app-mobile-menu]");
  if (!button || !menu) return;
  button.addEventListener("click", () => {
    const opening = menu.hidden;
    menu.hidden = !opening;
    button.setAttribute("aria-expanded", String(opening));
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menu.hidden = true;
      button.setAttribute("aria-expanded", "false");
    }
  });
}

function initialiseHomepage() {
  const menu = document.querySelector("[data-mobile-menu]");
  const openButton = document.querySelector("[data-menu-open]");
  const closeButton = document.querySelector("[data-menu-close]");
  if (menu && openButton && closeButton) {
    const visualViewport = window.visualViewport;
    const syncMenuHeight = () => {
      if (menu.hidden) return;
      const visibleHeight = Math.max(320, Math.round(visualViewport?.height || window.innerHeight));
      menu.style.setProperty("--mobile-menu-height", `${visibleHeight}px`);
    };
    const close = () => { menu.hidden = true; document.body.classList.remove("menu-open"); openButton.setAttribute("aria-expanded", "false"); };
    openButton.addEventListener("click", () => {
      menu.hidden = false;
      syncMenuHeight();
      menu.scrollTop = 0;
      document.body.classList.add("menu-open");
      openButton.setAttribute("aria-expanded", "true");
      closeButton.focus();
    });
    closeButton.addEventListener("click", close);
    menu.addEventListener("click", (event) => { if (event.target.closest("a")) close(); });
    window.addEventListener("resize", syncMenuHeight, { passive: true });
    visualViewport?.addEventListener("resize", syncMenuHeight, { passive: true });
    visualViewport?.addEventListener("scroll", syncMenuHeight, { passive: true });
  }

  const form = document.querySelector("[data-home-search]");
  const input = document.querySelector("[data-search-input]");
  if (form && input) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.trim();
      if (!query) { input.focus(); showToast("Enter a resource, course, or skill to search."); return; }
      location.href = `pages/marketplace.html?q=${encodeURIComponent(query)}`;
    });
    document.querySelectorAll("[data-search-term]").forEach((button) => button.addEventListener("click", () => {
      const term = button.dataset.searchTerm;
      if (term === "Equipment") location.href = "pages/marketplace.html?type=Equipment";
      else if (term === "Learning resources") location.href = "pages/marketplace.html?type=Learning";
      else if (term === "Student services") location.href = "pages/marketplace.html?type=Service";
      else location.href = "pages/marketplace.html?status=Available";
    }));
  }
  document.querySelectorAll("[data-current-year]").forEach((node) => { node.textContent = String(new Date().getFullYear()); });
  void hydrateUserNavigation();
}

document.addEventListener("DOMContentLoaded", () => {
  initialiseHomepage();
  document.querySelectorAll("[data-app-header]").forEach(() => renderAppHeader(document.body.dataset.page || ""));
  renderAppFooter();
});

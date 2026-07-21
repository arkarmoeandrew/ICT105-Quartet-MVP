import { escapeHtml, fetchListings, formatDate, formatPriceLabel, getProfile, getSession, initials, listingUrl, setStatus, supabase } from "./supabase-client.js?v=20260720-4";

const mount = document.querySelector("[data-profile-page]");
const modal = document.querySelector("[data-profile-modal]");
const form = document.querySelector("[data-profile-form]");
const photoModal = document.querySelector("[data-photo-modal]");
const photoInput = document.querySelector("[data-photo-input]");
const photoCanvas = document.querySelector("[data-photo-canvas]");
const photoViewport = document.querySelector("[data-photo-viewport]");
const photoWorkspace = document.querySelector("[data-photo-workspace]");
const photoEmpty = document.querySelector("[data-photo-empty]");
const photoZoom = document.querySelector("[data-photo-zoom]");
const photoSave = document.querySelector("[data-photo-save]");
const photoStatus = document.querySelector("[data-photo-status]");
const photoContext = photoCanvas.getContext("2d");

let session;
let profile;
let isOwner = false;
let photoImage = null;
let photoZoomLevel = 1;
let photoOffsetX = 0;
let photoOffsetY = 0;
let dragState = null;

function avatar(profileRecord, className = "avatar") {
  return `<span class="${className}">${profileRecord.avatar_url ? `<img src="${escapeHtml(profileRecord.avatar_url)}" alt="${escapeHtml(profileRecord.display_name)} profile photo">` : initials(profileRecord.display_name)}</span>`;
}

function profilePhotoControl() {
  return `<div class="profile-photo-wrap">${avatar(profile, "avatar profile-avatar")}${isOwner ? `<button class="profile-photo-button" type="button" aria-label="Change profile picture" title="Change profile picture" data-edit-photo>📷</button>` : ""}</div>`;
}

async function renderProfile() {
  const requestedId = new URLSearchParams(location.search).get("id");
  session = await getSession();
  const profileId = requestedId || session?.user.id;
  if (!profileId) {
    location.href = `login.html?redirect=${encodeURIComponent(location.pathname + location.search)}`;
    return;
  }

  profile = await getProfile(profileId);
  if (!profile) {
    mount.innerHTML = `<div class="empty-state"><h1>Profile not found</h1><p>This RSU member profile is not available.</p><a class="button button--gradient button--small" href="marketplace.html">Return to marketplace</a></div>`;
    return;
  }

  isOwner = session?.user.id === profile.id;
  const listings = await fetchListings({ ownerId: profile.id, includePrivate: isOwner });
  const publicListings = isOwner ? listings : listings.filter((item) => ["Available", "Reserved"].includes(item.status));

  mount.innerHTML = `<section class="profile-hero"><div class="app-container--narrow profile-hero__inner">${profilePhotoControl()}<div><p class="panel__eyebrow" style="color:#edc5ff">RSU Nexus member</p><h1>${escapeHtml(profile.display_name)}</h1><p>${escapeHtml([profile.faculty, profile.year_of_study, `Member since ${formatDate(profile.created_at)}`].filter(Boolean).join(" · "))}</p><span class="status-badge" style="margin-top:.75rem;background:rgba(255,255,255,.1);color:#edc5ff">✓ Verified RSU Nexus Member</span></div><div class="profile-hero__actions">${isOwner ? `<button class="button button--light button--small" type="button" data-edit-profile>Edit profile</button><button class="button button--outline-light button--small" type="button" data-sign-out>Sign out</button>` : `<button class="button button--light button--small" type="button" data-message-profile>Message</button>`}</div></div></section><section class="app-container--narrow profile-layout"><div><article class="panel profile-about"><p class="panel__eyebrow">About</p><h2>${profile.bio ? "A little about this RSU member." : isOwner ? "Tell the RSU community about yourself." : "A new member of the RSU Nexus."}</h2><p>${escapeHtml(profile.bio || (isOwner ? "Add a short biography about what you study, what you can offer, and how you like to collaborate at RSU." : "This member has not added a biography yet."))}</p><div class="interest-list">${(profile.interests || []).map((interest) => `<span>${escapeHtml(interest)}</span>`).join("")}</div><div class="profile-facts"><div class="detail-fact"><small>Faculty or program</small><b>${escapeHtml(profile.faculty || "Not added yet")}</b></div><div class="detail-fact"><small>Year of study</small><b>${escapeHtml(profile.year_of_study || "Not added yet")}</b></div><div class="detail-fact"><small>Preferred RSU campus area</small><b>${escapeHtml(profile.campus_location || "Discuss privately")}</b></div><div class="detail-fact"><small>Typical availability</small><b>${escapeHtml(profile.availability || "Ask in a message")}</b></div></div></article><article class="panel panel__body" style="margin-top:1rem"><p class="panel__eyebrow">Shared with the RSU Nexus</p><h2 class="panel__title">Active listings</h2><div class="listing-grid" style="grid-template-columns:repeat(2,minmax(0,1fr))">${publicListings.length ? publicListings.map((item) => `<a class="owner-card" href="${listingUrl(item.id)}"><span class="avatar">${escapeHtml(item.type[0])}</span><span><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.status)} · ${escapeHtml(formatPriceLabel(item.price_label))}</small></span></a>`).join("") : `<div class="empty-state" style="grid-column:1/-1"><h3>No published listings yet</h3><p>Resources will appear here after they are published.</p>${isOwner ? `<a class="button button--gradient button--small" href="create-listing.html">Create a listing</a>` : ""}</div>`}</div></article></div><aside><article class="panel panel__body"><p class="panel__eyebrow">RSU campus activity</p><div class="detail-facts" style="grid-template-columns:1fr"><div class="detail-fact"><small>Profile visibility</small><b>RSU Nexus community</b></div><div class="detail-fact"><small>Account status</small><b>Verified</b></div><div class="detail-fact"><small>Response channel</small><b>Messages</b></div></div></article><article class="panel panel__body" style="margin-top:1rem;background:#2d1831;color:white"><p class="panel__eyebrow" style="color:#83c9ff">Privacy-safe identity</p><h2 class="panel__title">Trusted RSU profile</h2><p style="color:rgba(255,255,255,.55);font-size:.68rem;line-height:1.6">Email addresses, phone numbers, student IDs, and private conversations are never shown here.</p></article></aside></section>`;

  mount.querySelector("[data-edit-profile]")?.addEventListener("click", openEditor);
  mount.querySelector("[data-edit-photo]")?.addEventListener("click", openPhotoEditor);
  mount.querySelector("[data-sign-out]")?.addEventListener("click", async () => {
    await supabase.auth.signOut();
    location.href = "../index.html";
  });
  mount.querySelector("[data-message-profile]")?.addEventListener("click", () => void messageProfile());
}

function updateProfileFormAvatar() {
  const preview = document.querySelector("[data-profile-form-avatar]");
  if (!preview || !profile) return;
  preview.innerHTML = profile.avatar_url ? `<img src="${escapeHtml(profile.avatar_url)}" alt="${escapeHtml(profile.display_name)} profile photo">` : initials(profile.display_name);
}

function openEditor() {
  form.elements.display_name.value = profile.display_name || "";
  form.elements.faculty.value = profile.faculty || "";
  form.elements.year_of_study.value = profile.year_of_study || "";
  form.elements.campus_location.value = profile.campus_location || "";
  form.elements.bio.value = profile.bio || "";
  form.elements.availability.value = profile.availability || "";
  form.elements.interests.value = (profile.interests || []).join(", ");
  updateProfileFormAvatar();
  modal.hidden = false;
}

async function saveProfile(event) {
  event.preventDefault();
  const status = document.querySelector("[data-profile-status]");
  const data = new FormData(form);
  const updates = {
    display_name: String(data.get("display_name")).trim(),
    faculty: String(data.get("faculty") || "").trim() || null,
    year_of_study: String(data.get("year_of_study") || "") || null,
    campus_location: String(data.get("campus_location") || "").trim() || null,
    bio: String(data.get("bio") || "").trim() || null,
    availability: String(data.get("availability") || "").trim() || null,
    interests: String(data.get("interests") || "").split(",").map((item) => item.trim()).filter(Boolean).slice(0, 12)
  };

  try {
    const { error } = await supabase.from("profiles").update(updates).eq("id", session.user.id);
    if (error) throw error;
    setStatus(status, "Profile updated successfully.", "success");
    setTimeout(() => {
      modal.hidden = true;
      void renderProfile();
    }, 500);
  } catch (error) {
    setStatus(status, error.message, "error");
  }
}

function resetPhotoEditor() {
  photoImage = null;
  photoZoomLevel = 1;
  photoOffsetX = 0;
  photoOffsetY = 0;
  photoZoom.value = "1";
  photoSave.disabled = true;
  photoWorkspace.hidden = true;
  photoEmpty.hidden = false;
  photoContext.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
  setStatus(photoStatus, "");
}

function openPhotoEditor() {
  if (!isOwner || !session) return;
  resetPhotoEditor();
  photoModal.hidden = false;
  document.body.classList.add("menu-open");
  photoModal.querySelector("[data-photo-close]").focus();
  if (profile.avatar_url) loadPhotoSource(profile.avatar_url, true);
}

function closePhotoEditor() {
  photoModal.hidden = true;
  document.body.classList.remove("menu-open");
  dragState = null;
  photoInput.value = "";
}

function loadPhotoSource(source, remote = false) {
  const image = new Image();
  if (remote) image.crossOrigin = "anonymous";
  image.onload = () => {
    photoImage = image;
    photoZoomLevel = 1;
    photoOffsetX = 0;
    photoOffsetY = 0;
    photoZoom.value = "1";
    photoEmpty.hidden = true;
    photoWorkspace.hidden = false;
    photoSave.disabled = false;
    drawPhoto();
    if (!remote) URL.revokeObjectURL(source);
  };
  image.onerror = () => {
    if (!remote) URL.revokeObjectURL(source);
    resetPhotoEditor();
    setStatus(photoStatus, remote ? "Choose a new photo to begin." : "This image could not be opened. Try another JPG, PNG, or WebP file.", remote ? "info" : "error");
  };
  image.src = source;
}

function choosePhoto(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    setStatus(photoStatus, "Choose a JPG, PNG, or WebP image.", "error");
    photoInput.value = "";
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    setStatus(photoStatus, "Choose a profile picture smaller than 5 MB.", "error");
    photoInput.value = "";
    return;
  }
  setStatus(photoStatus, "");
  loadPhotoSource(URL.createObjectURL(file));
}

function photoMetrics() {
  if (!photoImage) return null;
  const canvasSize = photoCanvas.width;
  const coverScale = Math.max(canvasSize / photoImage.naturalWidth, canvasSize / photoImage.naturalHeight);
  const scale = coverScale * photoZoomLevel;
  const width = photoImage.naturalWidth * scale;
  const height = photoImage.naturalHeight * scale;
  const maxX = Math.max(0, (width - canvasSize) / 2);
  const maxY = Math.max(0, (height - canvasSize) / 2);
  photoOffsetX = Math.max(-maxX, Math.min(maxX, photoOffsetX));
  photoOffsetY = Math.max(-maxY, Math.min(maxY, photoOffsetY));
  return { width, height, x: (canvasSize - width) / 2 + photoOffsetX, y: (canvasSize - height) / 2 + photoOffsetY };
}

function drawPhoto() {
  const metrics = photoMetrics();
  if (!metrics) return;
  photoContext.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
  photoContext.drawImage(photoImage, metrics.x, metrics.y, metrics.width, metrics.height);
}

function beginPhotoDrag(event) {
  if (!photoImage) return;
  photoViewport.setPointerCapture(event.pointerId);
  photoViewport.classList.add("is-dragging");
  dragState = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, offsetX: photoOffsetX, offsetY: photoOffsetY };
}

function movePhoto(event) {
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  const ratio = photoCanvas.width / photoViewport.getBoundingClientRect().width;
  photoOffsetX = dragState.offsetX + (event.clientX - dragState.x) * ratio;
  photoOffsetY = dragState.offsetY + (event.clientY - dragState.y) * ratio;
  drawPhoto();
}

function endPhotoDrag(event) {
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  dragState = null;
  photoViewport.classList.remove("is-dragging");
  if (photoViewport.hasPointerCapture(event.pointerId)) photoViewport.releasePointerCapture(event.pointerId);
}

function croppedPhotoBlob() {
  const output = document.createElement("canvas");
  output.width = 640;
  output.height = 640;
  const outputContext = output.getContext("2d");
  const cropInset = Math.round(photoCanvas.width * 0.09);
  const cropSize = photoCanvas.width - cropInset * 2;
  outputContext.drawImage(photoCanvas, cropInset, cropInset, cropSize, cropSize, 0, 0, output.width, output.height);
  return new Promise((resolve, reject) => {
    output.toBlob((blob) => blob ? resolve(blob) : reject(new Error("The cropped photo could not be created.")), "image/jpeg", 0.9);
  });
}

async function saveProfilePhoto() {
  if (!photoImage || !session) return;
  photoSave.disabled = true;
  setStatus(photoStatus, "Saving your profile picture…");
  try {
    const blob = await croppedPhotoBlob();
    const path = `${session.user.id}/avatar.jpg`;
    const { error: uploadError } = await supabase.storage.from("profile-photos").upload(path, blob, {
      contentType: "image/jpeg",
      cacheControl: "3600",
      upsert: true
    });
    if (uploadError) throw uploadError;

    const publicUrl = supabase.storage.from("profile-photos").getPublicUrl(path).data.publicUrl;
    const avatarUrl = `${publicUrl}?v=${Date.now()}`;
    const { error: updateError } = await supabase.from("profiles").update({ avatar_url: avatarUrl }).eq("id", session.user.id);
    if (updateError) throw updateError;

    profile.avatar_url = avatarUrl;
    setStatus(photoStatus, "Profile picture updated.", "success");
    updateProfileFormAvatar();
    setTimeout(() => {
      closePhotoEditor();
      void renderProfile();
    }, 450);
  } catch (error) {
    photoSave.disabled = false;
    setStatus(photoStatus, error.message, "error");
  }
}

async function messageProfile() {
  if (!session) {
    location.href = `login.html?redirect=${encodeURIComponent(location.pathname + location.search)}`;
    return;
  }
  const { data, error } = await supabase.rpc("start_conversation", {
    p_other_user: profile.id,
    p_listing_id: null,
    p_listing_title: "Profile conversation",
    p_listing_image_url: profile.avatar_url
  });
  if (error) alert(error.message);
  else location.href = `messages.html?conversation=${encodeURIComponent(data)}`;
}

document.querySelectorAll("[data-profile-close]").forEach((button) => button.addEventListener("click", () => { modal.hidden = true; }));
document.querySelector("[data-open-photo-editor]").addEventListener("click", openPhotoEditor);
document.querySelectorAll("[data-photo-choose]").forEach((button) => button.addEventListener("click", () => photoInput.click()));
document.querySelectorAll("[data-photo-close]").forEach((button) => button.addEventListener("click", closePhotoEditor));
photoInput.addEventListener("change", choosePhoto);
photoZoom.addEventListener("input", () => {
  photoZoomLevel = Number(photoZoom.value);
  drawPhoto();
});
photoViewport.addEventListener("pointerdown", beginPhotoDrag);
photoViewport.addEventListener("pointermove", movePhoto);
photoViewport.addEventListener("pointerup", endPhotoDrag);
photoViewport.addEventListener("pointercancel", endPhotoDrag);
photoSave.addEventListener("click", () => void saveProfilePhoto());
form.addEventListener("submit", saveProfile);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !photoModal.hidden) closePhotoEditor();
});

void renderProfile().catch((error) => {
  mount.innerHTML = `<div class="empty-state"><h1>Could not open profile</h1><p>${escapeHtml(error.message)}</p></div>`;
});

import { escapeHtml, fetchListing, fetchListings, formatDate, formatPriceLabel, getSession, initials, listingUrl, setStatus, supabase } from "./supabase-client.js?v=20260720-4";
import { showToast } from "./ui.js?v=20260720-4";

const listingConfigs = {
  Equipment: {
    color: "#642b73", mark: "E", label: "Equipment", title: "Describe your equipment", copy: "Tell students what the item is, how they can use it, and when it must be returned.",
    categories: [
      { value: "Electronics", label: "Electronics (Laptop, AirPods, Phone, Tablet)" },
      { value: "Camera Equipment", label: "Camera Equipment (Camera, Lens, Tripod)" },
      { value: "Study Tools", label: "Study Tools (Calculator, Books)" },
      { value: "Creative Gear", label: "Creative Gear (Drawing Tablet, Microphone)" },
      { value: "Lab Equipment", label: "Lab Equipment (Microscope, Lab Kit)" },
      { value: "Other", label: "Other" }
    ], methods: ["Rent", "Borrow", "Exchange", "Giveaway"],
    priceLabel: "Fee", description: "Describe the condition, what is included, and any care or return instructions.", extraOneLabel: "Period", extraOne: ["Same day", "Up to 3 days", "Up to 1 week", "Flexible / discuss first"], extraTwoLabel: "Pickup location", extraTwo: "e.g. Building 6 lobby", upload: "Choose up to 5 item photos", hint: "Select up to 5 at once · 10 MB each · use only photos you own or may share", guide: ["What item and accessories are included?", "What condition is the equipment in?", "How long can a student keep it?"]
  },
  Learning: {
    color: "#1677e8", mark: "L", label: "Learning resource", title: "Describe your learning resource", copy: "Help students understand the subject, format, and what the resource contains.",
    categories: ["Study notes", "Textbooks", "Templates", "Research materials", "Exam preparation", "Other learning resource"], methods: ["Share for free", "Sell a copy", "Exchange resources", "Lend physical copy"],
    priceLabel: "Resource price", description: "Describe the topics covered, edition or semester, file format, and who this resource is useful for.", extraOneLabel: "Resource format", extraOne: ["PDF / digital file", "Physical book", "Printed notes", "Template files", "Mixed format"], extraTwoLabel: "Course or subject", extraTwo: "e.g. ICT 220 Database Systems", upload: "Choose up to 5 covers or previews", hint: "Select up to 5 at once · 10 MB each · use only images you own or may share", guide: ["Which course or subject does it support?", "Is it digital, printed, or physical?", "Do you have permission to share it?"]
  },
  Service: {
    color: "#c226b8", mark: "S", label: "Student service", title: "Describe your student service", copy: "Explain what you can help with, how you deliver the work, and what students can expect.",
    categories: ["Tutoring", "Programming & development", "Design & creative", "Photography & video", "Translation", "Other student service"], methods: ["Free help", "Hourly rate", "Fixed project price", "Exchange skills"],
    priceLabel: "Price or rate", description: "Describe what you can help with, what is included, your experience, and the expected turnaround time.", extraOneLabel: "Delivery method", extraOne: ["On campus", "Remote / online", "On campus or remote"], extraTwoLabel: "Typical availability", extraTwo: "e.g. Weekdays after 4 PM", upload: "Choose up to 5 service photos", hint: "Select up to 5 at once · 10 MB each · use only your own or licensed work", guide: ["What result will the student receive?", "Is the service remote, on campus, or both?", "How do you charge and how long does it take?"]
  }
};

function uniqueUploadId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  if (globalThis.crypto && typeof globalThis.crypto.getRandomValues === "function") {
    const bytes = new Uint8Array(16);
    globalThis.crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function imageExtension(file) {
  return ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" })[file.type] || "jpg";
}

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_LISTING_PHOTOS = 5;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

function validateListingImages(files) {
  if (files.length > MAX_LISTING_PHOTOS) return `Choose no more than ${MAX_LISTING_PHOTOS} photos.`;
  if (files.some((file) => !ALLOWED_IMAGE_TYPES.includes(file.type))) return "Choose JPG, PNG, or WebP photos only.";
  if (files.some((file) => file.size > MAX_IMAGE_BYTES)) return "Each photo must be smaller than 10 MB.";
  return "";
}

function usesCustomCategory(value) {
  const category = String(value || "").trim();
  return category === "Other" || category.startsWith("Other ");
}

function listingCategory(data) {
  const selected = String(data.get("category") || "").trim();
  const custom = String(data.get("custom_category") || "").trim();
  return usesCustomCategory(selected) && custom ? custom : selected;
}

function detailPage() {
  const mount = document.querySelector("[data-listing-detail]");
  if (!mount) return;
  const id = new URLSearchParams(location.search).get("id") || "sample-camera";
  void (async () => {
    try {
      const listing = await fetchListing(id);
      if (!listing) throw new Error("This listing could not be found or is no longer available.");
      const ownerAvatar = listing.owner_avatar ? `<img src="${escapeHtml(listing.owner_avatar)}" alt="">` : initials(listing.owner_name);
      const images = listing.image_urls?.length ? listing.image_urls : listing.image_url ? [listing.image_url] : [];
      const mainImage = images[0] || "";
      const thumbnails = images.length > 1 ? `<div class="detail-thumbnails" aria-label="Listing photos">${images.map((image, index) => `<button class="detail-thumbnail ${index === 0 ? "is-active" : ""}" type="button" data-gallery-index="${index}" aria-label="View photo ${index + 1}"><img src="${escapeHtml(image)}" alt=""></button>`).join("")}</div>` : "";
      const galleryControls = images.length > 1 ? `<button class="detail-gallery-arrow detail-gallery-arrow--previous" type="button" data-gallery-previous aria-label="Previous photo">‹</button><button class="detail-gallery-arrow detail-gallery-arrow--next" type="button" data-gallery-next aria-label="Next photo">›</button><span class="detail-gallery-count" data-gallery-count>1 / ${images.length}</span>` : "";
      mount.innerHTML = `<div class="details-layout"><div class="detail-gallery"><div class="detail-image" tabindex="0" aria-label="Listing photo gallery"><img src="${escapeHtml(mainImage)}" alt="${escapeHtml(listing.title)}" data-detail-main-image>${galleryControls}</div>${thumbnails}</div><article class="panel detail-panel"><div><span class="status-badge">${escapeHtml(listing.status)}</span> <span class="status-badge" style="background:#eee7f5;color:#642b73">${escapeHtml(listing.type)}</span></div><h1>${escapeHtml(listing.title)}</h1><p class="detail-price">${escapeHtml(formatPriceLabel(listing.price_label, "Discuss first"))}</p><section class="detail-description" aria-label="Listing description"><span>Description</span><p>${escapeHtml(listing.description)}</p></section><div class="detail-facts"><div class="detail-fact"><small>Category</small><b>${escapeHtml(listing.category)}</b></div><div class="detail-fact"><small>Offer method</small><b>${escapeHtml(listing.offer_method)}</b></div><div class="detail-fact"><small>${listing.type === "Service" ? "Delivery" : "Format / period"}</small><b>${escapeHtml(listing.extra_one || "Discuss first")}</b></div><div class="detail-fact"><small>${listing.type === "Service" ? "Availability" : "Location / subject"}</small><b>${escapeHtml(listing.extra_two || "Discuss privately")}</b></div></div><a class="owner-card" href="profile.html${listing.owner_id ? `?id=${encodeURIComponent(listing.owner_id)}` : ""}"><span class="avatar">${ownerAvatar}</span><span><b>${escapeHtml(listing.owner_name)}</b><small>${escapeHtml(listing.owner_faculty)} · Verified RSU member</small></span></a><div class="detail-actions"><button class="button button--gradient" type="button" data-open-request ${listing.status !== "Available" ? "disabled" : ""}>Request this ${listing.type === "Service" ? "service" : "resource"}</button><button class="button button--surface" type="button" data-message-owner>Message owner</button></div><p class="notice" hidden data-detail-status></p></article></div>`;
      let activeImageIndex = 0;
      const showGalleryImage = (index) => {
        if (!images.length) return;
        activeImageIndex = (index + images.length) % images.length;
        const image = mount.querySelector("[data-detail-main-image]");
        image.src = images[activeImageIndex];
        image.alt = `${listing.title} — photo ${activeImageIndex + 1} of ${images.length}`;
        mount.querySelector("[data-gallery-count]")?.replaceChildren(`${activeImageIndex + 1} / ${images.length}`);
        mount.querySelectorAll("[data-gallery-index]").forEach((item) => item.classList.toggle("is-active", Number(item.dataset.galleryIndex) === activeImageIndex));
      };
      mount.querySelectorAll("[data-gallery-index]").forEach((button) => button.addEventListener("click", () => showGalleryImage(Number(button.dataset.galleryIndex))));
      mount.querySelector("[data-gallery-previous]")?.addEventListener("click", () => showGalleryImage(activeImageIndex - 1));
      mount.querySelector("[data-gallery-next]")?.addEventListener("click", () => showGalleryImage(activeImageIndex + 1));
      mount.querySelector(".detail-image")?.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") showGalleryImage(activeImageIndex - 1);
        if (event.key === "ArrowRight") showGalleryImage(activeImageIndex + 1);
      });
      mount.querySelector("[data-open-request]")?.addEventListener("click", () => openRequest(listing));
      mount.querySelector("[data-message-owner]")?.addEventListener("click", () => void messageOwner(listing));
    } catch (error) {
      mount.innerHTML = `<div class="empty-state"><h2>Listing not found</h2><p>${escapeHtml(error.message)}</p><a class="button button--gradient button--small" href="marketplace.html">Return to marketplace</a></div>`;
    }
  })();
}

function openRequest(listing) {
  const modal = document.querySelector("[data-request-modal]");
  if (!listing.owner_id) {
    setStatus(document.querySelector("[data-detail-status]"), "This is a design-preview listing. Request a live member listing after one is published.", "info");
    return;
  }
  modal.hidden = false;
  modal.dataset.listingId = listing.id;
  modal.dataset.ownerId = listing.owner_id;
  modal.dataset.listingTitle = listing.title;
}

async function messageOwner(listing) {
  const session = await getSession();
  if (!session) { location.href = `login.html?redirect=${encodeURIComponent(location.pathname + location.search)}`; return; }
  if (!listing.owner_id) { showToast("This preview listing does not have a live owner account."); return; }
  if (listing.owner_id === session.user.id) { showToast("This is your own listing."); return; }
  const { data, error } = await supabase.rpc("start_conversation", { p_other_user: listing.owner_id, p_listing_id: listing.id, p_listing_title: listing.title, p_listing_image_url: listing.image_url });
  if (error) showToast(error.message);
  else location.href = `messages.html?conversation=${encodeURIComponent(data)}`;
}

async function submitRequest(event) {
  event.preventDefault();
  const requestForm = event.currentTarget;
  if (requestForm.dataset.submitting === "true") return;
  const modal = document.querySelector("[data-request-modal]");
  const status = document.querySelector("[data-request-status]");
  const formData = new FormData(requestForm);
  const message = String(formData.get("message") || "").trim();
  if (message.length < 10) { setStatus(status, "Write at least 10 characters so the owner understands your request.", "error"); return; }
  const submitButton = requestForm.querySelector('button[type="submit"]');
  const submitLabel = submitButton.textContent;
  requestForm.dataset.submitting = "true";
  submitButton.disabled = true;
  submitButton.textContent = "Sending…";
  try {
    const session = await getSession();
    if (!session) { location.href = `login.html?redirect=${encodeURIComponent(location.pathname + location.search)}`; return; }
    const { data: request, error } = await supabase.from("requests").insert({ listing_id: modal.dataset.listingId, requester_id: session.user.id, owner_id: modal.dataset.ownerId, message, preferred_time: String(formData.get("preferred_time") || "").trim() || null }).select("id").single();
    if (error) throw error;
    const { data: conversationId, error: conversationError } = await supabase.rpc("start_conversation", { p_other_user: modal.dataset.ownerId, p_listing_id: modal.dataset.listingId, p_listing_title: modal.dataset.listingTitle, p_listing_image_url: null });
    if (!conversationError && conversationId) await supabase.from("messages").insert({ conversation_id: conversationId, sender_id: session.user.id, body: `Request sent: ${message}` });
    requestForm.reset();
    modal.hidden = true;
    setStatus(status, "");
    showToast(`Request ${request.id.slice(0, 8)} submitted. Track it from Requests.`);
  } catch (error) {
    setStatus(status, error.message, "error");
  } finally {
    requestForm.dataset.submitting = "false";
    submitButton.disabled = false;
    submitButton.textContent = submitLabel;
  }
}

function createListingPage() {
  const form = document.querySelector("[data-listing-form]");
  if (!form) return;
  let step = 1;
  let type = "Equipment";
  let publishedId = null;
  let previewUrls = [];
  let selectedImages = [];
  const status = document.querySelector("[data-listing-status]");
  const imageInput = document.querySelector("[data-image-input]");
  const imagePreviews = document.querySelector("[data-image-previews]");
  const fileName = document.querySelector("[data-file-name]");
  const clearPreviewUrls = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    previewUrls = [];
  };
  const renderSelectedImages = () => {
    clearPreviewUrls();
    previewUrls = selectedImages.map((file) => URL.createObjectURL(file));
    const selectedSlots = previewUrls.map((url, index) => `<div class="upload-preview"><img src="${escapeHtml(url)}" alt="Selected photo ${index + 1}"><span class="upload-preview__position">${index === 0 ? "Cover" : index + 1}</span><button class="upload-preview__remove" type="button" data-remove-photo="${index}" aria-label="Remove photo ${index + 1}">×</button>${index > 0 ? `<button class="upload-preview__cover" type="button" data-cover-photo="${index}">Make cover</button>` : ""}</div>`).join("");
    const remainingSlots = MAX_LISTING_PHOTOS - selectedImages.length;
    const addMore = selectedImages.length && remainingSlots ? `<button class="upload-photo-slot upload-photo-slot--add" type="button" data-add-photo aria-label="Add up to ${remainingSlots} more photos"><span>＋</span><small>Add up to ${remainingSlots} more</small></button>` : "";
    imagePreviews.hidden = selectedImages.length === 0;
    imagePreviews.innerHTML = selectedSlots + addMore;
    fileName.textContent = selectedImages.length ? `${selectedImages.length} / ${MAX_LISTING_PHOTOS} selected · first photo is the cover` : `Select up to ${MAX_LISTING_PHOTOS} photos at once`;
    imageInput.disabled = selectedImages.length >= MAX_LISTING_PHOTOS;
  };
  const categorySelect = document.querySelector("[data-category-select]");
  const methodSelect = document.querySelector("[data-method-select]");
  const priceInput = document.querySelector("[data-price-input]");
  const priceCurrency = document.querySelector("[data-price-currency]");
  const customCategoryLabel = document.querySelector("[data-custom-category-label]");
  const customCategoryInput = document.querySelector("[data-custom-category]");
  const updateCustomCategory = () => {
    const showCustom = usesCustomCategory(categorySelect.value);
    customCategoryLabel.hidden = !showCustom;
    customCategoryInput.required = showCustom;
    if (!showCustom) customCategoryInput.value = "";
  };
  const renderTypeCards = () => {
    document.querySelector("[data-type-grid]").innerHTML = Object.entries(listingConfigs).map(([key, config]) => `<button class="type-card ${key === type ? "is-selected" : ""}" type="button" data-listing-type="${key}" style="--type-color:${config.color}"><span class="type-card__icon">${config.mark}</span><h3>${config.label}</h3><p>${key === "Equipment" ? "Tools, gear, and devices" : key === "Learning" ? "Notes, books, and templates" : "Skills and student support"}</p></button>`).join("");
    document.querySelectorAll("[data-listing-type]").forEach((button) => button.addEventListener("click", () => { type = button.dataset.listingType; renderTypeCards(); applyConfig(); }));
  };
  const methodUsesBaht = (method) => /rent|sell|rate|price/i.test(String(method || ""));
  const updatePriceField = () => {
    const showCurrency = methodUsesBaht(methodSelect.value);
    priceCurrency.hidden = !showCurrency;
    priceInput.inputMode = showCurrency ? "decimal" : "text";
    priceInput.placeholder = showCurrency ? "Enter amount" : "Free or discuss";
    if (showCurrency && /^(free|discuss)$/i.test(priceInput.value.trim())) priceInput.value = "";
  };
  const applyConfig = () => {
    const config = listingConfigs[type];
    document.querySelector("[data-describe-title]").textContent = config.title;
    document.querySelector("[data-describe-copy]").textContent = config.copy;
    document.querySelector("[data-category-label]").childNodes[0].textContent = `${config.label} category`;
    categorySelect.innerHTML = config.categories.map((category) => {
      const value = typeof category === "string" ? category : category.value;
      const label = typeof category === "string" ? category : category.label;
      return `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`;
    }).join("");
    customCategoryInput.placeholder = type === "Equipment" ? "e.g. Musical instrument" : type === "Learning" ? "e.g. Language practice sheets" : "e.g. Event planning help";
    updateCustomCategory();
    methodSelect.innerHTML = config.methods.map((value) => `<option>${value}</option>`).join("");
    document.querySelector("[data-price-label-text]").textContent = config.priceLabel;
    updatePriceField();
    document.querySelector("[data-description-input]").placeholder = config.description;
    document.querySelector("[data-extra-one-label]").childNodes[0].textContent = config.extraOneLabel;
    document.querySelector("[data-extra-one]").innerHTML = config.extraOne.map((value) => `<option>${value}</option>`).join("");
    document.querySelector("[data-extra-two-label]").childNodes[0].textContent = config.extraTwoLabel;
    document.querySelector("[data-extra-two]").placeholder = config.extraTwo;
    document.querySelector("[data-upload-title]").textContent = config.upload;
    document.querySelector("[data-upload-hint]").textContent = config.hint;
    document.querySelector("[data-guide-list]").innerHTML = config.guide.map((item) => `<li>${item}</li>`).join("");
  };
  const showStep = (next) => {
    step = next;
    document.querySelectorAll("[data-listing-step]").forEach((section) => { section.hidden = Number(section.dataset.listingStep) !== step; });
    document.querySelectorAll("[data-progress]").forEach((item) => { const index = Number(item.dataset.progress); item.classList.toggle("is-active", index === step); item.classList.toggle("is-complete", index < step); });
    document.querySelector("[data-listing-back]").textContent = step === 1 ? "Cancel" : "Back";
    document.querySelector("[data-listing-next]").textContent = step === 3 ? "Submit for review ✓" : "Continue →";
    if (step === 3) renderReview();
  };
  const renderReview = () => {
    const data = new FormData(form);
    const config = listingConfigs[type];
    const photoCount = selectedImages.length;
    document.querySelector("[data-listing-review]").innerHTML = `<div class="review-box__accent" style="--type-color:${config.color}"></div><div class="review-box__body"><span class="status-badge" style="background:${config.color}15;color:${config.color}">${config.label}</span><h3>${escapeHtml(data.get("title"))}</h3><p>${escapeHtml(data.get("description"))}</p><div class="detail-facts"><div class="detail-fact"><small>Category</small><b>${escapeHtml(listingCategory(data))}</b></div><div class="detail-fact"><small>Offer method</small><b>${escapeHtml(data.get("offer_method"))}</b></div><div class="detail-fact"><small>${config.extraOneLabel}</small><b>${escapeHtml(data.get("extra_one"))}</b></div><div class="detail-fact"><small>Photos</small><b>${photoCount ? `${photoCount} selected` : "No photos"}</b></div><div class="detail-fact"><small>${config.priceLabel}</small><b>${escapeHtml(formatPriceLabel(data.get("price_label"), "Free"))}</b></div></div></div>`;
  };
  document.querySelector("[data-listing-next]").addEventListener("click", async () => {
    if (publishedId) {
      location.href = `my-listings.html?created=${publishedId}`;
      return;
    }
    if (step === 1) { showStep(2); return; }
    if (step === 2) {
      const title = form.elements.title.value.trim();
      const description = form.elements.description.value.trim();
      if (title.length < 3) { setStatus(status, "Add a listing title with at least 3 characters.", "error"); form.elements.title.focus(); return; }
      if (usesCustomCategory(categorySelect.value) && !customCategoryInput.value.trim()) { setStatus(status, "Write the category you want other students to see.", "error"); customCategoryInput.focus(); return; }
      if (description.length < 20) { setStatus(status, `Add ${20 - description.length} more character${description.length === 19 ? "" : "s"} to the description.`, "error"); form.elements.description.focus(); return; }
      setStatus(status, ""); showStep(3); return;
    }
    publishedId = await publishListing(form, type, status, selectedImages);
  });
  document.querySelector("[data-listing-back]").addEventListener("click", () => { if (step === 1) location.href = "marketplace.html"; else showStep(step - 1); });
  categorySelect.addEventListener("change", updateCustomCategory);
  methodSelect.addEventListener("change", updatePriceField);
  imageInput.addEventListener("change", (event) => {
    const incomingImages = Array.from(event.target.files || []);
    const validationError = validateListingImages(incomingImages.slice(0, MAX_LISTING_PHOTOS));
    if (validationError) {
      event.target.value = "";
      setStatus(status, validationError, "error");
      return;
    }
    const availableSlots = MAX_LISTING_PHOTOS - selectedImages.length;
    selectedImages = selectedImages.concat(incomingImages.slice(0, availableSlots));
    event.target.value = "";
    renderSelectedImages();
    setStatus(status, incomingImages.length > availableSlots ? `Only ${MAX_LISTING_PHOTOS} photos can be added. The first ${MAX_LISTING_PHOTOS} were kept.` : "");
  });
  imagePreviews.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add-photo]");
    const removeButton = event.target.closest("[data-remove-photo]");
    const coverButton = event.target.closest("[data-cover-photo]");
    if (addButton) { imageInput.click(); return; }
    if (removeButton) {
      selectedImages.splice(Number(removeButton.dataset.removePhoto), 1);
      renderSelectedImages();
      setStatus(status, "");
      return;
    }
    if (coverButton) {
      const [cover] = selectedImages.splice(Number(coverButton.dataset.coverPhoto), 1);
      selectedImages.unshift(cover);
      renderSelectedImages();
    }
  });
  window.addEventListener("beforeunload", clearPreviewUrls, { once: true });
  renderTypeCards(); applyConfig(); renderSelectedImages(); showStep(1);
}

async function publishListing(form, type, status, images = []) {
  const session = await getSession();
  if (!session) { location.href = `login.html?redirect=${encodeURIComponent(location.pathname)}`; return; }
  const data = new FormData(form);
  const validationError = validateListingImages(images);
  if (validationError) { setStatus(status, validationError, "error"); return null; }
  const imageUrls = [];
  const uploadedPaths = [];
  setStatus(status, "Publishing your listing…");
  try {
    for (const [index, image] of images.entries()) {
      setStatus(status, `Uploading photo ${index + 1} of ${images.length}…`);
      const path = `${session.user.id}/${uniqueUploadId()}.${imageExtension(image)}`;
      const { error: uploadError } = await supabase.storage.from("listing-images").upload(path, image, { contentType: image.type, upsert: false });
      if (uploadError) throw uploadError;
      uploadedPaths.push(path);
      imageUrls.push(supabase.storage.from("listing-images").getPublicUrl(path).data.publicUrl);
    }
    setStatus(status, "Publishing your listing…");
    const payload = { owner_id: session.user.id, type, title: String(data.get("title")).trim(), category: listingCategory(data), offer_method: String(data.get("offer_method")), price_label: formatPriceLabel(data.get("price_label"), "Free"), description: String(data.get("description")).trim(), extra_one: String(data.get("extra_one") || ""), extra_two: String(data.get("extra_two") || "").trim() || null, image_url: imageUrls[0] || null, image_urls: imageUrls, status: "Pending" };
    const { data: listing, error } = await supabase.from("listings").insert(payload).select("id,status").single();
    if (error) throw error;
    setStatus(status, listing.status === "Available"
      ? "Your listing was approved automatically and is now live in the marketplace."
      : "Your listing is ready for review. You can manage it from My Listings.", "success");
    document.querySelector("[data-listing-next]").textContent = "Go to My Listings";
    return listing.id;
  } catch (error) {
    if (uploadedPaths.length) await supabase.storage.from("listing-images").remove(uploadedPaths);
    setStatus(status, error.message, "error");
    return null;
  }
}

function myListingsPage() {
  const body = document.querySelector("[data-my-listings-body]");
  if (!body) return;
  void (async () => {
    const session = await getSession();
    if (!session) { location.href = `login.html?redirect=${encodeURIComponent(location.pathname)}`; return; }
    const listings = await fetchListings({ ownerId: session.user.id, includePrivate: true });
    if (!listings.length) { body.innerHTML = `<tr><td colspan="5"><div class="empty-state"><h3>No listings yet</h3><p>Create your first equipment, learning, or service listing.</p></div></td></tr>`; return; }
    body.innerHTML = listings.map((item) => { const statusAction = item.status === "Available" ? `<button data-status-id="${item.id}" data-next-status="Unavailable">Pause</button>` : item.reviewed_at && ["Unavailable", "Reserved"].includes(item.status) ? `<button data-status-id="${item.id}" data-next-status="Available">Activate</button>` : ""; return `<tr><td><b><a href="${listingUrl(item.id)}">${escapeHtml(item.title)}</a></b><br><small>${escapeHtml(item.category)}</small></td><td>${escapeHtml(item.type)}</td><td><span class="status-badge status-badge--${item.status.toLowerCase()}">${escapeHtml(item.status)}</span></td><td>${formatDate(item.created_at)}</td><td><div class="row-actions">${statusAction}<button data-delete-id="${item.id}">Delete</button></div></td></tr>`; }).join("");
    body.querySelectorAll("[data-status-id]").forEach((button) => button.addEventListener("click", () => void updateListingStatus(button)));
    body.querySelectorAll("[data-delete-id]").forEach((button) => button.addEventListener("click", () => void deleteListing(button)));
  })();
}

async function updateListingStatus(button) {
  const { error } = await supabase.from("listings").update({ status: button.dataset.nextStatus }).eq("id", button.dataset.statusId);
  if (error) setStatus(document.querySelector("[data-my-listings-status]"), error.message, "error"); else location.reload();
}

async function deleteListing(button) {
  if (!confirm("Delete this listing? This cannot be undone.")) return;
  const { error } = await supabase.from("listings").delete().eq("id", button.dataset.deleteId);
  if (error) setStatus(document.querySelector("[data-my-listings-status]"), error.message, "error"); else location.reload();
}

document.querySelectorAll("[data-request-close]").forEach((button) => button.addEventListener("click", () => {
  const modal = document.querySelector("[data-request-modal]");
  const requestForm = document.querySelector("[data-request-form]");
  modal.hidden = true;
  requestForm.reset();
  setStatus(document.querySelector("[data-request-status]"), "");
}));
document.querySelector("[data-request-form]")?.addEventListener("submit", submitRequest);
detailPage();
createListingPage();
myListingsPage();

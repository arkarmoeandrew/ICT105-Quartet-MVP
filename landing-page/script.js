const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-nav-menu]");
const interestForm = document.querySelector("[data-interest-form]");
const statusMessage = document.querySelector("[data-form-status]");
const interestBars = document.querySelectorAll("[data-interest-bar]");
const interestCounts = document.querySelectorAll("[data-interest-count]");

const STORAGE_KEYS = {
  interestCount: "rsu-nexus-demo-interest-count",
  submitted: "rsu-nexus-demo-interest-submitted",
  ctaClicks: "rsu-nexus-demo-cta-clicks"
};

const BASE_INTEREST_COUNT = 126;
const INTEREST_TARGET = 200;

function readNumber(key, fallback) {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return fallback;
    const value = Number(storedValue);
    return Number.isFinite(value) && value >= 0 ? value : fallback;
  } catch {
    return fallback;
  }
}

function saveValue(key, value) {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // The landing page still works when browser storage is unavailable.
  }
}

function hasSubmittedInterest() {
  try {
    return localStorage.getItem(STORAGE_KEYS.submitted) === "true";
  } catch {
    return false;
  }
}

function renderInterestMetric() {
  const count = readNumber(STORAGE_KEYS.interestCount, BASE_INTEREST_COUNT);
  interestCounts.forEach((node) => {
    node.textContent = String(count);
  });
  const progress = Math.min(100, Math.round((count / INTEREST_TARGET) * 100));
  interestBars.forEach((bar) => {
    requestAnimationFrame(() => {
      bar.style.width = `${progress}%`;
    });
  });
}

function trackCta(name) {
  const totalClicks = readNumber(STORAGE_KEYS.ctaClicks, 0) + 1;
  saveValue(STORAGE_KEYS.ctaClicks, totalClicks);
  document.body.dataset.lastCta = name;
}

menuButton?.addEventListener("click", () => {
  const open = menu.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-track-cta]").forEach((control) => {
  control.addEventListener("click", () => {
    trackCta(control.dataset.trackCta);
  });
});

const resourceExamples = {
  Equipment: {
    icon: "CAM",
    category: "CAMERA EQUIPMENT",
    title: "Canon DSLR Camera",
    description: "Available for student projects",
    price: "Free"
  },
  Learning: {
    icon: "NOTE",
    category: "LEARNING RESOURCE",
    title: "Database Study Notes",
    description: "Shared by an ICT student",
    price: "Free"
  },
  Services: {
    icon: "DES",
    category: "STUDENT SERVICE",
    title: "Presentation Design Help",
    description: "On-campus creative support",
    price: "฿250"
  }
};

document.querySelectorAll("[data-demo-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-demo-filter]").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    const example = resourceExamples[button.dataset.demoFilter];
    document.querySelector("[data-preview-icon]").textContent = example.icon;
    document.querySelector("[data-preview-category]").textContent = example.category;
    document.querySelector("[data-preview-title]").textContent = example.title;
    document.querySelector("[data-preview-description]").textContent = example.description;
    document.querySelector("[data-preview-price]").textContent = example.price;
  });
});

interestForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  statusMessage.classList.remove("is-error");

  if (!interestForm.checkValidity()) {
    statusMessage.textContent = "Complete all three fields before registering your interest.";
    statusMessage.classList.add("is-error");
    interestForm.reportValidity();
    return;
  }

  if (!hasSubmittedInterest()) {
    const updatedCount = readNumber(STORAGE_KEYS.interestCount, BASE_INTEREST_COUNT) + 1;
    saveValue(STORAGE_KEYS.interestCount, updatedCount);
    saveValue(STORAGE_KEYS.submitted, true);
    renderInterestMetric();
    statusMessage.textContent = "Thanks—your simulated interest was added to the prototype metric.";
  } else {
    statusMessage.textContent = "Your simulated interest is already included in the metric.";
  }

  interestForm.reset();
});

document.querySelector("[data-current-year]").textContent = String(new Date().getFullYear());
renderInterestMetric();

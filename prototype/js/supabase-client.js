import { createClient } from "https://esm.sh/@supabase/supabase-js@2.110.5";

const SUPABASE_URL = "https://buzzgtgmhrkmjiowxqvx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ve2tcHybO-vo04K1Tiq87g_t6210Rzh";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

export const LISTING_TYPES = ["Equipment", "Learning", "Service"];
export const LISTING_STATUSES = ["Available", "Reserved", "Unavailable"];

export const sampleListings = [
  {
    id: "sample-camera",
    owner_id: null,
    owner_name: "Alex Morgan",
    owner_faculty: "Architecture",
    title: "Canon DSLR Camera",
    type: "Equipment",
    category: "Camera equipment",
    offer_method: "Borrow for free",
    price_label: "Free",
    description: "A well-maintained DSLR camera for coursework and student projects. Includes a standard lens, battery, charger, strap, and protective bag.",
    extra_one: "Up to 3 days",
    extra_two: "Building 6 lobby",
    image_url: "https://images.unsplash.com/photo-1550291396-edb0f09d48c2?auto=format&fit=crop&w=1200&q=85",
    status: "Available",
    created_at: "2026-07-15T08:00:00Z"
  },
  {
    id: "sample-calculator",
    owner_id: null,
    owner_name: "Bam Kittisak",
    owner_faculty: "Engineering",
    title: "Scientific Calculator",
    type: "Equipment",
    category: "Study tools",
    offer_method: "Borrow for free",
    price_label: "Free",
    description: "Scientific calculator suitable for mathematics, statistics, and engineering classes.",
    extra_one: "Up to 1 week",
    extra_two: "Student Center",
    image_url: "https://images.unsplash.com/photo-1611125834097-7e5ce19e60b1?auto=format&fit=crop&w=1000&q=85",
    status: "Available",
    created_at: "2026-07-14T09:00:00Z"
  },
  {
    id: "sample-notes",
    owner_id: null,
    owner_name: "May W.",
    owner_faculty: "Information Technology",
    title: "Database Systems Study Notes",
    type: "Learning",
    category: "Study notes",
    offer_method: "Share for free",
    price_label: "Free",
    description: "Organized database systems notes covering normalization, SQL, transactions, and revision exercises.",
    extra_one: "PDF / digital file",
    extra_two: "ICT 220 Database Systems",
    image_url: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1000&q=85",
    status: "Available",
    created_at: "2026-07-13T11:00:00Z"
  },
  {
    id: "sample-programming",
    owner_id: null,
    owner_name: "Ari Morgan",
    owner_faculty: "Information Technology",
    title: "Programming Support",
    type: "Service",
    category: "Programming & development",
    offer_method: "Hourly rate",
    price_label: "฿180/hr",
    description: "Patient help with HTML, CSS, JavaScript, debugging, and preparing coursework demonstrations.",
    extra_one: "On campus or remote",
    extra_two: "Weekdays after 4 PM",
    image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
    status: "Available",
    created_at: "2026-07-12T13:00:00Z"
  },
  {
    id: "sample-textbook",
    owner_id: null,
    owner_name: "Nina Tan",
    owner_faculty: "Business",
    title: "Introduction to Programming Textbook",
    type: "Learning",
    category: "Textbooks",
    offer_method: "Lend physical copy",
    price_label: "฿120",
    description: "A physical introductory programming textbook in good condition with a few helpful annotations.",
    extra_one: "Physical book",
    extra_two: "Introduction to Programming",
    image_url: "https://images.unsplash.com/photo-1535905496755-26ae35d0ae54?auto=format&fit=crop&w=1000&q=85",
    status: "Reserved",
    created_at: "2026-07-11T10:00:00Z"
  },
  {
    id: "sample-microphone",
    owner_id: null,
    owner_name: "Prae L.",
    owner_faculty: "Communication Arts",
    title: "USB Microphone",
    type: "Equipment",
    category: "Audio equipment",
    offer_method: "Rent for a fee",
    price_label: "฿50/day",
    description: "USB condenser microphone for podcasts, presentations, and voice recordings.",
    extra_one: "Weekend",
    extra_two: "Building 15",
    image_url: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1000&q=85",
    status: "Available",
    created_at: "2026-07-10T08:00:00Z"
  }
];

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function getProfile(userId) {
  if (!userId) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("id,display_name,faculty,avatar_url,bio,year_of_study,campus_location,availability,interests,role,created_at")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchListings(options = {}) {
  let query = supabase
    .from("listings")
    .select("id,owner_id,title,type,category,offer_method,price_label,description,extra_one,extra_two,image_url,image_urls,status,reviewed_at,created_at,profiles!listings_owner_id_fkey(display_name,faculty,avatar_url)")
    .order("created_at", { ascending: false });

  if (!options.includePrivate) query = query.in("status", ["Available", "Reserved"]);
  if (options.ownerId) query = query.eq("owner_id", options.ownerId);
  if (options.type && options.type !== "All") query = query.eq("type", options.type);
  if (options.status && options.status !== "All") query = query.eq("status", options.status);

  const { data, error } = await query;
  if (error) {
    console.warn("RSU Nexus is using preview listings because live listings could not be loaded.", error.message);
    return options.ownerId ? [] : sampleListings;
  }

  const normalized = (data || []).map(normalizeListing);
  return normalized.length || options.ownerId ? normalized : sampleListings;
}

export async function fetchListing(id) {
  if (!id) return null;
  if (id.startsWith("sample-")) return sampleListings.find((item) => item.id === id) || null;

  const { data, error } = await supabase
    .from("listings")
    .select("id,owner_id,title,type,category,offer_method,price_label,description,extra_one,extra_two,image_url,image_urls,status,reviewed_at,created_at,profiles!listings_owner_id_fkey(display_name,faculty,avatar_url)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? normalizeListing(data) : null;
}

export function normalizeListing(item) {
  const profile = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles;
  const imageUrls = Array.isArray(item.image_urls) && item.image_urls.length
    ? item.image_urls.filter(Boolean).slice(0, 5)
    : item.image_url ? [item.image_url] : [];
  return {
    ...item,
    category: formatCategoryLabel(item.category),
    image_url: item.image_url || imageUrls[0] || null,
    image_urls: imageUrls,
    owner_name: profile?.display_name || item.owner_name || "RSU Nexus member",
    owner_faculty: profile?.faculty || item.owner_faculty || "RSU community",
    owner_avatar: profile?.avatar_url || item.owner_avatar || null
  };
}

export function formatCategoryLabel(value) {
  return String(value || "").replace(/\s*\([^)]*\)\s*$/, "").trim();
}

export function listingUrl(id) {
  return `listing-detail.html?id=${encodeURIComponent(id)}`;
}

export function pageUrl(page, params = {}) {
  const path = `${page}.html`;
  const query = new URLSearchParams(params).toString();
  return query ? `${path}?${query}` : path;
}

export function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;"
  })[character]);
}

export function formatDate(value) {
  if (!value) return "Recently";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}

export function formatPriceLabel(value, fallback = "Free") {
  let label = String(value ?? "").trim();
  if (!label) return fallback;
  label = label.replace(/\bthb\b/gi, "Baht").replace(/\bbaht\b/gi, "Baht");
  label = label.replace(/฿\s*([\d,.]+)/g, "$1 Baht");
  if (/\bBaht\b/.test(label) || !/^\d/.test(label)) return label;
  const match = label.match(/^([\d,.]+)(.*)$/);
  return match ? `${match[1]} Baht${match[2]}` : label;
}

export function initials(name = "RS") {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "RS";
}

export function setStatus(element, message, type = "info") {
  if (!element) return;
  element.textContent = message;
  element.className = `notice notice--${type}`;
  element.hidden = !message;
}

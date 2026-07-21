import { getProfile, getSession, setStatus, supabase } from "./supabase-client.js?v=20260720-4";

const form = document.querySelector("[data-auth-form]");
const modeButtons = document.querySelectorAll("[data-auth-mode]");
const tabs = document.querySelector(".auth-tabs");
const signupFields = document.querySelector("[data-signup-fields]");
const emailField = document.querySelector("[data-email-field]");
const passwordField = document.querySelector("[data-password-field]");
const confirmPasswordField = document.querySelector("[data-confirm-password-field]");
const title = document.querySelector("[data-auth-title]");
const copy = document.querySelector("[data-auth-copy]");
const submitButton = document.querySelector("[data-auth-submit]");
const status = document.querySelector("[data-auth-status]");
const passwordInput = document.querySelector("[data-password-input]");
const passwordConfirmation = document.querySelector("[data-password-confirmation]");
const passwordToggle = document.querySelector("[data-password-toggle]");
const forgotPassword = document.querySelector("[data-forgot-password]");
const backToSignIn = document.querySelector("[data-back-to-signin]");
const requestedMode = new URLSearchParams(location.search).get("mode");
let mode = requestedMode === "recovery" ? "recovery-update" : "signin";

function explicitDestination() {
  const value = new URLSearchParams(location.search).get("redirect");
  if (!value) return null;
  try {
    const target = new URL(value, location.origin);
    if (target.origin !== location.origin) return null;
    return `${target.pathname}${target.search}${target.hash}`;
  } catch {
    return null;
  }
}

async function destinationForSession(session) {
  const requested = explicitDestination();
  if (requested) return requested;
  const profile = await getProfile(session.user.id);
  return profile?.role === "admin" ? "admin.html" : "profile.html";
}

function setMode(nextMode) {
  mode = nextMode;
  const isSignup = mode === "signup";
  const isResetRequest = mode === "recovery-request";
  const isResetUpdate = mode === "recovery-update";

  modeButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.authMode === mode));
  tabs.hidden = isResetRequest || isResetUpdate;
  signupFields.hidden = !isSignup;
  emailField.hidden = isResetUpdate;
  passwordField.hidden = isResetRequest;
  confirmPasswordField.hidden = !isResetUpdate;
  forgotPassword.hidden = mode !== "signin";
  backToSignIn.hidden = !(isResetRequest || isResetUpdate);

  const content = {
    signin: ["Welcome back.", "Sign in to manage your profile, listings, and messages.", "Sign in →"],
    signup: ["Create your profile.", "Your public profile starts with the information below.", "Create profile →"],
    "recovery-request": ["Reset your password.", "Enter your RSU email and we will send you a secure recovery link.", "Send reset link →"],
    "recovery-update": ["Choose a new password.", "Use at least 6 characters, then sign in with your new password.", "Update password →"]
  }[mode];
  [title.textContent, copy.textContent, submitButton.textContent] = content;

  const emailInput = form.elements.email;
  emailInput.required = !isResetUpdate;
  passwordInput.required = !isResetRequest;
  passwordConfirmation.required = isResetUpdate;
  passwordInput.autocomplete = mode === "signin" ? "current-password" : "new-password";
  passwordField.firstChild.textContent = isResetUpdate ? "New password\n              " : "Password\n              ";
  setStatus(status, "");
}

function togglePasswordVisibility() {
  const showing = passwordInput.type === "text";
  passwordInput.type = showing ? "password" : "text";
  passwordToggle.setAttribute("aria-pressed", String(!showing));
  passwordToggle.setAttribute("aria-label", showing ? "Show password" : "Hide password");
  passwordToggle.querySelector("[data-eye-open]").toggleAttribute("hidden", !showing);
  passwordToggle.querySelector("[data-eye-closed]").toggleAttribute("hidden", showing);
  passwordInput.focus({ preventScroll: true });
  const end = passwordInput.value.length;
  passwordInput.setSelectionRange(end, end);
}

async function submitAuth(event) {
  event.preventDefault();
  const data = new FormData(form);
  const email = String(data.get("email") || "").trim().toLowerCase();
  const password = String(data.get("password") || "");
  const confirmation = String(data.get("password_confirmation") || "");
  const displayName = String(data.get("display_name") || "").trim();
  const faculty = String(data.get("faculty") || "").trim();

  if (mode === "recovery-request") {
    if (!email.endsWith("@rsu.ac.th")) {
      setStatus(status, "Enter your RSU university email ending in @rsu.ac.th.", "error");
      return;
    }
  } else if (mode === "recovery-update") {
    if (password.length < 6 || password !== confirmation) {
      setStatus(status, "Use at least 6 characters and make sure both passwords match.", "error");
      return;
    }
  } else {
    if (mode === "signup" && !displayName) {
      setStatus(status, "Add the name you want other students to see.", "error");
      return;
    }
    if (mode === "signup" && !email.endsWith("@rsu.ac.th")) {
      setStatus(status, "Use your RSU university email ending in @rsu.ac.th.", "error");
      return;
    }
    if (!email.includes("@") || password.length < 6) {
      setStatus(status, "Enter a valid university email and a password with at least 6 characters.", "error");
      return;
    }
  }

  submitButton.disabled = true;
  const progressCopy = mode === "signin" ? "Signing you in…" : mode === "signup" ? "Creating your account…" : mode === "recovery-request" ? "Sending your reset link…" : "Updating your password…";
  setStatus(status, progressCopy);

  try {
    if (mode === "recovery-request") {
      const redirectTo = `${location.origin}${location.pathname}?mode=recovery`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) throw error;
      setStatus(status, "Check your inbox for the password reset link.", "success");
      return;
    }

    if (mode === "recovery-update") {
      const { data: result, error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setStatus(status, "Password updated. Opening your RSU Nexus account…", "success");
      const session = await getSession();
      if (session || result.user) location.replace(await destinationForSession(session || { user: result.user }));
      return;
    }

    let session;
    if (mode === "signup") {
      const { data: result, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName, faculty } }
      });
      if (error) throw error;
      if (!result.session) {
        setStatus(status, "Check your inbox to confirm your account, then return here to sign in.", "success");
        return;
      }
      session = result.session;
    } else {
      const { data: result, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      session = result.session;
    }
    location.href = await destinationForSession(session);
  } catch (error) {
    setStatus(status, error.message, "error");
  } finally {
    submitButton.disabled = false;
  }
}

async function redirectSignedInUser() {
  if (mode === "recovery-request" || mode === "recovery-update") return;
  const session = await getSession();
  if (session) location.replace(await destinationForSession(session));
}

export async function requireSession(redirect = location.href) {
  const session = await getSession();
  if (!session) {
    location.href = `login.html?redirect=${encodeURIComponent(redirect)}`;
    return null;
  }
  return session;
}

export async function isAdmin() {
  const session = await getSession();
  if (!session) return false;
  const profile = await getProfile(session.user.id);
  return profile?.role === "admin";
}

modeButtons.forEach((button) => button.addEventListener("click", () => setMode(button.dataset.authMode)));
passwordToggle?.addEventListener("click", togglePasswordVisibility);
forgotPassword?.addEventListener("click", () => setMode("recovery-request"));
backToSignIn?.addEventListener("click", () => {
  history.replaceState({}, "", location.pathname);
  setMode("signin");
});
form?.addEventListener("submit", submitAuth);
supabase.auth.onAuthStateChange((event) => {
  if (event === "PASSWORD_RECOVERY") setMode("recovery-update");
});

setMode(mode);
void redirectSignedInUser();

const form = document.getElementById("form");
const input = document.getElementById("url");
const save = document.getElementById("save");
const hint = document.getElementById("hint");
const enabled = document.getElementById("enabled");
const toggleLabel = document.getElementById("toggleLabel");
const stat = document.getElementById("stat");

// Localize static markup via chrome.i18n. Elements carry data-i18n="<key>".
function applyI18n() {
  for (const el of document.querySelectorAll("[data-i18n]")) {
    const msg = chrome.i18n.getMessage(el.dataset.i18n);
    if (msg) el.textContent = msg;
  }
  const dir = chrome.i18n.getMessage("@@bidi_dir");
  if (dir) document.documentElement.dir = dir;
}
applyI18n();

// Standard host shapes: RFC-1123 domain with a real TLD, IPv4 literal, or localhost.
const DOMAIN_RE =
  /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,63}|xn--[a-z0-9-]{2,59})$/i;
const IPV4_RE =
  /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/;

function isAcceptableHost(host) {
  return host === "localhost" || DOMAIN_RE.test(host) || IPV4_RE.test(host);
}

function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (!isAcceptableHost(url.hostname)) return null;
    return url.href;
  } catch {
    return null;
  }
}

function refreshValidity() {
  const valid = normalizeUrl(input.value) !== null;
  save.disabled = !valid;
  hint.hidden = valid || input.value.trim() === "";
  return valid;
}

function renderEnabled(isOn) {
  enabled.checked = isOn;
  document.body.classList.toggle("paused", !isOn);
  toggleLabel.textContent = chrome.i18n.getMessage(
    isOn ? "toggleOn" : "toggleOff",
  );
}

function renderCount(count) {
  if (!count) {
    stat.textContent = chrome.i18n.getMessage("statZero");
    return;
  }
  // The bold count is passed as the substitution so each locale controls
  // where the number sits in the sentence.
  stat.innerHTML = chrome.i18n.getMessage("statCount", `<b>${count}</b>`);
}

chrome.storage.sync.get(
  { redirectUrl: DEFAULT_REDIRECT_URL, enabled: true },
  (data) => {
    input.value = data.redirectUrl;
    renderEnabled(data.enabled);
    refreshValidity();
  },
);

chrome.storage.local.get({ redirectCount: 0 }, (data) => {
  renderCount(data.redirectCount);
});

// Keep the counter live if a redirect happens while the popup is open.
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.redirectCount) {
    renderCount(changes.redirectCount.newValue);
  }
});

enabled.addEventListener("change", () => {
  const isOn = enabled.checked;
  renderEnabled(isOn);
  chrome.storage.sync.set({ enabled: isOn });
});

input.addEventListener("input", refreshValidity);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const normalized = normalizeUrl(input.value);
  if (!normalized) {
    refreshValidity();
    return;
  }
  input.value = normalized;
  chrome.storage.sync.set({ redirectUrl: normalized }, () => {
    save.textContent = chrome.i18n.getMessage("btnSaved");
    save.classList.add("saved");
    setTimeout(() => {
      save.textContent = chrome.i18n.getMessage("btnSave");
      save.classList.remove("saved");
    }, 1500);
  });
});

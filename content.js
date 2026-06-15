function redirectIfHome() {
  if (location.pathname !== "/") return;
  chrome.storage.sync.get(
    { redirectUrl: DEFAULT_REDIRECT_URL, enabled: true },
    (data) => {
      if (!data.enabled) return;
      const target = data.redirectUrl;
      if (!target || location.pathname !== "/" || target === location.href) {
        return;
      }
      // Bump the counter first, then redirect, so the write isn't lost when
      // the page unloads. storage.local keeps this off the sync quota.
      chrome.storage.local.get({ redirectCount: 0 }, (local) => {
        chrome.storage.local.set(
          { redirectCount: local.redirectCount + 1 },
          () => location.replace(target),
        );
      });
    },
  );
}

redirectIfHome();
window.addEventListener("yt-navigate-finish", redirectIfHome);
window.addEventListener("popstate", redirectIfHome);

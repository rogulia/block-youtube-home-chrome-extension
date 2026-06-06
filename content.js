function redirectIfHome() {
  if (location.pathname !== "/") return;
  chrome.storage.sync.get({ redirectUrl: DEFAULT_REDIRECT_URL }, (data) => {
    const target = data.redirectUrl;
    if (target && location.pathname === "/" && target !== location.href) {
      location.replace(target);
    }
  });
}

redirectIfHome();
window.addEventListener("yt-navigate-finish", redirectIfHome);

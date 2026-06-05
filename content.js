chrome.storage.sync.get(
  { redirectUrl: "https://app.todoist.com/app/today" },
  (data) => {
    if (
      location.hostname === "www.youtube.com" &&
      location.pathname === "/"
    ) {
      location.replace(data.redirectUrl);
    }
  }
);

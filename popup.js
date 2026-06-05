const input = document.getElementById("url");
const save = document.getElementById("save");

chrome.storage.sync.get(
  { redirectUrl: "https://app.todoist.com/app/today" },
  (data) => {
    input.value = data.redirectUrl;
  }
);

save.onclick = () => {
  chrome.storage.sync.set({ redirectUrl: input.value.trim() }, () => {
    save.textContent = "Saved ✓";
    save.classList.add("saved");
    setTimeout(() => {
      save.textContent = "Save";
      save.classList.remove("saved");
    }, 1500);
  });
};

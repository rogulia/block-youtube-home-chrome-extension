# Chrome Web Store listing

Reference text for the store listing. Not used by the extension — paste these
into the Developer Dashboard when publishing.

## Name

YouTube Home Blocker — Redirect & Focus

## Short description (max 132 chars)

Redirect the YouTube homepage to any URL and skip the endless feed. Search and videos keep working.

## Full description

```
Block YouTube Home removes the biggest distraction on YouTube — the
recommendations feed on the homepage — without breaking the rest of the site.

The moment you open youtube.com, you're redirected to a page of your choice
(your task list, calendar, a blank page — anything). Search, video pages,
subscriptions and history all keep working normally.

FEATURES
• Redirect the YouTube homepage to any URL you set
• Default redirect to your Todoist Today view — change it in one click
• Lightweight: no tracking, no accounts, no data leaves your browser
• Your setting syncs across your Chrome browsers

HOW IT WORKS
1. Click the extension icon
2. Enter the URL you want to land on instead of the YouTube feed
3. Save — that's it

Your redirect URL is stored only in Chrome's sync storage and is never sent
anywhere.

Made by Iurii Rogulia — https://iurii.rogulia.fi/projects/block-youtube-home
```

## Privacy / permissions justification

- **storage** — saves the user's chosen redirect URL in `chrome.storage.sync`.
- **host access to www.youtube.com** — the content script must run on YouTube to
  detect the homepage and redirect it.
- No data is collected, transmitted, or shared. The redirect URL never leaves the
  browser.

## Assets checklist

- [ ] Icon 128×128 (have: `icons/icon128.png`)
- [ ] At least one screenshot, 1280×800 or 640×400 (e.g. the popup)
- [ ] Category: Productivity

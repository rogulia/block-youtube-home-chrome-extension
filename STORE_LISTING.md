# Chrome Web Store listing

Reference text for the store listing. Not used by the extension — paste these
into the Developer Dashboard when publishing.

## Name

YouTube Home Blocker — Redirect & Focus

## Short description (max 132 chars)

Block the YouTube homepage feed and redirect it to any URL. Stop endless scrolling and stay focused — search & videos still work.

> Note: the name + short description are now localized in `_locales/*/messages.json`
> and are applied automatically by Chrome per the user's browser language (with
> fallback to English). The **full description and screenshots below are NOT in the
> repo** — paste them per-language in the Developer Dashboard. Localized full
> descriptions are optional; English is the fallback.

### Localized name / short description (already in `_locales/`)

| Locale | Folder    |
| ------ | --------- |
| English (default) | `_locales/en` |
| Russian  | `_locales/ru` |
| German   | `_locales/de` |
| Spanish  | `_locales/es` |
| Italian  | `_locales/it` |
| Portuguese (Brazil) | `_locales/pt_BR` |
| Portuguese (Portugal) | `_locales/pt_PT` |
| Chinese (Simplified) | `_locales/zh_CN` |
| Arabic   | `_locales/ar` |
| Hindi    | `_locales/hi` |

## Full description

```
Block the YouTube homepage feed and take back your focus.

The YouTube home feed — the endless wall of recommendations — is the single
biggest time-sink on the site. YouTube Home Blocker removes it without breaking
anything else. The moment you open youtube.com, you're redirected to a page of
your choice: your task list, calendar, dashboard, or a blank page. Search, video
pages, subscriptions and watch history all keep working exactly as normal.

If you want to stop endless scrolling, avoid YouTube distractions, and use
YouTube intentionally instead of falling into the recommendations rabbit hole,
this is the lightest possible way to do it.

FEATURES
• Block the YouTube homepage feed and redirect it to any URL you set
• Search, videos, subscriptions and history stay completely untouched
• One-click on/off toggle in the toolbar popup when you want the feed back
• A counter shows how many times it sent you back to focus
• Default redirect to your Todoist Today view — change it in one click
• Lightweight: no tracking, no accounts, no analytics, no data leaves your browser
• Your settings sync across every Chrome browser you're signed into

HOW IT WORKS
1. Click the extension icon
2. Enter the URL you want to land on instead of the YouTube feed
3. Save — that's it

The redirect runs before the homepage renders, so you never even see the feed
load. Your redirect URL is stored only in Chrome's sync storage and is never
sent anywhere.

Keywords: block youtube homepage, remove youtube feed, hide youtube home,
youtube distraction blocker, stop youtube recommendations, youtube focus,
productivity, digital wellbeing.

Open source (MIT). Made by Iurii Rogulia — https://iurii.rogulia.fi/projects/block-youtube-home
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

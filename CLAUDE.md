# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

"YouTube Home Blocker — Redirect & Focus" is a Manifest V3 Chrome extension that
redirects the YouTube homepage (`https://www.youtube.com/`) to a user-configurable
URL (default: Todoist Today). It exists to remove the YouTube home feed as a
distraction while leaving the rest of YouTube (search, video pages, etc.) usable.

There is no build step, package manager, test suite, or external dependencies —
the extension is plain JS/HTML loaded directly by Chrome.

## Development

- **Load locally:** `chrome://extensions` → enable Developer mode → "Load unpacked" → select this directory.
- **Apply changes:** after editing files, click the reload icon on the extension card in `chrome://extensions`. For `content.js` changes, also reload the YouTube tab.
- **Bump `version` in `manifest.json`** when packaging a new release.
- **Package for the store:** zip the file contents (not the parent folder) — `manifest.json`, `constants.js`, `content.js`, `popup.html`, `popup.js`, the `icons/` directory, and the `_locales/` directory. Omitting `_locales/` will break the localized name/description (and fail validation, since `manifest.json` uses `__MSG_…__` placeholders with `default_locale`).

## Icons

`manifest.json` references `icons/icon{16,32,48,128}.png` for both the toolbar
action and the store listing. All four PNGs must exist or the extension/store
upload will fail. 128×128 is the required store icon.

## Architecture

State is split across two storage areas:

- `chrome.storage.sync` (synced, user prefs): `redirectUrl` and `enabled`
  (the on/off toggle, default `true`).
- `chrome.storage.local` (device-local, frequent writes): `redirectCount` — kept
  off the sync write quota because it updates on every redirect.

The moving parts:

- `content.js` — content script injected into all youtube.com pages at
  `document_start`. It reads `redirectUrl`/`enabled` and, **only when the path is
  exactly `/`** and `enabled` is true, increments `redirectCount` in
  `storage.local` and then calls `location.replace()`. The counter write is
  nested in the `storage.local.set` callback so it completes before the page
  unloads. The early `run_at` and the exact-path guard are deliberate: they
  redirect the home feed before it renders without breaking any other YouTube
  page. It also re-runs the check on YouTube's `yt-navigate-finish` and
  `popstate` events so in-app navigation to `/` (e.g. clicking the logo) is
  caught, and skips the redirect when the target equals the current URL to
  avoid loops.
- `popup.html` / `popup.js` — the toolbar popup UI. Loads the current
  `redirectUrl` into the input and writes it back to `chrome.storage.sync` on
  Save. The input is validated/normalized (schemeless entries get `https://`;
  only http(s) is accepted) and Save stays disabled until the value is valid.
  An on/off switch writes `enabled` to `storage.sync` (and dims the form when
  paused), and a stat line renders `redirectCount`, kept live via a
  `chrome.storage.onChanged` listener.

The default redirect URL (`https://app.todoist.com/app/today`) lives in
`constants.js` as `DEFAULT_REDIRECT_URL`, shared by both `content.js` and
`popup.js`. Change it there.

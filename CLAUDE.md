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
- **Package for the store:** zip the file contents (not the parent folder) — `manifest.json`, `content.js`, `popup.html`, `popup.js`, and the `icons/` directory.

## Icons

`manifest.json` references `icons/icon{16,32,48,128}.png` for both the toolbar
action and the store listing. All four PNGs must exist or the extension/store
upload will fail. 128×128 is the required store icon.

## Architecture

Three moving parts share one piece of state — the `redirectUrl` key in
`chrome.storage.sync`:

- `content.js` — content script injected into all youtube.com pages at
  `document_start`. It reads `redirectUrl` and, **only when the path is exactly
  `/`**, calls `location.replace()`. The early `run_at` and the exact-path guard
  are deliberate: they redirect the home feed before it renders without breaking
  any other YouTube page.
- `popup.html` / `popup.js` — the toolbar popup UI. Loads the current
  `redirectUrl` into the input and writes it back to `chrome.storage.sync` on
  Save.

The default redirect URL (`https://app.todoist.com/app/today`) is duplicated as a
literal in both `content.js` and `popup.js`. Keep the two in sync when changing
the default.

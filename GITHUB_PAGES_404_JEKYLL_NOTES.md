# GitHub Pages 404 Not Working (Jekyll) — Problem & Potential Solutions

## Problem summary
A custom `404.html` exists, but GitHub Pages appears to show the default 404 behavior or page assets/navigation break when visiting unknown URLs.

## Why this usually happens

### 1) Wrong path style for project sites
If this is a **project site** (`https://username.github.io/repo-name/`), URLs starting with `/` are rooted at `https://username.github.io/`, not your repo path.

Examples that break on project sites:
- `/pages/index_de.html`
- `/assets/css/agency.css`
- `/assets/js/custom.js`

This often makes the 404 page seem broken because CSS/JS/links resolve outside the project path.

### 2) Jekyll base path not used
In Jekyll repos, links should usually respect `site.baseurl` so they work in both local and GitHub Pages environments.

### 3) 404 page not in publish root
GitHub Pages only serves a custom 404 when `404.html` is in the final published root.

### 4) Testing method confusion
Opening `/404.html` directly returns `200` (expected). A real 404 is only triggered on a non-existent route.

---

## Potential solutions

## A) Use Jekyll-aware URLs (recommended)
Use Jekyll URL filters so links include `baseurl` automatically.

Pattern:
- `{{ '/assets/css/agency.css' | relative_url }}`
- `{{ '/pages/index_de.html' | relative_url }}`

If you use `absolute_url`, ensure `url` and `baseurl` are correctly configured.

## B) Configure `_config.yml` correctly
For project site:
- `url: "https://username.github.io"`
- `baseurl: "/repo-name"`

For user/organization site (`username.github.io`):
- `url: "https://username.github.io"`
- `baseurl: ""`

Then rebuild/redeploy.

## C) Ensure `404.html` is generated at root
In Jekyll, keep `404.html` at repo root (or ensure build output places it at site root). 

A common safe front matter pattern:

```yaml
---
layout: default
permalink: /404.html
---
```

This ensures the final route is exactly `/404.html`.

## D) Replace root-absolute links if not templated
If the page is plain HTML (not templated by Jekyll), avoid `/...` on project sites.
Use:
- relative paths (`assets/...`, `pages/...`)
- or manually prefix repo path (`/repo-name/assets/...`)

## E) Validate with a true missing URL
Test with a random non-existent path, for example:
- `/this-page-should-not-exist-12345`

On project sites, test under the repo base:
- `/repo-name/this-page-should-not-exist-12345`

---

## Quick migration checklist for the other Jekyll repo
- [ ] Confirm site type: user site vs project site
- [ ] Set `url` + `baseurl` in `_config.yml`
- [ ] Update links/scripts/styles to `relative_url` (or proper relative paths)
- [ ] Keep `404.html` permalinked to `/404.html`
- [ ] Deploy and test with a non-existent URL
- [ ] Hard refresh browser/CDN cache after deploy

## Notes
- GitHub Pages deploys can take a short time before changes appear.
- If a SPA/router is used, 404 behavior may differ and may need router fallback handling.

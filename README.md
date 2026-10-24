# Earth Systems Arcade

One free website that launches all of Dougalien Systems' geoscience apps and games.

- **Browser games** (Lithonaut, Solar System Adventure) live in `games/` and run directly on this site.
- **Browser apps** (3D Structural Geology Explorer) live in `apps/` and also run directly on this site.
- **Streamlit apps** (Quake, River Explorer, Resource Horizon, Hydrotherm, The Rock Cycle, TraceCode, Spectrum Earth, Paleo Diet Cruncher) each run on Streamlit Community Cloud from their own GitHub repo. The launcher links out to them.
- Every tool has a short guide in `guides/<slug>/index.html`, linked from the **Guide** button beside **Open** here and on dougalien.com. Its short link is `https://<site>/<slug>/guide`.
- Every tool gets a short link, `https://<site>/<slug>` (for example `/quake`), to paste into a Canvas page. If an app's Streamlit address ever changes, update `tools.json` and the Canvas links keep working.

## Add a new tool

1. Open `tools.json` and copy one of the entries.
2. Fill in `slug` (short, lowercase, hyphens), `name`, `summary`, `topics` and `status` (`ready` or `not online yet`).
3. For a Streamlit app, set `"kind": "streamlit"` and put its `.streamlit.app` address in `url`.
   For a browser game, set `"kind": "game"`, make a folder `games/<slug>/` holding the game as `index.html` plus any files it loads, and set `"path": "games/<slug>/"`.
   For a browser app, do the same with `"kind": "app"` and a folder in `apps/`.
4. Write a guide: copy a folder in `guides/` to `guides/<slug>/`, edit the text in its `index.html`, and set `"guide": "guides/<slug>/"`.
5. Commit and push. Netlify rebuilds the site in about a minute.

## Update an existing tool

- **Streamlit app:** push to that app's own repo. Streamlit Cloud redeploys it, and nothing here needs to change.
- **Browser game or app:** copy the new file over `games/<slug>/index.html` (or `apps/<slug>/index.html`), then commit and push.

## Preview on your computer

The launcher reads `tools.json`, which browsers block when you double-click `index.html`. From this folder, run:

```
py -m http.server 8000
```

Then open http://localhost:8000.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The launcher page |
| `tools.json` | The list of tools, the only file you edit to add a tool |
| `games/` | The browser games, one folder each |
| `guides/` | A short how-to page for each tool, plus `guide.css` they share |
| `apps/` | Browser apps that run on this site, one folder each |
| `scripts/build-redirects.mjs` | Makes the short links from `tools.json` on every Netlify build |
| `netlify.toml` | Tells Netlify how to build the site |

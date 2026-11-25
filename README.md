# Chunxiang Jin — Academic homepage

Live site: https://kingmpw2015.github.io/

A responsive, bilingual academic homepage built with plain HTML, CSS, and JavaScript. No runtime dependencies, analytics, cookies, or external font requests. Publications remain readable with JavaScript disabled.

## Update content

- Edit `data/publications.json` to update publications, author lists, venues, and paper/code links.
- Edit `template.html` to update English biography, affiliations, links, and Scholar metrics.
- Edit the `zh` dictionary in `assets/main.js` to update Chinese translations.
- Run `python3 build.py` after editing publication data or the template; commit the generated `index.html` too.
- Replace or extend `assets/style.css` for visual changes.

Preview locally: `python3 -m http.server 8765 --bind 127.0.0.1`, then open http://127.0.0.1:8765/.

## Hosting

GitHub Pages publishes from the `main` branch, repository root. `.nojekyll` disables Jekyll processing. Changes committed to `main` are deployed by GitHub Pages. No separate build action is required.

## Sources and editorial choices

- Primary source: https://scholar.google.com/citations?user=cy7ml6kAAAAJ&hl=en&pagesize=100
- Retrieved November 25, 2026. Google Scholar reports 209 citations, h-index 8, i10-index 6. These are a dated snapshot, not live counters or sums computed from the displayed bibliography.
- Name and affiliation follow Scholar (`Chunxiang Jin`, `ant financial`). The biography and research themes are editorial summaries inferred from the listed publications, not a supplied CV. No degree, job title, career dates, full email address, or personal portrait was supplied; none is invented.
- The 21 Scholar entries are consolidated into 16 publications: repeated arXiv IDs for Ming-Omni, Ming-UniAudio, and Ming-Flash-Omni are combined; the SPRI preprint is associated with its matching conference entry. Author lists retain Scholar abbreviations/truncation. Potentially related emotion-recognition papers with different titles and identifiers remain separate.
- Ming-Omni and Ming-UniAudio descriptions were cross-checked against https://arxiv.org/abs/2506.09344 and https://arxiv.org/abs/2511.05516. Other bibliographic details follow Scholar; preprints are labeled arXiv, not represented as peer-reviewed papers.
- Verified project links: https://github.com/inclusionAI/Ming and https://github.com/inclusionAI/Ming-UniAudio.

The abstract waveform illustration is an original SVG, not experimental data. Update the snapshot date and metrics together when refreshing the profile.

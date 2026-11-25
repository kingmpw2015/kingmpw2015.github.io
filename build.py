"""Render publication data into accessible, search-indexable static HTML."""
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
data = json.loads((ROOT / 'data/publications.json').read_text())
articles = []
for paper in data['publications']:
    esc = html.escape
    authors = esc(paper['authors']).replace('C Jin', '<strong>C Jin</strong>')
    search_text = esc(' '.join(str(paper[key]) for key in ('title', 'authors', 'venue', 'year')).lower(), quote=True)
    links = f'<a href="{esc(paper["paper"], quote=True)}" target="_blank" rel="noopener noreferrer" data-i18n="paper">Paper</a>'
    if paper.get('code'):
        links += f'<a href="{esc(paper["code"], quote=True)}" target="_blank" rel="noopener noreferrer" data-i18n="code">Code</a>'
    articles.append(f'''<article class="publication" data-year="{paper['year']}" data-search="{search_text}">
        <div class="pub-year">{paper['year']}</div>
        <div class="pub-body"><h3><a href="{esc(paper['paper'], quote=True)}" target="_blank" rel="noopener noreferrer">{esc(paper['title'])}</a></h3>
        <p class="pub-authors">{authors}</p><div class="pub-meta"><span class="pub-venue">{esc(paper['venue'])}</span><span class="pub-links">{links}</span></div></div>
      </article>''')
template = (ROOT / 'template.html').read_text()
assert template.count('{{PUBLICATIONS}}') == 1
(ROOT / 'index.html').write_text(template.replace('{{PUBLICATIONS}}', '\n'.join(articles)))
print(f'Rendered {len(articles)} publications to index.html')

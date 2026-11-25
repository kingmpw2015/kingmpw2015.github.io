'use strict';
const zh = {
  viewPublications:'查看全部论文',skip:'跳转到正文',aboutNav:'关于',researchNav:'研究方向',pubNav:'学术论文',heroLabel:'语音 · 音频 · 多模态学习',academicProfile:'个人学术主页',
  intro:'我的研究关注机器如何理解与生成语音、音频及多模态内容。',
  bio:'研究工作涵盖统一语音语言模型、可控语音合成、语音情感识别与口语对话系统，并参与 Ming 系列多模态模型的合作研究。',
  scholarSnapshot:'Google Scholar 学术指标',asOf:'截至 2026 年 11 月 25 日',citations:'引用次数',liveProfile:'查看最新学术档案',
  researchLabel:'研究方向',researchTitle:'从感知到生成。',researchNote:'围绕已发表工作展开的主要研究主题。',
  audioTitle:'统一音频智能',audioText:'探索面向语音理解、生成与指令驱动编辑的统一表示。',
  multiTitle:'多模态学习',multiText:'融合语言、视觉与音频，实现统一的多模态感知与生成。',
  speechTitle:'表现力语音与对话',speechText:'研究可控语音合成、稳健的情感识别与自然对话交互。',explorePapers:'查看相关论文',
  pubLabel:'学术论文与预印本',pubTitle:'学术论文',allOnScholar:'在 Google Scholar 查看全部记录',
  pubNote:'收录期刊、会议论文与 arXiv 预印本；重复记录已合并，作者列表沿用 Google Scholar 展示格式。',
  allYears:'全部年份',earlier:'更早',searchLabel:'搜索论文',noResults:'没有找到符合条件的论文。',reset:'重置筛选',paper:'论文',code:'代码',
  connectLabel:'了解更多',connectTitle:'论文、代码与交流。',connectText:'通过 Google Scholar 了解我的研究，通过 GitHub 探索开源工作。',
  footer:'更新于 2026 年 11 月 26 日 · 托管于 GitHub Pages'
};
const nodes = [...document.querySelectorAll('[data-i18n]')];
const en = Object.fromEntries(nodes.map(node => [node.dataset.i18n, node.textContent]));
const publications = [...document.querySelectorAll('.publication')];
const search = document.querySelector('#search');
const languageButton = document.querySelector('#language');
let language = 'en';
let year = 'all';
function filterPublications() {
  const query = search.value.trim().toLocaleLowerCase();
  let count = 0;
  for (const publication of publications) {
    const matchesYear = year === 'all' || (year === 'earlier' ? Number(publication.dataset.year) < 2025 : publication.dataset.year === year);
    const matchesQuery = publication.dataset.search.includes(query);
    publication.hidden = !(matchesYear && matchesQuery);
    if (!publication.hidden) count++;
  }
  document.querySelector('#result-count').textContent = language === 'zh' ? `显示 ${count} / ${publications.length} 篇论文` : `Showing ${count} of ${publications.length} publications`;
  document.querySelector('#empty').hidden = count !== 0;
}
function setLanguage(value) {
  language = value === 'zh' ? 'zh' : 'en';
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  for (const node of nodes) node.textContent = (language === 'zh' ? zh : en)[node.dataset.i18n] || en[node.dataset.i18n];
  languageButton.textContent = language === 'zh' ? 'EN' : '中文';
  languageButton.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
  search.placeholder = language === 'zh' ? '搜索标题、作者、会议或期刊…' : 'Search title, author, venue…';
  document.querySelector('nav').setAttribute('aria-label', language === 'zh' ? '主导航' : 'Main navigation');
  document.querySelector('.year-filters').setAttribute('aria-label', language === 'zh' ? '按年份筛选论文' : 'Filter publications by year');
  document.title = language === 'zh' ? 'Chunxiang Jin | 个人学术主页' : 'Chunxiang Jin | Academic Homepage';
  try { localStorage.setItem('academic-language', language); } catch { /* Storage is optional. */ }
  filterPublications();
}
languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
document.querySelectorAll('[data-year]').forEach(button => {
  if (button.tagName !== 'BUTTON') return;
  button.addEventListener('click', () => {
    year = button.dataset.year;
    document.querySelectorAll('.year-filters button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filterPublications();
  });
});
search.addEventListener('input', filterPublications);
document.querySelector('#reset').addEventListener('click', () => {
  search.value = '';
  document.querySelector('.year-filters [data-year="all"]').click();
  search.focus();
});
document.querySelector('#filters').hidden = false;
let preferredLanguage = 'en';
try { preferredLanguage = localStorage.getItem('academic-language') || 'en'; } catch { /* Keep English default. */ }
setLanguage(preferredLanguage);

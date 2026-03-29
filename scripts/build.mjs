import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const root = process.cwd();
const contentDir = path.join(root, 'content');
const distDir = path.join(root, 'dist');

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.md')).sort();
const pages = files.map((file) => {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
  const { data, content } = matter(raw);
  const title = data.title || slug;
  const description = data.description || '';
  return { slug, title, description, html: marked.parse(content) };
});

const nav = pages
  .map((page) => {
    const href = page.slug === 'index' ? '/' : `/${page.slug}/`;
    return `<a href="${href}">${page.title}</a>`;
  })
  .join('');

const layout = ({ title, description, html }) => `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <style>
      :root {
        --bg: #f7f6f2;
        --surface: #ffffff;
        --text: #1f2937;
        --muted: #6b7280;
        --line: #e5e7eb;
        --primary: #0f766e;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        color: var(--text);
        background: var(--bg);
        line-height: 1.7;
      }
      a { color: var(--primary); text-decoration: none; }
      a:hover { text-decoration: underline; }
      .wrap { max-width: 960px; margin: 0 auto; padding: 24px; }
      header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 12px;
        align-items: center;
        padding: 20px 0;
        border-bottom: 1px solid var(--line);
      }
      nav { display: flex; gap: 16px; flex-wrap: wrap; }
      .hero {
        padding: 28px 0 12px;
      }
      .hero h1 {
        margin: 0 0 8px;
        font-size: clamp(2rem, 4vw, 3rem);
        line-height: 1.15;
      }
      .hero p {
        margin: 0;
        color: var(--muted);
      }
      .markdown-body {
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 16px;
        padding: 28px;
        margin: 24px 0 40px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.04);
      }
      .markdown-body h1, .markdown-body h2, .markdown-body h3 { line-height: 1.25; }
      .markdown-body pre {
        padding: 16px;
        overflow: auto;
        border-radius: 12px;
        background: #111827;
        color: #f9fafb;
      }
      .markdown-body code {
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      }
      .markdown-body ul, .markdown-body ol { padding-left: 20px; }
      footer {
        color: var(--muted);
        padding: 0 0 32px;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <header>
        <strong>Markdown Pages Starter</strong>
        <nav>${nav}</nav>
      </header>
      <section class="hero">
        <h1>${title}</h1>
        <p>${description}</p>
      </section>
      <main>
        <article class="markdown-body">${html}</article>
      </main>
      <footer>Built with GitHub Actions + GitHub Pages</footer>
    </div>
  </body>
</html>`;

for (const page of pages) {
  const targetDir = page.slug === 'index' ? distDir : path.join(distDir, page.slug);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), layout(page), 'utf8');
}

fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf8');

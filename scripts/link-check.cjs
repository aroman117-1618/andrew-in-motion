/* Minimal link checker for anchors on the homepage */
const { setTimeout: delay } = require('timers/promises');

async function fetchFirst(urls) {
  for (const u of urls) {
    try {
      const res = await fetch(u);
      if (res.ok) return { url: u, html: await res.text() };
    } catch {}
  }
  throw new Error('Could not fetch any local dev URL (tried 3000 and 3001). Start `pnpm dev` first.');
}

function extractHrefs(html) {
  const hrefs = [];
  const re = /href\s*=\s*"([^"]+)"/gi;
  let m;
  while ((m = re.exec(html))) hrefs.push(m[1]);
  return hrefs;
}

function extractIds(html) {
  const ids = new Set();
  const re = /id\s*=\s*"([^"]+)"/gi;
  let m;
  while ((m = re.exec(html))) ids.add(m[1]);
  return ids;
}

(async () => {
  // Try both 3000 and 3001 (Next dev often hops ports)
  const targets = [
    process.env.LINK_CHECK_URL || 'http://localhost:3000/',
    'http://localhost:3001/'
  ];
  const { url, html } = await fetchFirst(targets);

  const hrefs = extractHrefs(html);
  const ids = extractIds(html);

  let failures = 0;
  for (const href of hrefs) {
    // External links: skip (extend this as needed)
    if (/^https?:\/\//i.test(href)) continue;

    // Pure hash or page#hash -> treat as anchor check
    if (href.startsWith('#') || href.includes('/#')) {
      const id = href.split('#')[1];
      if (id && !ids.has(id)) {
        console.error(`Missing id "#${id}" on ${url}`);
        failures++;
      }
      continue; // don't flag as broken
    }

    // For non-hash internal links on a single-page site, you can decide:
    // either mark as TODO or try to fetch that route. We'll skip for now.
  }

  if (failures > 0) {
    console.error(`\n❌ Link check failed: ${failures} missing anchor id(s).`);
    process.exit(1);
  } else {
    console.log('✅ Link check passed (hash anchors allowed and validated).');
  }
})();

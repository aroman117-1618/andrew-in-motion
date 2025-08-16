const fs = require('fs');
const http = require('http');

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = http.request(url, (res) => {
      resolve({ url, status: res.statusCode });
    });
    req.on('error', (err) => {
      resolve({ url, status: 0, error: err.message });
    });
    req.end();
  });
}

async function main() {
  const map = JSON.parse(fs.readFileSync('site-map.json', 'utf8'));
  const results = [];
  for (const route of map.routes) {
    const { url } = route;
    results.push(await checkUrl(`http://localhost:3000${url}`));
  }
  console.table(results);
  const failures = results.filter(r => r.status !== 200);
  if (failures.length) {
    console.error('Some links failed:', failures);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
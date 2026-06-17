/* ============================================================
   build-vision-html.js  —  product_vision.md  ->  product_vision.html
   A navigable HTML view of the vision: sticky sidebar Table of Contents
   (clickable jump links), scroll-spy highlighting, and a back-to-top button.

   product_vision.md stays the SINGLE SOURCE OF TRUTH. This HTML is a derived
   artifact — re-run after any vision edit to resync:
       cd docs && npm i marked && node build-vision-html.js
   (Cowork/Claude regenerates it automatically when it edits the vision.)
   ============================================================ */

const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const DIR = __dirname;
const SRC = path.join(DIR, "product_vision.md");
const OUT = path.join(DIR, "product_vision.html");

let md = fs.readFileSync(SRC, "utf8");

/* ---- strip the markdown-only nav so it doesn't duplicate the HTML sidebar ---- */
let lines = md.split("\n");
// drop explicit anchors and back-to-top links
lines = lines.filter((l) => !/^<a id="[^"]*"><\/a>\s*$/.test(l) && !/^\[↑ Back to top\]\(#top\)\s*$/.test(l));
// drop the in-md "## Contents" block (heading through the next '---')
const cidx = lines.findIndex((l) => /^##\s+.*Contents/.test(l));
if (cidx >= 0) {
  let end = cidx + 1;
  while (end < lines.length && lines[end].trim() !== "---") end++;
  lines.splice(cidx, end - cidx + 1);
}
md = lines.join("\n");

/* ---- slug helper (unique) ---- */
const seen = {};
function slug(text) {
  let s = text.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
  if (!s) s = "section";
  if (seen[s] != null) { seen[s]++; s = s + "-" + seen[s]; } else seen[s] = 0;
  return s;
}

/* ---- render markdown, then add ids to headings + collect TOC ---- */
marked.setOptions({ headerIds: false, mangle: false });
let html = marked.parse(md);

const toc = [];
html = html.replace(/<h([1-4])>([\s\S]*?)<\/h\1>/g, function (_, lvl, inner) {
  const level = +lvl;
  const plain = inner.replace(/<[^>]+>/g, "").trim();
  const id = slug(plain);
  if (level === 2 || level === 3) toc.push({ level: level, label: plain, id: id });
  return '<h' + lvl + ' id="' + id + '">' + inner + '</h' + lvl + '>';
});

const tocHtml = toc.map(function (t) {
  return '<a class="toc-link lvl' + t.level + '" href="#' + t.id + '">' + escapeHtml(t.label) + "</a>";
}).join("\n");

function escapeHtml(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

/* ---- compose the page ---- */
const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Summer Camp — Product Vision</title>
<style>
  :root{ --ink:#1f2430; --soft:#566; --faint:#8a8f9c; --paper:#faf7f0; --card:#fff; --line:#e7e0d2; --accent:#2c5282; --gold:#a87d22; --code:#f0ece2; }
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--ink);background:var(--paper);line-height:1.65;}
  a{color:var(--accent);text-decoration:none}
  a:hover{text-decoration:underline}
  .layout{display:flex;align-items:flex-start;max-width:1180px;margin:0 auto}
  /* sidebar */
  .toc{position:sticky;top:0;align-self:flex-start;width:300px;flex:none;height:100vh;overflow:auto;padding:26px 18px 40px;border-right:1px solid var(--line);background:#f3eee3}
  .toc h2{font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin:0 0 12px}
  .toc-link{display:block;padding:5px 10px;border-radius:7px;color:var(--soft);font-size:.92rem;border-left:2px solid transparent;margin:1px 0}
  .toc-link:hover{background:#eae2d2;text-decoration:none;color:var(--ink)}
  .toc-link.lvl3{padding-left:24px;font-size:.85rem;color:var(--faint)}
  .toc-link.active{color:var(--accent);border-left-color:var(--accent);background:#ece4d4;font-weight:600}
  /* content */
  .content{flex:1;min-width:0;max-width:840px;padding:30px 40px 120px}
  .content h1{font-size:2rem;margin:.2em 0 .5em;line-height:1.2}
  .content h2{font-size:1.5rem;margin:1.8em 0 .4em;padding-bottom:.25em;border-bottom:2px solid var(--line);scroll-margin-top:14px}
  .content h3{font-size:1.18rem;margin:1.5em 0 .3em;color:#2a3142;scroll-margin-top:14px}
  .content h4{font-size:1.02rem;margin:1.2em 0 .2em;color:var(--soft)}
  .content p{margin:.6em 0}
  .content ul,.content ol{margin:.5em 0 .8em;padding-left:1.4em}
  .content li{margin:.25em 0}
  .content code{background:var(--code);padding:.12em .4em;border-radius:5px;font-size:.88em;font-family:"SFMono-Regular",Consolas,monospace}
  .content pre{background:#1f2430;color:#eee;padding:14px 16px;border-radius:10px;overflow:auto;font-size:.85rem;line-height:1.5}
  .content pre code{background:none;padding:0;color:inherit}
  .content blockquote{margin:.8em 0;padding:.5em 16px;border-left:3px solid var(--gold);background:#f6efdd;border-radius:0 8px 8px 0;color:#5a5340}
  .content table{border-collapse:collapse;width:100%;margin:1em 0;font-size:.93rem}
  .content th,.content td{border:1px solid var(--line);padding:8px 11px;text-align:left;vertical-align:top}
  .content th{background:#efe7d6}
  .content hr{border:0;border-top:1px solid var(--line);margin:2em 0}
  .content a[href^="http"]:after{content:" ↗";color:var(--faint);font-size:.85em}
  /* back to top */
  #totop{position:fixed;right:22px;bottom:22px;background:var(--accent);color:#fff;border:0;border-radius:999px;padding:11px 16px;font-weight:600;font-size:.85rem;box-shadow:0 6px 18px rgba(0,0,0,.2);cursor:pointer;opacity:0;pointer-events:none;transition:opacity .25s}
  #totop.show{opacity:1;pointer-events:auto}
  .src-note{font-size:.8rem;color:var(--faint);margin-top:10px;padding-top:10px;border-top:1px dashed var(--line)}
  @media (max-width:860px){
    .layout{flex-direction:column}
    .toc{position:static;width:100%;height:auto;border-right:0;border-bottom:1px solid var(--line)}
    .content{padding:20px}
  }
</style>
</head>
<body>
<div class="layout">
  <nav class="toc">
    <h2>📖 Contents</h2>
    ${tocHtml}
    <div class="src-note">Generated from <code>product_vision.md</code> — that file is the source of truth.</div>
  </nav>
  <main class="content" id="content">
${html}
  </main>
</div>
<button id="totop" aria-label="Back to top">↑ Top</button>
<script>
  var links=[].slice.call(document.querySelectorAll(".toc-link"));
  var map={}; links.forEach(function(a){ map[a.getAttribute("href").slice(1)]=a; });
  var heads=[].slice.call(document.querySelectorAll(".content h2, .content h3"));
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(l){l.classList.remove("active");});
        var a=map[e.target.id]; if(a){a.classList.add("active"); a.scrollIntoView({block:"nearest"});}
      }
    });
  },{rootMargin:"0px 0px -75% 0px",threshold:0});
  heads.forEach(function(h){io.observe(h);});
  var top=document.getElementById("totop");
  top.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"});});
  addEventListener("scroll",function(){ top.classList.toggle("show", scrollY>500); });
</script>
</body>
</html>`;

fs.writeFileSync(OUT, page);
console.log("Wrote " + path.basename(OUT) + " with " + toc.length + " TOC entries (h2+h3).");

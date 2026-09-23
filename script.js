const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const still = matchMedia("(max-width: 600px), (prefers-reduced-motion: reduce)");
const wait = ms => new Promise(r => setTimeout(r, ms));
const out = $("#out"), typed = $("#typed");
const pages = ["home", "portfolio", "contact"], CMD = { home: "cat home.txt", portfolio: "ls portfolio/", contact: "cat contact.txt" };
let run = 0, current = null;

/* erase the old output bottom-up, type the new command, print lines one by one */
async function go(p) {
  const id = ++run, firstLoad = current === null;
  current = p;
  $$(".keys a").forEach(a => a.dataset.link === p ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  const nodes = [...document.getElementById("t-" + p).content.children].map(n => n.cloneNode(true));
  if (still.matches || firstLoad) { typed.textContent = CMD[p]; out.replaceChildren(...nodes); return; }
  for (const n of [...out.children].reverse()) { if (id !== run) return; n.remove(); await wait(35); }
  for (let i = typed.textContent.length; i >= 0; i--) { if (id !== run) return; typed.textContent = typed.textContent.slice(0, i); await wait(12); }
  for (const c of CMD[p]) { if (id !== run) return; typed.textContent += c; await wait(38); }
  await wait(160);
  for (const n of nodes) { if (id !== run) return; n.classList.add("ln-in"); out.appendChild(n); await wait(70); }
}
function route() {
  const p = pages.includes(location.hash.slice(1)) ? location.hash.slice(1) : "home";
  if (p !== current) go(p);
}
addEventListener("hashchange", route); route();

/* keyboard shortcuts: h / p / c */
addEventListener("keydown", e => {
  if (e.metaKey || e.ctrlKey || e.altKey || /input|textarea/i.test(e.target.tagName)) return;
  const k = { h: "home", p: "portfolio", c: "contact" }[e.key.toLowerCase()];
  if (k) location.hash = k;
});

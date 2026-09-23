const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];

const INTERESTS = ["Coding", "Programming", "Ethical Hacking", "Cyber Security", "Game Dev", "Web Dev", "Software Dev", "System Dev", "UI/UX Design", "AI"];
$("#interests").innerHTML = INTERESTS.map(i => `<li>${i}</li>`).join("");

const WORK = [
  ["Pixel Dungeon Runner", "2D roguelike with procedurally generated floors.", "C# · Unity", "2026"],
  ["Campus Event Board", "Responsive site to post and find campus events.", "HTML · CSS · JS", "2026"],
  ["Port Scan Visualizer", "Maps open ports on your own lab network.", "Python", "2025"],
  ["Study Buddy Bot", "Small AI helper that quizzes you from your notes.", "Python · AI", "2025"]
];
$("#work").innerHTML = WORK.map(([t, d, s, y]) => `<div class="cell work"><span class="k">sample</span><h2>${t}</h2><p>${d}</p><div class="meta"><span>${s}</span><span>${y}</span></div></div>`).join("");

/* pages: cells fade in one after another */
const pages = ["home", "portfolio", "contact"];
let first = true;
function route() {
  const p = pages.includes(location.hash.slice(1)) ? location.hash.slice(1) : "home";
  $$(".page").forEach(s => {
    const on = s.dataset.page === p;
    s.hidden = !on;
    s.classList.toggle("in", on && !first);
    if (on) s.querySelectorAll(".cell").forEach((c, i) => c.style.setProperty("--i", i));
  });
  $$(".nav a").forEach(a => a.dataset.link === p ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  if (!first) scrollTo(0, 0);
  first = false;
}
addEventListener("hashchange", route); route();

function tick() {
  const t = new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit" });
  $("#clock").textContent = "Manila · " + t;
}
tick(); setInterval(tick, 20000);

/* Builds the notices and results lists from resources-data.js. You do not need to edit this file. */
const fmt = d => new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const byDate = (a, b) => b.date.localeCompare(a.date);
const isNew = d => (Date.now() - new Date(d + "T00:00:00")) / 864e5 <= 7; // "New" badge for 7 days
const fileBtn = (l, label) => l ? `<a class="btn ghost sm" href="${l}" target="_blank" rel="noopener"><i class="bi bi-download"></i> ${label}</a>` : "";

// Notices
const nBox = document.getElementById("notice-list");
nBox.innerHTML = NOTICES.length ? [...NOTICES].sort(byDate).map(n => `
  <article class="notice">
    <div class="date"><i class="bi bi-calendar-event"></i> ${fmt(n.date)} ${isNew(n.date) ? '<span class="new">New</span>' : ""}</div>
    <h3>${n.title}</h3><p>${n.text || ""}</p>${fileBtn(n.link, "Open notice")}
  </article>`).join("") : "<p>No notices right now. Please check again soon.</p>";

// Results with filter
const rBox = document.getElementById("result-list"), fBox = document.getElementById("result-filter");
const exams = ["All", ...new Set(RESULTS.map(r => r.exam))];
function drawResults(f) {
  const rows = [...RESULTS].sort(byDate).filter(r => f === "All" || r.exam === f);
  rBox.innerHTML = rows.length ? rows.map(r => `
    <div class="result"><div><span class="chip">${r.exam}</span><h3>${r.title}</h3><small>${fmt(r.date)}</small></div>
    ${fileBtn(r.link, "View result")}</div>`).join("") : "<p>No results published yet.</p>";
}
fBox.innerHTML = exams.map((e, i) => `<button class="${i ? "" : "on"}" data-e="${e}">${e}</button>`).join("");
fBox.addEventListener("click", e => {
  if (!e.target.dataset.e) return;
  fBox.querySelectorAll("button").forEach(b => b.classList.toggle("on", b === e.target));
  drawResults(e.target.dataset.e);
});
drawResults("All");

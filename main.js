/* ============ MIND MILE ACADEMY — MAIN SCRIPT ============
   1) Edit SITE below to change phone, name, address everywhere.
   2) Header & footer are written once here and appear on every page. */
const SITE = {
  name: "Mind Mile Academy",
  tagline: "Guiding future engineers and doctors",
  phone: "9763579140",
  whatsapp: "9779763579140",   // country code 977 + number, no + or spaces
  address: "Dillibazar, Height Marg, Kathmandu",
  landmark: "Near Ganesh Mandir / Trinity College",
  email: "Mindmileinstitute456@gmail.com" // TODO: replace with your real email
};

const pages = [["index.html","Home"],["courses.html","Courses"],["resources.html","Resources"],["about.html","About"],["contact.html","Contact"]];
const here = location.pathname.split("/").pop() || "index.html";
const wa = (msg) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;

document.getElementById("site-header").outerHTML = `
<header class="header"><div class="container nav">
  <a class="logo" href="index.html" aria-label="${SITE.name} home"><img src="logo4.png" alt="Mind Mile Academy logo" class="logo-img">Mind Mile <span>Academy</span></a>
  <button class="burger" aria-label="Open menu" aria-expanded="false"><i class="bi bi-list"></i></button>
  <nav class="menu" aria-label="Main">
    ${pages.map(p=>`<a href="${p[0]}" class="${p[0]===here?'active':''}">${p[1]}</a>`).join("")}
    <a class="btn" href="${wa('Hello Mind Mile Academy, I want to know about admission.')}" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i> Enquire</a>
  </nav></div></header>`;

document.getElementById("site-footer").outerHTML = `
<footer class="footer"><div class="container">
  <div class="foot-grid">
    <div><a class="logo" href="index.html" style="color:#fff"><img src="logo4.png" alt="Mind Mile Academy logo" class="logo-img">Mind Mile <span>Academy</span></a>
      <p style="margin-top:14px">${SITE.tagline}. Entrance preparation for IOE, BE, B.Arch and CEE, plus Cambridge AS &amp; A Level.</p></div>
    <div><h3>Quick links</h3><ul>${pages.map(p=>`<li><a href="${p[0]}">${p[1]}</a></li>`).join("")}</ul></div>
    <div><h3>Contact</h3><ul>
      <li><i class="bi bi-geo-alt"></i> ${SITE.address}<br>${SITE.landmark}</li>
      <li><i class="bi bi-telephone"></i> <a href="tel:+977${SITE.phone}">${SITE.phone}</a></li>
      <li><i class="bi bi-envelope"></i> <a href="mailto:${SITE.email}">${SITE.email}</a></li></ul></div>
  </div>
  <p class="copy">&copy; ${new Date().getFullYear()} ${SITE.name} (Mind Mile Institute). All rights reserved.</p>
</div></footer>
<a class="wa-float" href="${wa('Hello Mind Mile Academy, I need information.')}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><i class="bi bi-whatsapp"></i></a>`;

// Mobile menu
const burger = document.querySelector(".burger"), menu = document.querySelector(".menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); } }), {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Contact form -> opens WhatsApp with the filled details
const form = document.getElementById("enquiry-form");
if (form) form.addEventListener("submit", e => {
  e.preventDefault();
  const d = new FormData(form);
  window.open(wa(`Hello Mind Mile Academy!\nName: ${d.get("name")}\nPhone: ${d.get("phone")}\nInterested in: ${d.get("course")}\nMessage: ${d.get("message")}`), "_blank");
});
/* ===== Welcome popup ===== */
const POPUP = {
  enabled: true,                 // set to false to switch it off
  image: "popup.png",
  alt: "Admission open at Mind Mile Academy",
  link: "",                      // optional: e.g. "contact.html" makes the image clickable
  seconds: 5,                    // auto-close time
  onlyHome: true                 // true = show only on the home page
};

(function () {
  if (!POPUP.enabled) return;
  if (POPUP.onlyHome && here !== "index.html") return;
  try { if (sessionStorage.getItem("popupSeen")) return; } catch (e) {}

  const box = document.createElement("div");
  box.className = "popup";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", POPUP.alt);
  const img = `<img src="${POPUP.image}" alt="${POPUP.alt}">`;
  box.innerHTML = `<div class="popup-card">
    <button class="popup-x" aria-label="Close">&times;</button>
    ${POPUP.link ? `<a href="${POPUP.link}">${img}</a>` : img}
  </div>`;

  let timer;
  const close = () => {
    clearTimeout(timer);
    box.remove();
    document.removeEventListener("keydown", onKey);
    try { sessionStorage.setItem("popupSeen", "1"); } catch (e) {}
  };
  const onKey = e => { if (e.key === "Escape") close(); };

  box.querySelector("img").addEventListener("error", () => box.remove());
  box.querySelector(".popup-x").addEventListener("click", close);
  box.addEventListener("click", e => { if (e.target === box) close(); });
  document.addEventListener("keydown", onKey);

  document.body.appendChild(box);
  timer = setTimeout(close, POPUP.seconds * 1000);
})();

// Mind Mile Academy — shared navigation and visual interactions
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.innerHTML = '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    }));
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add("is-visible"));
});

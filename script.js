
// Enable animations only when JavaScript is running.
document.documentElement.classList.add("js-enabled");

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

function closeMenu() {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation menu" : "Close navigation menu"
  );

  navMenu.classList.toggle("open", !isOpen);
});

// Close the mobile menu when a navigation link is selected.
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close the menu when the user clicks outside the navigation.
document.addEventListener("click", (event) => {
  if (
    !navMenu.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});

// Automatically update the footer year.
document.getElementById("year").textContent =
  new Date().getFullYear();

// Reveal selected sections and cards as they enter the viewport.
const revealElements = document.querySelectorAll(
  ".about-visual, .about-content, .service-card, .testimonial-card, .contact-box"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

// Use IntersectionObserver for efficient scroll animations.
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  // Fallback for browsers without IntersectionObserver.
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

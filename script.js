(() => {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const form = document.querySelector("#booking-form");
  const feedback = document.querySelector("#form-feedback");
  const checkIn = document.querySelector("#check-in");
  const checkOut = document.querySelector("#check-out");
  const year = document.querySelector("#year");

  if (year) year.textContent = new Date().getFullYear();

  const updateHeader = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 12);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Apri il menu" : "Chiudi il menu");
      nav.classList.toggle("open", !isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Apri il menu");
        nav.classList.remove("open");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Apri il menu");
        nav.classList.remove("open");
      }
    });
  }

  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

  if (checkIn && checkOut) {
    checkIn.min = localToday;
    checkOut.min = localToday;

    checkIn.addEventListener("change", () => {
      checkOut.min = checkIn.value || localToday;
      if (checkOut.value && checkOut.value <= checkIn.value) {
        checkOut.value = "";
      }
    });
  }

  if (form && feedback) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const start = checkIn.value;
      const end = checkOut.value;
      if (start && end && end <= start) {
        feedback.textContent = "La data di partenza deve essere successiva a quella di arrivo.";
        checkOut.focus();
        return;
      }

      const guestName = document.querySelector("#guest-name").value.trim();
      feedback.textContent = `Grazie, ${guestName}! Il modulo è una demo: per ricevere richieste vere occorre collegare un servizio di prenotazione o un backend.`;
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
})();
const AFF_LINK = "https://pdmlinktwo.xyz/click/6979c7c96bcc6364c87500be/4757/16899/subaccount";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initAccordion();
  initCounters();
  initCookieBanner();
  initAgeGate();
  initGameFilter();
  markActiveLinks();
});

function initNav() {
  const btn = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav]");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => menu.classList.toggle("open"));
}

function initAccordion() {
  document.querySelectorAll(".accordion-btn").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".accordion-item").classList.toggle("open");
    });
  });
}

function initCounters() {
  document.querySelectorAll("[data-counter]").forEach((el) => {
    const target = Number(el.getAttribute("data-counter")) || 0;
    let value = 0;
    const step = Math.max(1, Math.floor(target / 50));
    const timer = setInterval(() => {
      value += step;
      if (value >= target) {
        value = target;
        clearInterval(timer);
      }
      el.textContent = value.toLocaleString("ru-RU");
    }, 20);
  });
}

function initCookieBanner() {
  const banner = document.getElementById("cookieBanner");
  if (!banner) return;
  if (localStorage.getItem("cookieAccepted") === "1") {
    banner.hidden = true;
    return;
  }
  const btn = banner.querySelector("[data-cookie-accept]");
  if (btn) {
    btn.addEventListener("click", () => {
      localStorage.setItem("cookieAccepted", "1");
      banner.hidden = true;
    });
  }
}

function initAgeGate() {
  const gate = document.getElementById("ageGate");
  if (!gate) return;
  if (sessionStorage.getItem("ageOk") === "1") {
    gate.hidden = true;
    return;
  }
  gate.hidden = false;
  gate.querySelector("[data-age-yes]")?.addEventListener("click", () => {
    sessionStorage.setItem("ageOk", "1");
    gate.hidden = true;
  });
  gate.querySelector("[data-age-no]")?.addEventListener("click", () => {
    window.location.href = "https://www.google.com/";
  });
}

function initGameFilter() {
  const search = document.querySelector("[data-game-search]");
  const category = document.querySelector("[data-game-category]");
  const cards = Array.from(document.querySelectorAll("[data-game-card]"));
  if (!search || !category || cards.length === 0) return;

  const apply = () => {
    const query = search.value.toLowerCase().trim();
    const type = category.value;
    cards.forEach((card) => {
      const name = (card.getAttribute("data-name") || "").toLowerCase();
      const cat = card.getAttribute("data-category") || "";
      const visible = name.includes(query) && (type === "all" || type === cat);
      card.style.display = visible ? "block" : "none";
    });
  };

  search.addEventListener("input", apply);
  category.addEventListener("change", apply);
}

function markActiveLinks() {
  const path = window.location.pathname.replace(/\/$/, "");
  document.querySelectorAll(".nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    if (path.endsWith(href.replace(".html", "")) || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}
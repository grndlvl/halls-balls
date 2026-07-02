/* =========================================================
   HALL'S BALLS & EXOTICS — behavior
   ========================================================= */
(function () {
  "use strict";

  /* ---------- The living roster ----------
     Swap emoji/art, names, blurbs & prices for your real stock.
     `cat` drives the filters: python | lizard | serpent | oddity   */
  var BEASTS = [
    { name: "Banana Pastel",   cat: "python",  tag: "Ball Python Morph", emoji: "🐍", price: "$180", level: "Beginner",     blurb: "Sunset-gold blushing with lavender freckles. A crowd favorite.", hue: "linear-gradient(135deg,#3a2410,#6a4a12)" },
    { name: "Piebald",         cat: "python",  tag: "Ball Python Morph", emoji: "🐍", price: "$350", level: "Beginner",     blurb: "Living patchwork of ink and porcelain-white. No two alike.", hue: "linear-gradient(135deg,#1c1c22,#3a3a44)" },
    { name: "Clown",           cat: "python",  tag: "Ball Python Morph", emoji: "🐍", price: "$220", level: "Beginner",     blurb: "Bold dorsal stripe and inkblot flanks — the carnival's namesake.", hue: "linear-gradient(135deg,#2a1030,#5a1a4a)" },
    { name: "Albino",          cat: "python",  tag: "Ball Python Morph", emoji: "🐍", price: "$200", level: "Beginner",     blurb: "Molten yellow on cream with ruby-glass eyes.", hue: "linear-gradient(135deg,#5a4a10,#8a6a14)" },
    { name: "Mojave",          cat: "python",  tag: "Ball Python Morph", emoji: "🐍", price: "$120", level: "Beginner",     blurb: "Clean, high-contrast base morph and a genetics gateway.", hue: "linear-gradient(135deg,#20222c,#3c4250)" },
    { name: "Champagne",       cat: "python",  tag: "Ball Python Morph", emoji: "🐍", price: "$160", level: "Intermediate", blurb: "Warm peach with a faint spine-line. Uncanny and elegant.", hue: "linear-gradient(135deg,#3a2418,#6a4632)" },

    { name: "Leopard Gecko",   cat: "lizard",  tag: "Beginner Lizard",   emoji: "🦎", price: "$60",  level: "Beginner",     blurb: "Blinking, banana-loving and endlessly charming. A perfect first reptile.", hue: "linear-gradient(135deg,#4a3a10,#7a5a16)" },
    { name: "Crested Gecko",   cat: "lizard",  tag: "Arboreal Charmer",  emoji: "🦎", price: "$75",  level: "Beginner",     blurb: "Eyelash-crowned and sticky-toed. Thrives on powdered diet — no live feeding required.", hue: "linear-gradient(135deg,#2a3410,#4a5a18)" },
    { name: "Bearded Dragon",  cat: "lizard",  tag: "The Friendly Beast", emoji: "🦎", price: "$90",  level: "Beginner",     blurb: "Head-bobbing, arm-waving personality in a pocket dinosaur.", hue: "linear-gradient(135deg,#4a2a10,#7a4614)" },
    { name: "Argentine Tegu",  cat: "lizard",  tag: "Gentle Giant",      emoji: "🦎", price: "$260", level: "Advanced",     blurb: "Dog-tame intelligence in a four-foot frame. For the devoted keeper.", hue: "linear-gradient(135deg,#1c2028,#343c48)" },

    { name: "Corn Snake",      cat: "serpent", tag: "Classic Colubrid",  emoji: "🐍", price: "$70",  level: "Beginner",     blurb: "Docile, hardy, and dressed in autumn fire. The gold standard first snake.", hue: "linear-gradient(135deg,#4a1810,#7a2a16)" },
    { name: "Kenyan Sand Boa",  cat: "serpent", tag: "Pocket Serpent",   emoji: "🐍", price: "$110", level: "Beginner",     blurb: "A burrowing little log with a permanent grumpy face. Wildly easy to keep.", hue: "linear-gradient(135deg,#4a3a12,#7a5e1c)" },
    { name: "Hognose",         cat: "serpent", tag: "The Little Actor",  emoji: "🐍", price: "$180", level: "Intermediate", blurb: "Upturned snoot and a flair for melodrama — plays dead for applause.", hue: "linear-gradient(135deg,#3a3418,#5e5626)" },
    { name: "Rosy Boa",        cat: "serpent", tag: "Slow & Sweet",      emoji: "🐍", price: "$130", level: "Beginner",     blurb: "Gentle, glacially calm, and striped like desert dusk.", hue: "linear-gradient(135deg,#3a201c,#5e342c)" },

    { name: "Curly Hair Tarantula", cat: "oddity", tag: "Eight-Legged Oddity", emoji: "🕷️", price: "$45",  level: "Beginner",     blurb: "A fuzzy, docile spider that spends its days redecorating. Strangely soothing.", hue: "linear-gradient(135deg,#241820,#463040)" },
    { name: "Emperor Scorpion",     cat: "oddity", tag: "Living Fossil",       emoji: "🦂", price: "$55",  level: "Intermediate", blurb: "Glows eerie blue under UV. Big, glossy, and calmer than it looks.", hue: "linear-gradient(135deg,#101c1a,#1c3630)" },
    { name: "Pacman Frog",          cat: "oddity", tag: "The Round Menace",    emoji: "🐸", price: "$50",  level: "Beginner",     blurb: "A grumpy, appetite-driven blob of a frog. Mostly mouth, entirely delightful.", hue: "linear-gradient(135deg,#1c3410,#345a18)" },
    { name: "Axolotl",              cat: "oddity", tag: "Smiling Oddity",      emoji: "🦎", price: "$65",  level: "Intermediate", blurb: "The eternally-grinning water dragon that never grows up.", hue: "linear-gradient(135deg,#3a1830,#5e2a50)" }
  ];

  var grid = document.getElementById("beastGrid");

  /* On-brand dark neon gradients, keyed by category (overrides the per-beast hue). */
  var CAT_HUE = {
    python:  "linear-gradient(135deg,#1c0d33,#3a1a5e)",   /* electric purple */
    lizard:  "linear-gradient(135deg,#14210a,#2c3f12)",   /* toxic green */
    serpent: "linear-gradient(135deg,#22103a,#123f2a)",   /* purple → green */
    oddity:  "linear-gradient(135deg,#2a0a2a,#3a1246)"    /* magenta-violet */
  };

  function cardHTML(b) {
    return (
      '<article class="beast" data-cat="' + b.cat + '">' +
        '<div class="beast-art" style="background:' + (CAT_HUE[b.cat] || b.hue) + '"><span class="beast-emoji">' + b.emoji + '</span></div>' +
        '<div class="beast-body">' +
          '<p class="beast-tagline">' + b.tag + '</p>' +
          '<h3>' + b.name + '</h3>' +
          '<p>' + b.blurb + '</p>' +
          '<div class="beast-foot">' +
            '<span class="beast-price">' + b.price + '</span>' +
            '<span class="beast-level">' + b.level + '</span>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  if (grid) {
    grid.innerHTML = BEASTS.map(cardHTML).join("");
  }

  /* ---------- Filters ---------- */
  var filters = document.querySelectorAll(".filter");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (f) { f.classList.remove("is-active"); f.setAttribute("aria-selected", "false"); });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      var f = btn.getAttribute("data-filter");
      document.querySelectorAll(".beast").forEach(function (card) {
        var show = f === "all" || card.getAttribute("data-cat") === f;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Count-up stats ---------- */
  var counters = document.querySelectorAll(".hero-stats strong[data-count]");
  function runCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.floor(p * target) + (p === 1 ? "+" : "");
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length && "IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); co.unobserve(en.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute("data-count") + "+"; });
  }

  /* ---------- Contact form (front-end only) ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      ["name", "email", "message"].forEach(function (id) {
        var field = document.getElementById(id);
        var valid = field.value.trim() !== "" && (id !== "email" || /.+@.+\..+/.test(field.value));
        field.classList.toggle("invalid", !valid);
        if (!valid) ok = false;
      });
      if (!ok) { status.style.color = "var(--magenta)"; status.textContent = "The ravens need every field filled honestly."; return; }
      status.style.color = "var(--green)";
      status.textContent = "Your message drifts into the night — we'll answer soon. 🕯️";
      form.reset();
      /* TODO: wire to a real handler (Formspree, Netlify Forms, email endpoint). */
    });
  }

  /* ---------- Newsletter ---------- */
  var news = document.getElementById("newsForm");
  var newsStatus = document.getElementById("newsStatus");
  if (news) {
    news.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("newsEmail");
      if (/.+@.+\..+/.test(email.value)) {
        newsStatus.style.color = "var(--green)";
        newsStatus.textContent = "Welcome to the menagerie. The ledger is signed. 🎪";
        news.reset();
      } else {
        newsStatus.style.color = "var(--magenta)";
        newsStatus.textContent = "That doesn't look like a summoning address.";
      }
    });
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

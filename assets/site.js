/* ============================================================
   AKSB Global — vanilla JS port of the React behaviours.
   Every duration, easing, threshold and formula matches the
   original components 1:1 (see git history: src/ before the
   static conversion).
   ============================================================ */
(function () {
  'use strict';

  var clamp = function (v, lo, hi) { return Math.max(lo, Math.min(hi, v)); };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Lenis smooth scroll (same config as useLenis.ts) ---------- */
  var lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      touchMultiplier: 2,
    });
    var raf = function (time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  /** Smooth-scrolls to a section id, clearing the fixed header. */
  function scrollToSection(id) {
    var el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.6 });
    else window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
  }
  function scrollToTop() {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- Navigation: scrolled state ---------- */
  var header = $('[data-nav]');
  var mobileOpen = false;
  function updateHeader() {
    header.classList.toggle('nav-scrolled', window.scrollY > 50);
  }

  /* ---------- Navigation: active-section highlight ---------- */
  var navLinks = $$('[data-navlink]');
  function setActive(id) {
    navLinks.forEach(function (btn) {
      var underline = $('[data-underline]', btn);
      if (btn.getAttribute('data-goto') === id) {
        btn.classList.add('text-aksb-light');
        btn.classList.remove('text-aksb-light/70', 'hover:text-aksb-light');
        underline.classList.add('w-full');
        underline.classList.remove('w-0', 'group-hover:w-full');
      } else {
        btn.classList.remove('text-aksb-light');
        btn.classList.add('text-aksb-light/70', 'hover:text-aksb-light');
        underline.classList.remove('w-full');
        underline.classList.add('w-0', 'group-hover:w-full');
      }
    });
  }
  // highlight whichever section currently owns the upper third of the viewport
  var sectionObserver = new IntersectionObserver(function (entries) {
    var visible = entries
      .filter(function (e) { return e.isIntersecting; })
      .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; })[0];
    if (visible) setActive(visible.target.id);
  }, { rootMargin: '-15% 0px -70% 0px' });
  ['about', 'expertise', 'projects', 'partners', 'contact'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = $('[data-menu-btn]');
  var overlay = $('[data-mobile-overlay]');
  var iconMenu = $('[data-icon-menu]');
  var iconX = $('[data-icon-x]');
  function setMobileOpen(open) {
    mobileOpen = open;
    header.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    iconMenu.classList.toggle('hidden', open);
    iconX.classList.toggle('hidden', !open);
    if (open) {
      overlay.classList.add('mobile-open', 'pointer-events-auto', 'opacity-100');
      overlay.classList.remove('pointer-events-none', 'opacity-0');
    } else {
      overlay.classList.remove('mobile-open', 'pointer-events-auto', 'opacity-100');
      overlay.classList.add('pointer-events-none', 'opacity-0');
    }
    document.body.style.overflow = open ? 'hidden' : '';
    updateHeader();
  }
  menuBtn.addEventListener('click', function () { setMobileOpen(!mobileOpen); });

  /* ---------- Scroll-to buttons ---------- */
  $$('[data-goto]').forEach(function (el) {
    el.addEventListener('click', function () {
      var id = el.getAttribute('data-goto');
      if (mobileOpen) {
        setMobileOpen(false);
        // let the overlay close before the scroll starts
        requestAnimationFrame(function () { scrollToSection(id); });
      } else {
        scrollToSection(id);
      }
    });
  });
  $$('[data-top]').forEach(function (el) {
    el.addEventListener('click', scrollToTop);
  });

  /* ---------- Hero: load-in + tile hover interplay ---------- */
  var hero = $('[data-hero]');
  setTimeout(function () { hero.classList.add('is-loaded'); }, 100);
  $$('[data-tilegrid]').forEach(function (grid) {
    var tiles = $$('[data-tile]', grid);
    function applyHover(hovered) {
      tiles.forEach(function (t) {
        t.style.transform =
          hovered === t ? 'scale(1.03)' : hovered !== null ? 'scale(0.985)' : 'scale(1)';
      });
    }
    tiles.forEach(function (t) {
      t.addEventListener('mouseenter', function () { applyHover(t); });
      t.addEventListener('mouseleave', function () { applyHover(null); });
    });
  });

  /* ---------- Reveal (one-shot fade/slide-up on first intersection) ---------- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('shown');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -2% 0px' });
  $$('[data-reveal]').forEach(function (el) { revealObserver.observe(el); });

  /* ---------- MaskImage (wipe-in behind a clip-path mask) ---------- */
  // fires early so the slower wipe has room to finish as the image settles
  var maskObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('shown');
        maskObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  $$('[data-mask]').forEach(function (el) { maskObserver.observe(el); });

  /* ---------- BlurTitle (scroll-linked blur/letter-spacing resolve, latches sharp) ---------- */
  var MAX_BLUR = 14, MAX_SPACING = 10;
  var blurTitles = $$('[data-blur-title]').map(function (el) { return { el: el, done: false }; });
  function updateBlurTitles() {
    var vh = window.innerHeight;
    blurTitles.forEach(function (t) {
      if (t.done) return;
      var rect = t.el.getBoundingClientRect();
      // Starts as the title crosses 98% of the viewport, fully sharp by 43% —
      // a long, gradual resolve so the text drifts into focus as you scroll.
      var p = clamp((vh * 0.98 - rect.top) / (vh * 0.55), 0, 1);
      // Smoothstep — eases in and out.
      var ease = p * p * (3 - 2 * p);
      t.el.style.filter = ease >= 0.99 ? 'none' : 'blur(' + MAX_BLUR * (1 - ease) + 'px)';
      t.el.style.letterSpacing = MAX_SPACING * (1 - ease) + 'px';
      t.el.style.opacity = 0.25 + ease * 0.75;
      if (p >= 1) t.done = true;
    });
  }

  /* ---------- About: pinned dawn scene with scroll-scrubbed copy ---------- */
  var about = $('[data-about]');
  var sky = $('[data-sky]'), sun = $('[data-sun]'), fog = $('[data-fog]');
  var aboutEyebrow = $('[data-about-eyebrow]');

  /* Split the title into letters (word-wrapped so lines break naturally) and
     the paragraph into words, so scroll progress can drive them one by one. */
  function splitLetters(root) {
    var letters = [];
    function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var word = document.createElement('span');
            word.style.display = 'inline-block';
            word.style.whiteSpace = 'nowrap';
            part.split('').forEach(function (ch) {
              var s = document.createElement('span');
              s.textContent = ch;
              s.style.display = 'inline-block';
              letters.push(s);
              word.appendChild(s);
            });
            frag.appendChild(word);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    }
    walk(root);
    return letters;
  }
  function splitWords(root) {
    var words = [];
    var text = root.textContent.replace(/\s+/g, ' ').trim();
    root.textContent = '';
    text.split(' ').forEach(function (w, i) {
      if (i) root.appendChild(document.createTextNode(' '));
      var s = document.createElement('span');
      s.textContent = w;
      words.push(s);
      root.appendChild(s);
    });
    return words;
  }
  var titleLetters = splitLetters($('[data-about-title]'));
  var scrubWords = splitWords($('[data-about-scrub]'));

  function updateAbout() {
    var rect = about.getBoundingClientRect();
    var pinRange = rect.height - window.innerHeight;
    var progress = pinRange > 0 ? clamp(-rect.top / pinRange, 0, 1) : 0;

    sky.style.background =
      'linear-gradient(to bottom, ' +
      'rgb(' + (1 + 10 * progress) + ', ' + (1 + 5 * progress) + ', ' + (2 + 8 * progress) + ') 0%, ' +
      'rgb(' + (5 + 75 * progress) + ', ' + (5 + 30 * progress) + ', ' + (7 + 8 * progress) + ') 40%, ' +
      'rgb(' + (8 + 40 * progress) + ', ' + (4 + 20 * progress) + ', ' + (5 + 10 * progress) + ') 70%, ' +
      'rgb(' + (3 + 15 * progress) + ', ' + (2 + 8 * progress) + ', ' + (3 + 5 * progress) + ') 100%)';

    sun.style.width = (80 + progress * 40) + 'px';
    sun.style.height = (80 + progress * 40) + 'px';
    sun.style.top = (45 - progress * 35) + '%';
    sun.style.background =
      'radial-gradient(circle, ' +
      'rgba(255, ' + (200 + 55 * (1 - progress)) + ', ' + (150 - 50 * progress) + ', ' + (0.9 * progress) + ') 0%, ' +
      'rgba(255, ' + (150 + 50 * progress) + ', ' + (100 - 50 * progress) + ', ' + (0.5 * progress) + ') 40%, ' +
      'transparent 70%)';
    sun.style.opacity = progress;

    fog.style.background =
      'linear-gradient(to top, ' +
      'rgba(210, 190, 165, ' + (0.75 * progress) + ') 0%, ' +
      'rgba(180, 160, 140, ' + (0.4 * progress) + ') 40%, ' +
      'transparent 100%)';

    aboutEyebrow.style.opacity = clamp(progress / 0.05, 0, 1);

    // title letters cascade in across the first third of the pin
    var lp = clamp((progress - 0.03) / 0.3, 0, 1);
    var M = titleLetters.length;
    titleLetters.forEach(function (s, i) {
      var t = clamp((lp * (M + 10) - i) / 10, 0, 1);
      s.style.opacity = 0.08 + 0.92 * t;
      s.style.transform = 'translateY(' + (1 - t) * 18 + 'px)';
      s.style.filter = t >= 1 ? 'none' : 'blur(' + (1 - t) * 5 + 'px)';
    });

    // paragraph words light up one by one across the rest of the pin
    var wp = clamp((progress - 0.34) / 0.5, 0, 1);
    var W = scrubWords.length;
    scrubWords.forEach(function (s, i) {
      var t = clamp(wp * (W + 4) - i, 0, 1);
      s.style.opacity = 0.13 + 0.87 * t;
    });
  }

  /* ---------- Projects: sticky horizontal scroll ---------- */
  var projectsSection = $('[data-projects]');
  var track = $('[data-ptrack]');
  var pbar = $('[data-pbar]');
  var maxShift = 0;
  function measureProjects() {
    maxShift = Math.max(0, track.scrollWidth - window.innerWidth + 48);
  }
  function updateProjects() {
    var rect = projectsSection.getBoundingClientRect();
    var scrollable = rect.height - window.innerHeight;
    var p = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
    track.style.transform = 'translateX(' + -p * maxShift + 'px)';
    pbar.style.width = (p * 100) + '%';
  }

  /* ---------- CountUp (counts up on first view) ---------- */
  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      countObserver.unobserve(el);
      var value = parseInt(el.getAttribute('data-countup'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1100;
      var start = performance.now();
      var tick = function (now) {
        var t = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(value * eased).toLocaleString('en-MY') + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });
  $$('[data-countup]').forEach(function (el) {
    el.textContent = '0' + (el.getAttribute('data-suffix') || '');
    countObserver.observe(el);
  });

  /* ---------- FAQ accordion (one open at a time) ---------- */
  var faq = $('[data-faq]');
  if (faq) {
    var faqBtns = $$('[data-faq-btn]', faq);
    function setFaqOpen(btn, open) {
      var q = $('[data-faq-q]', btn);
      var icon = $('[data-faq-icon]', btn);
      var panel = btn.nextElementSibling;
      btn.setAttribute('aria-expanded', String(open));
      panel.style.gridTemplateRows = open ? '1fr' : '0fr';
      if (open) {
        q.classList.add('text-aksb-oxidized');
        q.classList.remove('text-aksb-text', 'group-hover:text-aksb-oxidized');
        icon.classList.add('rotate-45', 'text-aksb-oxidized');
        icon.classList.remove('group-hover:text-aksb-oxidized');
      } else {
        q.classList.remove('text-aksb-oxidized');
        q.classList.add('text-aksb-text', 'group-hover:text-aksb-oxidized');
        icon.classList.remove('rotate-45', 'text-aksb-oxidized');
        icon.classList.add('group-hover:text-aksb-oxidized');
      }
    }
    faqBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        faqBtns.forEach(function (b) { setFaqOpen(b, b === btn && !isOpen); });
      });
    });
  }

  /* ---------- Contact form: compose a prefilled email (no backend) ---------- */
  var form = $('[data-enquiry]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = String(data.get('name') || '');
      var company = String(data.get('company') || '');
      var phone = String(data.get('phone') || '');
      var email = String(data.get('email') || '');
      var scope = String(data.get('scope') || '');
      var message = String(data.get('message') || '');

      var subject = 'Enquiry — ' + (scope || 'road works') + ' (' + (company || name) + ')';
      var body = [
        'Name: ' + name,
        'Company: ' + company,
        'Phone: ' + phone,
        'Email: ' + email,
        'Scope: ' + scope,
        '',
        message,
      ].join('\n');

      window.location.href =
        'mailto:' + form.getAttribute('data-mailto') +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }

  /* ---------- Footer year ---------- */
  var year = $('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Shared scroll/resize loop ---------- */
  var rafId = 0;
  function onScroll() {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(function () {
      updateHeader();
      updateBlurTitles();
      updateAbout();
      updateProjects();
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    measureProjects();
    onScroll();
  });

  measureProjects();
  onScroll();
})();

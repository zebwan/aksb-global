/* ============================================================
   AKSB Global v2 — motion system ported 1:1 from fluid.glass
   (GSAP 3.13 + ScrollTrigger + SplitText + DrawSVG, Lenis 1.3).
   Every duration / ease / stagger below is the measured value;
   see TEMPLATE-TEARDOWN.md.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var isTouch = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var remPx = function (v) { return v * parseFloat(getComputedStyle(document.documentElement).fontSize); };

  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
  gsap.defaults({ overwrite: 'auto' });

  /* ---------- Lenis (template: default lerp/duration) ---------- */
  var lenis = new Lenis({ duration: 1.2, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
  gsap.ticker.lagSmoothing(0);
  lenis.stop(); // released after the intro

  var scrollTo = function (id) {
    var el = id === 'top' ? 0 : document.getElementById(id);
    if (el === null) return;
    lenis.scrollTo(el, { duration: 1.6, offset: 0 });
  };

  /* ---------- state ---------- */
  var state = { intro: true, menuOpen: false, panelOpen: false, footerVisible: false, title: 'Home' };
  var body = document.body;
  var scroll = $('[data-scroll]');
  var content = $('[data-content]');
  var overlay = $('[data-overlay]');

  /* ============================================================
     Buttons: label lines slide up + arrow draws (RObEUEao)
     ============================================================ */
  $$('.base-button').forEach(function (btn) {
    var label = $('.label', btn); var svg = $('svg', btn);
    if (!label) return;
    var rect = svg && $('rect', svg), path = svg && $('path', svg);
    if (rect) gsap.set(rect, { drawSVG: '0% 50%' });
    var enter = function () {
      gsap.to(label.children, { yPercent: -100, duration: 1, ease: 'power3.out' });
      if (rect) gsap.fromTo(rect, { drawSVG: '0% 50%' }, { drawSVG: '50% 150%', duration: 1, overwrite: true, ease: 'power3.out' });
      if (path) gsap.fromTo(path, { drawSVG: '-100%' }, { drawSVG: '0%', duration: 1, overwrite: true, ease: 'power3.out' });
    };
    var leave = function () {
      gsap.to(label.children, { yPercent: 0, duration: 1, ease: 'power3.out' });
      if (rect) gsap.fromTo(rect, { drawSVG: '50% 150%' }, { drawSVG: '0% 50%', duration: 1, overwrite: true, ease: 'power3.out' });
      if (path) gsap.fromTo(path, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1, overwrite: true, ease: 'power3.out' });
    };
    if (!isTouch) { btn.addEventListener('mouseenter', enter); btn.addEventListener('mouseleave', leave); }
  });

  /* arrow-nav "shoot through" (BaqWSm4x2) */
  $$('.nav-button').forEach(function (b) {
    var icon = $('.nav-arrow', b);
    b.addEventListener('mouseenter', function () {
      if (isTouch) return;
      gsap.set(icon, { xPercent: 0, overwrite: true });
      gsap.to(icon, { xPercent: 200, duration: .5, ease: 'power3.in', onComplete: function () {
        gsap.set(icon, { xPercent: -200 });
        gsap.to(icon, { xPercent: 0, duration: .5, ease: 'power3.out' });
      } });
    });
  });

  /* ============================================================
     Custom cursor (ed5337c0)
     ============================================================ */
  var cursor = $('[data-cursor]'), cursorLabel = $('[data-cursor-label]');
  var cx = 0, cy = 0, tx = 0, ty = 0;
  if (!isTouch && cursor) {
    window.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; }, { passive: true });
    gsap.ticker.add(function () {
      cx += (tx - cx) * .18; cy += (ty - cy) * .18;
      cursor.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
    });
    $$('[data-cursor]').forEach(function (el) {
      if (el === cursor) return;
      el.addEventListener('mouseenter', function () { cursorLabel.textContent = el.getAttribute('data-cursor') || 'View'; cursor.classList.add('is-visible'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('is-visible'); });
    });
  }

  /* ============================================================
     Text: line reveal (B7UjGoGU) + fades
     ============================================================ */
  function lineReveal(el, delay, immediate) {
    return SplitText.create(el, {
      type: 'lines', mask: 'lines', linesClass: 'line', autoSplit: true,
      onSplit: function (self) {
        el.classList.add('is-split');
        gsap.set(self.lines, { yPercent: 200 });
        var vars = { yPercent: 0, stagger: .1, duration: 1.5, delay: delay || 0, ease: 'power3.out' };
        if (!immediate) vars.scrollTrigger = { trigger: el, start: 'top bottom' };
        return gsap.to(self.lines, vars);
      }
    });
  }
  function setupText() {
    $$('[data-split]').forEach(function (el) {
      if (el.closest('[data-hero]')) return; // hero lines are timed by the intro
      lineReveal(el, 0);
    });
    $$('[data-fade]').forEach(function (el) {
      var d = parseFloat((el.style.getPropertyValue('--d') || '0').replace('s', '')) || 0;
      gsap.to(el, { autoAlpha: 1, duration: 1.5, ease: 'power3.out', delay: d, scrollTrigger: { trigger: el, start: 'top bottom' } });
    });
  }

  /* ============================================================
     Intro loader (entry bundle timeline)
     ============================================================ */
  var intro = $('[data-intro]');
  var pageHeader = $('[data-page-header]'), header = $('[data-header]');
  var hero = $('[data-hero]');

  function buildHeader() {
    // template: defaults delay 3s, duration 1, power3.inOut — here the intro already ate 3s
    header.style.visibility = 'visible';
    var title = $('.header-title', header), logo = $('.header-logo', header), burger = $('.header-burger', header);
    gsap.timeline({ defaults: { duration: 1, ease: 'power3.inOut' } })
      .fromTo(title, { yPercent: 200 }, { yPercent: 0 }, 0)
      .fromTo(header, { width: '5rem' }, { width: '27.6rem', autoRound: false }, .3)
      .fromTo(logo, { x: '11.3rem' }, { x: 0 }, 1)
      .fromTo(burger, { autoAlpha: 0 }, { autoAlpha: 1, duration: .6 }, 1.2);
    pageHeader.style.visibility = 'visible';
    gsap.fromTo(pageHeader, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5, ease: 'power3.out' });
  }

  function introDone() {
    state.intro = false;
    intro.style.display = 'none';
    lenis.start();
    ScrollTrigger.refresh();
  }

  function runIntro() {
    var words = $$('[data-intro-word]'), logo = $('[data-intro-logo]'), mark = $('[data-intro-mark]');
    var cube = $('[data-intro-cube]'), ov = $('[data-intro-overlay]');
    var heroHeading = $('.base-heading', hero);
    var tl = gsap.timeline({ onComplete: introDone });
    tl.set(words, { yPercent: 150 }).set(logo, { xPercent: 41, autoAlpha: 1 })
      .add(function () { cube.classList.add('rotate'); }, 0)
      .fromTo(cube, { yPercent: 100, scale: 0 }, { yPercent: 0, scale: .95, duration: 1.5, ease: 'power3.inOut' })
      .add(function () { gsap.to(mark, { autoAlpha: 1, duration: .4 }); }, 1.5)
      .to(logo, { xPercent: 0, duration: 1, ease: 'power3.inOut' }, 1.3)
      .to(cube, { xPercent: 100, yPercent: 50, duration: 1, ease: 'power3.inOut' }, '<')
      .to(words, { yPercent: 0, stagger: .05, duration: 1, ease: 'power3.out' }, '<')
      .set(cube, { zIndex: 0 }, 2.2)
      .to(ov, { opacity: 1, duration: .9, ease: 'power2.inOut' }, 2.2)
      .to(logo, { y: -window.innerHeight / 3, autoAlpha: 0, duration: 1.2, ease: 'power3.inOut' }, 2.3)
      .fromTo(content, { scale: 1.1 }, { scale: 1, duration: 1.2, ease: 'power3.inOut', willChange: 'transform' }, 2.6)
      .fromTo(scroll, { scale: window.innerWidth <= 600 ? .9 : .8, rotate: .01 }, { scale: 1, duration: 1, ease: 'power3.inOut', clearProps: 'all' }, 2.6)
      .to(intro, { autoAlpha: 0, duration: 1, ease: 'power2.inOut' }, 2.8)
      .add(function () { hero.classList.add('is-loaded'); lineReveal(heroHeading, 0, true); }, 2.9)
      .add(buildHeader, 3.1);
  }

  /* ============================================================
     Header pill: section titles, footer hide, menu
     ============================================================ */
  var headerTitle = $('[data-header-title]');
  var titleTl = null;
  function setTitle(t) {
    if (t === state.title) return;
    state.title = t;
    if (titleTl) titleTl.kill();
    titleTl = gsap.timeline()
      .to(headerTitle, { yPercent: -100, duration: .6, ease: 'power3.in' })
      .add(function () { headerTitle.textContent = state.title; })
      .set(headerTitle, { yPercent: 100 })
      .to(headerTitle, { yPercent: 0, duration: .6, ease: 'power3.out' });
  }
  $$('[data-section]').forEach(function (sec) {
    ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%',
      onToggle: function (st) { if (st.isActive) setTitle(sec.getAttribute('data-section')); } });
  });

  var menu = $('[data-menu]'), menuBg = $('[data-menu-bg]');
  var menuLinks = $$('.menu-link', menu), menuSub = $('[data-menu-sub]'), menuFades = $$('[data-menu-fade]', menu);
  function openMenu() {
    if (state.menuOpen || state.intro) return;
    state.menuOpen = true;
    header.classList.add('menu-open'); menu.classList.add('is-open'); body.classList.add('is-overlay');
    $('[data-menu-btn]').setAttribute('aria-expanded', 'true');
    gsap.timeline({ defaults: { duration: .6, ease: 'power3.inOut' } })
      .to(header, { width: '5rem', autoRound: false }, 0);
    gsap.set(menu, { autoAlpha: 1 });
    gsap.fromTo(menuBg, { scaleY: 0 }, { scaleY: 1, ease: 'power3.inOut' });
    gsap.fromTo(menuFades, { autoAlpha: 0 }, { delay: .3, autoAlpha: 1, ease: 'power3.inOut' });
    gsap.fromTo(menuLinks, { yPercent: 150 }, { yPercent: 0, stagger: .02, duration: .8, ease: 'power3.inOut' });
    gsap.fromTo(menuSub.children, { yPercent: 150 }, { yPercent: 0, stagger: .02, duration: .8, delay: .1, ease: 'power3.inOut' });
    lenis.stop();
  }
  function closeMenu() {
    if (!state.menuOpen) return;
    state.menuOpen = false;
    header.classList.remove('menu-open'); menu.classList.remove('is-open'); body.classList.remove('is-overlay');
    $('[data-menu-btn]').setAttribute('aria-expanded', 'false');
    gsap.to(header, { width: '27.6rem', autoRound: false, duration: .6, ease: 'power3.inOut' });
    gsap.to(menuLinks, { yPercent: 150, overwrite: true, ease: 'power3.out' });
    gsap.to(menuSub.children, { yPercent: 150, overwrite: true, ease: 'power3.out' });
    gsap.to(menuFades, { autoAlpha: 0, overwrite: true, ease: 'power3.out' });
    gsap.to(menuBg, { scaleY: 0, overwrite: true, ease: 'power3.inOut', onComplete: function () { gsap.set(menu, { autoAlpha: 0 }); } });
    if (!state.panelOpen) lenis.start();
  }
  $('[data-menu-btn]').addEventListener('click', openMenu);
  $('[data-menu-close]').addEventListener('click', closeMenu);
  $('.header-title', header).addEventListener('click', openMenu);

  /* ============================================================
     Side panels: quote + scope (B2--Kgmt slide)
     ============================================================ */
  var quotePanel = $('[data-quote-panel]'), scopePanel = $('[data-scope-panel]'), scopeContent = $('[data-scope-content]');
  var openPanel = null;
  gsap.set([quotePanel, scopePanel], { xPercent: 100 }); // CSS transforms would be read as px and pollute xPercent
  function showPanel(panel) {
    if (state.menuOpen) closeMenu();
    if (openPanel === panel) return;
    if (openPanel) hidePanel(openPanel, true);
    openPanel = panel; state.panelOpen = true;
    panel.setAttribute('aria-hidden', 'false'); panel.scrollTop = 0;
    body.classList.add('is-overlay');
    gsap.set(panel, { visibility: 'visible' });
    gsap.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 1, ease: 'power3.inOut' });
    gsap.fromTo(scroll, { xPercent: 0 }, { xPercent: -6, duration: 1, ease: 'power3.inOut' });
    gsap.to(header, { autoAlpha: 0, duration: .4 });
    lenis.stop();
  }
  function hidePanel(panel, instant) {
    if (!panel) return;
    panel.setAttribute('aria-hidden', 'true');
    if (openPanel === panel) { openPanel = null; state.panelOpen = false; }
    if (instant) { gsap.set(panel, { xPercent: 100, visibility: 'hidden' }); return; }
    body.classList.remove('is-overlay');
    gsap.to(panel, { xPercent: 100, duration: 1, ease: 'power3.inOut', onComplete: function () { gsap.set(panel, { visibility: 'hidden' }); } });
    gsap.to(scroll, { xPercent: 0, duration: 1, ease: 'power3.inOut' });
    if (!state.footerVisible) gsap.to(header, { autoAlpha: 1, duration: .6 });
    lenis.start();
  }
  $$('[data-quote-open]').forEach(function (b) { b.addEventListener('click', function () { showPanel(quotePanel); }); });
  $('[data-quote-close]').addEventListener('click', function () { hidePanel(quotePanel); });
  $('[data-scope-close]').addEventListener('click', function () { hidePanel(scopePanel); });
  overlay.addEventListener('click', function () { if (openPanel) hidePanel(openPanel); else if (state.menuOpen) closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (openPanel) hidePanel(openPanel); else closeMenu(); } });

  function openScope(id) {
    var tpl = $('[data-scope-tpl="' + id + '"]');
    if (!tpl) return;
    scopeContent.innerHTML = '';
    scopeContent.appendChild(tpl.content.cloneNode(true));
    showPanel(scopePanel);
    var heading = $('.panel-heading', scopeContent);
    gsap.from($$('.panel-row, .panel-header', scopeContent), { autoAlpha: 0, y: 40, stagger: .08, duration: 1, delay: .4, ease: 'power3.out' });
    if (heading) SplitText.create(heading, { type: 'lines', mask: 'lines', linesClass: 'line', onSplit: function (self) {
      return gsap.from(self.lines, { yPercent: 200, stagger: .1, duration: 1.5, delay: .3, ease: 'power3.out' });
    } });
  }
  $$('[data-scope-open]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); openScope(el.getAttribute('data-scope-open')); });
  });

  /* enquiry forms (panel + contact section): scope pills, FormSubmit AJAX, mailto fallback */
  $$('[data-enquiry]').forEach(function (form) {
    var input = $('[data-scope-input]', form), pills = $$('.panel-button', form);
    pills.forEach(function (b) {
      b.addEventListener('click', function () {
        pills.forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active'); input.value = b.getAttribute('data-scope');
      });
    });
    var status = $('[data-form-status]', form), submit = $('button[type="submit"]', form);
    var to = form.getAttribute('data-mailto');
    var mailto = function (d) {
      var g = function (k) { return String(d[k] || ''); };
      var subject = 'Website enquiry: ' + (g('scope') || 'road works') + ' (' + (g('company') || g('name')) + ')';
      var bodyTxt = ['Name: ' + g('name'), 'Company: ' + g('company'), 'Phone: ' + g('phone'), 'Email: ' + g('email'), 'Scope: ' + g('scope'), '', g('message')].join('\n');
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyTxt);
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form), d = {};
      fd.forEach(function (v, k) { d[k] = String(v); });
      if (d._honey) return; // bot
      if (status) { status.textContent = 'Sending your enquiry…'; status.className = 'form-status'; }
      if (submit) submit.setAttribute('disabled', 'disabled');
      var payload = { name: d.name, company: d.company, phone: d.phone, email: d.email, scope: d.scope, message: d.message,
        _subject: 'Website enquiry: ' + (d.scope || 'road works') + ' from ' + (d.company || d.name), _template: 'table', _captcha: 'false', _replyto: d.email };
      fetch('https://formsubmit.co/ajax/' + to, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (!res.ok || !(res.j && (res.j.success === 'true' || res.j.success === true))) throw new Error((res.j && res.j.message) || 'send failed');
          if (status) { status.textContent = 'Thank you. Your enquiry is on its way to AKSB Global; we will come back to you shortly.'; status.className = 'form-status is-ok'; }
          form.reset(); pills.forEach(function (x, i) { x.classList.toggle('is-active', i === 0); }); if (pills[0]) input.value = pills[0].getAttribute('data-scope');
        })
        .catch(function () {
          if (status) { status.textContent = 'The form service did not respond, so we are opening your mail app with the enquiry filled in.'; status.className = 'form-status is-err'; }
          mailto(d);
        })
        .finally(function () { if (submit) submit.removeAttribute('disabled'); });
    });
  });

  /* ============================================================
     Scroll-to buttons
     ============================================================ */
  $$('[data-goto]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (el.hasAttribute('data-scope-open')) return; // hero tiles open the scope panel instead
      var id = el.getAttribute('data-goto');
      if (state.menuOpen) { closeMenu(); setTimeout(function () { scrollTo(id); }, 350); }
      else scrollTo(id);
    });
  });

  /* ============================================================
     Hero (BWo3Q_k7): heading fades in the first 10%, media parallaxes
     ============================================================ */
  var heroBg = $('[data-tiles]');
  gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
    .fromTo($('.row:first-child .base-heading', hero), { autoAlpha: 1 }, { autoAlpha: 0, duration: .1 }, 0)
    .fromTo(heroBg, { yPercent: 0 }, { yPercent: 50 }, 0);

  /* ============================================================
     Core business blocks: parallax (HQSNxkYG2) + scale-in + hover (C-FmQBZp2, DnxAbotE)
     ============================================================ */
  var collection = $('.product-collection');
  $$('.product-collection .block').forEach(function (block) {
    var t = parseFloat(block.getAttribute('data-parallax') || '0') * (window.innerWidth / 1600);
    gsap.fromTo(block, { y: 0 }, { y: t, ease: 'none', scrollTrigger: { trigger: collection, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  $$('[data-img]').forEach(function (img) {
    var host = img.closest('.block, .tile, .service') || img;
    gsap.fromTo(img, { scale: 1.1 }, { scale: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: host, start: 'top bottom' } });
    if (isTouch) return;
    host.addEventListener('mouseenter', function () { gsap.to(img, { scale: 1.1, duration: 1, ease: 'power3.out' }); });
    host.addEventListener('mouseleave', function () { gsap.to(img, { scale: 1, duration: 2, ease: 'power3.out' }); });
  });

  /* ============================================================
     Core business: scroll-driven slider (v1's sticky row, template styling)
     ============================================================ */
  var services = $('[data-services]');
  if (services && window.innerWidth > 600) {
    var sTrack = $('[data-services-track]'), sBar = $('[data-services-bar]'), sCount = $('[data-services-count]');
    var sN = $$('.service', sTrack).length;
    var shift = function () { return Math.max(0, sTrack.scrollWidth - window.innerWidth + remPx(4)); };
    gsap.to(sTrack, { x: function () { return -shift(); }, ease: 'none',
      scrollTrigger: { trigger: services, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true,
        onUpdate: function (st) {
          sBar.style.width = (st.progress * 100) + '%';
          var i = Math.min(sN - 1, Math.floor(st.progress * sN + .0001)), t = (i < 9 ? '0' : '') + (i + 1);
          if (sCount.textContent !== t) sCount.textContent = t;
        } } });
    $$('.service', sTrack).forEach(function (card) {
      card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); } });
    });
  }

  /* ============================================================
     Head office banner (B4vk5dQk2): pinned 200svh scrub
     ============================================================ */
  var banner = $('[data-banner]');
  if (banner && window.innerWidth > 600) {
    var U = window.innerWidth / 100;
    gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: banner, start: 'top top', end: 'bottom bottom', scrub: true } })
      .fromTo($('[data-banner-left]'), { x: U * 65 }, { x: 0 }, 0)
      .fromTo($('[data-banner-right]'), { x: -U * 65 }, { x: 0 }, 0)
      .fromTo($('[data-banner-border]'), { scaleX: 0 }, { scaleX: 1 }, 0)
      .fromTo($('[data-banner-media]'), { opacity: .7, scale: .55 }, { opacity: 1, scale: 1 }, 0);
  } else if (banner) {
    gsap.fromTo($('[data-banner-media]'), { scale: 1.1 }, { scale: 1, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: banner, start: 'top 80%' } });
  }

  /* ============================================================
     Photo duo (DnxAbotE): opposite parallax
     ============================================================ */
  var duo = $('.assets-duo');
  if (duo) {
    gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: duo, start: 'top bottom', end: 'bottom top', scrub: true } })
      .fromTo($('[data-duo="1"]'), { yPercent: 30 }, { yPercent: 0 }, 0)
      .fromTo($('[data-duo="2"]'), { yPercent: -22 }, { yPercent: 0 }, 0);
  }

  /* ============================================================
     Certifications slider (4MOBlhN5)
     ============================================================ */
  var slider = $('[data-slider]');
  if (slider) {
    var slides = $$('[data-slide]', slider), idx = 0, busy = false;
    var indexEl = $('[data-slider-index]', slider);
    var splits = slides.map(function (s) { return SplitText.create($('[data-slide-text]', s), { type: 'lines', mask: 'lines', linesClass: 'line' }); });
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    function go(dir) {
      if (busy) return; busy = true;
      var prev = idx; idx = (idx + dir + slides.length) % slides.length;
      var pl = slides[prev], nx = slides[idx];
      gsap.fromTo(pl, { autoAlpha: 1 }, { autoAlpha: 0, ease: 'power3.inOut', onComplete: function () { pl.classList.remove('is-active'); } });
      nx.classList.add('is-active');
      gsap.fromTo(nx, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'power3.inOut' });
      gsap.fromTo(splits[idx].lines, { yPercent: dir === 1 ? 200 : -200 }, { yPercent: 0, stagger: dir === 1 ? .1 : -.1, duration: 1.5, ease: 'power3.out', onComplete: function () { busy = false; } });
      gsap.timeline().to(indexEl, { yPercent: -100, duration: .3, ease: 'power3.in', onComplete: function () { indexEl.textContent = pad(idx + 1); } })
        .set(indexEl, { yPercent: 100 }).to(indexEl, { yPercent: 0, duration: .3, ease: 'power3.out' });
    }
    indexEl.style.display = 'inline-block';
    $('[data-slider-next]', slider).addEventListener('click', function () { go(1); });
    $('[data-slider-prev]', slider).addEventListener('click', function () { go(-1); });
    // first slide's lines reveal like any other big text
    gsap.set(splits[0].lines, { yPercent: 200 });
    gsap.to(splits[0].lines, { yPercent: 0, stagger: .1, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: slider, start: 'top bottom' } });
  }

  /* ============================================================
     Certifications: auto-drifting strip, drag / swipe, pause while held
     ============================================================ */
  var cm = $('[data-cert-marquee]');
  if (cm) {
    var ctrack = $('[data-cert-track]', cm), cset = $('[data-cert-set]', cm);
    var clone = cset.cloneNode(true); clone.setAttribute('aria-hidden', 'true'); ctrack.appendChild(clone);
    var cx0 = 0, half = 0, speed = window.innerWidth <= 600 ? 28 : 40, dragging = false, hovering = false, vel = 0, lastX = 0, lastT = 0, moved = 0, startX = 0, startOff = 0;
    var measure = function () { half = cset.getBoundingClientRect().width; };
    measure(); window.addEventListener('resize', measure); if (window.ResizeObserver) new ResizeObserver(measure).observe(cset);
    var wrap = function () { if (half <= 0) return; while (cx0 <= -half) cx0 += half; while (cx0 > 0) cx0 -= half; };
    gsap.ticker.add(function (t, dt) {
      if (dragging) return;
      var s = dt / 1000;
      if (Math.abs(vel) > 8) { cx0 += vel * s; vel *= Math.pow(.05, s); }     // release inertia
      else if (!hovering) cx0 -= speed * s;                                    // idle drift
      wrap(); ctrack.style.transform = 'translate3d(' + cx0.toFixed(2) + 'px,0,0)';
    });
    cm.addEventListener('pointerdown', function (e) {
      dragging = true; moved = 0; vel = 0; startX = e.clientX; startOff = cx0; lastX = e.clientX; lastT = performance.now();
      cm.classList.add('is-dragging'); cm.setPointerCapture && cm.setPointerCapture(e.pointerId);
    });
    cm.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var now = performance.now(), dx = e.clientX - startX; moved = Math.max(moved, Math.abs(dx));
      cx0 = startOff + dx; wrap(); ctrack.style.transform = 'translate3d(' + cx0.toFixed(2) + 'px,0,0)';
      var dtm = now - lastT; if (dtm > 0) vel = (e.clientX - lastX) / dtm * 1000; lastX = e.clientX; lastT = now;
    });
    var release = function () { if (!dragging) return; dragging = false; cm.classList.remove('is-dragging'); vel = Math.max(-1400, Math.min(1400, vel)); };
    cm.addEventListener('pointerup', release); cm.addEventListener('pointercancel', release); cm.addEventListener('lostpointercapture', release);
    cm.addEventListener('click', function (e) { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
    if (!isTouch) { cm.addEventListener('mouseenter', function () { hovering = true; }); cm.addEventListener('mouseleave', function () { hovering = false; }); }
  }

  /* ============================================================
     Count-ups (achievements)
     ============================================================ */
  $$('[data-countup]').forEach(function (el) {
    var value = parseInt(el.getAttribute('data-countup'), 10), suffix = el.getAttribute('data-suffix') || '';
    var obj = { v: 0 };
    el.textContent = '0' + suffix;
    gsap.to(obj, { v: value, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: function () { el.textContent = Math.round(obj.v).toLocaleString('en-MY') + suffix; } });
  });

  /* ============================================================
     FAQ accordion (new section)
     ============================================================ */
  var faq = $('[data-faq]');
  if (faq) {
    var btns = $$('.faq-btn', faq);
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btns.forEach(function (b) {
          var on = b === btn && !open;
          b.setAttribute('aria-expanded', String(on));
          b.nextElementSibling.style.gridTemplateRows = on ? '1fr' : '0fr';
        });
      });
    });
  }

  /* ============================================================
     CTA line art (D2pUEKVx2): drawSVG scrubbed across the section
     ============================================================ */
  var draw = $('[data-draw]');
  if (draw) {
    var paths = $$('path', draw);
    gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: draw.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true } })
      .fromTo(paths, { drawSVG: '0%' }, { drawSVG: '100%' })
      .fromTo(paths, { drawSVG: '0% 100%' }, { drawSVG: '100% 100%' });
  }

  /* ============================================================
     Footer (oAny8dKD): content parallax + wordmark reveal; pill hides
     ============================================================ */
  var footer = $('[data-footer]');
  if (footer) {
    gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: footer, start: 'top bottom', end: 'bottom bottom', scrub: true,
        onEnter: function () { state.footerVisible = true; gsap.to(header, { autoAlpha: 0, duration: .5 }); },
        onLeaveBack: function () { state.footerVisible = false; if (!state.panelOpen) gsap.to(header, { autoAlpha: 1, duration: .5 }); } } })
      .fromTo($('[data-footer-content]'), { yPercent: -50 }, { yPercent: 0, duration: 1 }, 0)
      .fromTo($('[data-footer-wordmark]'), { backgroundPosition: '0% 50%' }, { backgroundPosition: '80% 50%', duration: 1 }, 0);
  }

  /* ---------- year ---------- */
  var y = $('[data-year]'); if (y) y.textContent = new Date().getFullYear();

  /* ============================================================
     Boot
     ============================================================ */
  function boot() {
    setupText();
    ScrollTrigger.refresh();
    if (reduced) {
      intro.style.display = 'none'; hero.classList.add('is-loaded');
      $$('[data-split]').forEach(function (el) { el.classList.add('is-split'); });
      header.style.visibility = 'visible'; pageHeader.style.visibility = 'visible';
      introDone();
      return;
    }
    runIntro();
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(boot); else boot();
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();

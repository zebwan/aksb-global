const scrollLine = document.getElementById('scrollLine');
const heroBg = document.getElementById('heroBg');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

function updateScrollEffects() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  scrollLine.style.width = `${progress}%`;

  const heroMove = Math.min(window.scrollY * 0.08, 38);
  heroBg.style.transform = `scale(1.04) translateY(${heroMove}px)`;
}

window.addEventListener('scroll', updateScrollEffects);
updateScrollEffects();

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});

document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

const cards = document.querySelectorAll('.project-card');

cards.forEach((card) => {
  card.addEventListener('click', () => {
    cards.forEach((item) => {
      item.classList.remove('featured');
      item.classList.add('faded');
    });

    card.classList.remove('faded');
    card.classList.add('featured');
  });
});

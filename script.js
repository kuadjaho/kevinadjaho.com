// ===================================================================
//  Ulysse Kevin Adjaho - interactions
// ===================================================================

// --- Année dans le footer ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Header : fond au scroll ---
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// --- Menu mobile ---
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
// Refermer au clic sur un lien
nav.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  })
);

// --- Compteurs animés ---
// Séparateur décimal selon la langue de la page (fr : virgule, en : point)
const DEC_SEP = document.documentElement.lang.startsWith('en') ? '.' : ',';

// Pas d'animation pour les navigateurs automatisés (robots, captures d'écran,
// outils d'IA) ni pour les visiteurs qui préfèrent moins de mouvement : ils
// doivent lire la valeur finale tout de suite, jamais un « 0 » intermédiaire.
const SKIP_COUNT_ANIMATION =
  navigator.webdriver === true ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix || '';
  const numEl = el.querySelector('.stat-num');
  if (SKIP_COUNT_ANIMATION) {
    numEl.textContent = target.toFixed(decimals).replace('.', DEC_SEP) + suffix;
    return;
  }
  const duration = 1600;
  const start = performance.now();

  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    const value = (target * eased).toFixed(decimals);
    numEl.textContent = value.replace('.', DEC_SEP) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else numEl.textContent = target.toFixed(decimals).replace('.', DEC_SEP) + suffix;
  }
  requestAnimationFrame(tick);
}

// --- Observers : stats + reveal ---
const statObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.stat').forEach(s => statObserver.observe(s));

// Éléments à révéler au scroll
const revealTargets = document.querySelectorAll(
  '.section-head, .card, .case-main, .case-side, .tl-item, .edu-col, .contact-text, .contact-form'
);
revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
});
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach(el => revealObserver.observe(el));

// Respect prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach(el => el.classList.add('visible'));
}

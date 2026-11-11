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

// --- Chiffres clés ---
// Les valeurs sont écrites en dur dans le HTML, sans compteur animé : robots,
// captures d'écran et lecteurs pressés voient toujours les vrais chiffres.

// --- Observer : reveal ---

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

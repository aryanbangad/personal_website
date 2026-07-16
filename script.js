// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.getElementById('nav-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', false);
}));

// Active nav link on scroll
const navLinks = document.querySelectorAll('[data-nav]');
const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

const setActive = () => {
  let current = null;
  const y = window.scrollY + 120;
  sections.forEach(sec => { if (sec.offsetTop <= y) current = sec; });
  navLinks.forEach(a => a.classList.toggle('active', current && a.getAttribute('href') === `#${current.id}`));
};
window.addEventListener('scroll', setActive, { passive: true });
setActive();

// Scroll reveal
const revealTargets = document.querySelectorAll('.card, .timeline li, .skills-col, .about-grid, .path-card');
revealTargets.forEach(el => el.setAttribute('data-reveal', ''));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => io.observe(el));

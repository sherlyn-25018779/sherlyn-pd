// ===== Mobile menu =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== Typing effect on the home page =====
const typed = document.getElementById('typed');
if (typed) {
  const words = JSON.parse(typed.dataset.words);
  if (reduceMotion) {
    typed.textContent = words.join(' | ');
  } else {
    let w = 0, c = 0, deleting = false;
    (function type() {
      const word = words[w];
      typed.textContent = word.slice(0, c);
      if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 1400); }
      if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; }
      c += deleting ? -1 : 1;
      setTimeout(type, deleting ? 40 : 90);
    })();
  }
}

// ===== Hero: objects follow the mouse a little (desktop only) =====
const hero = document.querySelector('.hero2');
const stage = document.getElementById('stage');
if (hero && stage && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;   // -0.5 … 0.5
    const y = (e.clientY - r.top) / r.height - 0.5;
    stage.style.setProperty('--mx', (x * 16) + 'px');
    stage.style.setProperty('--my', (y * 12) + 'px');
  });
  hero.addEventListener('mouseleave', () => {
    stage.style.setProperty('--mx', '0px');
    stage.style.setProperty('--my', '0px');
  });
}

// ===== Featured projects carousel =====
const carousel = document.getElementById('carousel');
if (carousel) {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector('.car-prev');
  const nextBtn = carousel.querySelector('.car-next');
  const dotsBox = carousel.querySelector('.car-dots');
  let index = 0;
  let timer = null;

  const perView = () => parseInt(getComputedStyle(track).getPropertyValue('--per')) || 1;
  const maxIndex = () => Math.max(0, slides.length - perView());

  function buildDots() {
    dotsBox.innerHTML = '';
    for (let i = 0; i <= maxIndex(); i++) {
      const d = document.createElement('button');
      d.type = 'button';
      d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      d.addEventListener('click', () => { go(i); restart(); });
      dotsBox.appendChild(d);
    }
  }

  function go(i) {
    const max = maxIndex();
    index = i > max ? 0 : i < 0 ? max : i;          // loops around
    const offset = slides[index].offsetLeft - slides[0].offsetLeft;
    track.style.transform = 'translateX(' + -offset + 'px)';
    Array.from(dotsBox.children).forEach((d, n) => d.classList.toggle('on', n === index));
  }

  function restart() {
    clearInterval(timer);
    if (!reduceMotion && slides.length > perView()) timer = setInterval(() => go(index + 1), 5000);
  }

  prevBtn.addEventListener('click', () => { go(index - 1); restart(); });
  nextBtn.addEventListener('click', () => { go(index + 1); restart(); });

  // pause while the mouse is over it / a button has focus
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', restart);
  carousel.addEventListener('focusin', () => clearInterval(timer));
  carousel.addEventListener('focusout', restart);

  // swipe on touch screens
  let startX = 0;
  carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) { go(index + (dx < 0 ? 1 : -1)); restart(); }
  });

  // rebuild when the screen size changes (3 → 2 → 1 cards)
  window.addEventListener('resize', () => { buildDots(); go(Math.min(index, maxIndex())); });

  buildDots();
  go(0);
  restart();
}

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// ===== Flip cards: tap to flip on touch screens =====
document.querySelectorAll('.flip').forEach((card) => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    card.classList.toggle('flipped');
  });
});
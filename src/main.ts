window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader')?.classList.add('hide');
  }, 900);
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
});

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  document.querySelectorAll<HTMLAnchorElement>('#mobileMenu a').forEach((a) => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

const slides = document.querySelectorAll<HTMLDivElement>('.hero-slide');
const heroDotsWrap = document.getElementById('heroDots');
let currentSlide = 0;
if (heroDotsWrap && slides.length) {
  slides.forEach((slide, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.style.background = i === 0 ? 'var(--gold)' : 'rgba(255,255,255,.5)';
    dot.addEventListener('click', () => showSlide(i));
    heroDotsWrap.appendChild(dot);
  });
}

function showSlide(i: number) {
  slides.forEach((slide) => slide.classList.remove('active'));
  slides[i]?.classList.add('active');
  document.querySelectorAll<HTMLElement>('#heroDots .dot').forEach((dot, idx) => {
    dot.style.background = idx === i ? 'var(--gold)' : 'rgba(255,255,255,.5)';
  });
  currentSlide = i;
}

if (slides.length) {
  setInterval(() => {
    showSlide((currentSlide + 1) % slides.length);
  }, 5000);
}

const particleContainer = document.getElementById('particles');
if (particleContainer) {
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${Math.random() * 8 + 8}s`;
    p.style.animationDelay = `${Math.random() * 8}s`;
    particleContainer.appendChild(p);
  }
}

const revealEls = document.querySelectorAll<HTMLElement>('.reveal, .reveal-scale');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => observer.observe(el));

const counters = document.querySelectorAll<HTMLElement>('.counter-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target as HTMLElement);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach((counter) => counterObserver.observe(counter));

function animateCounter(el: HTMLElement) {
  const target = parseFloat(el.getAttribute('data-target') ?? '0');
  const suffix = el.getAttribute('data-suffix') || '';
  const isDecimal = target % 1 !== 0;
  let current = 0;
  const duration = 1800;
  const steps = 60;
  const increment = target / steps;
  let step = 0;
  const timer = window.setInterval(() => {
    step++;
    current += increment;
    if (step >= steps) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = isDecimal
      ? `${current.toFixed(1)}${suffix}`
      : `${Math.floor(current).toLocaleString()}${suffix}`;
  }, duration / steps);
}

document.querySelectorAll<HTMLElement>('.ripple').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const circle = document.createElement('span');
    const diameter = Math.max(rect.width, rect.height);
    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
    circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;
    circle.classList.add('ripple-effect');
    this.appendChild(circle);
    window.setTimeout(() => circle.remove(), 600);
  });
});

const galleryImages = [
  '/photo_2026-07-06_11-50-04.jpg',
  '/photo_2026-07-06_11-50-11.jpg',
  '/double-bed.jpg',
  '/four-bed.jpg',
  '/photo_2026-07-06_11-50-16.jpg',
  '/photo_2026-07-06_11-50-18.jpg',
  '/photo_2026-07-06_11-50-19.jpg',
  '/photo_2026-07-06_11-50-20.jpg',
  '/photo_2026-07-06_11-50-21.jpg'
];
const galleryGrid = document.getElementById('galleryGrid');
if (galleryGrid) {
  galleryImages.forEach((file, idx) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `<img src="${file}" loading="lazy" alt="Hotel Richa gallery image ${idx + 1}" onclick="openLightbox(${idx})">`;
    galleryGrid.appendChild(div);
  });
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg') as HTMLImageElement | null;
let lbIndex = 0;
function openLightbox(idx: number) {
  lbIndex = idx;
  lightbox?.classList.add('active');
  if (lightboxImg) lightboxImg.src = galleryImages[idx];
}
function closeLightbox() {
  lightbox?.classList.remove('active');
}
function changeSlide(dir: number) {
  lbIndex = (lbIndex + dir + galleryImages.length) % galleryImages.length;
  if (lightboxImg) lightboxImg.src = galleryImages[lbIndex];
}
lightbox?.addEventListener('click', function (e) {
  if (e.target === this) closeLightbox();
});

const testimonials = [
  { name: 'Ramesh Gupta', loc: 'Indore', rating: 5, text: 'Excellent stay near Mahakaleshwar temple. Rooms were clean, staff was very cooperative and food was delicious. Highly recommend Hotel Richa for pilgrims.' },
  { name: 'Priya Sharma', loc: 'Bhopal', rating: 5, text: 'We stayed with our family and had a wonderful experience. The four bed room was spacious and comfortable. Great value for money.' },
  { name: 'Amit Verma', loc: 'Delhi', rating: 4, text: 'Good location, easy access to the railway station and temples. AC and WiFi worked perfectly throughout our stay.' },
  { name: 'Sunita Joshi', loc: 'Indore', rating: 5, text: 'Very hospitable staff, quick room service, and a peaceful environment. Will definitely book again on our next Ujjain trip.' },
  { name: 'Vikram Singh', loc: 'Ujjain', rating: 5, text: 'Perfect for a short business trip. Clean rooms, hot water, and quick check-in. Highly recommend Hotel Richa.' }
];
const track = document.getElementById('testimonialTrack');
const dotsWrap = document.getElementById('testimonialDots');
let tIndex = 0;

function renderTestimonial(i: number) {
  if (!track || !dotsWrap) return;
  const t = testimonials[i];
  track.innerHTML = `
    <div class="testimonial-card reveal visible">
      <div class="stars mb-3">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
      <p class="text-gray-600 italic leading-relaxed">"${t.text}"</p>
      <h4 class="font-heading font-semibold mt-6 text-lg">${t.name}</h4>
      <p class="text-sm text-gray-400">${t.loc}</p>
    </div>
  `;
  document.querySelectorAll<HTMLElement>('#testimonialDots .dot').forEach((d, idx) => {
    d.classList.toggle('active', idx === i);
  });
}

testimonials.forEach((_, i) => {
  if (!dotsWrap) return;
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => {
    tIndex = i;
    renderTestimonial(i);
  });
  dotsWrap.appendChild(dot);
});
renderTestimonial(0);
setInterval(() => {
  tIndex = (tIndex + 1) % testimonials.length;
  renderTestimonial(tIndex);
}, 5500);

function submitForm(e: Event): boolean {
  e.preventDefault();
  const form = e.target as HTMLFormElement | null;
  if (!form) return false;
  const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
  const name = inputs[0]?.value ?? '';
  const phone = inputs[1]?.value ?? '';
  const msg = inputs[2]?.value ?? '';
  const text = encodeURIComponent(`Hi, I'm ${name} (${phone}). ${msg}`);
  window.open(`https://wa.me/919425134968?text=${text}`, '_blank');
  return false;
}

document.querySelector<HTMLFormElement>('form')?.addEventListener('submit', submitForm);

window.addEventListener('scroll', () => {
  const heroContent = document.querySelector<HTMLElement>('.hero-content');
  const scrolled = window.scrollY;
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = `${1 - scrolled / 700}`;
  }
});

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeSlide = changeSlide;
window.submitForm = submitForm;

declare global {
  interface Window {
    openLightbox: (idx: number) => void;
    closeLightbox: () => void;
    changeSlide: (dir: number) => void;
    submitForm: (e: Event) => boolean;
  }
}

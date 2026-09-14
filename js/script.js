// ==========================================================
// i9 Volt — script.js
// ==========================================================

const WHATS_BASE = 'https://wa.me/5516996483246';

/* ---------- Dados dos modelos ----------
   Preço e specs completas confirmados publicamente apenas para o i9 M6.
   Os demais modelos exibem "Consulte" até a loja informar valores —
   ajuste os preços/specs abaixo assim que tiver os dados oficiais.
   OBS: o arquivo de imagem enviado para o "triciclo" chama-se
   MOTOS-I9QUADRICICLO.webp — troquei o nome do modelo para "i9 Quadriciclo"
   para bater com o asset real. Confirme o nome oficial e ajuste se preciso. */
const MODELS = [
  {
    name: 'i9 M6',
    price: 'R$ 12.990',
    desc: 'Scooter elétrica potente e robusta, com para-brisa, protetores laterais e bagageiro traseiro.',
    specs: { 'Motor': '1000W', 'Vel. máx.': '32 km/h', 'Autonomia': '55–60 km', 'Carga máx.': '180 kg' },
    badge: 'Mais completa',
    img: 'assets/m6-1-rounded.webp'
  },
  {
    name: 'i9 Scooter',
    price: 'Consulte',
    desc: 'Estilo urbano com cor marcante. Ágil, silenciosa e perfeita para o dia a dia na cidade.',
    img: 'assets/MOTOS-I9SCOOTER.webp'
  },
  {
    name: 'i9 Adventure',
    price: 'Consulte',
    desc: 'Visual robusto, faróis duplos e pegada esportiva para quem busca mais aventura e desempenho.',
    img: 'assets/MOTOS-I9ADVENTURE.webp'
  },
  {
    name: 'i9 Urbana Plus',
    price: 'Consulte',
    desc: 'Equilíbrio entre autonomia, conforto e design urbano para o dia a dia ativo.',
    img: 'assets/MOTOS-I9URBANAPLUS.webp'
  },
  {
    name: 'i9 Mobilidade Urbana',
    price: 'Consulte',
    desc: 'Estilo citycoco com pneus largos e muita presença — liberdade total para passeios curtos.',
    img: 'assets/MOTOS-I9MOBILIDADEURBANA.webp'
  },
  {
    name: 'i9 Quadriciclo',
    price: 'Consulte',
    desc: 'Estabilidade, cesto frontal e assento confortável — mobilidade segura para todas as idades.',
    img: 'assets/MOTOS-I9QUADRICICLO.webp'
  },
  {
    name: 'i9 AG16',
    price: 'Consulte',
    desc: 'Scooter esportiva com baú, para-brisa e visual agressivo — pronta para encarar a rotina urbana.',
    img: 'assets/MOTOS-I9AG16.webp'
  },
  {
    name: 'i9 Capuccino',
    price: 'Consulte',
    desc: 'Estilo retrô com detalhes cromados e acabamento premium — charme e conforto para passeios pela cidade.',
    img: 'assets/MOTOS-I9CAPUCCINO3.webp'
  },
  {
    name: 'i9 Milkshake',
    price: 'Consulte',
    desc: 'Design clean e minimalista, ideal para quem busca leveza, praticidade e um visual único.',
    img: 'assets/MOTOS-I9MILKSHAKE.webp'
  },
  {
    name: 'i9 Smart Wheel',
    price: 'Consulte',
    desc: 'Scooter inteligente com baú traseiro e design compacto — mobilidade ágil para todos os dias.',
    img: 'assets/MOTOS-I9SMARTWHEL1.webp'
  }
];

function renderModels() {
  const grid = document.getElementById('modelosGrid');
  if (!grid) return;

  grid.innerHTML = MODELS.map((m) => {
    const specsHtml = m.specs
      ? `<ul class="model-specs">${Object.entries(m.specs).map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join('')}</ul>`
      : '';
    const priceClass = m.price === 'Consulte' ? 'model-price tbd' : 'model-price';
    const badge = m.badge ? `<span class="model-badge">${m.badge}</span>` : '';
    const msg = encodeURIComponent(`Olá! Tenho interesse no modelo ${m.name} da i9 Volt.`);

    return `
      <div class="model-card">
        <div class="model-media">${badge}<img src="${m.img}" alt="${m.name} — scooter/moto elétrica i9 Volt, ${m.desc}" loading="lazy"></div>
        <div class="model-body">
          <h3>${m.name}</h3>
          <span class="${priceClass}">${m.price}</span>
          <p class="model-desc">${m.desc}</p>
          ${specsHtml}
          <a class="model-cta" target="_blank" rel="noopener" href="${WHATS_BASE}?text=${msg}">Saiba mais →</a>
        </div>
      </div>
    `;
  }).join('');
}

/* ---------- Hero carousel ---------- */
function initHero() {
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dotsWrap = document.getElementById('heroDots');
  if (!slides.length || !dotsWrap) return;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    resetTimer();
  }

  function next() { goTo(current + 1); }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }

  resetTimer();
}

/* ---------- Mobile nav ---------- */
function initNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- FAQ accordion ---------- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ---------- Header: sombra/fundo ao rolar ---------- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Animação ao rolar a página (scroll reveal) ---------- */
function initScrollReveal() {
  const selector = [
    '.section-title', '.section-sub', '.intro-text',
    '.card', '.model-card', '.accordion-item',
    '.sobre-text', '.sobre-media',
    '.test-ride-text', '.test-ride-visual',
    '.cta-final h2', '.cta-final p', '.cta-final .hero-actions'
  ].join(', ');

  const els = Array.from(document.querySelectorAll(selector));
  if (!els.length) return;

  // Agrupa por elemento-pai para criar um efeito "em cascata" (stagger)
  const groups = new Map();
  els.forEach(el => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach(list => {
    list.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 90}ms`);
    });
  });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  renderModels();
  initHero();
  initNav();
  initAccordion();
  initHeaderScroll();
  initScrollReveal();
});

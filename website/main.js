/* ==========================================================================
   Berda Marketing shared front-end behavior
   ========================================================================== */

/* ---------------- Real client data ---------------- */
const BERDA_TESTIMONIALS = [
  {
    category: "web",
    stars: 5,
    name: "Branton",
    business: "Driven By Jada",
    photo: "assets/driven-by-jada-logo.jpg",
    quote: "", quoteEnabled: false,
    image: "assets/driven-by-jada-website-screenshot.jpg", imageEnabled: true,
    audio: "assets/branton-testimonial-audio.m4a", audioEnabled: true,
    video: "", videoEnabled: false,
    link: "", linkEnabled: false
  },
  {
    category: "web",
    stars: 5,
    name: "Ziad",
    business: "LexStone Epoxy",
    photo: "assets/lexstone-logo.png",
    quote: "I am very pleased with the website development service provided. The work was handled professionally, with great attention to detail and a clear understanding of our requirements.",
    quoteEnabled: true,
    image: "assets/lexstone-website-screenshot.jpg", imageEnabled: true,
    audio: "", audioEnabled: false,
    video: "", videoEnabled: false,
    link: "https://lexstonechem.com", linkEnabled: true
  },
  {
    category: "web",
    stars: 5,
    name: "Cristian",
    business: "Top Dawg Detailing",
    photo: "assets/topdawg-logo.png",
    quote: "I am very pleased with how the website turned out and communication is on point. His hosting is very reliable and he is constantly updating my site.",
    quoteEnabled: true,
    image: "assets/topdawg-website-screenshot.jpg", imageEnabled: true,
    audio: "", audioEnabled: false,
    video: "", videoEnabled: false,
    link: "https://topdawgdetailing.net", linkEnabled: true
  },
  {
    category: "web",
    stars: 5,
    name: "Seif",
    business: "Align Trading",
    photo: "assets/align-trading-logo.png",
    quote: "Berda Marketing did a great job with building my website, I highly recommend them!",
    quoteEnabled: true,
    image: "assets/align-trading-website-screenshot.jpg", imageEnabled: true,
    audio: "", audioEnabled: false,
    video: "", videoEnabled: false,
    link: "", linkEnabled: false
  },
  {
    category: "web",
    stars: 5,
    name: "Alfredo",
    business: "Sagaz Dental",
    photo: "assets/sagaz-dental-logo.png",
    quote: "Absolutely outstanding experience. They transformed our website into something modern, fast, and conversion-focused. Communication was clear and the results exceeded expectations. Highly recommend!",
    quoteEnabled: true,
    image: "assets/sagaz-dental-website-screenshot.jpg", imageEnabled: true,
    audio: "", audioEnabled: false,
    video: "", videoEnabled: false,
    link: "", linkEnabled: false
  },
  {
    category: "web",
    stars: 5,
    name: "Brayden",
    business: "Krazy Duck Customs",
    photo: "assets/krazy-duck-logo.jpg",
    quote: "Best I ever seen do a website. I am so honored for his help.",
    quoteEnabled: true,
    image: "assets/krazy-duck-website-screenshot.jpg", imageEnabled: true,
    audio: "", audioEnabled: false,
    video: "", videoEnabled: false,
    link: "", linkEnabled: false
  },
  {
    category: "ads",
    stars: 5,
    name: "Ali",
    business: "Zephyr Customz",
    photo: "assets/zephyr-customz-logo.png",
    quote: "Finally an agency that actually delivers. The pay-per-job model meant zero risk for us and the results spoke for themselves.",
    quoteEnabled: true,
    image: "", imageEnabled: false,
    audio: "", audioEnabled: false,
    video: "", videoEnabled: false,
    link: "", linkEnabled: false
  },
  {
    category: "ads",
    stars: 5,
    name: "Thomas",
    business: "Detail Pros",
    photo: "assets/detail-pros-logo.jpg",
    quote: "Berda Marketing completely changed how we get leads. Within 6 weeks we had more booked jobs than the previous 3 months combined.",
    quoteEnabled: true,
    image: "", imageEnabled: false,
    audio: "", audioEnabled: false,
    video: "", videoEnabled: false,
    link: "", linkEnabled: false
  }
];

const BERDA_RESULTS = [
  {
    business: "Car Wrapping",
    period: "3 months",
    leads: "213 Leads Generated",
    conversion: "11% Conversion Rate",
    revenue: "$24,800 Revenue",
    quote: "The best investment we've made in growing our roofing business."
  },
  {
    business: "Car Detailing",
    period: "1 month",
    leads: "91 Leads Generated",
    conversion: "16% Conversion Rate",
    revenue: "$8,400 Revenue",
    quote: "Berda Marketing filled our schedule solid within the first month."
  }
];

/* ---------------- Mobile nav ---------------- */
function berdaInitNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ---------------- Testimonials grid (testimonials.html) ---------------- */
function berdaTestimonialInitials(name) {
  return (name || '').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function berdaEscapeAttr(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function berdaRenderTestimonialCard(item, delayIndex) {
  const starCount = parseInt(item.stars, 10) || 5;
  const stars = '★'.repeat(starCount) + '☆'.repeat(Math.max(0, 5 - starCount));

  let content = '';
  if (item.imageEnabled && item.image) {
    content += '<img src="' + item.image + '" alt="Testimonial from ' + berdaEscapeAttr(item.name) + '" class="testimonial-content-image">';
  }
  if (item.videoEnabled && item.video) {
    content += '<video controls src="' + item.video + '" class="testimonial-content-video"></video>';
  }
  if (item.quoteEnabled && item.quote) {
    content += '<p class="testimonial-quote">"' + berdaEscapeAttr(item.quote) + '"</p>';
  }
  if (item.audioEnabled && item.audio) {
    content += '<audio controls src="' + item.audio + '" class="testimonial-audio"></audio>';
  }
  if (item.linkEnabled && item.link) {
    content += '<a href="' + item.link + '" target="_blank" rel="noopener" class="btn btn-outline testimonial-link-btn">View Testimonial</a>';
  }

  const avatar = item.photo
    ? '<img src="' + item.photo + '" alt="' + berdaEscapeAttr(item.name) + '">'
    : berdaTestimonialInitials(item.name);

  return '' +
    '<div class="testimonial-card reveal" style="--reveal-delay: ' + (delayIndex * 0.1) + 's">' +
      '<div class="stars">' + stars + '</div>' +
      '<div class="testimonial-content">' + content + '</div>' +
      '<div class="testimonial-author">' +
        '<div class="avatar-circle">' + avatar + '</div>' +
        '<div class="author-info">' +
          '<div class="author-name">' + berdaEscapeAttr(item.name) + '</div>' +
          '<div class="author-business">' + berdaEscapeAttr(item.business) + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
}

function berdaInitTestimonialsGrid() {
  const adsGrid = document.querySelector('[data-testimonials-grid="ads"]');
  const webGrid = document.querySelector('[data-testimonials-grid="web"]');
  if (!adsGrid && !webGrid) return;

  if (adsGrid) {
    adsGrid.innerHTML = BERDA_TESTIMONIALS
      .filter((t) => t.category === 'ads')
      .map((t, i) => berdaRenderTestimonialCard(t, i))
      .join('');
  }

  if (webGrid) {
    webGrid.innerHTML = BERDA_TESTIMONIALS
      .filter((t) => t.category === 'web')
      .map((t, i) => berdaRenderTestimonialCard(t, i))
      .join('');
  }
}

/* ---------------- Real Results (index.html) ---------------- */
function berdaInitResults() {
  const grid = document.querySelector('[data-results-grid]');
  if (!grid) return;

  const data = BERDA_RESULTS;

  const icons = {
    target: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
    trend: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    dollar: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>'
  };

  grid.innerHTML = data.map((r, i) => `
    <div class="result-card reveal" style="--reveal-delay: ${i * 0.1}s">
      <div class="result-top">
        <div class="result-title">${r.business}</div>
        <div class="result-badge">${r.period}</div>
      </div>
      <div class="result-stat">
        <div class="icon-box">${icons.target}</div>
        <div class="result-stat-text">
          <span class="result-stat-value">${r.leads}</span>
        </div>
      </div>
      <div class="result-stat">
        <div class="icon-box">${icons.trend}</div>
        <div class="result-stat-text">
          <span class="result-stat-value">${r.conversion}</span>
        </div>
      </div>
      <div class="result-stat">
        <div class="icon-box">${icons.dollar}</div>
        <div class="result-stat-text">
          <span class="result-stat-value">${r.revenue}</span>
        </div>
      </div>
      <div class="result-quote">"${r.quote}"</div>
    </div>
  `).join('');
}

/* ---------------- Count-up numbers (results stats) ---------------- */
function berdaInitCountUp() {
  const stats = document.querySelectorAll('.result-stat-value');
  if (!stats.length) return;

  if (!('IntersectionObserver' in window)) return;

  function animateCount(el) {
    const text = el.textContent;
    const match = text.match(/^([^\d]*)([\d,]+)(.*)$/);
    if (!match) return;

    const prefix = match[1];
    const targetNum = parseInt(match[2].replace(/,/g, ''), 10);
    const suffix = match[3];
    const duration = 1200;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(targetNum * eased);
      el.textContent = prefix + current.toLocaleString('en-US') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + targetNum.toLocaleString('en-US') + suffix;
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  stats.forEach((el) => observer.observe(el));
}

/* ---------------- Expandable service cards ---------------- */
function berdaInitServiceCards() {
  document.querySelectorAll('.card.expandable').forEach((card) => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-expanded', 'false');

    function toggle() {
      const isOpen = card.classList.toggle('open');
      card.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}

/* ---------------- Scroll reveal ---------------- */
function berdaInitScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach((item) => observer.observe(item));
}

document.addEventListener('DOMContentLoaded', () => {
  berdaInitNav();
  berdaInitResults();
  berdaInitTestimonialsGrid();
  berdaInitServiceCards();
  berdaInitScrollReveal();
  berdaInitCountUp();
});

/* ==========================================================================
   Berda Marketing shared front-end behavior
   ========================================================================== */

/* ---------------- Real client data ---------------- */
const BERDA_TESTIMONIALS = [
  {
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
    stars: 5,
    name: "Ziad",
    business: "LexStone Epoxy",
    photo: "assets/lexstone-logo.png",
    quote: "I am very pleased with the website development service provided. The work was handled professionally, with great attention to detail and a clear understanding of our requirements.",
    quoteEnabled: true,
    image: "assets/lexstone-website-screenshot.jpg", imageEnabled: true,
    audio: "", audioEnabled: false,
    video: "", videoEnabled: false,
    link: "", linkEnabled: false
  },
  {
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

/* ---------------- Testimonial carousel (index.html) ---------------- */
function berdaInitTestimonials() {
  const wrap = document.querySelector('[data-testimonial-carousel]');
  if (!wrap) return;

  const data = BERDA_TESTIMONIALS;
  const contentEl = wrap.querySelector('.testimonial-content');
  const starsEl = wrap.querySelector('.stars');
  const nameEl = wrap.querySelector('.author-name');
  const businessEl = wrap.querySelector('.author-business');
  const avatarEl = wrap.querySelector('.avatar-circle');
  const dotsWrap = wrap.querySelector('.carousel-dots');
  const prevBtn = wrap.querySelector('.carousel-arrow.prev');
  const nextBtn = wrap.querySelector('.carousel-arrow.next');

  let current = 0;

  function initials(name) {
    return (name || '').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  }

  function escapeAttr(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function render() {
    const item = data[current];
    const starCount = parseInt(item.stars, 10) || 5;
    starsEl.textContent = '★'.repeat(starCount) + '☆'.repeat(Math.max(0, 5 - starCount));

    let html = '';
    if (item.quoteEnabled && item.quote) {
      html += '<p class="testimonial-quote">"' + escapeAttr(item.quote) + '"</p>';
    }
    if (item.imageEnabled && item.image) {
      html += '<img src="' + item.image + '" alt="Testimonial from ' + escapeAttr(item.name) + '" class="testimonial-content-image">';
    }
    if (item.videoEnabled && item.video) {
      html += '<video controls src="' + item.video + '" class="testimonial-content-video"></video>';
    }
    if (item.audioEnabled && item.audio) {
      html += '<audio controls src="' + item.audio + '" class="testimonial-audio"></audio>';
    }
    if (item.linkEnabled && item.link) {
      html += '<a href="' + item.link + '" target="_blank" rel="noopener" class="btn btn-outline testimonial-link-btn">View Testimonial</a>';
    }
    contentEl.innerHTML = html;

    nameEl.textContent = item.name;
    businessEl.textContent = item.business;

    if (item.photo) {
      avatarEl.innerHTML = '<img src="' + item.photo + '" alt="' + escapeAttr(item.name) + '">';
    } else {
      avatarEl.textContent = initials(item.name);
    }

    dotsWrap.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    data.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.addEventListener('click', () => {
        current = i;
        render();
      });
      dotsWrap.appendChild(dot);
    });
  }

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + data.length) % data.length;
    render();
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % data.length;
    render();
  });

  buildDots();
  render();
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
  berdaInitTestimonials();
  berdaInitServiceCards();
  berdaInitScrollReveal();
  berdaInitCountUp();
});

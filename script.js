/* ==========================================
   VIDEO EDITOR PORTFOLIO — INTERACTIONS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
  });

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksEl.classList.toggle('open');
  });

  navLinksEl.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinksEl.classList.remove('open');
    });
  });

  // ---- Counter animation ----
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateCounters() {
    statNumbers.forEach(num => {
      const target = parseInt(num.dataset.target);
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        num.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    });
  }

  // ---- Skill bar animation ----
  function animateSkillBars() {
    document.querySelectorAll('.skill-fill').forEach(bar => {
      const width = bar.dataset.width;
      bar.style.width = width + '%';
    });
  }

  // ---- Intersection Observer for reveals ----
  const revealElements = document.querySelectorAll(
    '.section-header, .about-grid, .work-card, .contact-grid, .filter-bar, .skill-card'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));

  // ---- Trigger counters when hero is visible ----
  const heroObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          heroObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroObserver.observe(heroStats);

  // ---- Trigger skill bars when about section is visible ----
  const aboutObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          aboutObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  const aboutSection = document.getElementById('about');
  if (aboutSection) aboutObserver.observe(aboutSection);

  // ---- Portfolio filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      workCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ---- Contact form ----
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');

    contactForm.innerHTML = `
      <div class="form-success">
        <div class="success-icon">✓</div>
        <h3>Message Sent!</h3>
        <p>Thanks ${name}! I'll get back to you within 24 hours.</p>
      </div>
    `;
  });

  // ---- Smooth scroll for all anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

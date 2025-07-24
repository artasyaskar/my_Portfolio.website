export function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

export function handleMobileNav() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links-mobile');
  const navLinks = document.querySelectorAll('.nav-links-mobile li a');

  if (burger && nav) {
    const toggleNav = () => {
      nav.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
      document.body.classList.toggle('no-scroll');
    };

    burger.addEventListener('click', toggleNav);
    navLinks.forEach(link => link.addEventListener('click', toggleNav));
  }
}

export function handleBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });
  }
}

export function handleSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

export function handleCustomCursor() {
  const cursorDot = document.querySelector('[data-cursor-dot]');
  const cursorOutline = document.querySelector('[data-cursor-outline]');

  if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
      const { clientX: posX, clientY: posY } = e;
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: 'forwards' });
    });

    document.querySelectorAll('[data-cursor-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'var(--primary-color)';
        cursorOutline.style.opacity = '0.3';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.opacity = '1';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }
}

export function handleThemeToggler() {
  const themeToggler = document.getElementById('theme-toggler');
  const body = document.body;
  const icon = themeToggler.querySelector('i');

  const setDarkTheme = () => {
    body.classList.remove('light-theme');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  };

  const setLightTheme = () => {
    body.classList.add('light-theme');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  };

  themeToggler.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  });

  // Check for saved theme preference
  if (localStorage.getItem('theme') === 'light') {
    setLightTheme();
  }
}

export function handleScrollAnimations() {
  AOS.init({
    duration: 800,
    once: true,
    offset: 50,
  });
}

export function handlePreloader() {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 200);
    });
  }
}

export function handleSkillBars() {
  const skillBars = document.querySelectorAll('.progress-bar');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const progress = progressBar.dataset.progress;
        progressBar.style.width = `${progress}%`;
        observer.unobserve(progressBar);
      }
    });
  }, {
    threshold: 0.5
  });

  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}

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
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('nav-active');
      burger.classList.toggle('toggle');

      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
      });
    });
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
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
  });
}

export function handleCustomCursor() {
  const cursor = document.querySelector('.cursor');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px;`);
    });

    document.querySelectorAll('a, button, .project-card').forEach(el => {
      el.addEventListener('mouseover', () => {
        cursor.classList.add('hover');
      });
      el.addEventListener('mouseout', () => {
        cursor.classList.remove('hover');
      });
    });
  }
}

export function handleThemeToggler() {
  const themeToggler = document.getElementById('theme-toggler');
  if (themeToggler) {
    themeToggler.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const icon = themeToggler.querySelector('i');
      if (document.body.classList.contains('light-theme')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    });
  }
}

export function handleScrollAnimations() {
  const sections = document.querySelectorAll('.animate-on-scroll');

  const animateOnScroll = () => {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.8) {
        section.classList.add('animate');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Initial check
}

export function handlePreloader() {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('hidden');
    });
  }
}

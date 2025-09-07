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
  const navLinks = document.querySelectorAll('.nav-links li a');

  if (burger && nav) {
    const toggleNav = () => {
      nav.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
      document.body.classList.toggle('no-scroll');
    };

    burger.addEventListener('click', toggleNav);
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) {
          toggleNav();
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
  
  if (!cursorDot || !cursorOutline) return;
  
  // Make sure cursor elements are visible and properly positioned
  cursorDot.style.display = 'block';
  cursorDot.style.opacity = '1';
  cursorOutline.style.display = 'block';
  cursorOutline.style.opacity = '1';
  
  // Set initial styles for cursor dot
  cursorDot.style.position = 'fixed';
  cursorDot.style.pointerEvents = 'none';
  cursorDot.style.zIndex = '99999'; // Increased z-index
  cursorDot.style.width = '10px';
  cursorDot.style.height = '10px';
  cursorDot.style.backgroundColor = 'var(--primary-color)';
  cursorDot.style.borderRadius = '50%';
  cursorDot.style.transform = 'translate(-50%, -50%)';
  cursorDot.style.transition = 'all 0.1s ease-out';
  cursorDot.style.mixBlendMode = 'difference'; // Better visibility on all backgrounds
  cursorDot.style.pointerEvents = 'none';
  
  // Set initial styles for cursor outline
  cursorOutline.style.position = 'fixed';
  cursorOutline.style.pointerEvents = 'none';
  cursorOutline.style.zIndex = '99998';
  cursorOutline.style.width = '40px';
  cursorOutline.style.height = '40px';
  cursorOutline.style.border = '2px solid var(--primary-color)';
  cursorOutline.style.borderRadius = '50%';
  cursorOutline.style.transform = 'translate(-50%, -50%)';
  cursorOutline.style.transition = 'all 0.3s ease-out, opacity 0.1s ease-out, width 0.3s ease-out, height 0.3s ease-out';
  cursorOutline.style.mixBlendMode = 'difference'; // Better visibility on all backgrounds
  cursorOutline.style.pointerEvents = 'none';
  
  // Hide cursor on touch devices
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
    return;
  }

  // Set initial position
  let posX = 0;
  let posY = 0;
  
  // Handle mouse movement
  const moveCursor = (e) => {
    // Get the exact mouse position
    posX = e.clientX;
    posY = e.clientY;
    
    // Directly set the position without transforms for better accuracy
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    // Smoothly animate the outline to follow
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
    
    // Force a reflow to ensure the position updates
    cursorDot.getBoundingClientRect();
    cursorOutline.getBoundingClientRect();
  };
  
  // Add mousemove event listener with passive for better performance
  window.addEventListener('mousemove', moveCursor, { passive: true });
  
  // Also listen for mousemove on document to catch all movements
  document.addEventListener('mousemove', moveCursor, { passive: true });

  // Handle hover effects
  const handleHover = (el) => {
    el.addEventListener('mouseenter', () => {
      if (el.closest('.project-card, .project-link, .github-btn')) {
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
        cursorOutline.style.borderColor = 'var(--primary-color)';
        cursorDot.style.transform = 'scale(1.5)';
      }
    });
    
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.width = '40px';
      cursorOutline.style.height = '40px';
      cursorOutline.style.borderColor = 'var(--primary-color)';
      cursorDot.style.transform = 'scale(1)';
    });
    
    // Hide default cursor on interactive elements
    if (el.closest('.project-card, .project-link, .github-btn, [data-cursor-hover]')) {
      el.style.cursor = 'none';
    }
  };

  // Apply hover effects to project elements
  document.querySelectorAll('.project-card, .project-link, .github-btn, [data-cursor-hover]')
    .forEach(el => handleHover(el));
  
  // Show/hide cursor when entering/leaving window
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorOutline.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '0.7';
  });
  
  // Force initial position update
  window.dispatchEvent(new MouseEvent('mousemove', {
    clientX: window.innerWidth / 2,
    clientY: window.innerHeight / 2
  }));
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
  // Only initialize AOS if it's available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      startEvent: 'DOMContentLoaded'
    });
  }
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

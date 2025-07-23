document.addEventListener('DOMContentLoaded', () => {
  // --- TYPEWRITER EFFECT ---
  const initTyped = () => {
    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
      new Typed('.typed-text', {
        strings: ['Writer', 'Translator', 'Web Developer'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
      });
    }
  };

  // --- NAVBAR STYLES ON SCROLL ---
  const handleNavbarScroll = () => {
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
  };

  // --- MOBILE NAVIGATION ---
  const handleMobileNav = () => {
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
  };

  // --- PROJECT FILTERING ---
  const handleProjectFiltering = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          filterButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');

          const filterValue = this.getAttribute('data-filter');

          projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }
  };

  // --- CONTACT FORM SUBMISSION ---
  const handleContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());

        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
          });

          if (response.ok) {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
          } else {
            alert('There was an error submitting your form. Please try again later.');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('There was an error submitting your form. Please try again later.');
        }
      });
    }
  };

  // --- SCROLL ANIMATIONS ---
  const handleScrollAnimations = () => {
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
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if(section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // --- CUSTOM CURSOR ---
  const handleCustomCursor = () => {
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
  };

  // --- THEME TOGGLER ---
  const handleThemeToggler = () => {
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
  };

  // --- INITIALIZE ALL FUNCTIONS ---
  initTyped();
  handleNavbarScroll();
  handleMobileNav();
  handleProjectFiltering();
  handleContactForm();
  handleScrollAnimations();
  handleCustomCursor();
  handleThemeToggler();
});

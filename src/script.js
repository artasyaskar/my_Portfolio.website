/**
 * Main application class.
 */
class App {
  /**
   * Initializes the application.
   */
  constructor() {
    this.init();
  }

  /**
   * Registers all event handlers and initializes all components.
   */
  init() {
    this.initTyped();
    this.handleNavbarScroll();
    this.handleMobileNav();
    this.handleProjectFiltering();
    this.handleContactForm();
    this.handleScrollAnimations();
    this.handleCustomCursor();
    this.handleThemeToggler();
    this.handleBackToTop();
    this.handleSmoothScroll();
  }

  /**
   * Initializes the typewriter effect.
   */
  initTyped() {
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
  }

  /**
   * Handles the back to top button.
   */
  handleBackToTop() {
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

  /**
   * Handles the navbar style changes on scroll.
   */
  handleNavbarScroll() {
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

  /**
   * Handles the mobile navigation.
   */
  handleMobileNav() {
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

  /**
   * Handles the project filtering.
   */
  handleProjectFiltering() {
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
  }

  /**
   * Handles the contact form submission.
   */
  handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-btn');
    const popupMessage = document.getElementById('popup-message');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const loader = document.querySelector('.loader');

    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        btnText.style.display = 'none';
        loader.style.display = 'block';

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
            popupMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            popup.style.display = 'flex';
            contactForm.reset();
          } else {
            popupMessage.textContent = 'There was an error submitting your form. Please try again later.';
            popup.style.display = 'flex';
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          popupMessage.textContent = 'There was an error submitting your form. Please try again later.';
          popup.style.display = 'flex';
        } finally {
          btnText.style.display = 'block';
          loader.style.display = 'none';
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
      });
    }

    if (popup) {
      window.addEventListener('click', (e) => {
        if (e.target === popup) {
          popup.style.display = 'none';
        }
      });
    }
  }

  /**
   * Handles the scroll animations.
   */
  handleScrollAnimations() {
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

  /**
   * Handles the smooth scrolling effect.
   */
  handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
    });
  }

  /**
   * Handles the custom cursor.
   */
  handleCustomCursor() {
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

  /**
   * Handles the theme toggler.
   */
  handleThemeToggler() {
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
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});

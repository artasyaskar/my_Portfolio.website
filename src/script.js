import {
  handleNavbarScroll,
  handleMobileNav,
  handleBackToTop,
  handleSmoothScroll,
  handleCustomCursor,
  handleThemeToggler,
  handleScrollAnimations,
  handlePreloader,
} from './modules/ui.js';
import { handleContactForm } from './modules/contact.js';
import { handleProjectFiltering, initVanillaTilt } from './modules/projects.js';
import { initTyped } from './modules/typing.js';

class App {
  constructor() {
    this.init();
  }

  init() {
    handlePreloader();
    initTyped();
    handleNavbarScroll();
    handleMobileNav();
    handleProjectFiltering();
    handleContactForm();
    handleScrollAnimations();
    handleCustomCursor();
    handleThemeToggler();
    handleBackToTop();
    handleSmoothScroll();
    initVanillaTilt();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});

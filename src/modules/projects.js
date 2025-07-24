export function handleProjectFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  if (filterButtons.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Set active class on button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

export function initVanillaTilt() {
  const elements = document.querySelectorAll('[data-tilt]');
  if (window.VanillaTilt) {
    window.VanillaTilt.init(elements, {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      scale: 1.05
    });
  }
}

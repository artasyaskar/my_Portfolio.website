export function handleProjectFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = Array.from(document.querySelectorAll('.projects-grid .project-card'));

  if (filterButtons.length === 0 || cards.length === 0) return;

  // Precompute category sets for each card to support multi-categories
  const cardMeta = cards.map(card => ({
    el: card,
    cats: (card.dataset.category || '').split(/\s+/).filter(Boolean)
  }));

  const applyFilter = (filter) => {
    // Batch DOM writes
    requestAnimationFrame(() => {
      cardMeta.forEach(({ el, cats }) => {
        const match = filter === 'all' || cats.includes(filter);
        el.classList.toggle('is-hidden', !match);
        el.setAttribute('aria-hidden', String(!match));
        if (match) {
          // Ensure immediately visible even with AOS
          el.classList.add('aos-animate');
          el.style.opacity = '';
          el.style.transform = '';
        }
      });

      // If AOS is present, refresh it to avoid delayed appearance
      if (typeof AOS !== 'undefined' && AOS.refreshHard) {
        AOS.refreshHard();
      } else if (typeof AOS !== 'undefined' && AOS.refresh) {
        AOS.refresh();
      }
    });
  };

  // Wire up buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  // Apply initial filter based on active button (defaults to 'all')
  const activeBtn = Array.from(filterButtons).find(b => b.classList.contains('active')) ||
                    Array.from(filterButtons).find(b => (b.dataset.filter || '') === 'all');
  if (activeBtn) {
    applyFilter(activeBtn.dataset.filter || 'all');
  }
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

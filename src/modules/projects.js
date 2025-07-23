export function handleProjectFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Deactivate all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Activate the clicked button
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (filterValue === 'all' || cardCategory === filterValue) {
            card.style.display = 'block'; // Or 'flex', 'grid', etc., depending on your layout
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
}

export function initVanillaTilt() {
  VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
  });
}

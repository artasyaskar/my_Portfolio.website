export function initTyped() {
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    new Typed('.typing-text', {
      strings: [
        "AI Engineer",
        "Electrical Engineering Student",
        "Systems & Simulation Specialist",
        "CLI-First Developer"
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      showCursor: true,
      cursorChar: '_',
      smartBackspace: true,
      backDelay: 2000,
    });
  }
}

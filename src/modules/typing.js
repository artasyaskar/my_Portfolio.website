export function initTyped() {
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

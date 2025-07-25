export function handleContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('form-message');
  const submitBtn = document.querySelector('.submit-btn');
  const btnText = document.querySelector('.btn-text');
  const loader = submitBtn.querySelector('.loader');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      btnText.style.display = 'none';
      loader.style.display = 'block';
      submitBtn.disabled = true;
      formMessage.textContent = '';

      const formData = new FormData(contactForm);
      const formObject = Object.fromEntries(formData.entries());

      // Mocking form submission
      setTimeout(() => {
        formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        formMessage.className = 'success';
        contactForm.reset();

        btnText.style.display = 'block';
        loader.style.display = 'none';
        submitBtn.disabled = false;
      }, 1000);
    });
  }
}

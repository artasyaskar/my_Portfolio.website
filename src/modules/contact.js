export function handleContactForm() {
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

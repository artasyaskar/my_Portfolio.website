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

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
          formMessage.className = 'success';
          contactForm.reset();
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              formMessage.textContent = data["errors"].map(error => error["message"]).join(", ")
            } else {
              formMessage.textContent = 'There was an error submitting your form. Please try again later.';
            }
            formMessage.className = 'error';
          })
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        formMessage.textContent = 'There was an error submitting your form. Please try again later.';
        formMessage.className = 'error';
      } finally {
        btnText.style.display = 'block';
        loader.style.display = 'none';
        submitBtn.disabled = false;
      }
    });
  }
}

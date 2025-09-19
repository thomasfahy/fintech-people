function injectContactPage() {
  if (typeof document === 'undefined') return;
  if (document.querySelector('.contact-page')) return; // prevent duplicate injection

  const contactHTML = `
    <main class="contact-page">
      <section class="contact-section">
        <h1>Contact Us</h1>
        <form class="contact-form" method="post" action="#">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" required>
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" required>
          </div>

          <div class="form-group">
            <label for="phone">Phone Number (optional)</label>
            <input type="tel" id="phone" name="phone">
          </div>

          <div class="form-group">
            <label for="message">Your Message</label>
            <textarea id="message" name="message" rows="6" required></textarea>
          </div>

          <button type="submit" class="contact-submit">Send Message</button>
        </form>
      </section>
    </main>
  `;

  document.body.insertAdjacentHTML('beforeend', contactHTML);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectContactPage);
} else {
  injectContactPage();
}

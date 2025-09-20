import "../styles/header.css";
import "../styles/footer.css";
import fbIcon from "../images/facebook.svg";
import igIcon from "../images/instagram.svg";
import phoneIcon from "../images/icon-phone.svg";
import logo from "../images/header-logo.png";
import favicon from "../images/favicon.png"

const googleTag = 'G-customerTagNumber' // FOR GOOGLE ANALYTICS


// =============== INJECT FAVICON =======================

function injectFavicon(url = favicon) {
  if (typeof document === 'undefined') return;
  if (document.querySelector('link[rel="icon"]')) return;

  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = url;
  link.type = 'image/x-icon';
  document.head.appendChild(link);
}
injectFavicon(favicon);


// ================= GOOGLE ANALYTICS =====================

function injectAnalytics(gaId) {
  if (!gaId) return;
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  if (document.getElementById('ga-gtag')) return;

  const script = document.createElement('script');
  script.id = 'ga-gtag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  const inline = document.createElement('script');
  inline.text = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}');
  `;
  document.head.appendChild(inline);
}
injectAnalytics(googleTag); //INSERT GOOGLE TAG HERE


// ================== WEBSITE HEADER ======================

function injectHeader() {
  if (typeof document === 'undefined') return;
  if (document.querySelector('.site-header')) return;

  // 🔧 Custom Header Settings
  const companyName   = "Business Name";
  const logoAlt       = `${companyName} Logo`;
  const phoneNumber   = "07777 777666";
  const facebookUrl   = "https://www.facebook.com/businessname";
  const instagramUrl  = "https://www.instagram.com/businessname";

  const headerHTML = `
    <header class="site-header">
      <nav class="nav-container">
        <div class="logo">
          <a href="index.html">
            <img src="${logo}" alt="${logoAlt}">
          </a>
        </div>

        <!-- Hamburger Icon (only visible on mobile) -->
        <div class="menu-toggle" id="mobile-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#">Jobs</a></li>
          <li><a href="/candidates.html">Candidates</a></li>
          <li><a href="#">Clients</a></li>
          <li><a href="/contact.html">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  `;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectHeader);
} else {
  injectHeader();
}


// ================== WEBSITE FOOTER ======================

function injectFooter() {
  if (typeof document === 'undefined') return;
  if (document.querySelector('.site-footer')) return; // avoid duplicate injection

  // 🔧 Customer-specific variables
  const email         = "Placeholder@email.com";
  const address       = "Tunbridge Wells";
  const serviceArea   = "East Sussex · Kent";
  const brandName     = "FinTech People Ltd";
  const privacyUrl    = "/privacy-policy.html";
  const copyrightYear = new Date().getFullYear();
  const creditName    = "Fahy Digital";
  const creditUrl     = "https://fahydigital.co.uk";

  const footerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-block">
          <h4>Contact</h4>
          <ul class="footer-list">
            <li><a href="mailto:${email}">${email}</a></li>
          </ul>
        </div>
    
        <div class="footer-block">
          <h4>Address</h4>
          <address class="footer-address">${address}</address>
        </div>
    
        <div class="footer-block">
          <h4>Service Area</h4>
          <p>${serviceArea}</p>
        </div>
      </div>
    
      <div class="footer-bottom">
        <div class="footer-brand">${brandName}</div>
        <a class="privacy-link" href="${privacyUrl}" rel="nofollow">Privacy Policy</a>
      </div>
    
      <div class="footer-meta">
        <small class="copyright">Copyright © ${copyrightYear} ${brandName}</small>
        <small class="credit">Website designed and maintained by 
          <a href="${creditUrl}" target="_blank" rel="noopener">${creditName}</a>
        </small>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectFooter);
} else {
  injectFooter();
}



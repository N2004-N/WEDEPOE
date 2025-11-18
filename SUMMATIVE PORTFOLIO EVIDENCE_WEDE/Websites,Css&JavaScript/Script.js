/* script.js
   Handles:
   - Menu toggle progressive enhancement
   - Search/filter for gallery & news
   - Lightbox gallery
   - Contact form validation and mailto composition
   - Enquiry form validation and simple processing
   - Leaflet map initialization
*/

document.addEventListener('DOMContentLoaded', () => {
  // LIGHTBOX
  const lightbox = createLightbox();
  document.body.appendChild(lightbox.container);

  function createLightbox() {
    const container = document.createElement('div');
    container.className = 'lightbox';
    container.setAttribute('aria-hidden','true');
    const img = document.createElement('img');
    const caption = document.createElement('div');
    caption.className = 'caption';
    const close = document.createElement('button');
    close.textContent = 'Close';
    close.style.marginTop = '8px';
    close.style.padding = '8px 12px';
    close.style.borderRadius = '6px';
    close.style.border = '0';
    close.style.cursor = 'pointer';

    close.addEventListener('click', () => { container.style.display = 'none'; container.setAttribute('aria-hidden','true'); });
    container.addEventListener('click', (e) => { if (e.target === container) { container.style.display='none'; container.setAttribute('aria-hidden','true'); } });

    container.appendChild(img);
    container.appendChild(caption);
    container.appendChild(close);

    return { container, img, caption, open(src, alt) { this.img.src = src; this.caption.textContent = alt || ''; this.container.style.display = 'flex'; this.container.setAttribute('aria-hidden','false'); } };
  }

  // Attach to all cards/scroll items
  document.querySelectorAll('.card img, .scroll-item img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', (e) => {
      const src = e.currentTarget.getAttribute('data-large') || e.currentTarget.src;
      const alt = e.currentTarget.alt || '';
      lightbox.open(src, alt);
    });
  });

  // SEARCH: Filter gallery or news
  const searchButton = document.querySelector('.search-container button');
  const searchInput = document.querySelector('.search-container input');
  if (searchButton && searchInput) {
    const performSearch = () => {
      const q = searchInput.value.trim().toLowerCase();
      // filter gallery cards by title
      document.querySelectorAll('.card').forEach(card => {
        const title = (card.querySelector('h4') || {textContent:''}).textContent.toLowerCase();
        card.style.display = title.includes(q) || q === '' ? '' : 'none';
      });
      // filter news items with class .news-item
      document.querySelectorAll('.news-item').forEach(item => {
        const txt = item.textContent.toLowerCase();
        item.style.display = txt.includes(q) || q === '' ? '' : 'none';
      });
    };
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); performSearch(); } });
  }

  // CONTACT FORM LOGIC
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      clearMessages(contactForm);
      const name = contactForm.querySelector('input[name="name"]').value.trim();
      const email = contactForm.querySelector('input[name="email"]').value.trim();
      const phone = contactForm.querySelector('input[name="phone"]').value.trim();
      const subject = contactForm.querySelector('select[name="subject"]').value;
      const message = contactForm.querySelector('textarea[name="message"]').value.trim();

      const errors = [];
      if (name.length < 2) errors.push('Please enter your full name.');
      if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Please enter a valid email address.');
      if (phone && !/^[0-9+\-\s()]{7,20}$/.test(phone)) errors.push('Please enter a valid phone number.');

      if (errors.length) {
        showError(contactForm, errors.join(' '));
        return;
      }

      // Compose mailto link (client-side) as a fallback to server email
      const to = 'info@homeofhope.org.za';
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`);
      const subjectLine = encodeURIComponent(`Website Contact: ${subject} - ${name}`);
      const mailto = `mailto:${to}?subject=${subjectLine}&body=${body}`;

      // show success to user and open mail client
      showSuccess(contactForm, 'Message composed. Opening your email app...');
      window.location.href = mailto;
    });
  }

  // ENQUIRY FORM LOGIC
  const enquiryForm = document.querySelector('#enquiry-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(e){
      e.preventDefault();
      clearMessages(enquiryForm);
      const name = enquiryForm.querySelector('input[name="name"]').value.trim();
      const email = enquiryForm.querySelector('input[name="email"]').value.trim();
      const type = enquiryForm.querySelector('select[name="type"]').value;
      const quantity = parseInt(enquiryForm.querySelector('input[name="quantity"]').value || '0', 10);

      const errors = [];
      if (name.length < 2) errors.push('Please enter your full name.');
      if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Please enter a valid email.');
      if (!type) errors.push('Please select an enquiry type.');
      if (!quantity || quantity < 1) errors.push('Please enter a valid quantity (1 or more).');

      if (errors.length) {
        showError(enquiryForm, errors.join(' '));
        return;
      }

      // simple processing: estimate a cost or availability message
      let unitCost = 0;
      if (type === 'sponsorship') unitCost = 500; // monthly sponsorship ZAR (example)
      else if (type === 'donation') unitCost = 100;
      else if (type === 'volunteer') unitCost = 0;

      const total = unitCost * quantity;
      const response = document.createElement('div');
      response.className = 'success';
      response.style.display = 'block';
      response.textContent = `Thanks ${name}. Estimated cost: ZAR ${total.toLocaleString()}. We will follow up at ${email}. (This is client-side demo processing.)`;
      enquiryForm.appendChild(response);
      // reset after a short delay
      setTimeout(()=> { enquiryForm.reset(); }, 3000);
    });
  }

  function showError(form, message) {
    let el = form.querySelector('.error');
    if (!el) { el = document.createElement('div'); el.className='error'; form.appendChild(el); }
    el.textContent = message; el.style.display = 'block';
  }
  function showSuccess(form, message) {
    let el = form.querySelector('.success');
    if (!el) { el = document.createElement('div'); el.className='success'; form.appendChild(el); }
    el.textContent = message; el.style.display = 'block';
  }
  function clearMessages(form) {
    const e = form.querySelector('.error'); if (e) e.remove();
    const s = form.querySelector('.success'); if (s) s.remove();
  }

  // LEAFLET MAP (only if #map exists)
  if (typeof L !== 'undefined' && document.querySelector('#map')) {
    try {
      const map = L.map('map').setView([-26.2041, 28.0473], 12); // Jo'burg coordinates
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      L.marker([-26.2041, 28.0473]).addTo(map).bindPopup('Home of Hope - Johannesburg').openPopup();
    } catch (err) {
      console.warn('Leaflet init failed:', err);
    }
  }

  // Add 'active' to nav link matching path
  const path = location.pathname.split('/').pop().toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.toLowerCase() === path || (path === '' && /home/.test(href.toLowerCase()))) {
      a.classList.add('active');
    }
  });
});

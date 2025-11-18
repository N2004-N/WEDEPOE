# Home of Hope Website

## Project Overview
Home of Hope is a Johannesburg-based non-profit website providing information about shelter, education, donations and volunteering opportunities.

---

## Updated: Part 3 — Enhancing Functionality and SEO (Nov 2025)
This update adds JavaScript interactivity, on-page SEO improvements, functional forms with validation, a gallery lightbox, searchable content and an embedded map.

### Key additions (Part 3)
- Client-side JavaScript (`script.js`) for:
  - Gallery lightbox modal
  - Search/filter for gallery and news
  - Contact form validation + mailto composition
  - Enquiry form validation + processing
  - Leaflet map initialisation for location display
- `robots.txt` and `sitemap.xml`
- On-page SEO: meta description, keywords, canonical tags, JSON-LD Organization schema
- Accessibility improvements: alt text for images, ARIA labels, semantic headings

---

## Changelog
### Part 2 -> Part 3 (summary)
- **2025-09**: Visual redesign, responsive nav and gallery added (Part 2).
- **2025-11-17**: Implemented Part 3 requirements:
  - Added JavaScript for interactivity (lightbox, search, forms).
  - Created `enquiry.html` with client-side processing.
  - Implemented client-side validation for contact and enquiry forms.
  - Added Leaflet interactive map on `ContactUs.html`.
  - Created `robots.txt` and `sitemap.xml`.
  - Updated README with Harvard-style references.
  - Improved meta titles and descriptions for SEO.

> Provide these changelog entries in your repository's README file and in the README located in the submission folder for marking.

---

## How to run locally
1. Clone the repo or download files.
2. Ensure `images/` folder is present with the images you used (same filenames).
3. Open `Homepage.html` in your browser. No server is required for client-side features.
4. To deploy, upload to GitHub Pages or a static host and update sitemap/robots `yourdomain` placeholders.

---

## Notes about email & form submission
- The contact form uses a `mailto:` composition to open the user's email client. To enable server-side sending: use a server endpoint or a form backend (Formspree, Netlify Forms, or a simple PHP/Python endpoint).
- The enquiry form demonstrates client-side processing only — add a server endpoint to store enquiries or send confirmation emails.

---

## References (Harvard Style - Adapted for IIE)
1. MDN Web Docs, 2025. *Using the HTML <form> element*. Available at: https://developer.mozilla.org/ (Accessed: 17 November 2025).  
2. OpenStreetMap contributors and Leaflet documentation, 2024. *Leaflet – an open-source JavaScript library for mobile-friendly maps*. Available at: https://leafletjs.com/ (Accessed: 17 November 2025).  
3. W3Schools, 2025. *HTML Forms*. Available at: https://www.w3schools.com/html/html_forms.asp (Accessed: 17 November 2025).  
4. Google Developers, 2025. *SEO Starter Guide*. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide (Accessed: 17 November 2025).  
5. Font Awesome, 2025. *Font Awesome icons*. Available at: https://fontawesome.com/ (Accessed: 17 November 2025).

---

## Final checklist for submission
- [ ] All HTML files in repository (Homepage.html, aboutUs.html, Gallery1.html, news1.html, ContactUs.html, enquiry.html).  
- [ ] CSS (`styles.css`) and JS (`script.js`) included.  
- [ ] `robots.txt` and `sitemap.xml` in repo root.  
- [ ] Updated README with changelog and references.  
- [ ] Images folder contains all referenced images with proper licensing or ownership noted.


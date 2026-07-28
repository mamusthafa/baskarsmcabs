/**
 * Dynamic Header and Footer Loader for SM Cabs Coorg Static Website
 * Automatically loads header.html and footer.html into placeholder elements
 * Highlights active page navigation link
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch & Insert Header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('header.html')
            .then(response => {
                if (!response.ok) throw new Error('Header load failed');
                return response.text();
            })
            .then(html => {
                headerPlaceholder.innerHTML = html;

                // Highlight active nav link robustly
                let currentPage = window.location.pathname.split('/').pop();
                if (!currentPage || currentPage === '/') {
                    currentPage = 'index.html';
                } else {
                    currentPage = currentPage.split('?')[0].split('#')[0];
                }

                const navLinks = headerPlaceholder.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const linkPage = link.getAttribute('href');
                    if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === 'index.html')) {
                        link.classList.add('active');
                    }
                });

                // Mobile Navigation Toggle
                const mobileToggle = document.getElementById('mobileToggle');
                const navMenu = document.getElementById('navMenu');
                if (mobileToggle && navMenu) {
                    mobileToggle.addEventListener('click', (e) => {
                        e.stopPropagation();
                        navMenu.classList.toggle('active');
                    });

                    // Close menu if clicking outside
                    document.addEventListener('click', (e) => {
                        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && e.target !== mobileToggle) {
                            navMenu.classList.remove('active');
                        }
                    });
                }
            })
            .catch(err => console.error('Error loading header:', err));
    }

    // 2. Fetch & Insert Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Footer load failed');
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
            })
            .catch(err => console.error('Error loading footer:', err));
    }
});

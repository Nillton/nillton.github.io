/* ==========================================================================
   Modern Hybrid Resume Logic - Nilton Alexandre
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Age Calculation (Birthdate: October 11, 1985)
    calculateAge();

    // 2. Theme Switcher (Dark / Light Mode)
    initTheme();

    // 3. Mobile Navigation Drawer Toggle
    initMobileNav();

    // 4. Smooth Scroll & Active Navigation Link Highlight
    initScrollSpy();
});

/**
 * Calculates current age dynamically based on birth date (October 11, 1985)
 */
function calculateAge() {
    const ageElement = document.getElementById('user-age');
    if (!ageElement) return;

    const birthDate = new Date(1985, 9, 11); // Month index 9 = October
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    ageElement.textContent = age;
}

/**
 * Handles Light/Dark Theme initialization & persistence in localStorage
 */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    if (!themeToggleBtn) return;

    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    let currentTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');
    applyTheme(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    });

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'light') {
            if (themeIcon) themeIcon.className = 'fas fa-moon';
            if (themeText) themeText.textContent = 'Modo Escuro';
        } else {
            if (themeIcon) themeIcon.className = 'fas fa-sun';
            if (themeText) themeText.textContent = 'Modo Claro';
        }
    }
}

/**
 * Mobile Navigation Menu drawer toggle logic
 */
function initMobileNav() {
    const navToggleBtn = document.getElementById('mobile-nav-toggle');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-link-custom');

    if (!navToggleBtn || !sidebar) return;

    navToggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        const icon = navToggleBtn.querySelector('i');
        if (icon) {
            icon.className = sidebar.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
        }
    });

    // Close menu when link is clicked on mobile
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                const icon = navToggleBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    });
}

/**
 * ScrollSpy to highlight active menu link on scroll
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-custom');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

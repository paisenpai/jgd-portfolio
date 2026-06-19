/* script.js - Main JS for John Gavin Deposoy portfolio
   Features: custom cursor, sticky nav, mobile menu, greeting message,
             dark mode toggle, back to top button, form validation,
             contact form alert, scroll reveal */




/* ----------------------------------------------------------------
   DARK MODE TOGGLE
   Button click event that toggles dark mode class on body.
   Preference is saved in localStorage so it persists across pages.
   ---------------------------------------------------------------- */
(function () {

    var toggle = document.getElementById('dark-mode-toggle');
    var icon   = document.getElementById('theme-icon');

    if (!toggle || !icon) return;

    function applyTheme(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        // sun icon when dark mode is on, moon icon when light mode is on
        icon.innerHTML = isDark ? '&#9728;' : '&#9790;';
        toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    // restore saved preference when the page loads
    var saved = localStorage.getItem('darkMode') === 'true';
    applyTheme(saved);

    // button click event - toggles the theme
    toggle.addEventListener('click', function () {
        var isDark = !document.body.classList.contains('dark-mode');
        applyTheme(isDark);
        localStorage.setItem('darkMode', String(isDark));
    });

}());


/* ----------------------------------------------------------------
   CUSTOM CURSOR
   Dot follows instantly, ring trails with lerp easing.
   Only runs on devices with a true pointer (not touch-only).
   ---------------------------------------------------------------- */
(function () {

    var dot  = document.getElementById('cursor-dot');
    var ring = document.getElementById('cursor-ring');

    var hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover || !dot || !ring) return;

    var mouseX = 0, mouseY = 0;
    var ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top  = mouseY + 'px';
        document.body.classList.add('cursor-active');
    });

    document.addEventListener('mouseleave', function () {
        document.body.classList.remove('cursor-active');
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.10;
        ringY += (mouseY - ringY) * 0.10;
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';
        requestAnimationFrame(animateRing);
    }

    animateRing();

    var clickables = document.querySelectorAll(
        'a, button, .cert-card, .volunteer-card, .accordion-header, .carousel-dot'
    );

    clickables.forEach(function (el) {
        el.addEventListener('mouseenter', function () {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', function () {
            document.body.classList.remove('cursor-hover');
        });
    });

}());


/* ----------------------------------------------------------------
   STICKY NAV
   ---------------------------------------------------------------- */
(function () {

    var header = document.getElementById('main-header');
    if (!header) return;

    function onScroll() {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

}());


/* ----------------------------------------------------------------
   MOBILE NAV TOGGLE
   ---------------------------------------------------------------- */
(function () {

    var toggle   = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');
    var links    = document.querySelectorAll('.nav-link');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

}());


/* ----------------------------------------------------------------
   BACK TO TOP BUTTON
   Button click event - scrolls to the top of the page.
   Button appears after scrolling 400px down.
   ---------------------------------------------------------------- */
(function () {

    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    // button click event - smooth scroll to top
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

}());


/* ----------------------------------------------------------------
   SIMPLE VALIDATION
   Validates the contact form fields before submitting.
   Shows inline error messages under each invalid field.
   ---------------------------------------------------------------- */
function validateContactForm() {

    var valid = true;

    // validate name
    var nameInput = document.getElementById('contact-name');
    var nameError = document.getElementById('error-name');

    if (nameInput && nameError) {
        if (!nameInput.value.trim()) {
            nameInput.classList.add('invalid');
            nameError.textContent = 'Please enter your name.';
            valid = false;
        } else {
            nameInput.classList.remove('invalid');
            nameError.textContent = '';
        }
    }

    // validate email - must be present and match basic email pattern
    var emailInput = document.getElementById('contact-email');
    var emailError = document.getElementById('error-email');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput && emailError) {
        if (!emailInput.value.trim()) {
            emailInput.classList.add('invalid');
            emailError.textContent = 'Please enter your email address.';
            valid = false;
        } else if (!emailPattern.test(emailInput.value.trim())) {
            emailInput.classList.add('invalid');
            emailError.textContent = 'Please enter a valid email address.';
            valid = false;
        } else {
            emailInput.classList.remove('invalid');
            emailError.textContent = '';
        }
    }

    // validate message
    var msgInput = document.getElementById('contact-message');
    var msgError = document.getElementById('error-message');

    if (msgInput && msgError) {
        if (!msgInput.value.trim()) {
            msgInput.classList.add('invalid');
            msgError.textContent = 'Please enter a message.';
            valid = false;
        } else {
            msgInput.classList.remove('invalid');
            msgError.textContent = '';
        }
    }

    return valid;
}


/* ----------------------------------------------------------------
   CONTACT FORM SUBMIT
   Only shows the alert if validation passes.
   ---------------------------------------------------------------- */
(function () {

    var form = document.getElementById('contact-form');
    if (!form) return;

    // clear error state when user starts typing in a field
    var inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            input.classList.remove('invalid');
            var errId = 'error-' + input.name;
            var errEl = document.getElementById(errId);
            if (errEl) errEl.textContent = '';
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validateContactForm()) {
            return; // stop here if validation fails
        }

        // validation passed - show the required alert message
        alert('Thank you for contacting me!');

        form.reset();

        // clear any leftover error states after reset
        form.querySelectorAll('.invalid').forEach(function (el) {
            el.classList.remove('invalid');
        });
        form.querySelectorAll('.form-error').forEach(function (el) {
            el.textContent = '';
        });
    });

}());


/* ----------------------------------------------------------------
   SCROLL REVEAL
   Sections with class .reveal fade in when they enter the viewport.
   ---------------------------------------------------------------- */
(function () {

    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.10 });

    reveals.forEach(function (el) {
        observer.observe(el);
    });

}());

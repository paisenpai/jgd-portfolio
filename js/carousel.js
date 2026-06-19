/* carousel.js - 3-image carousel for the project gallery
   Supports arrow buttons, dot indicators, and touch swipe.
   No libraries, pure vanilla JS. */

document.addEventListener('DOMContentLoaded', function () {

    var carousels = document.querySelectorAll('.carousel');

    carousels.forEach(function (carousel) {

        var track   = carousel.querySelector('.carousel-track');
        var slides  = carousel.querySelectorAll('.carousel-slide');
        var dots    = carousel.querySelectorAll('.carousel-dot');
        var prevBtn = carousel.querySelector('.carousel-prev');
        var nextBtn = carousel.querySelector('.carousel-next');

        var current = 0;
        var total   = slides.length;

        // move to a specific slide by index
        function goTo(index) {
            // wrap around both ends
            current = (index + total) % total;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';

            // update dot active state
            dots.forEach(function (dot, i) {
                dot.classList.toggle('active', i === current);
                dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                goTo(current - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                goTo(current + 1);
            });
        }

        // dot clicks
        dots.forEach(function (dot, i) {
            dot.addEventListener('click', function () {
                goTo(i);
            });
        });

        // touch swipe - start X stored on touchstart, compared on touchend
        var touchStartX = 0;

        track.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', function (e) {
            var diff = touchStartX - e.changedTouches[0].clientX;
            if (diff > 50) {
                goTo(current + 1);
            } else if (diff < -50) {
                goTo(current - 1);
            }
        }, { passive: true });

    });

});

/* accordion.js - expand/collapse for the projects list section
   Clicking a row opens it and closes any other open row. */

document.addEventListener('DOMContentLoaded', function () {

    var items = document.querySelectorAll('.accordion-item');

    items.forEach(function (item) {
        var header = item.querySelector('.accordion-header');
        var body   = item.querySelector('.accordion-body');

        header.addEventListener('click', function () {
            var isOpen = item.classList.contains('open');

            // close all items first
            items.forEach(function (other) {
                other.classList.remove('open');
                other.querySelector('.accordion-body').style.maxHeight = '0px';
                other.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            // if this item was closed, open it
            if (!isOpen) {
                item.classList.add('open');
                // use scrollHeight so the height fits the content exactly
                body.style.maxHeight = body.scrollHeight + 'px';
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });

});

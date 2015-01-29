/* global document */
(function (doc, nav_id, menu_id) {

    var nav     = doc.getElementById(nav_id),
        menu    = doc.getElementById(menu_id),
        body    = doc.body,
        padding = nav.clientHeight + 24;

    menu.setAttribute('data-is-expanded', 'false');

    function toggleMenu(e) {
        e.preventDefault();

        if (menu.getAttribute('data-is-expanded') === 'false') {
            // show
            menu.setAttribute('data-is-expanded', 'true');
            nav.classList.add('expanded');
            body.style.paddingTop = padding + 'px';
        } else {
            // hide
            menu.setAttribute('data-is-expanded', 'false');
            nav.classList.remove('expanded');
            body.style.paddingTop = 0;
        }
    }

    menu.addEventListener('click', toggleMenu, false);

}(document, 'nav-main', 'menu'));
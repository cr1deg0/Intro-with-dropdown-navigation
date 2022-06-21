// Mobile main menu open/close functionality

const navToggle = document.querySelector('.mobile-nav-toggle');
const navMenu = document.getElementById('primary-navigation');

navToggle.addEventListener('click', controlNavMenu);

function controlNavMenu(e) {

    const visibility = navMenu.getAttribute('data-visible');

    if (visibility === "false") {
        navMenu.setAttribute("data-visible", "true");
        navToggle.setAttribute('aria-expanded', 'true');
    }
    else {
        navMenu.setAttribute("data-visible", "false");
        navToggle.setAttribute('aria-expanded', 'false');
    }
}

// Submenu open/close functionality, for mouse and keyboard users

const submenuToggleList = document.querySelectorAll('.dropdown--title');
const dropdownSubmenuList = document.querySelectorAll('.dropdown-submenu');

submenuToggleList.forEach((submenuToggle) => submenuToggle.addEventListener('click', controlSubMenu));
dropdownSubmenuList.forEach((dropdownSubmenu) => dropdownSubmenu.addEventListener('focusout', closeSubMenu));

function controlSubMenu(e) {
    const visibility = e.target.getAttribute('aria-expanded');
    if (visibility === 'false') {
        e.target.setAttribute('aria-expanded', 'true');
    }
    else {
        e.target.setAttribute('aria-expanded', 'false');
    }
}

function closeSubMenu(e) {

    const closeMenuBtn = e.target.parentNode.parentNode.parentNode.firstElementChild;
    const lastItem = e.target.getAttribute('data-end');

    if (lastItem === "true") {
        closeMenuBtn.setAttribute('aria-expanded', 'false');
    }
}
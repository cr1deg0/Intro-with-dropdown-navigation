// Mobile main menu open/close functionality

const navToggle = document.querySelector('button[aria-controls="primary-navigation"]');
const navMenu = document.querySelector('nav[aria-label="Main"]');

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

// Keyboard navigation and mouse hover event//
// Select all navigation control items: buttons + links
const navNodes = [... navMenu.querySelectorAll('button[aria-expanded][aria-controls], .nav-link, .nav-btn')];

let openMenuIndex = null;

// Add event listener to nav bar to close any open menus when focus is moved out
document.querySelector('main').addEventListener('focusin', controlNavUnfocus);

navNodes.forEach((navNode) => {
    // handle the navbar buttons with dropdown menus
    if (navNode.hasAttribute('aria-controls')) {
        
        const dropdownMenu = navNode.parentNode.querySelector('ul');

        // attach event listeners to each control button and submenu
        navNode.addEventListener('click', controlButtonClick);
        navNode.addEventListener('keydown', controlButtonKeyDown);
        navNode.addEventListener('mouseover', controlButtonFocus);
        dropdownMenu.addEventListener('keydown', controlDropdownKeyDown);    
        dropdownMenu.addEventListener('mouseleave', controlDropdownFocusOut);
        dropdownMenu.addEventListener('blur', controlDropdownFocusOut);
        dropdownMenu.addEventListener('focusout', controlDropdownFocusOut);
    } 
});

function toggleDropdownMenu (menu) {
    // open/close dropdown menu by looking at the current visibility status

    const visibility = menu.getAttribute('aria-expanded');

    if (visibility === 'false') {
        menu.setAttribute('aria-expanded', 'true');
        openMenuIndex = navNodes.indexOf(menu);
    }
    else {
        menu.setAttribute('aria-expanded', 'false');
        openMenuIndex = null;
    }
}

function controlButtonClick(e) {

    const targetIndex = navNodes.indexOf(e.target);
    
    // if there is no menu already open, open the target menu
    if (openMenuIndex === null) {
        toggleDropdownMenu (e.target);
    }
    // if the target's menu is already open, close it 
    else if (targetIndex === openMenuIndex) {
        toggleDropdownMenu(e.target);
    }
    // in the menu open is not the target's, close it and open the target's menu
    else {
        toggleDropdownMenu(navNodes[openMenuIndex]);
        toggleDropdownMenu(e.target);
    }
}

function controlButtonFocus(e) {
    toggleDropdownMenu(e.target);
}

function controlDropdownFocusOut(e) {
    toggleDropdownMenu(e.target.previousElementSibling);
}

function controlButtonKeyDown (e) {

    const btnStatus = e.target.getAttribute('aria-expanded');
 
    // if keyboard input is "Escape" and submenu open, close submenu and set focus in control button
    if (btnStatus === 'true' && e.key === 'Escape') {
        navNodes[openMenuIndex].focus();
        toggleDropdownMenu(e.target);
    }
}

function controlDropdownKeyDown(e) {

    const parentNode = navNodes[openMenuIndex];
    const btnStatus = parentNode.getAttribute('aria-expanded');
    // close open menu on Escape
    if (btnStatus === 'true' && e.key==='Escape') {
        toggleDropdownMenu(parentNode);
        parentNode.focus();
    }    
}

function controlNavUnfocus (e) {
    // if there is an open dropdown menu, close it
    if (openMenuIndex !== null) {
        toggleDropdownMenu(navNodes[openMenuIndex]);
    }
}
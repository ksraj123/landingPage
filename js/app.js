/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const mainOffset = document.querySelector('main').offsetTop;
const navbar = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
const sectionOffsets = [];

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

Array.prototype.forEach.call(sections, function(section, index){
    sectionOffsets.push(section.offsetTop);
})
console.log(sectionOffsets);

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

var fragment = new DocumentFragment()
Array.prototype.forEach.call(sections, function(section, index){
    let newLi = document.createElement('li');
    newLi.classList.add('menu__link');
    newLi.innerText = "Item " + (index + 1);
    fragment.appendChild(newLi);
})
navbar.appendChild(fragment);

// Add class 'active' to section when near top of viewport

function setAllInactive(){
    navbar.style.display = 'none';
    Array.prototype.forEach.call(menuLinks, (link)=>{
        link.classList.remove('active');
    })
    navbar.style.display = 'block';
}

function setActive(){
    let scrollPos = window.scrollY;
    if (scrollPos < sectionOffsets[0]){
        setAllInactive();
        return;
    }
    for (pos in sectionOffsets){
        if (scrollPos < sectionOffsets[pos]){
            setAllInactive();
            menuLinks[pos - 1].classList.add('active');
            return;
        }
    }
    setAllInactive();
    menuLinks[menuLinks.length - 1].classList.add('active');
}

// Scroll to anchor ID using scrollTO event

function scrollToSection(section){
    window.scrollTo({
        top: sectionOffsets[section],
        left: 0,
        behavior: 'smooth'
      });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

let menuLinks = document.getElementsByClassName('menu__link');
Array.prototype.forEach.call(menuLinks, (link, i)=>{
    link.addEventListener('click', scrollToSection.bind(this, i))
})

// Set sections as active

document.addEventListener('scroll', setActive);
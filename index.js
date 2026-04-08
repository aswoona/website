// initialization

const RESPONSIVE_WIDTH = 1024

let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")



function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}


// Make sure this variable is declared outside the function
let isHeaderOpen = false;

function toggleHeader(event) {
    if (event) event.stopPropagation(); // Prevents the 'click outside' from firing immediately

    const menu = document.getElementById("collapsed-header-items");
    const btn = document.getElementById("collapse-btn");

    isHeaderOpen = !isHeaderOpen;

    if (isHeaderOpen) {
        // OPEN: Move from right-[-100%] to right-0
        menu.classList.remove("tw-right-[-100%]");
        menu.classList.add("tw-right-0");
        
        btn.classList.replace("bi-list", "bi-x");
        
        // Only add the listener AFTER the menu is open
        setTimeout(() => {
            window.addEventListener("click", closeMenuOnClickOutside);
        }, 100);
    } else {
        forceClose();
    }
}

function closeMenuOnClickOutside(e) {
    const menu = document.getElementById("collapsed-header-items");
    const btn = document.getElementById("collapse-btn");

    // If click is NOT on the menu and NOT on the button, close it
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
        forceClose();
    }
}

function forceClose() {
    const menu = document.getElementById("collapsed-header-items");
    const btn = document.getElementById("collapse-btn");
    
    menu.classList.remove("tw-right-0");
    menu.classList.add("tw-right-[-100%]");
    btn.classList.replace("bi-x", "bi-list");
    
    isHeaderOpen = false;
    window.removeEventListener("click", closeMenuOnClickOutside);
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        const menu = document.getElementById("collapsed-header-items");
        // Clear the inline styles so the Desktop CSS can take over
        menu.style.width = "";
        menu.style.opacity = "";
    }
});

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = ""

    } else {
        isHeaderCollapsed = true
    }
}

window.addEventListener("resize", responsive)


/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger)


gsap.to(".reveal-up", {
    opacity: 0,
    y: "100%",
})

gsap.to("#dashboard", {
    boxShadow: "0px 15px 25px -5px #7e22ceaa",
    duration: 0.3,
    scrollTrigger: {
        trigger: "#hero-section",
        start: "60% 60%",
        end: "80% 80%",
        // markers: true
    }

})

// straightens the slanting image
gsap.to("#dashboard", {

    scale: 1,
    translateY: 0,
    // translateY: "0%",
    rotateX: "0deg",
    scrollTrigger: {
        trigger: "#hero-section",
        start: window.innerWidth > RESPONSIVE_WIDTH ? "top 95%" : "top 70%",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
    }

})

const faqAccordion = document.querySelectorAll('.faq-accordion')

faqAccordion.forEach(function (btn) {
    btn.addEventListener('click', function () {
        this.classList.toggle('active')

        // Toggle 'rotate' class to rotate the arrow
        let content = this.nextElementSibling
        
        // content.classList.toggle('!tw-hidden')
        if (content.style.maxHeight === '200px') {
            content.style.maxHeight = '0px'
            content.style.padding = '0px 18px'

        } else {
            content.style.maxHeight = '200px'
            content.style.padding = '20px 18px'
        }
    })
})



// ------------- reveal section animations ---------------

const sections = gsap.utils.toArray("section")

sections.forEach((sec) => {

    const revealUptimeline = gsap.timeline({paused: true, 
                                            scrollTrigger: {
                                                            trigger: sec,
                                                            start: "10% 80%", // top of trigger hits the top of viewport
                                                            end: "20% 90%",
                                                            // markers: true,
                                                            // scrub: 1,
                                                        }})

    revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
        opacity: 1,
        duration: 0.8,
        y: "0%",
        stagger: 0.2,
    })


})

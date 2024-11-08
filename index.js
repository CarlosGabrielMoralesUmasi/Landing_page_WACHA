// initialization

const RESPONSIVE_WIDTH = 1024

let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")

const navToggle = document.querySelector("#nav-dropdown-toggle-0")
const navDropdown = document.querySelector("#nav-dropdown-list-0")


function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}


function toggleHeader() {
    if (isHeaderCollapsed) {
        collapseHeaderItems.classList.add("max-lg:!tw-opacity-100", "tw-min-h-[90vh]");
        collapseHeaderItems.style.height = "90vh";
        collapseBtn.classList.remove("bi-list");
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed");
        isHeaderCollapsed = false;

        document.body.classList.add("modal-open");

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1);
    } else {
        collapseHeaderItems.classList.remove("max-lg:!tw-opacity-100", "tw-min-h-[90vh]");
        collapseHeaderItems.style.height = "0vh";

        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed");
        collapseBtn.classList.add("bi-list");
        document.body.classList.remove("modal-open");

        isHeaderCollapsed = true;
        window.removeEventListener("click", onHeaderClickOutside);
    }
}


function responsive() {
    if (!isHeaderCollapsed){
        toggleHeader()
    }

    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.height = ""
        navToggle.addEventListener("mouseenter", openNavDropdown)
        navToggle.addEventListener("mouseleave", navMouseLeave)

    } else {
        isHeaderCollapsed = true
        navToggle.removeEventListener("mouseenter", openNavDropdown)
        navToggle.removeEventListener("mouseleave", navMouseLeave)
    }
}
responsive()
window.addEventListener("resize", responsive)

/** Dark and light theme */
if (localStorage.getItem('color-mode') === 'dark' || (!('color-mode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('tw-dark')
    updateToggleModeBtn()
} else {
    document.documentElement.classList.remove('tw-dark')
    updateToggleModeBtn()
}

function toggleMode(){
    //toggle between dark and light mode
    document.documentElement.classList.toggle("tw-dark")
    updateToggleModeBtn()
    
}

function updateToggleModeBtn(){

    const toggleIcon = document.querySelector("#toggle-mode-icon")
    
    if (document.documentElement.classList.contains("tw-dark")){
        // dark mode
        toggleIcon.classList.remove("bi-sun")
        toggleIcon.classList.add("bi-moon")
        localStorage.setItem("color-mode", "dark")
        
    }else{
        toggleIcon.classList.add("bi-sun")
        toggleIcon.classList.remove("bi-moon")
        localStorage.setItem("color-mode", "light")
    }

}


const promptWindow =  new Prompt("#pixa-playground")
const promptForm = document.querySelector("#prompt-form")
const promptInput = promptForm.querySelector("input[name='prompt']")

const MAX_PROMPTS = 3

promptForm.addEventListener("submit", (event) => {
    event.preventDefault()

    // window.open("https://github.com/PaulleDemon", "_blank")

    if (promptWindow.promptList.length >= MAX_PROMPTS)
        return false

    promptWindow.addPrompt(promptInput.value)
    promptInput.value = ""
    
    if (promptWindow.promptList.length >= MAX_PROMPTS){
        // prompt signup once the user makes 3 prompts, ideally must be throttled via backend API
        const signUpPrompt = document.querySelector("#signup-prompt")
        signUpPrompt.classList.add("tw-scale-100")
        signUpPrompt.classList.remove("tw-scale-0")

        promptForm.querySelectorAll("input").forEach(e => {e.disabled = true})
    }

    return false
})

const dropdowns = document.querySelectorAll('.dropdown')
dropdowns.forEach(dropdown => new Dropdown(`#${dropdown.id}`, promptWindow.setAIModel))


navToggle.addEventListener("click", toggleNavDropdown)
navDropdown.addEventListener("mouseleave", closeNavDropdown)

function toggleNavDropdown() {
    if (navDropdown.getAttribute("data-open") === "true") {
        closeNavDropdown();
    } else {
        openNavDropdown();
    }
}

function openNavDropdown() {
    navDropdown.classList.add("tw-opacity-100", "tw-scale-100", "max-lg:tw-min-h-[450px]", "max-lg:!tw-h-fit", "tw-min-w-[320px]");
    navDropdown.setAttribute("data-open", "true");
}

function closeNavDropdown() {
    if (navDropdown.matches(":hover")) return;

    navDropdown.classList.remove("tw-opacity-100", "tw-scale-100", "max-lg:tw-min-h-[450px]", "tw-min-w-[320px]", "max-lg:!tw-h-fit");
    navDropdown.setAttribute("data-open", "false");
}


// Registrar el plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Seleccionar todos los elementos que deseas animar al desplazarte hacia abajo
const revealElements = document.querySelectorAll('.reveal-up');

// Aplicar la animación a cada elemento con la clase 'reveal-up'
revealElements.forEach((element) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: "top 85%", // Cuando el elemento está en 85% desde la parte superior del viewport
      end: "bottom 60%", // Hasta que el elemento esté en 60% desde la parte inferior del viewport
      toggleActions: "play none none reverse", // Acciones cuando se muestra el elemento
    },
    opacity: 0, // Comienza con opacidad 0
    y: 50, // Empieza desplazado hacia abajo 50 píxeles
    duration: 1, // Duración de la animación
    ease: "power3.out", // Tipo de easing
  });
});



const videoBg = document.querySelector("#video-container-bg")
const videoContainer = document.querySelector("#video-container")

function openVideo(){
    videoBg.classList.remove("tw-scale-0", "tw-opacity-0")
    videoBg.classList.add("tw-scale-100", "tw-opacity-100")
    videoContainer.classList.remove("tw-scale-0")
    videoContainer.classList.add("tw-scale-100")

    document.body.classList.add("modal-open")
}

function closeVideo(){
    videoContainer.classList.add("tw-scale-0")
    videoContainer.classList.remove("tw-scale-100")

    setTimeout(() => {
        videoBg.classList.remove("tw-scale-100", "tw-opacity-100")
        videoBg.classList.add("tw-scale-0", "tw-opacity-0")
    }, 400)
   

    document.body.classList.remove("modal-open")

}

/**
 * Animations
 */

const typed = new Typed('#prompts-sample', {
    strings: ["How to solve a rubik's cube? Step by step guide", 
                "What's Pixa playground?", 
                "How to build an AI SaaS App?", 
                "How to integrate Pixa API?"],
    typeSpeed: 80,
    smartBackspace: true, 
    loop: true,
    backDelay: 2000,
})

gsap.registerPlugin(ScrollTrigger)



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
        scrub: true,
        invalidateOnRefresh: true,
        // markers: true,
    }

})

const faqAccordion = document.querySelectorAll('.faq-accordion');

faqAccordion.forEach(function (btn) {
    btn.addEventListener('click', function () {
        let content = this.nextElementSibling;
        let icon = this.querySelector(".bi-plus");

        // Toggle FAQ visibility using CSS classes
        content.classList.toggle('tw-hidden');
        content.classList.toggle('tw-max-h-[240px]');
        content.classList.toggle('tw-py-4');

        // Toggle the icon between plus and dash
        if (icon.classList.contains('bi-plus')) {
            icon.classList.replace('bi-plus', 'bi-dash');
        } else {
            icon.classList.replace('bi-dash', 'bi-plus');
        }
    });
});



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

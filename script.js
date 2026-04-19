document.addEventListener('DOMContentLoaded', function() {

    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = themeToggleBtn.querySelector('.fa-sun');
    const moonIcon = themeToggleBtn.querySelector('.fa-moon');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-mode') {
            sunIcon.style.display = 'inline-block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline-block';
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        sunIcon.style.display = 'inline-block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
            sunIcon.style.display = 'inline-block';
            moonIcon.style.display = 'none';
        } else {
            localStorage.setItem('theme', 'light-mode');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline-block';
        }
    });

    // --- Mobile Navigation (Hamburger Menu) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu'); // Targets the <ul>

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active'); // This UL becomes the mobile dropdown
    });

    // Close mobile menu when a nav-link inside it is clicked
    navMenu.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', (e) => {
        // Check if the clicked element is a direct nav-link and not within mobile-social-links
        if (!e.target.closest('.mobile-social-links')) {
            if (navMenu.classList.contains('active')) {
                if (e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        }
    }));


    // --- Typing Animation for Hero Subtitle ---
    const typedTextSpan = document.getElementById("typed-text");
    const cursorSpan = document.querySelector(".cursor");
    const textArray = ["Technology Specialist", " Support Specialist", " Designer & Creative", " Proud Husband & Father"];
    const typingDelay = 120;
    const erasingDelay = 80;
    const newTextDelay = 1800;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            if (textArray[textArrayIndex].charAt(0) !== ' ' && typedTextSpan.textContent.slice(-1) !== ' ') {
                typedTextSpan.textContent += ' ';
            }
            setTimeout(type, typingDelay + 1000);
        }
    }

    if (typedTextSpan && textArray.length) {
        if (textArray[textArrayIndex].charAt(0) !== ' ' && typedTextSpan.textContent.slice(-1) !== ' ') {
            typedTextSpan.textContent += ' ';
        }
        setTimeout(type, newTextDelay + 250);
    }


    // --- Animate on Scroll (Intersection Observer) ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll, .tracking-expand-anim, .text-focus-in-anim');
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    scrollElements.forEach(el => elementObserver.observe(el));

    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-menu a.nav-link');
    const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 70;

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        let currentSectionId = "home";

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - navbarHeight - 20;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            // Ensure we are not trying to highlight the social links container
            if (!link.closest('.mobile-social-links-container')) {
                link.classList.remove('active');
                const linkHref = link.getAttribute('href').substring(1);
                if (linkHref === currentSectionId) {
                    link.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', navHighlighter);
    navHighlighter();


    // --- Contact Form Submission (Using Web3Forms) ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const humanCheck = document.getElementById('human-check');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (humanCheck && !humanCheck.checked) {
                formStatus.innerHTML = "Please confirm you are human.";
                formStatus.className = 'form-status error';
                return;
            }
            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => { object[key] = value; });
            if (object.botcheck) { console.log("Bot submission detected via honeypot."); return; }
            delete object.botcheck;
            if (humanCheck) delete object.human_check;
            object['captcha'] = 'true';
            const json = JSON.stringify(object);
            formStatus.innerHTML = "Sending...";
            formStatus.className = 'form-status';
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: json
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.status == 200) {
                    formStatus.innerHTML = jsonResponse.message || "Form submitted successfully!";
                    formStatus.classList.add('success');
                    form.reset();
                } else {
                    console.log(response);
                    formStatus.innerHTML = jsonResponse.message || "Something went wrong!";
                    formStatus.classList.add('error');
                }
            })
            .catch(error => {
                console.log(error);
                formStatus.innerHTML = "Something went wrong with the request!";
                formStatus.classList.add('error');
            })
            .finally(() => {
                setTimeout(() => {
                    formStatus.innerHTML = '';
                    formStatus.className = 'form-status';
                }, 6000);
            });
        });
    }

    // --- Footer Current Year ---
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBIL MENÜ VEZÉRLÉS ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Aktiváljuk a menüt és a hamburger ikon animációját
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
            
            // Megakadályozzuk a háttér görgetését, ha nyitva a menü
            body.classList.toggle('menu-open');
        });
    }

    // Menüpontra kattintáskor zárjuk be a mobilmenüt
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('is-active');
            body.classList.remove('menu-open');
        });
    });


    // --- 2. INTELLIGENS SMOOTH SCROLL (SIMA GÖRGETÉS) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Kiszámoljuk a fix fejléc magasságát, hogy ne takarja ki a címet
                const headerOffset = 85;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- 3. FEJLÉC ANIMÁCIÓ GÖRGETÉSKOR ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
        }
    });


    // --- 4. ŰRLAP KEZELÉS (DEMO) ---
    const contactForm = document.querySelector('.main-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Itt küldhetnéd el az adatokat (pl. EmailJS vagy PHP segítségével)
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'KÜLDÉS FOLYAMATBAN...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Köszönjük! Az ajánlatkérést megkaptuk, hamarosan keresni fogjuk a megadott elérhetőségeken.');
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
                this.reset();
            }, 1500);
        });
    }
});
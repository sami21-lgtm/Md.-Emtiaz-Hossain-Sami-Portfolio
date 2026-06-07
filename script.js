document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Header Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Dark / Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    themeToggleBtn.addEventListener('click', () => {
        // Toggle the 'light-mode' class on the body
        document.body.classList.toggle('light-mode');
        
        // Change the icon based on the active mode
        if (document.body.classList.contains('light-mode')) {
            themeIcon.setAttribute('data-icon', 'lucide:moon');
        } else {
            themeIcon.setAttribute('data-icon', 'lucide:sun');
        }
    });

    // --- Scroll Animations ---
    const cards = document.querySelectorAll('.glass-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
});

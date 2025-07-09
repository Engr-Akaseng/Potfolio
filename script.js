// ===== PORTFOLIO WEBSITE JAVASCRIPT =====
// Professional Software Engineer Portfolio
// Features: Smooth scrolling, form validation, theme toggle, mobile navigation

document.addEventListener('DOMContentLoaded', function() {
    // ===== THEME TOGGLE FUNCTIONALITY =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    // ===== SMOOTH SCROLLING NAVIGATION =====
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // ===== MOBILE NAVIGATION =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // ===== CONTACT FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Real-time validation
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    messageInput.addEventListener('blur', () => validateMessage());
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Simulate form submission
            showSuccessMessage();
            contactForm.reset();
            clearErrors();
        }
    });
    
    function validateName() {
        const name = nameInput.value.trim();
        const nameError = document.getElementById('nameError');
        
        if (name.length < 2) {
            showError(nameError, 'Name must be at least 2 characters long');
            return false;
        }
        
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            showError(nameError, 'Name can only contain letters and spaces');
            return false;
        }
        
        clearError(nameError);
        return true;
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showError(emailError, 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            showError(emailError, 'Please enter a valid email address');
            return false;
        }
        
        clearError(emailError);
        return true;
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        const messageError = document.getElementById('messageError');
        
        if (message.length < 10) {
            showError(messageError, 'Message must be at least 10 characters long');
            return false;
        }
        
        if (message.length > 1000) {
            showError(messageError, 'Message must be less than 1000 characters');
            return false;
        }
        
        clearError(messageError);
        return true;
    }
    
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.parentElement.querySelector('.form-input, .form-textarea').style.borderColor = '#ef4444';
    }
    
    function clearError(errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        errorElement.parentElement.querySelector('.form-input, .form-textarea').style.borderColor = 'rgba(59, 130, 246, 0.2)';
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(clearError);
    }
    
    function showSuccessMessage() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.75rem;
                margin-bottom: 1.5rem;
                text-align: center;
                font-weight: 500;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            ">
                ✓ Thank you! Your message has been sent successfully.
            </div>
        `;
        
        // Insert before the form
        contactForm.parentNode.insertBefore(successMessage, contactForm);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    
    // ===== SCROLL EFFECTS =====
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    });
    
    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards for animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
    
    // ===== BUTTON HOVER EFFECTS =====
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== HERO BUTTONS SMOOTH SCROLL =====
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== PERFORMANCE OPTIMIZATION =====
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Scroll-based animations can be added here
        }, 10);
    });
    
    // ===== ACCESSIBILITY ENHANCEMENTS =====
    // Focus management for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Skip to main content link (for screen readers)
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-blue);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    console.log('Portfolio website loaded successfully! 🚀');
});

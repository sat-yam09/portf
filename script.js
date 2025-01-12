// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Check for saved theme preference, default to dark if none
const savedTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);
themeToggle.checked = savedTheme === 'light';

// Theme toggle event listener with smooth transitions
themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'light' : 'dark';
    
    // Add transition class for smooth color changes
    root.classList.add('theme-transition');
    
    // Update theme
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Remove transition class after animation completes
    setTimeout(() => {
        root.classList.remove('theme-transition');
    }, 300);
    
    // Update theme-specific elements
    updateThemeSpecificElements(newTheme);
});

// Function to update theme-specific elements
function updateThemeSpecificElements(theme) {
    // Update loader colors
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.setProperty('--color', theme === 'light' ? 'var(--accent-color)' : 'var(--text-color)');
    }
    
    // Update social icons colors
    const socialIcons = document.querySelectorAll('.social-link i');
    socialIcons.forEach(icon => {
        icon.style.color = theme === 'light' ? 'var(--text-color)' : 'var(--accent-color)';
    });
    
    // Update form input backgrounds
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.style.backgroundColor = theme === 'light' ? 'var(--input-bg)' : 'var(--secondary-bg)';
    });
}

// Initialize theme-specific elements on page load
updateThemeSpecificElements(savedTheme);

// Navigation Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Initialize text animation
document.querySelectorAll('.word').forEach(word => {
    const text = word.textContent;
    word.textContent = '';
    
    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.transitionDelay = `${i * 25}ms`;
        span.className = 'char';
        word.appendChild(span);
    });

    // Add mouseover effect with smooth wave animation
    word.addEventListener('mouseover', () => {
        word.querySelectorAll('.char').forEach((char, i) => {
            const waveY = Math.sin(i * 0.25) * 15;
            const waveX = Math.cos(i * 0.25) * 8;
            char.style.transform = `translate(${waveX}px, ${waveY}px) scale(1.05)`;
            char.style.opacity = '0.9';
            char.style.transitionDelay = `${i * 25}ms`;
        });
    });

    // Reset with smooth transition
    word.addEventListener('mouseout', () => {
        word.querySelectorAll('.char').forEach((char, i) => {
            char.style.transitionDelay = `${i * 25}ms`;
            char.style.transform = 'translate(0, 0) scale(1)';
            char.style.opacity = '1';
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-title, .project-card, .skill-card, .stat-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize scroll animation
window.addEventListener('scroll', animateOnScroll);
animateOnScroll();

// Skill progress animation
const animateSkills = () => {
    const skills = document.querySelectorAll('.skill-progress');
    
    skills.forEach(skill => {
        const skillTop = skill.getBoundingClientRect().top;
        
        if (skillTop < window.innerHeight) {
            skill.style.transform = `scaleX(${skill.parentElement.dataset.progress || 1})`;
        }
    });
};

window.addEventListener('scroll', animateSkills);

// Firebase Configuration
const firebaseConfig = {
    // Replace with your Firebase config
    apiKey: "YOUR_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form submission handler
const contactForm = document.getElementById('contactForm');
const loaderContainer = document.querySelector('.loader-container');
const successMessage = document.querySelector('.success-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loader
        loaderContainer.classList.add('loader-active');
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            timestamp: new Date(),
        };

        try {
            // Store message in Firebase
            await db.collection('messages').add(formData);
            
            // Hide loader
            loaderContainer.classList.remove('loader-active');
            
            // Show success message
            successMessage.style.display = 'block';
            contactForm.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
            
        } catch (error) {
            console.error('Error sending message:', error);
            // Hide loader
            loaderContainer.classList.remove('loader-active');
            // Show error message
            alert('Error sending message. Please try again.');
        }
    });
}

// Project hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

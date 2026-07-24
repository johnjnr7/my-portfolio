// ============================================
// 1. TYPING ANIMATION
// ============================================
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = [
    'An aspiring Full Stack Developer',
    'A STEM Tutor',
    'A Graphics Designer',
    'An SEO Expert'
];

let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = textArray[textArrayIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        typingSpeed = 500; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
}

// Start the typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// ============================================
// 2. DARK/LIGHT MODE TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// ============================================
// 3. MOBILE MENU TOGGLE
// ============================================
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// ============================================
// ============================================
// 4. WEB3FORMS CONTACT FORM - FIXED VERSION
// ============================================
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "⏳ Sending...";
    submitBtn.disabled = true;

    // Create FormData
    const formData = new FormData(form);
    formData.append("access_key", "f2c3469b-7ac4-43ed-95bf-9b36d464d054");

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            // Success - show popup
            showPopup(
                '✅',
                'Message Sent!',
                'Thanks for reaching out, bro! I\'ll get back to you within 24 hours. 🙌',
                '#00ff88'
            );
            form.reset();
        } else {
            // Error - show error popup
            showPopup(
                '❌',
                'Error!',
                data.message || 'Something went wrong. Please try again.',
                '#ff6b6b'
            );
        }

    } catch (error) {
        // Network error
        showPopup(
            '⚠️',
            'Network Error',
            'Check your internet connection and try again.',
            '#ffd93d'
        );
        console.error('Error:', error);
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// ============================================
// 5. POPUP FUNCTIONS
// ============================================
function showPopup(icon, title, message, color) {
    const popup = document.getElementById('notificationPopup');
    const overlay = document.getElementById('popupOverlay');
    
    if (popup && overlay) {
        document.getElementById('popupIcon').textContent = icon;
        document.getElementById('popupIcon').style.color = color;
        document.getElementById('popupTitle').textContent = title;
        document.getElementById('popupMessage').textContent = message;
        popup.style.display = 'block';
        overlay.style.display = 'block';
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            closePopup();
        }, 5000);
    }
}

function closePopup() {
    const popup = document.getElementById('notificationPopup');
    const overlay = document.getElementById('popupOverlay');
    
    if (popup) popup.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
}

// Close popup when clicking overlay
const popupOverlay = document.getElementById('popupOverlay');
if (popupOverlay) {
    popupOverlay.addEventListener('click', closePopup);
}

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// ============================================
// 6. SMOOTH SCROLL FOR NAV LINKS (Optional)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// 7. ACTIVE NAV LINK HIGHLIGHT (Optional)
// ============================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = 'rgba(255, 255, 255, 0.7)';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#fff';
        }
    });
});


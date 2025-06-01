// ===== Navbar and Menu Toggle =====
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            document.querySelector('header nav a[href*="' + id + '"]').classList.add('active');
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.createElement('div');
formStatus.id = 'formStatus';
contactForm.parentNode.insertBefore(formStatus, contactForm.nextSibling);

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UI Feedback
    formStatus.textContent = 'Sending message...';
    formStatus.style.cssText = `
        margin-top: 20px;
        padding: 10px;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.1);
        text-align: center;
    `;
    
    try {
        const formData = new FormData(contactForm);
        formData.append('_subject', 'New Message from Portfolio');
        formData.append('_template', 'table');
        
        const response = await fetch('https://formsubmit.co/ajax/relaxsongg@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (result.success) {
            formStatus.textContent = 'Message sent successfully! ✅';
            formStatus.style.background = 'rgba(0, 255, 0, 0.1)';
            formStatus.style.color = 'green';
            contactForm.reset();
            
            // Auto-hide success message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.style.background = 'transparent';
            }, 5000);
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        formStatus.textContent = 'Failed to send message. Please try again later. ❌';
        formStatus.style.background = 'rgba(255, 0, 0, 0.1)';
        formStatus.style.color = 'red';
    }
});

// Close navbar when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});
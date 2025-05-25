/**
 * Inno Reach Desighns Website JavaScript
 * Author: Inno Reach Desighns
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger menu animation
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active') && 
            !event.target.closest('nav') && 
            !event.target.closest('.mobile-menu-toggle')) {
            navMenu.classList.remove('active');
            
            // Reset hamburger menu animation
            if (mobileMenuToggle) {
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            }
        }
    });
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const prevButton = document.querySelector('.testimonial-nav .prev');
    const nextButton = document.querySelector('.testimonial-nav .next');
    
    if (testimonialSlider && prevButton && nextButton) {
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.testimonial');
        const totalSlides = slides.length;
        
        // Hide all slides except the first one
        if (slides.length > 1) {
            for (let i = 1; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
        }
        
        // Previous slide function
        prevButton.addEventListener('click', function() {
            if (totalSlides > 1) {
                slides[currentSlide].style.display = 'none';
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                slides[currentSlide].style.display = 'block';
            }
        });
        
        // Next slide function
        nextButton.addEventListener('click', function() {
            if (totalSlides > 1) {
                slides[currentSlide].style.display = 'none';
                currentSlide = (currentSlide + 1) % totalSlides;
                slides[currentSlide].style.display = 'block';
            }
        });
    }
    
    // Portfolio Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide portfolio items based on filter
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Blog Category Filters
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (categoryButtons.length > 0 && blogPosts.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const categoryValue = this.getAttribute('data-category');
                
                // Show/hide blog posts based on category
                blogPosts.forEach(post => {
                    if (categoryValue === 'all' || post.getAttribute('data-category') === categoryValue) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Portfolio Modal
    const portfolioViewButtons = document.querySelectorAll('.portfolio-view');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    if (portfolioViewButtons.length > 0) {
        portfolioViewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const modalId = this.getAttribute('href');
                const modal = document.querySelector(modalId);
                
                if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });
    }
    
    if (closeModalButtons.length > 0) {
        closeModalButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.portfolio-modal');
                
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Enable scrolling
                }
            });
        });
    }
    
    // Close modal when clicking outside the content
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('portfolio-modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const toggle = this.querySelector('.faq-toggle');
                
                // Toggle answer visibility
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    toggle.textContent = '+';
                } else {
                    answer.style.display = 'block';
                    toggle.textContent = '-';
                }
            });
        });
    }
    
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    const contactNotification = document.getElementById('contact-notification');

    // Helper to show error below input
    function showFieldError(field, message) {
        let errorElem = field.parentElement.querySelector('.field-error');
        if (!errorElem) {
            errorElem = document.createElement('div');
            errorElem.className = 'field-error';
            errorElem.style.color = 'red';
            errorElem.style.fontSize = '0.9em';
            errorElem.style.marginTop = '4px';
            field.parentElement.appendChild(errorElem);
        }
        errorElem.textContent = message;
    }
    function clearFieldError(field) {
        let errorElem = field.parentElement.querySelector('.field-error');
        if (errorElem) errorElem.remove();
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            let isValid = true;
            // Clear all previous errors
            contactForm.querySelectorAll('.field-error').forEach(e => e.remove());
            contactNotification.style.display = 'none';

            // Validate required fields
            const fields = [
                { id: 'name', label: 'Full Name' },
                { id: 'email', label: 'Email Address' },
                { id: 'subject', label: 'Subject' },
                { id: 'message', label: 'Message' },
                { id: 'consent', label: 'Consent', type: 'checkbox' }
            ];
            fields.forEach(f => {
                const field = contactForm.querySelector(f.type === 'checkbox' ? `#${f.id}` : `input#${f.id}, textarea#${f.id}`);
                if (f.type === 'checkbox') {
                    if (!field.checked) {
                        isValid = false;
                        showFieldError(field, 'This field cannot be empty');
                    } else {
                        clearFieldError(field);
                    }
                } else {
                    if (!field.value.trim()) {
                        isValid = false;
                        showFieldError(field, 'This field cannot be empty');
                    } else {
                        clearFieldError(field);
                    }
                }
            });

            // Email validation for @
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                if (!emailField.value.includes('@')) {
                    isValid = false;
                    showFieldError(emailField, 'Email must contain @');
                } else {
                    clearFieldError(emailField);
                }
            }

            if (!isValid) {
                return;
            }

            // Prepare data
            const formData = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                phone: contactForm.phone.value,
                company: contactForm.company.value,
                subject: contactForm.subject.value,
                message: contactForm.message.value,
                consent: contactForm.consent.checked
            };

            // Send to backend
            try {
                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    contactForm.reset();
                    if (contactNotification) {
                        contactNotification.style.display = 'block';
                        contactNotification.style.color = 'green';
                        contactNotification.textContent = 'Thank you! Your message has been sent.';
                    }
                } else {
                    throw new Error(data.message || 'Failed to send message.');
                }
            } catch (err) {
                if (contactNotification) {
                    contactNotification.style.display = 'block';
                    contactNotification.style.color = 'red';
                    contactNotification.textContent = 'There was an error sending your message. Please try again later.';
                }
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a modal link or empty href
            if (href === '#' || this.classList.contains('portfolio-view')) {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    
                    // Reset hamburger menu animation
                    if (mobileMenuToggle) {
                        const spans = mobileMenuToggle.querySelectorAll('span');
                        spans.forEach(span => span.classList.remove('active'));
                    }
                }
            }
        });
    });

    // Mobile Menu Toggle
    document.querySelector('.mobile-menu-toggle').addEventListener('click', function () {
        document.querySelector('.nav-menu').classList.toggle('d-none');
    });
});
// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize stock counter
    let stockCount = 16;
    const stockDisplay = document.querySelector('.stock-count');
    
    // Initialize order button
    const orderButton = document.querySelector('button');
    if (orderButton) {
        orderButton.addEventListener('click', handleOrder);
    }

    // Handle order submission
    function handleOrder(e) {
        e.preventDefault();
        
        // Show confirmation dialog
        if (confirm('هل أنت متأكد من أنك تريد طلب المنتج؟')) {
            // Simulate order processing
            orderButton.textContent = 'جاري معالجة الطلب...';
            orderButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('تم تقديم طلبك بنجاح! سنتصل بك قريباً لتأكيد الطلب.');
                orderButton.textContent = 'اطلب الآن';
                orderButton.disabled = false;
                
                // Update stock count
                stockCount--;
                if (stockDisplay) {
                    stockDisplay.textContent = stockCount;
                }
            }, 1500);
        }
    }

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.animate-fadeIn');
    animatedElements.forEach(element => {
        element.classList.add('opacity-0');
        setTimeout(() => {
            element.classList.remove('opacity-0');
        }, 100);
    });

    // Handle responsive navigation
    const menuButton = document.querySelector('.menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Add hover effects to feature icons
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('hover-scale');
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.classList.remove('hover-scale');
        });
    });

    // Handle image zoom on click
    const productImage = document.querySelector('.product-image');
    if (productImage) {
        productImage.addEventListener('click', () => {
            productImage.classList.toggle('scale-150');
            productImage.classList.toggle('cursor-zoom-out');
        });
    }

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle form validation
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');
            } else {
                field.classList.remove('border-red-500');
            }
        });

        return isValid;
    }

    // Add accessibility features
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach(element => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });
});

// Handle errors gracefully
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // You could add more error handling here
});
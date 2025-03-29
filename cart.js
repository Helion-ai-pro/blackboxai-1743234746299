// Cart management functionality
class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.init();
    }

    init() {
        // Load cart from localStorage if exists
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const cartData = JSON.parse(savedCart);
                this.items = cartData.items || [];
                this.total = cartData.total || 0;
            } catch (e) {
                console.error('Error loading cart:', e);
                this.items = [];
                this.total = 0;
            }
        }
    }

    addItem(item) {
        this.items.push({
            ...item,
            id: Date.now(), // Simple unique ID
            timestamp: new Date().toISOString()
        });
        this.calculateTotal();
        this.saveCart();
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.calculateTotal();
        this.saveCart();
    }

    calculateTotal() {
        this.total = this.items.reduce((sum, item) => sum + item.price, 0);
        // Apply shipping cost
        if (this.items.length > 0) {
            this.total += 25; // Shipping cost
        }
    }

    clearCart() {
        this.items = [];
        this.total = 0;
        this.saveCart();
    }

    saveCart() {
        try {
            localStorage.setItem('cart', JSON.stringify({
                items: this.items,
                total: this.total
            }));
        } catch (e) {
            console.error('Error saving cart:', e);
        }
    }

    getCartSummary() {
        return {
            itemCount: this.items.length,
            total: this.total,
            items: this.items
        };
    }
}

// Initialize cart
const cart = new Cart();

// Add event listeners for cart interactions
document.addEventListener('DOMContentLoaded', () => {
    const orderButton = document.querySelector('button');
    if (orderButton) {
        orderButton.addEventListener('click', () => {
            // Add product to cart
            cart.addItem({
                name: 'صابونة الشعر السوداء',
                price: 198,
                quantity: 1
            });

            // Update UI
            updateCartUI();
        });
    }
});

// Update cart UI
function updateCartUI() {
    const cartSummary = cart.getCartSummary();
    
    // Update cart icon if exists
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartSummary.itemCount;
    }

    // Update total price if exists
    const totalPrice = document.querySelector('.total-price');
    if (totalPrice) {
        totalPrice.textContent = `${cartSummary.total} ريال`;
    }
}

// Handle checkout process
function processCheckout() {
    const cartSummary = cart.getCartSummary();
    if (cartSummary.itemCount === 0) {
        alert('السلة فارغة');
        return;
    }

    // Here you would typically integrate with a payment gateway
    // For this demo, we'll just show a success message
    alert(`تم تقديم الطلب بنجاح! المجموع: ${cartSummary.total} ريال`);
    cart.clearCart();
    updateCartUI();
}

// Export cart functionality
window.cart = cart;
window.processCheckout = processCheckout;
// Product data
const products = [
    {
        id: 1,
        name: "UltraSlim Laptop Pro",
        price: 1299.99,
        category: "laptops",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c005e81c-e6de-44d9-a1d4-bc419561b538.png",
        alt: "Modern ultra-slim laptop with metallic finish",
        description: "Premium laptop with 4K display and powerful processor",
        features: ["15.6'' 4K Display", "Intel Core i7", "16GB RAM", "1TB SSD"],
        inStock: true,
        rating: 4.8
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 349.99,
        category: "audio",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d6d74e8f-384a-42b0-ae7f-540cf45d8240.png",
        alt: "Premium wireless headphones with noise cancellation",
        description: "Immerse yourself in crystal-clear audio experience",
        features: ["Active Noise Canceling", "30h Battery", "Bluetooth 5.2"],
        inStock: true,
        rating: 4.7
    },
    {
        id: 3,
        name: "Smart Watch Series 5",
        price: 399.99,
        category: "wearables",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5cf21e1c-179b-484d-8a1f-1f48fcedba23.png",
        alt: "Modern smartwatch with health tracking features",
        description: "Stay connected and monitor your health metrics",
        features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant"],
        inStock: true,
        rating: 4.6
    },
    {
        id: 4,
        name: "Wireless Charging Pad",
        price: 79.99,
        category: "accessories",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f4192609-7586-412b-a99f-c50190af2c23.png",
        alt: "Sleek wireless charging pad with LED indicator",
        description: "Charge your devices wirelessly with fast charging",
        features: ["Fast Charging", "Qi Compatible", "LED Indicator"],
        inStock: true,
        rating: 4.5
    },
    {
        id: 5,
        name: "4K Ultra HD Monitor",
        price: 499.99,
        category: "displays",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b131d349-e71f-4663-9ad8-d2e57849e5eb.png",
        alt: "27-inch 4K monitor with thin bezels",
        description: "Enhance your viewing experience with 4K clarity",
        features: ["27'' 4K Display", "HDR Support", "144Hz Refresh"],
        inStock: false,
        rating: 4.9
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        price: 129.99,
        category: "audio",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9e7e3369-7bc9-4dfc-a1d6-3433c4fd7a09.png",
        alt: "Portable Bluetooth speaker with robust sound",
        description: "Take your music anywhere with portable design",
        features: ["360° Sound", "IP67 Waterproof", "24h Playtime"],
        inStock: true,
        rating: 4.4
    }
];

// Cart state
let cart = [];
let currentCategory = 'all';

// DOM elements
const productsGrid = document.getElementById('products-grid');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartSidebar = document.getElementById('cart-sidebar');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notification-message');
const mobileMenu = document.getElementById('mobile-menu');

// Initialize the app
function init() {
    renderProducts();
    updateCartCount();
    setupEventListeners();
    console.log('E-commerce website initialized successfully');
    console.log('Products loaded:', products.length);
}

// Set up event listeners
function setupEventListeners() {
    // Category filter buttons
    document.querySelectorAll('[data-category]').forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            filterProducts(category);
            
            // Update active state
            document.querySelectorAll('[data-category]').forEach(btn => {
                btn.className = 'px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300';
            });
            e.target.className = 'px-4 py-2 rounded-full bg-blue-600 text-white';
        });
    });
}

// Render products
function renderProducts() {
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);
    
    console.log('Rendering products:', filteredProducts.length);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="bg-white rounded-xl shadow-md overflow-hidden product-card animate-fadeIn">
            <div class="relative">
                <img src="${product.image}" alt="${product.alt}" 
                     class="w-full h-48 object-cover"
                     onerror="this.style.backgroundColor='#f3f4f6'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='<div class=\\'text-gray-400 text-sm\\'>Image loading...</div>'">
                ${!product.inStock ? `
                    <div class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                        Out of Stock
                    </div>
                ` : ''}
                <div class="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    ⭐ ${product.rating}
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${product.name}</h3>
                <p class="text-blue-600 font-bold text-2xl mb-4">$${product.price}</p>
                <p class="text-gray-600 text-sm mb-4">${product.description}</p>
                <button onclick="addToCart(${product.id})" 
                        ${!product.inStock ? 'disabled' : ''}
                        class="w-full py-2 rounded font-semibold transition ${product.inStock ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}">
                    ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    `).join('');
}

// Filter products by category
function filterProducts(category) {
    currentCategory = category;
    renderProducts();
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    showNotification(`${product.name} added to cart!`);
    
    // Save to localStorage
    localStorage.setItem('techboutique-cart', JSON.stringify(cart));
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Update cart sidebar
    updateCartSidebar();
}

// Update cart sidebar
function updateCartSidebar() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    cartItems.innerHTML = cart.length === 0 
    ? 
    `<div class="text-center py-12">
       <i class="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
       <p class="text-gray-600">Your cart is empty</p>
    </div>` 
    : 
    cart.map(item =>
        `<div class="flex items-center p-4 border-b">
            <img src="${item.image}" alt="${item.alt}" 
                 class="w-16 h-16 object-cover rounded"
                 onerror="this.style.backgroundColor='#f3f4f6'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='<div class=\\'text-gray-400 text-xs\\'>No image</div>'">
            <div class="flex-1 ml-4">
                <h3 class="font-semibold">${item.name}</h3>
                <p class="text-blue-600 font-bold">$${item.price}</p>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">+</button>
            </div>
            <button onclick="removeFromCart(${item.id})" class="ml-4 text-red-500 hover:text-red-700">
                <i class="fas fa-trash"></i>
            </button>
        </div>`).join('');
}

// Update quantity
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        updateCartCount();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('translate-x-full');
}

// Show notification
function showNotification(message) {
    notificationMessage.textContent = message;
    notification.classList.remove('translate-x-full');
    setTimeout(hideNotification, 3000);
}

// Hide notification
function hideNotification() {
    notification.classList.add('translate-x-full');
}

// Toggle mobile menu
function toggleMobileMenu() {
    mobileMenu.classList.toggle('open');
}

// Scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('techboutique-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    loadCart();
    init();
});

// Make functions globally available for onclick attributes
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;
window.hideNotification = hideNotification;
window.toggleMobileMenu = toggleMobileMenu;
window.scrollToProducts = scrollToProducts;
window.filterProducts = filterProducts;

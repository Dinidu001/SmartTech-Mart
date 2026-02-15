
// Mock Data
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: 450000,
        category: "phones",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800",
        rating: 5,
        description: "Titanium design, A17 Pro chip, 48MP Main camera, USB-C. The most powerful iPhone ever."
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        price: 420000,
        category: "phones",
        image: "https://images.unsplash.com/photo-1706606991536-e39841f71542?auto=format&fit=crop&q=80&w=800",
        rating: 4.8,
        description: "AI-powered, S Pen included, Titanium frame, 200MP camera, Snapdragon 8 Gen 3."
    },
    {
        id: 3,
        name: "MacBook Air M3",
        price: 385000,
        category: "laptops",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=800",
        rating: 4.9,
        description: "Supercharged by M3, extensive battery life, liquid retina display, silent fanless design."
    },
    {
        id: 4,
        name: "Sony WH-1000XM5",
        price: 115000,
        category: "audio",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
        rating: 4.7,
        description: "Industry-leading noise canceling, 30-hour battery life, crystal clear hands-free calling."
    },
    {
        id: 5,
        name: "Apple Watch Series 9",
        price: 145000,
        category: "wearables",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800",
        rating: 4.6,
        description: "S9 SiP, Double Tap gesture, brighter display, carbon neutral combinations available."
    },
    {
        id: 6,
        name: "JBL Flip 6",
        price: 42000,
        category: "audio",
        image: "https://images.unsplash.com/photo-1629828453443-4cb500f4f91e?auto=format&fit=crop&q=80&w=800",
        rating: 4.5,
        description: "Bold sound, IP67 waterproof and dustproof, 12 hours of playtime."
    },
    {
        id: 7,
        name: "Logitech MX Master 3S",
        price: 35000,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1634567228318-8798cb3d7788?auto=format&fit=crop&q=80&w=800",
        rating: 4.8,
        description: "8K DPI tracking, quiet clicks, MagSpeed scrolling, ergonomic design."
    },
    {
        id: 8,
        name: "Anker 737 Power Bank",
        price: 45000,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=800",
        rating: 4.9,
        description: "24,000mAh 3-port portable charger with 140W output used for laptops and phones."
    }
];

// App State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const app = document.getElementById('app');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    navigateTo('home');
});

// Routing Logic
function navigateTo(page, params = null) {
    window.scrollTo(0, 0);
    app.innerHTML = ''; // Clear content

    switch (page) {
        case 'home':
            renderHome();
            break;
        case 'shop':
            renderShop(params);
            break;
        case 'product':
            renderProductDetails(params);
            break;
        case 'cart':
            renderCart();
            break;
        case 'checkout':
            renderCheckout();
            break;
        case 'login':
            renderLogin();
            break;
        case 'admin':
            if (!isAdminLoggedIn()) {
                navigateTo('login');
                return;
            }
            renderAdminDashboard();
            break;
        default:
            renderHome();
    }
}

// Auth State (Mock)
let isAdmin = localStorage.getItem('isAdmin') === 'true';

function isAdminLoggedIn() {
    return isAdmin;
}

function handleLogin(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    if (email === 'admin@smarttech.lk' && password === 'admin123') {
        isAdmin = true;
        localStorage.setItem('isAdmin', 'true');
        showToast('Welcome Admin!');
        navigateTo('admin');
    } else {
        alert('Invalid credentials! (Try: admin@smarttech.lk / admin123)');
    }
}

function handleLogout() {
    isAdmin = false;
    localStorage.removeItem('isAdmin');
    navigateTo('home');
}

// Admin Views
function renderAdminDashboard() {
    const container = document.createElement('div');
    container.className = 'container section';
    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <h2>Admin Dashboard</h2>
            <button class="btn-primary" onclick="handleLogout()" style="background: #333;">Logout</button>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 3fr; gap: 2rem;">
            <div style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); height: fit-content;">
                <h3 style="margin-bottom: 1rem;">Actions</h3>
                <ul style="list-style: none;">
                    <li style="margin-bottom: 0.5rem;"><a href="#" onclick="renderAdminDashboard()" style="color: #FF6A00; font-weight: bold;">Manage Products</a></li>
                    <li style="margin-bottom: 0.5rem;"><a href="#" onclick="alert('Orders feature coming soon in connected version')">View Orders</a></li>
                    <li style="margin-bottom: 0.5rem;"><a href="#" onclick="alert('Settings feature coming soon')">Settings</a></li>
                </ul>
            </div>

            <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <h3>Product List</h3>
                    <button class="btn-primary" onclick="showAddProductForm()">+ Add New Product</button>
                </div>
                
                <div id="admin-product-list" style="background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); overflow: hidden;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead style="background: #f8f9fa; text-align: left;">
                            <tr>
                                <th style="padding: 1rem;">ID</th>
                                <th style="padding: 1rem;">Product</th>
                                <th style="padding: 1rem;">Price</th>
                                <th style="padding: 1rem;">Stock</th>
                                <th style="padding: 1rem;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${products.map(p => `
                                <tr style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 1rem;">#${p.id}</td>
                                    <td style="padding: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                                        <img src="${p.image}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                                        ${p.name}
                                    </td>
                                    <td style="padding: 1rem;">LKR ${p.price.toLocaleString()}</td>
                                    <td style="padding: 1rem;"><span style="color: green;">In Stock</span></td>
                                    <td style="padding: 1rem;">
                                        <button onclick="alert('Edit functionality would open a modal here.')" style="margin-right: 0.5rem; color: #1E88E5; background: none; border: none; cursor: pointer;"><i class="fas fa-edit"></i></button>
                                        <button onclick="deleteProduct(${p.id})" style="color: red; background: none; border: none; cursor: pointer;"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    app.appendChild(container);
}

function showAddProductForm() {
    const form = document.createElement('div');
    form.style.position = 'fixed';
    form.style.top = '0';
    form.style.left = '0';
    form.style.width = '100%';
    form.style.height = '100%';
    form.style.background = 'rgba(0,0,0,0.5)';
    form.style.display = 'flex';
    form.style.alignItems = 'center';
    form.style.justifyContent = 'center';
    form.style.zIndex = '2000';

    form.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 8px; width: 90%; max-width: 500px;">
            <h3 style="margin-bottom: 1rem;">Add New Product</h3>
            <input type="text" placeholder="Product Name" style="width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px;">
            <input type="number" placeholder="Price (LKR)" style="width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px;">
            <select style="width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px;">
                <option value="phones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="audio">Audio</option>
                <option value="wearables">Wearables</option>
                <option value="accessories">Accessories</option>
            </select>
            <textarea placeholder="Description" style="width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px;"></textarea>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button onclick="document.body.removeChild(this.closest('div').parentNode)" style="padding: 0.8rem 1.5rem; background: #ddd; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
                <button onclick="alert('Product added! (This is a mock)'); document.body.removeChild(this.closest('div').parentNode)" class="btn-primary">Save Product</button>
            </div>
        </div>
    `;
    document.body.appendChild(form);
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        alert('Product deleted! (Visual update only for demo)');
    }
}

// Views
function renderHome() {
    // Hero Section
    const hero = document.createElement('div');
    hero.className = 'container';
    hero.innerHTML = `
        <div class="hero">
            <div class="hero-content">
                <h1>Upgrade Your Tech Lifestyle</h1>
                <p>Discover the latest gadgets and electronics at unbeatable prices.</p>
                <button class="btn-primary" onclick="navigateTo('shop', 'all')">Shop Now</button>
            </div>
        </div>
    `;
    app.appendChild(hero);

    // Featured Products Section
    const section = document.createElement('section');
    section.className = 'container section';
    section.innerHTML = `
        <h2 class="section-title">Featured Products</h2>
        <div class="products-grid" id="featured-products"></div>
    `;
    app.appendChild(section);

    const grid = document.getElementById('featured-products');
    products.slice(0, 4).forEach(product => {
        grid.appendChild(createProductCard(product));
    });
}

function renderShop(category = 'all') {
    const section = document.createElement('section');
    section.className = 'container section';
    const title = category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1);

    section.innerHTML = `
        <h2 class="section-title">${title}</h2>
        <div class="products-grid" id="shop-products"></div>
    `;
    app.appendChild(section);

    const grid = document.getElementById('shop-products');
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);

    if (filtered.length === 0) {
        grid.innerHTML = '<p>No products found in this category.</p>';
    } else {
        filtered.forEach(product => {
            grid.appendChild(createProductCard(product));
        });
    }
}

function renderProductDetails(id) {
    const product = products.find(p => p.id === parseInt(id));
    if (!product) return navigateTo('home');

    const container = document.createElement('div');
    container.className = 'container section';
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem;">
            <div class="product-gallery">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            </div>
            <div class="product-info-detail">
                <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">${product.name}</h1>
                <div class="rating" style="margin-bottom: 1rem;">
                    ${getStarRating(product.rating)} <span>(${product.rating}/5)</span>
                </div>
                <h2 style="color: #FF6A00; font-size: 2rem; margin-bottom: 1.5rem;">LKR ${product.price.toLocaleString()}</h2>
                
                <p style="margin-bottom: 2rem; font-size: 1.1rem; line-height: 1.8;">${product.description}</p>
                
                <div style="margin-bottom: 2rem;">
                    <strong>Availability:</strong> <span style="color: green;">In Stock</span>
                </div>

                <div class="actions" style="display: flex; gap: 1rem;">
                    <button class="btn-primary" onclick="addToCart(${product.id}); showToast('Added to Cart!')">Add to Cart</button>
                    <button class="btn-primary" style="background: #333;" onclick="addToCart(${product.id}); navigateTo('cart')">Buy Now</button>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 4rem;">
            <h3>Related Products</h3>
            <div class="products-grid" style="margin-top: 2rem;">
                ${getRelatedProducts(product.category, product.id).map(p => createProductCardHTML(p)).join('')}
            </div>
        </div>
    `;
    app.appendChild(container);
}

function renderCart() {
    const container = document.createElement('div');
    container.className = 'container section';

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 4rem;">
                <h2>Your Cart is Empty</h2>
                <p style="margin-bottom: 2rem;">Looks like you haven't added anything yet.</p>
                <button class="btn-primary" onclick="navigateTo('shop', 'all')">Start Shopping</button>
            </div>
        `;
        app.appendChild(container);
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    container.innerHTML = `
        <h2 class="section-title">Your Shopping Cart</h2>
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
            <div class="cart-items">
                ${cart.map(item => `
                    <div style="display: flex; gap: 1rem; margin-bottom: 1rem; padding: 1rem; background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); align-items: center;">
                        <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;">
                        <div style="flex-grow: 1;">
                            <h4>${item.name}</h4>
                            <p style="color: #FF6A00; font-weight: bold;">LKR ${item.price.toLocaleString()}</p>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" style="padding: 0.2rem 0.6rem;">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" style="padding: 0.2rem 0.6rem;">+</button>
                        </div>
                        <button onclick="removeFromCart(${item.id})" style="color: red; border: none; background: none; cursor: pointer;"><i class="fas fa-trash"></i></button>
                    </div>
                `).join('')}
            </div>
            <div class="cart-summary" style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); height: fit-content;">
                <h3 style="margin-bottom: 1rem;">Order Summary</h3>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span>Subtotal</span>
                    <span>LKR ${total.toLocaleString()}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-weight: bold; font-size: 1.2rem;">
                    <span>Total</span>
                    <span style="color: #FF6A00;">LKR ${total.toLocaleString()}</span>
                </div>
                <button class="btn-primary" style="width: 100%;" onclick="navigateTo('checkout')">Proceed to Checkout</button>
            </div>
        </div>
    `;
    app.appendChild(container);
}

function renderCheckout() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const container = document.createElement('div');
    container.className = 'container section';
    container.innerHTML = `
        <h2 class="section-title">Checkout</h2>
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <form id="checkout-form" onsubmit="handleCheckout(event)">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem;">Full Name</label>
                    <input type="text" id="name" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem;">Phone Number</label>
                    <input type="tel" id="phone" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem;">Address</label>
                    <textarea id="address" required style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px; height: 100px;"></textarea>
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem;">Order Notes (Optional)</label>
                    <textarea id="notes" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;"></textarea>
                </div>
                
                <div style="border-top: 1px solid #eee; margin: 1.5rem 0; padding-top: 1rem;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 1.5rem;">
                        <span>Total Amount</span>
                        <span style="color: #FF6A00;">LKR ${total.toLocaleString()}</span>
                    </div>
                </div>

                <button type="submit" class="btn-primary" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem; background: #25D366;">
                    <i class="fab fa-whatsapp"></i> Place Order via WhatsApp
                </button>
            </form>
        </div>
    `;
    app.appendChild(container);
}

function renderLogin() {
    const container = document.createElement('div');
    container.className = 'container section';
    container.innerHTML = `
        <div style="max-width: 400px; margin: 2rem auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center;">
            <h2 style="margin-bottom: 1.5rem;">Admin Login</h2>
            <form onsubmit="handleLogin(event)">
                <input type="email" placeholder="Email" required style="width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px;">
                <input type="password" placeholder="Password" required style="width: 100%; padding: 0.8rem; margin-bottom: 1.5rem; border: 1px solid #ddd; border-radius: 4px;">
                <button type="submit" class="btn-primary" style="width: 100%;">Login</button>
            </form>
            <p style="margin-top: 1rem; color: #666; font-size: 0.9rem;">(For demonstration, this is a UI mock)
            <br>
            <strong>Use: admin@smarttech.lk / admin123</strong>
            </p>
        </div>
    `;
    app.appendChild(container);
}

// Helpers
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onclick="navigateTo('product', ${product.id})">
        <div class="product-info">
            <h3 onclick="navigateTo('product', ${product.id})" style="cursor: pointer;">${product.name}</h3>
            <div class="rating">${getStarRating(product.rating)}</div>
            <div class="product-price">LKR ${product.price.toLocaleString()}</div>
        </div>
        <div class="product-actions">
            <button class="btn-add-cart" onclick="addToCart(${product.id}); showToast('Added to Cart!')">Add to Cart</button>
            <button class="btn-buy-now" onclick="addToCart(${product.id}); navigateTo('cart')">Buy Now</button>
        </div>
    `;
    return card;
}

function createProductCardHTML(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" onclick="navigateTo('product', ${product.id})">
            <div class="product-info">
                <h3 onclick="navigateTo('product', ${product.id})" style="cursor: pointer;">${product.name}</h3>
                <div class="rating">${getStarRating(product.rating)}</div>
                <div class="product-price">LKR ${product.price.toLocaleString()}</div>
            </div>
            <div class="product-actions">
                <button class="btn-add-cart" onclick="addToCart(${product.id}); showToast('Added to Cart!')">Add to Cart</button>
                <button class="btn-buy-now" onclick="addToCart(${product.id}); navigateTo('cart')">Buy Now</button>
            </div>
        </div>
    `;
}

function getStarRating(rating) {
    return '<i class="fas fa-star"></i>'.repeat(Math.floor(rating)) +
        (rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : '') +
        '<i class="far fa-star"></i>'.repeat(5 - Math.ceil(rating));
}

function getRelatedProducts(category, currentId) {
    return products.filter(p => p.category === category && p.id !== currentId).slice(0, 4);
}

function filterCategory(category) {
    navigateTo('shop', category);
}

// Logic
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart(); // Re-render
    updateCartCount();
}

function updateQuantity(id, qty) {
    if (qty < 1) return removeFromCart(id);
    const item = cart.find(p => p.id === id);
    if (item) item.quantity = qty;
    saveCart();
    renderCart(); // Re-render
    updateCartCount();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.innerText = count;
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

function handleCheckout(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const notes = document.getElementById('notes').value;

    const orderItems = cart.map(item => `- ${item.name} (${item.quantity} x LKR ${item.price.toLocaleString()})`).join('\n');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Format Message for WhatsApp
    const message = `*New Order from SmartTech Mart* 🛒\n\n` +
        `*Customer Details:*\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Address: ${address}\n` +
        `Notes: ${notes}\n\n` +
        `*Order Details:*\n${orderItems}\n\n` +
        `*Total Amount: LKR ${total.toLocaleString()}*`;

    // Replace with your WhatsApp number
    const waNumber = "94771234567"; // Fake number for demo, user should replace
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    // Clear cart and redirect
    cart = [];
    saveCart();
    updateCartCount();
    window.open(url, '_blank');
    navigateTo('home');
    alert('Order placed! Redirecting to WhatsApp to complete details.');
}

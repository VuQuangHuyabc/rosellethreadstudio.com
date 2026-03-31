// Main JavaScript for Roselle Thread Studio LLC

// Product data structure
const products = [
    {
        id: 1,
        name: "Elegant Winter Wool Dress",
        price: 189.99,
        originalPrice: 249.99,
        description: "Beautiful long woolen dress perfect for winter occasions and formal events",
        images: ["variant-image-1.jpeg", "variant-image-2.jpeg", "variant-image-3.jpeg", "variant-image-4.jpeg", "variant-image-5.jpeg"],
        folder: "1",
        variants: ["Black", "Navy Blue", "Burgundy", "Forest Green", "Charcoal"],
        category: "Winter Collection",
        inStock: true,
        featured: true
    },
    {
        id: 2,
        name: "Classic Long Wool Coat Dress",
        price: 289.99,
        originalPrice: 359.99,
        description: "Sophisticated long woolen coat dress with elegant silhouette and premium quality",
        images: ["main-image-1.jpeg", "main-image-2.jpeg", "main-image-3.jpeg", "main-image-4.jpeg", "main-image-5.jpeg", "main-image-6.jpeg", "main-image-7.jpeg"],
        folder: "2",
        variants: ["XS", "S", "M", "L", "XL", "XXL"],
        category: "Coat Dresses",
        inStock: true,
        featured: true
    },
    {
        id: 3,
        name: "Bohemian Wool Maxi Dress",
        price: 159.99,
        originalPrice: 199.99,
        description: "Flowing bohemian style long woolen dress with intricate patterns and comfortable fit",
        images: ["main-image-1.jpeg", "main-image-2.jpeg", "main-image-3.jpeg", "main-image-4.jpeg", "main-image-5.jpeg", "main-image-6.jpeg", "main-image-7.jpeg"],
        folder: "3",
        variants: ["Cream", "Terracotta", "Olive", "Mustard", "Rust"],
        category: "Bohemian Style",
        inStock: true,
        featured: true
    },
    {
        id: 4,
        name: "Professional Wool Sheath Dress",
        price: 179.99,
        originalPrice: 229.99,
        description: "Tailored woolen sheath dress perfect for business meetings and professional settings",
        images: ["variant-image-1.jpeg", "variant-image-2.jpeg", "variant-image-3.jpeg", "variant-image-4.jpeg"],
        folder: "4",
        variants: ["Black", "Gray", "Navy", "Brown"],
        category: "Professional",
        inStock: true,
        featured: false
    },
    {
        id: 5,
        name: "Vintage Wool Evening Dress",
        price: 249.99,
        originalPrice: 329.99,
        description: "Elegant vintage-inspired long woolen dress for special evening occasions",
        images: ["variant-image-1.avif", "variant-image-2.jpeg", "variant-image-3.jpeg", "variant-image-4.jpeg"],
        folder: "5",
        variants: ["Emerald", "Royal Blue", "Deep Purple", "Ruby Red"],
        category: "Evening Wear",
        inStock: true,
        featured: false
    },
    {
        id: 6,
        name: "Casual Wool Day Dress",
        price: 129.99,
        originalPrice: 169.99,
        description: "Comfortable yet stylish long woolen dress perfect for casual daytime wear",
        images: ["variant-image-1.jpeg", "variant-image-2.jpeg", "variant-image-3.jpeg", "variant-image-4.jpeg"],
        folder: "6",
        variants: ["Beige", "Light Gray", "Sage Green", "Dusty Rose"],
        category: "Casual Wear",
        inStock: true,
        featured: false
    }
];

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    loadFeaturedProducts();
    loadAllProducts();
    setupEventListeners();
    
    // Load product detail if on product detail page
    if (window.location.pathname.includes('product-detail.html')) {
        loadProductDetail();
    }
    
    // Load cart if on cart page
    if (window.location.pathname.includes('cart.html')) {
        loadCart();
    }
});

// Update cart count in navigation
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Load featured products on home page
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    const featuredProducts = products.filter(p => p.featured);
    
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="col-lg-4 col-md-6">
            <div class="card product-card h-100">
                <div class="product-image">
                    <img src="Products/${product.folder}/${product.images[0]}" alt="${product.name}">
                    ${product.originalPrice > product.price ? '<span class="product-badge">SALE</span>' : ''}
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <div class="product-price mb-3">
                        $${product.price}
                        ${product.originalPrice > product.price ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    </div>
                    <div class="mt-auto">
                        <a href="product-detail.html?id=${product.id}" class="btn btn-outline-primary w-100 mb-2">View Details</a>
                        <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Load all products on products page
function loadAllProducts() {
    const productsGrid = document.getElementById('products-grid');
    const loading = document.getElementById('loading');
    const noProducts = document.getElementById('no-products');
    const productCount = document.getElementById('product-count');
    
    if (!productsGrid) return;
    
    // Hide loading
    if (loading) loading.style.display = 'none';
    
    // Update product count
    if (productCount) productCount.textContent = products.length;
    
    if (products.length === 0) {
        if (noProducts) noProducts.classList.remove('d-none');
        return;
    }
    
    productsGrid.innerHTML = products.map(product => `
        <div class="col-lg-4 col-md-6">
            <div class="card product-card h-100">
                <div class="product-image">
                    <img src="Products/${product.folder}/${product.images[0]}" alt="${product.name}">
                    ${product.originalPrice > product.price ? '<span class="product-badge">SALE</span>' : ''}
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="text-muted small">${product.category}</p>
                    <p class="card-text">${product.description}</p>
                    <div class="product-price mb-3">
                        $${product.price}
                        ${product.originalPrice > product.price ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    </div>
                    <div class="mt-auto">
                        <a href="product-detail.html?id=${product.id}" class="btn btn-outline-primary w-100 mb-2">View Details</a>
                        <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Load product detail page
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    const loading = document.getElementById('loading');
    const productDetail = document.getElementById('product-detail');
    const productNotFound = document.getElementById('product-not-found');
    const breadcrumbProduct = document.getElementById('breadcrumb-product');
    
    if (!productId) {
        if (loading) loading.style.display = 'none';
        if (productNotFound) productNotFound.classList.remove('d-none');
        return;
    }
    
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        if (loading) loading.style.display = 'none';
        if (productNotFound) productNotFound.classList.remove('d-none');
        return;
    }
    
    // Update breadcrumb
    if (breadcrumbProduct) {
        breadcrumbProduct.textContent = product.name;
    }
    
    // Hide loading
    if (loading) loading.style.display = 'none';
    
    // Display product detail
    productDetail.innerHTML = `
        <div class="col-lg-6">
            <div class="product-detail-image">
                <div class="main-image-container mb-3">
                    <img src="Products/${product.folder}/${product.images[0]}" alt="${product.name}" id="main-image" class="img-fluid">
                </div>
                <div class="thumbnail-container">
                    ${product.images.map((img, index) => `
                        <img src="Products/${product.folder}/${img}" alt="${product.name} - Image ${index + 1}" 
                             class="thumbnail-img ${index === 0 ? 'active' : ''}" 
                             onclick="changeMainImage('Products/${product.folder}/${img}', this)">
                    `).join('')}
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="product-info">
                <h1 class="mb-3">${product.name}</h1>
                <p class="text-muted mb-3">${product.category}</p>
                <p class="lead mb-4">${product.description}</p>
                
                <div class="product-price mb-4">
                    <span class="fs-2 fw-bold text-success">$${product.price}</span>
                    ${product.originalPrice > product.price ? `<span class="original-price fs-4">$${product.originalPrice}</span>` : ''}
                </div>
                
                <div class="mb-4">
                    <h5>Variants:</h5>
                    <div class="d-flex flex-wrap">
                        ${product.variants.map(variant => `
                            <div class="variant-option" onclick="selectVariant(this, '${variant}')">
                                ${variant}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="mb-4">
                    <div class="d-flex align-items-center gap-3">
                        <label class="fw-bold">Quantity:</label>
                        <div class="quantity-controls">
                            <button onclick="decreaseQuantity()">-</button>
                            <input type="number" id="quantity" value="1" min="1" max="10" class="quantity-input">
                            <button onclick="increaseQuantity()">+</button>
                        </div>
                    </div>
                </div>
                
                <div class="d-grid gap-2">
                    <button class="btn btn-primary btn-lg" onclick="addToCartWithQuantity(${product.id})">
                        <i class="bi bi-cart-plus me-2"></i>Add to Cart
                    </button>
                    <a href="products.html" class="btn btn-outline-primary">
                        <i class="bi bi-arrow-left me-2"></i>Continue Shopping
                    </a>
                </div>
                
                <div class="mt-4">
                    <h6>Product Features:</h6>
                    <ul>
                        <li>Premium quality materials</li>
                        <li>Perfect for ${product.category.toLowerCase()} projects</li>
                        <li>Available in multiple variants</li>
                        <li>Professional grade quality</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // Load related products
    loadRelatedProducts(product.category, product.id);
}

// Load related products
function loadRelatedProducts(category, currentProductId) {
    const relatedContainer = document.getElementById('related-products');
    if (!relatedContainer) return;
    
    const relatedProducts = products.filter(p => 
        p.category === category && p.id !== currentProductId
    ).slice(0, 3);
    
    if (relatedProducts.length === 0) {
        document.getElementById('related-products-section').style.display = 'none';
        return;
    }
    
    relatedContainer.innerHTML = relatedProducts.map(product => `
        <div class="col-lg-4 col-md-6">
            <div class="card product-card h-100">
                <div class="product-image">
                    <img src="Products/${product.folder}/${product.images[0]}" alt="${product.name}">
                    ${product.originalPrice > product.price ? '<span class="product-badge">SALE</span>' : ''}
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="text-muted small">${product.category}</p>
                    <div class="product-price mb-3">
                        $${product.price}
                        ${product.originalPrice > product.price ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    </div>
                    <div class="mt-auto">
                        <a href="product-detail.html?id=${product.id}" class="btn btn-outline-primary w-100 mb-2">View Details</a>
                        <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Change main image in product detail
function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.getElementById('main-image');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail-img').forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbnail.classList.add('active');
}

// Select variant
function selectVariant(element, variant) {
    document.querySelectorAll('.variant-option').forEach(option => {
        option.classList.remove('selected');
    });
    element.classList.add('selected');
}

// Quantity controls
function increaseQuantity() {
    const input = document.getElementById('quantity');
    if (input && input.value < 10) {
        input.value = parseInt(input.value) + 1;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('quantity');
    if (input && input.value > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: `Products/${product.folder}/${product.images[0]}`,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showToast('Product added to cart!', 'success');
}

// Add to cart with quantity (from product detail page)
function addToCartWithQuantity(productId) {
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: `Products/${product.folder}/${product.images[0]}`,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartCount();
    showToast(`${quantity} item(s) added to cart!`, 'success');
}

// Load cart page
function loadCart() {
    const cartItems = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        emptyCart.classList.remove('d-none');
        updateOrderSummary();
        return;
    }
    
    emptyCart.classList.add('d-none');
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                </div>
                <div class="col-md-4">
                    <h5>${item.name}</h5>
                    <p class="text-muted mb-0">$${item.price.toFixed(2)} each</p>
                </div>
                <div class="col-md-3">
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" value="${item.quantity}" min="1" max="10" class="quantity-input" 
                               onchange="updateQuantity(${item.id}, this.value)">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <h5>$${(item.price * item.quantity).toFixed(2)}</h5>
                </div>
                <div class="col-md-1">
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    updateOrderSummary();
}

// Update cart item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > 10) newQuantity = 10;
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(newQuantity);
        saveCart();
        updateCartCount();
        loadCart(); // Reload cart page
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    loadCart(); // Reload cart page
    showToast('Item removed from cart', 'info');
}

// Update order summary
function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    
    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle';
    
    toast.innerHTML = `
        <i class="bi bi-${icon}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    document.body.appendChild(toastContainer);
    
    setTimeout(() => {
        toast.remove();
        toastContainer.remove();
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Newsletter forms
    const newsletterForms = document.querySelectorAll('#newsletter-form, #footer-newsletter-form');
    newsletterForms.forEach(form => {
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = form.querySelector('input[type="email"]').value;
                showToast(`Thank you for subscribing with ${email}!`, 'success');
                form.reset();
            });
        }
    });
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Your message has been sent successfully!', 'success');
            contactForm.reset();
        });
    }
    
    // Sort products
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showToast('Your cart is empty!', 'error');
                return;
            }
            showToast('Proceeding to checkout...', 'info');
        });
    }
    
    // Apply promo code
    const applyPromo = document.getElementById('apply-promo');
    if (applyPromo) {
        applyPromo.addEventListener('click', function() {
            const promoCode = document.getElementById('promo-code').value;
            if (promoCode) {
                showToast('Promo code applied successfully!', 'success');
                document.getElementById('promo-code').value = '';
            } else {
                showToast('Please enter a promo code', 'error');
            }
        });
    }
}

// Sort products
function sortProducts(sortType) {
    let sortedProducts = [...products];
    
    switch(sortType) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            sortedProducts = products;
    }
    
    // Update the global products array
    products.length = 0;
    products.push(...sortedProducts);
    
    // Reload products display
    loadAllProducts();
}

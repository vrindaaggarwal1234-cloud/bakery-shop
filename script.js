/* 
  The Daily Crumb - Logic
  Handles global cart state (bakeryCart) and Navbar badge updates.
*/

// State: Initialize from localStorage (Array of Objects)
let cart = JSON.parse(localStorage.getItem('bakeryCart')) || [];

// DOM Elements
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

/**
 * Updates the Navbar Badge based on cart length.
 */
function updateCartUI() {
    // Cart badge removed from UI as per user request
}

/**
 * Adds a product to the cart and persists it.
 * @param {string} productName - Name of the item.
 * @param {string} productPrice - Price as a string (e.g. "6.00").
 */
function addToCart(productName, productPrice) {
    // 1. Create item object
    const item = {
        name: productName,
        price: parseFloat(productPrice)
    };

    // 2. Add to State
    cart.push(item);

    // 3. Persist State (Save as 'bakeryCart')
    localStorage.setItem('bakeryCart', JSON.stringify(cart));

    // 4. Update UI
    updateCartUI();

    // 5. User Notification
    setTimeout(() => {
        alert(`Added ${productName} ($${item.price.toFixed(2)}) to your cart!`);
    }, 10);

    console.log(`Added ${productName}. Cart size: ${cart.length}`);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Badge
    updateCartUI();

    // Attach listeners to all "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = e.target.getAttribute('data-product');
            const productPrice = e.target.getAttribute('data-price');

            if (productName && productPrice) {
                addToCart(productName, productPrice);
            } else {
                console.error("Missing product data", e.target);
            }
        });
    });
});

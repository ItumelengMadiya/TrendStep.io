// Function to update the cart display
function updateCart() {
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const cartTableBody = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartTableBody.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td><img src="${item.image}" alt="${item.name}" style="width: 100px;"></td>
            <td>R${item.price}</td>
            <td>${item.quantity}</td>
            <td>R${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="btn btn-danger remove-from-cart" data-name="${item.name}">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `R${total.toFixed(2)}`;
}

// Function to handle adding items to the cart
function addToCart(event) {
    const button = event.target;
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    const image = button.getAttribute('data-image');

    const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.name === name);

    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += 1;
    } else {
        cartItems.push({ name, price, image, quantity: 1 });
    }

    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();

    // Show Bootstrap modal
    const modal = new bootstrap.Modal(document.getElementById('cartNotificationModal'));
    const modalBody = document.querySelector('#cartNotificationModal .modal-body');
    modalBody.textContent = `${name} has been added to your cart.`;
    modal.show();
}

// Function to handle removing items from the cart
function removeFromCart(event) {
    const button = event.target;
    const name = button.getAttribute('data-name');

    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.name !== name);

    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();
}

// Attach event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

// Attach event listeners to "Remove" buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-from-cart')) {
        removeFromCart(event);
    }
});

// Handle form submissions for checkout and tracking
document.getElementById('checkout-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    // Add more detailed checkout processing logic here if needed
    alert('Order placed successfully!');
    window.location.href = 'thankyou.html'; // Redirect to the thank you page
});

document.getElementById('track-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const orderId = document.getElementById('order-id').value; // Assuming an input field with ID 'order-id'
    // Add logic to fetch and display tracking information here
    alert('Tracking information for order ' + orderId + ' will be sent to your email.');
});

// Initial cart update
updateCart();


document.addEventListener('DOMContentLoaded', () => {
    // Existing quantity button code
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');

    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const key = button.getAttribute('data-id');
            const quantityElement = button.previousElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            quantity += 1;
            updateCart(key, quantity, quantityElement);
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const key = button.getAttribute('data-id');
            const quantityElement = button.nextElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            quantity -= 1;
            updateCart(key, quantity, quantityElement);
        });
    });

    function updateCart(key, quantity, element) {
        fetch('/cart/change.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: key, quantity: quantity })
        })
        .then(response => response.json())
        .then(data => {
            if (quantity > 0) {
                element.textContent = quantity;
            }
            document.querySelector('.cart-count').textContent = data.item_count;
            location.reload();
        })
        .catch(error => console.error('Error updating cart:', error));
    }

    // New redirect code for contact form
    const successMessage = document.querySelector('.form-success');
    if (successMessage) {
        setTimeout(() => {
            window.location.href = '/';
        }, 5000); // 5 seconds
    }

    // Add to Cart Ajax for both collections and product pages
    const addToCartForms = document.querySelectorAll('.add-to-cart-form');
    addToCartForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const variantId = form.getAttribute('data-product-id');
            
            fetch('/cart/add.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    id: variantId,
                    quantity: 1
                })
            })
            .then(response => response.json())
            .then(data => {
                // Fetch the updated cart to get the total item count
                return fetch('/cart.js')
                    .then(response => response.json())
                    .then(cart => {
                        document.querySelector('.cart-count').textContent = cart.item_count;
                        
                        // Show notification relative to the form's context
                        let notification;
                        if (form.closest('.product-card')) {
                            // Collections page
                            notification = form.closest('.product-card').querySelector('.cart-notification');
                        } else if (form.closest('.product-content')) {
                            // Product page
                            notification = form.closest('.product-content').querySelector('.cart-notification');
                        }
                        
                        if (notification) {
                            notification.style.display = 'block';
                            notification.classList.add('visible');
                            setTimeout(() => {
                                notification.classList.remove('visible');
                                setTimeout(() => {
                                    notification.style.display = 'none';
                                }, 300); // Match transition duration
                            }, 3000); // Show for 3 seconds
                        } else {
                            console.error('Cart notification not found');
                        }
                    });
            })
            .catch(error => console.error('Error adding to cart:', error));
        });
    });

    // Image zoom functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('close-modal')[0];
    
    // Only initialize if we're on a product page (modal exists)
    if (modal && modalImg && closeBtn) {
        // Open modal when clicking on image or zoom icon
        document.querySelector('.image-wrapper').addEventListener('click', function(e) {
            const img = this.querySelector('.product-img');
            modal.style.display = "block";
            modalImg.src = img.src;
        });

        // Close modal when clicking on X
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });

        // Close modal when clicking outside the image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });

        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === "block") {
                modal.style.display = "none";
            }
        });
    }
});
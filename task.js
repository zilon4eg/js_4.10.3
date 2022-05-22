const products = document.querySelectorAll('.products .product');

for (const product of products) {
    const productQuantity = product.querySelector('.product__controls .product__quantity');

    const productQuantityControls = productQuantity.querySelector('.product__quantity-controls');
    const productQuantityControlsDec = productQuantityControls.querySelector('.product__quantity-control_dec');
    let productQuantityControlsValue = productQuantityControls.querySelector('.product__quantity-value');
    const productQuantityControlsInc = productQuantityControls.querySelector('.product__quantity-control_inc');

    productQuantityControlsDec.addEventListener('click', () => {
        if (Number(productQuantityControlsValue.textContent) > 0) {
            productQuantityControlsValue.textContent = Number(productQuantityControlsValue.textContent) - 1;
        }
    });

    productQuantityControlsInc.addEventListener('click', () => {
        productQuantityControlsValue.textContent = Number(productQuantityControlsValue.textContent) + 1;
    });

    const productAdd = productQuantity.querySelector('.product__add');
    productAdd.addEventListener('click', () => {
        const cart = document.querySelector('.cart');
        const cartProducts = cart.querySelectorAll('.cart__products .cart__product');
        
        idList = [];
        for (let cartProduct of cartProducts) {
            idList.push(Number(cartProduct.dataset.id));
        }

        if (idList.includes(Number(product.dataset.id))) {
            for (let cartProduct of cartProducts) {
                if (cartProduct.dataset.id == product.dataset.id) {
                    cartProduct.querySelector('.cart__product-count').textContent = Number(cartProduct.querySelector('.cart__product-count').textContent) + Number(productQuantityControlsValue.textContent);
                    break;
                }
            }
        } else {
            if (Number(productQuantityControlsValue.textContent) > 0) {
                // создаем html элемент
                const newProduct = document.createElement('div');
                newProduct.className = 'cart__product';
                newProduct.dataset.id = product.dataset.id;
                document.querySelector('.cart .cart__products').appendChild(newProduct);

                const newProductImage = document.createElement('img');
                newProductImage.className = 'cart__product-image';
                newProductImage.src = product.querySelector('img').src;
                newProduct.appendChild(newProductImage);

                const newProductCount = document.createElement('div');
                newProductCount.className = 'cart__product-count';
                newProductCount.textContent = productQuantityControlsValue.textContent;
                newProduct.appendChild(newProductCount);
            }
        }
    });
}

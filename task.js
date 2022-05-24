const products = document.querySelectorAll('.products .product');

for (const product of products) {
    const productQuantity = product.querySelector('.product__controls .product__quantity');

    const productQuantityControls = productQuantity.querySelector('.product__quantity-controls');
    const productQuantityControlsDec = productQuantityControls.querySelector('.product__quantity-control_dec');
    let productQuantityControlsValue = productQuantityControls.querySelector('.product__quantity-value');
    const productQuantityControlsInc = productQuantityControls.querySelector('.product__quantity-control_inc');

    productQuantityControlsDec.addEventListener('click', () => {
        if (Number(productQuantityControlsValue.textContent) > 1) {
            productQuantityControlsValue.textContent = Number(productQuantityControlsValue.textContent) - 1;
        }
    });

    productQuantityControlsInc.addEventListener('click', () => {
        productQuantityControlsValue.textContent = Number(productQuantityControlsValue.textContent) + 1;
    });

    const productAdd = productQuantity.querySelector('.product__add');
    productAdd.addEventListener('click', () => {

        const cartProducts = document.getElementsByClassName('cart__product');
        const cartProductsArray = Array.from(cartProducts)
        const cartProductArray = cartProductsArray.find((findProduct) => {
            return findProduct.dataset.id === product.dataset.id;
        });        

        if (cartProductArray != undefined) {
            cartProductArray.querySelector('.cart__product-count').textContent = Number(cartProductArray.textContent) + Number(productQuantityControlsValue.textContent);
        }
        
        else {
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
    });
}

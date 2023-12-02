function smooth_scroll(selector) {
    const target = document.querySelector(selector);

    if (target) {
        target.scrollIntoView({
            behavior: 'smooth'
        });
    } else {
        console.error('Element with selector', selector, 'not found.');
    }
}

document.querySelector('button[type="arrow"]').addEventListener('click', function () {
    smooth_scroll('.anchor');
});

document.querySelector('.header__top__mini button[type="about"]').addEventListener('click', function () {
    smooth_scroll('.anchor');
});

document.querySelector('.header__top__mini button[type="catalog"]').addEventListener('click', function () {
    smooth_scroll('.catalog__list');
});

document.querySelector('.header__top__mini button[type="advantages"]').addEventListener('click', function () {
    smooth_scroll('.advantages');
});

document.querySelector('.header__top__mini button[type="contacts"]').addEventListener('click', function () {
    smooth_scroll('.basement');
});

document.querySelector('.header__top button[type="about"]').addEventListener('click', function () {
    smooth_scroll('.anchor');
});

document.querySelector('.header__top button[type="catalog"]').addEventListener('click', function () {
    smooth_scroll('.catalog__list');
});

document.querySelector('.header__top button[type="advantages"]').addEventListener('click', function () {
    smooth_scroll('.advantages');
});

document.querySelector('.header__top button[type="contacts"]').addEventListener('click', function () {
    smooth_scroll('.basement');
});

document.querySelector('button[type="buy_duck"]').addEventListener('click', function () {
    smooth_scroll('.catalog__list');
});

document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.querySelector(".cart__icon");
    const cartWin = document.querySelector(".cart__win");
    const cartProducts = document.querySelector(".products");
    let productInCart = [0, 0, 0];

    function showIcon() {
        const totalQuantity = Number(document.querySelector(".total-quantity").textContent);
        if (!cartIcon.classList.contains("cart__icon_showed") && totalQuantity > 0)
            cartIcon.classList.toggle("cart__icon_showed");
    }

    function hideIcon() {
        if (cartIcon.classList.contains("cart__icon_showed"))
            cartIcon.classList.remove("cart__icon_showed");
    }

    function showCart() {
        if (!cartWin.classList.contains("cart__win_showed"))
            cartWin.classList.toggle("cart__win_showed");
    }

    function hideCart() {
        if (cartWin.classList.contains("cart__win_showed"))
            cartWin.classList.remove("cart__win_showed");
    }

    function openCart() {
        showCart();
        hideIcon();
    }

    function closeCart() {
        hideCart();
        showIcon();
        if (document.querySelector('.cart .success-box').style.display == 'block') {
            hideSuccess();
            hideIcon();
            productInCart = [0, 0, 0];
        }
    }

    cartIcon.addEventListener("click", function () {
        openCart();
    });

    const closeButton = cartWin.querySelector("button[type='close']");
    closeButton.addEventListener("click", function () {
        closeCart();
    });

    const buyButtons = document.querySelectorAll("button[type='buy']");

    buyButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            openCart();
            addProductToCart(button.id);
        })
    })

    // Функция добавления товара в корзину
    function addProductToCart(id) {
        // Создаем HTML-элемент для товара в корзине
        const productElement = document.createElement("div");

        const totalQuantityElement = document.querySelector(".total-quantity");
        const totalQuantity = Number(cartIcon.querySelector(".total-quantity").textContent);
        console.log(totalQuantity);
        // Добавляем информацию о товаре в корзину (название, цена, изображение и т.д.)
        const productNames = document.querySelectorAll(".catalog .name");
        const productPrices = [23999, 28999, 2499999];
        const productIcons = ["first", "second", "third"];

        // HTML-код для отображения товара в корзине
        if (productInCart[id] == 0) {
            totalQuantityElement.textContent = totalQuantity + 1;
            productElement.classList.add("product");
            // productElement.setAttribute("i", id); // Индекс товара (может быть уникальным идентификатором)
            productInCart[id] = 1;
            productElement.innerHTML = `
        <div class="product">
        <div class="thumb">
            <div class="image"
                style="background-image:url('img/${productIcons[id]}card.jpg');">
            </div>
        </div>
        <div class="title">${productNames[id].textContent}</div>
        <div class="plusminus">
            <span class="minus">
                <img src="https://static.tildacdn.com/lib/linea/c8eecd27-9482-6c4f-7896-3eb09f6a1091/arrows_circle_minus.svg"
                    style="width:16px;height:16px;border:0;">
            </span>
            <span class="quantity">1</span>
            <span class="plus">
                <img src="https://static.tildacdn.com/lib/linea/c47d1e0c-6880-dc39-ae34-521197f7fba7/arrows_circle_plus.svg"
                    style="width:16px;height:16px;border:0;">
            </span>
        </div>
        <div class="amount">
            <div class="price">${productPrices[id].toLocaleString()}</div>
            <div class="currency">р.</div>
        </div>
        <div class="delete">
            <span class="icon">
                <img
                    src="https://static.tildacdn.com/lib/linea/1bec3cd7-e9d1-2879-5880-19b597ef9f1a/arrows_circle_remove.svg">
                    </span>
                    </div>
                    </div>
                    `;
            cartProducts.appendChild(productElement);
        }

        function increaseQuantity() {
            const quantityElement = productElement.querySelector(".quantity");
            const currentQuantity = Number(quantityElement.textContent);
            const totalQuantityElement = document.querySelector(".total-quantity");
            const totalQuantity = Number(cartIcon.querySelector(".total-quantity").textContent);

            quantityElement.textContent = currentQuantity + 1;
            totalQuantityElement.textContent = totalQuantity + 1;
            updatePrice();
            updateTotalPrice();
        }

        function decreaseQuantity() {
            const quantityElement = productElement.querySelector(".quantity");
            const currentQuantity = Number(quantityElement.textContent);
            const totalQuantityElement = document.querySelector(".total-quantity");
            const totalQuantity = Number(cartIcon.querySelector(".total-quantity").textContent);

            quantityElement.textContent = currentQuantity - 1;
            totalQuantityElement.textContent = totalQuantity - 1;

            if (currentQuantity == 1) {
                deleteProduct();
            }

            updatePrice();
            updateTotalPrice();
        }

        function deleteProduct() {
            const quantityElement = productElement.querySelector(".quantity");
            const currentQuantity = Number(quantityElement.textContent);
            const totalQuantityElement = document.querySelector(".total-quantity");
            const totalQuantity = Number(cartIcon.querySelector(".total-quantity").textContent);

            totalQuantityElement.textContent = totalQuantity - currentQuantity;

            productElement.remove();
            productInCart[id] = 0;
            updateTotalPrice();
            if (productInCart.every(function (item) { return item === 0 }))
                closeCart();
        }

        function updatePrice() {
            const price = productPrices[id];
            const quantity = Number(productElement.querySelector(".quantity").textContent);
            const totalPrice = price * quantity;
            productElement.querySelector(".price").textContent = totalPrice.toLocaleString();
        }

        // Обработчики событий для управления количеством товара
        const plusButton = productElement.querySelector(".plus");
        const minusButton = productElement.querySelector(".minus");


        plusButton.addEventListener("click", function () {
            increaseQuantity();
        });

        minusButton.addEventListener("click", function () {
            decreaseQuantity();
        });

        // Обработчик события для удаления товара
        const deleteButton = productElement.querySelector(".delete");
        deleteButton.addEventListener("click", function () {
            deleteProduct();
        });

        // Обновляем общую стоимость заказа
        updateTotalPrice();
    }

    function updateTotalPrice() {
        const priceElements = document.querySelectorAll(".product .price");
        let totalPrice = 0;

        priceElements.forEach(function (priceElement) {
            const price = Number(priceElement.textContent.replace(/\s+/g, '')); // удаляем пробелы в числе
            totalPrice += price;
        });

        // Обновляем HTML-элемент с общей стоимостью заказа
        const totalPriceElement = document.querySelector(".bottom .price-box div:first-child");
        totalPriceElement.textContent = totalPrice.toLocaleString(); // добавляем пробелы для разделения тысяч
    }
});

function showElement(element) {
    element.style.display = 'block';
}

function hideElement(element) {
    element.style.display = 'none';
}

function showSuccess() {
    const successElement = document.querySelector('.success-box');
    const productsElement = document.querySelector('.products');
    const bottomElement = document.querySelector('.bottom');
    const orderformElement = document.querySelector('.orderform');
    showElement(successElement);
    hideElement(productsElement);
    hideElement(bottomElement);
    hideElement(orderformElement);
}

function hideSuccess() {
    const successElement = document.querySelector('.success-box');
    const productsElement = document.querySelector('.products');
    const bottomElement = document.querySelector('.bottom');
    const orderformElement = document.querySelector('.orderform');
    hideElement(successElement);
    showElement(productsElement);
    showElement(bottomElement);
    showElement(orderformElement);
    const inputElements = document.querySelectorAll('.cart input');
    inputElements.forEach(function (element) {
        element.value = '';
    })
    const productElements = document.querySelectorAll('.products div');
    productElements.forEach(function (element) {
        element.remove();
    })
    document.querySelector('.cart .total-quantity').textContent = '0';
}

function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneNumberPattern = /^(\+7)?(\d{0,11})$/;
    return phoneNumberPattern.test(phone);
}

function checkCartInput() {
    const inputElements = document.querySelectorAll(".cart .input");
    let checkStatus = 1;

    inputElements.forEach(function (inputElement) {
        if (inputElement.querySelector('input').value.trim() == '') {
            showElement(inputElement.querySelector('.input-error'));
            showElement(document.querySelector('.error-box'));
            checkStatus = 0;
        }
    })

    const email = inputElements[1].querySelector('input').value.trim();
    let phoneNumber = inputElements[2].querySelector('input').value.trim();
    if (phoneNumber != '') {
        phoneNumber = phoneNumber.replace(/\D/g, '');
        if (phoneNumber == '') {
            phoneNumber = 'aboba';
        }
    }

    if (!validateEmail(email) && email != '') {
        showElement(inputElements[1].querySelector('.input-error-2'));
        checkStatus = 0;
    }

    if (!validatePhone(phoneNumber) && phoneNumber != '') {
        showElement(inputElements[2].querySelector('.input-error-2'));
        checkStatus = 0;
    }

    if (checkStatus == 1)
        showSuccess();
};

document.querySelector('.cart button[type="submit"]').addEventListener('click', function () {
    checkCartInput();
});

document.querySelectorAll('.orderform .input').forEach(function (inputElement) {
    inputElement.querySelector('input').addEventListener('click', function () {
        hideElement(inputElement.querySelector('.input-error'));
        hideElement(inputElement.querySelector('.input-error-2'));
        hideElement(document.querySelector('.orderform .error-box'));
    });
});

document.querySelector('.uniqduck button').addEventListener('click', function () {
    const formElement = document.querySelector('.uniqduck__form');
    const emailElement = formElement.querySelectorAll('input')[0];
    const emptyEmail = formElement.querySelectorAll('.input-error')[0];
    const uncorrectEmail = formElement.querySelector('.input-error-2');
    const nameElement = formElement.querySelectorAll('input')[1];
    const emptyName = formElement.querySelectorAll('.input-error')[1];
    const commentElement = formElement.querySelector('textarea');
    const success = formElement.querySelector('.success-output');
    checkStatus = 1;
    if (emailElement.value == '') {
        showElement(emptyEmail);
        checkStatus = 0;
    }
    if (!validateEmail(emailElement.value.trim()) && emailElement.value != '') {
        showElement(uncorrectEmail);
        checkStatus = 0;
    }
    if (nameElement.value == '') {
        showElement(emptyName);
        checkStatus = 0;
    }
    emailElement.addEventListener('click', function () {
        hideElement(emptyEmail);
        hideElement(uncorrectEmail);
        hideElement(success);
    })
    nameElement.addEventListener('click', function () {
        hideElement(emptyName);
        hideElement(success);
    })
    commentElement.addEventListener('click', function () {
        hideElement(success);
    })
    if (checkStatus) {
        showElement(success);
        emailElement.value = '';
        nameElement.value = '';
        commentElement.value = '';
    }
})

document.querySelector('button[type="expand"]').addEventListener('click', function () {
    const lines = document.querySelector('.fa-bars');
    const cross = document.querySelector('.fa-times');
    const expand = document.querySelector('.expand-container');

    if (lines.style.display != 'none') {
        lines.style.display = 'none';
        cross.style.display = '';
        expand.style.display = 'block';
        return;
    }
    if (cross.style.display != 'none') {
        lines.style.display = '';
        cross.style.display = 'none';
        expand.style.display = 'none';
    }
})
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

document.querySelector('button[type="about"]').addEventListener('click', function () {
    smooth_scroll('.anchor');
});

document.querySelector('button[type="catalog"]').addEventListener('click', function () {
    smooth_scroll('.catalog__list');
});

document.querySelector('button[type="advantages"]').addEventListener('click', function () {
    smooth_scroll('.advantages');
});

document.querySelector('button[type="contacts"]').addEventListener('click', function () {
    smooth_scroll('.basement');
});

document.querySelector('button[type="buy_duck"]').addEventListener('click', function () {
    smooth_scroll('.catalog__list');
});


// document.addEventListener("DOMContentLoaded", function () {
//     const cartIcon = document.querySelector(".cart__icon");
//     const cartWin = document.querySelector(".cart__win");

//     cartIcon.addEventListener("click", function () {
//         cartWin.classList.toggle("cart__win_showed");
//         cartIcon.classList.remove("cart__icon_showed");
//     });

//     const closeButton = cartWin.querySelector("button[type='close']");
//     closeButton.addEventListener("click", function () {
//         cartWin.classList.remove("cart__win_showed");
//         cartIcon.classList.toggle("cart__icon_showed");
//     });
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const cartIcon = document.querySelector(".cart__icon");
//     const cartWin = document.querySelector(".cart__win");

//     cartIcon.addEventListener("click", function () {
//         cartWin.classList.toggle("cart__win_showed");
//         cartIcon.classList.remove("cart__icon_showed");
//     });

//     const closeButton = cartWin.querySelector("button[type='close']");
//     closeButton.addEventListener("click", function () {
//         cartWin.classList.remove("cart__win_showed");
//         cartIcon.classList.toggle("cart__icon_showed");
//     });

//     const buyButtons = document.querySelectorAll("button[type='buy']");
//     const cartProducts = document.querySelector(".products");

//     buyButtons.forEach(function (button, index) {
//         button.addEventListener("click", function () {
//             // Создание HTML-элемента для товара в корзине
//             const productElement = document.createElement("div");
//             productElement.classList.add("product");
//             productElement.setAttribute("i", index);

//             // Добавление информации о товаре в корзину
//             // (название, цена, изображение и т.д.)

//             // ... (дополнительный код)

//             // Добавление товара в корзину
//             cartProducts.appendChild(productElement);
//         });
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.querySelector(".cart__icon");
    const cartWin = document.querySelector(".cart__win");
    const cartProducts = document.querySelector(".products");
    let cartOpened = false; // Флаг для отслеживания открытой корзины
    let productInCart = [0, 0, 0];

    cartIcon.addEventListener("click", function () {
        openCart();
    });

    function openCart() {
        cartWin.classList.toggle("cart__win_showed");
        cartIcon.classList.remove("cart__icon_showed");
    }

    const closeButton = cartWin.querySelector("button[type='close']");
    closeButton.addEventListener("click", function () {
        closeCart();
    });

    function closeCart() {
        cartWin.classList.remove("cart__win_showed");
        cartIcon.classList.toggle("cart__icon_showed");
    }

    const buyButtons = document.querySelectorAll("button[type='buy']");

    buyButtons.forEach(function (button, index) {
        button.addEventListener("click", function () {
            openCart();
            addProductToCart(button.id);
        })
    })

    // Функция добавления товара в корзину
    function addProductToCart(id) {
        // Создаем HTML-элемент для товара в корзине
        const productElement = document.createElement("div");
        
        // Добавляем информацию о товаре в корзину (название, цена, изображение и т.д.)
        const productNames = document.querySelectorAll(".catalog .name");
        const productPrices = ["23 999", "28 999", "2 499 999"];
        const productIcons = ["first", "second", "third"];
        
        // HTML-код для отображения товара в корзине
        if (productInCart[id] == 0) {
            productElement.classList.add("product");
            productElement.setAttribute("i", id); // Индекс товара (может быть уникальным идентификатором)
            productInCart[id] = 1;
            productElement.innerHTML = `
        <div class="product" id="0">
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
            <div class="price">${productPrices[id]}</div>
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
        } else {
            let productQuantitys = document.querySelectorAll(".product .quantity");
            let productQuantity = Number(productQuantitys[id].textContent) + 1;
            productQuantitys[id].textContent = String(productQuantity);
        }
        // Добавляем товар в корзину
        cartProducts.appendChild(productElement);

        // Обработчики событий для управления количеством товара
        const plusButton = productElement.querySelector(".plus");
        const minusButton = productElement.querySelector(".minus");

        plusButton.addEventListener("click", function () {
            const quantityElement = productElement.querySelector(".quantity");
            const currentQuantity = parseInt(quantityElement.textContent);
            quantityElement.textContent = currentQuantity + 1;
            updateTotalPrice();
        });

        minusButton.addEventListener("click", function () {
            const quantityElement = productElement.querySelector(".quantity");
            const currentQuantity = parseInt(quantityElement.textContent);

            // Убеждаемся, что количество не станет отрицательным
            if (currentQuantity > 1) {
                quantityElement.textContent = currentQuantity - 1;
                updateTotalPrice();
            }
        });

        // Обработчик события для удаления товара
        const deleteButton = productElement.querySelector(".delete");
        deleteButton.addEventListener("click", function () {
            productElement.remove();
            updateTotalPrice();
        });

        // Обновляем общую стоимость заказа
        updateTotalPrice();
    }

    // Функция для обновления общей стоимости заказа
    function updateTotalPrice() {
        const priceElements = document.querySelectorAll(".product .price");
        let totalPrice = 0;

        priceElements.forEach(function (priceElement) {
            const price = parseInt(priceElement.textContent.replace(/\s+/g, '')); // удаляем пробелы в числе
            const quantity = parseInt(priceElement.parentElement.querySelector(".quantity").textContent);
            totalPrice += price * quantity;
        });

        // Обновляем HTML-элемент с общей стоимостью заказа
        const totalPriceElement = document.querySelector(".bottom .price-box div:first-child");
        totalPriceElement.textContent = numberWithSpaces(totalPrice); // добавляем пробелы для разделения тысяч
    }

    // Функция для добавления пробелов для разделения тысяч
    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
});

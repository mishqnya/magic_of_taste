const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <h2 style="text-align:center; color:#666;">
                Корзина пуста
            </h2>
        `;

        totalPrice.textContent = "0 ₽";
        return;
    }

    cart.forEach((item, index) => {

        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="">

                <div class="cart-info">

                    <h2>${item.name}</h2>

                    <p><b>Вес:</b> ${item.weight} кг</p>

                    <p><b>Начинка:</b> ${item.filling}</p>

                    <p><b>Надпись:</b> ${item.text || "-"}</p>

                    <p><b>Цена:</b> ${item.price} ₽</p>

                    <button class="remove-btn" onclick="removeItem(${index})">
                        Удалить
                    </button>

                </div>

            </div>
        `;
    });

    totalPrice.textContent = total + " ₽";
}

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}

renderCart();

document.getElementById("checkout").onclick = () => {

    if (cart.length === 0) {
        alert("Корзина пуста!");
        return;
    }

    window.location.href = "checkout.html";
};
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderList = document.getElementById("orderList");
const orderTotal = document.getElementById("orderTotal");

let total = 0;

if (cart.length === 0) {

    orderList.innerHTML = `
        <p>Корзина пуста.</p>
    `;

    orderTotal.textContent = "0 ₽";

} else {

    cart.forEach(item => {

        total += item.price;

        orderList.innerHTML += `
            <div class="order-item">

                <h3>${item.name}</h3>

                <p><b>Вес:</b> ${item.weight} кг</p>

                <p><b>Начинка:</b> ${item.filling}</p>

                <p><b>Цена:</b> от ${item.price} ₽/кг</p>

            </div>
        `;
    });

    orderTotal.textContent = "от " + total + " ₽";
}

document.getElementById("confirmOrder").onclick = () => {

    const name = document.getElementById("clientName").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();
    const date = document.getElementById("clientDate").value;
    const time = document.getElementById("clientTime").value;

    if (!name || !phone || !date) {

        alert("Заполните обязательные поля!");

        return;
    }

    alert("Спасибо! Заказ успешно оформлен ❤️");

    localStorage.removeItem("cart");

    window.location.href = "index.html";

};
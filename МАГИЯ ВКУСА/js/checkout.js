
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderList = document.getElementById("orderList");
const orderTotal = document.getElementById("orderTotal");

const VK_LINK = "https://vk.ru/im?sel=-237265900";

let total = 0;

if (cart.length === 0) {
    orderList.innerHTML = "<p>Корзина пуста.</p>";
    orderTotal.textContent = "0 ₽";
} else {
    orderList.innerHTML = "";

    cart.forEach(item => {
        total += Number(item.price) || 0;

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

document.getElementById("confirmOrder").onclick = async () => {
    const name = document.getElementById("clientName").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();
    const date = document.getElementById("clientDate").value;
    const time = document.getElementById("clientTime").value;

    if (!name || !phone || !date) {
        alert("Заполните обязательные поля!");
        return;
    }

    if (cart.length === 0) {
        alert("Корзина пуста!");
        return;
    }

    const products = cart.map((item, index) => `
${index + 1}. ${item.name}
Вес: ${item.weight} кг
Начинка: ${item.filling}
Цена: от ${item.price} ₽/кг
`).join("\n");

    const orderText = `Здравствуйте! Хочу оформить заказ в «Магии вкуса» ❤️

Имя: ${name}
Телефон: ${phone}
Дата получения: ${date}
Время получения: ${time || "Не указано"}

Заказ:
${products}

Итого: от ${total} ₽

Пожалуйста, подтвердите заказ!`;

    // Открываем сообщество VK
    window.open(VK_LINK, "_blank");

    try {
        await navigator.clipboard.writeText(orderText);

        alert(
            "Текст заказа скопирован!\n\n" +
            "В открывшемся ВКонтакте зайдите в сообщения сообщества, " +
            "вставьте текст и нажмите «Отправить»."
        );
    } catch (error) {
        // Если автоматическое копирование недоступно
        prompt(
            "Скопируйте текст заказа и отправьте его в сообщении ВКонтакте:",
            orderText
        );
    }
};


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

document.getElementById("confirmOrder").onclick = () => {
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

    const products = cart.map((item, index) => {
        return `${index + 1}. ${item.name}
Вес: ${item.weight} кг
Начинка: ${item.filling}
Цена: от ${item.price} ₽/кг`;
    }).join("\n\n");

    const orderText = `Здравствуйте! Хочу оформить заказ в «Магии вкуса» ❤️

Имя: ${name}
Телефон: ${phone}
Дата получения: ${date}
Время получения: ${time || "Не указано"}

Заказ:
${products}

Итого: от ${total} ₽

Пожалуйста, подтвердите заказ!`;

    // Показываем текст заказа в отдельном окне
    const orderWindow = window.open("", "_blank");

    if (orderWindow) {
        orderWindow.document.write(`
            <!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Ваш заказ — Магия вкуса</title>
            </head>
            <body style="font-family:Arial,sans-serif;max-width:650px;margin:30px auto;padding:20px;">
                <h2>Ваш заказ готов! ❤️</h2>
                <p>Нажмите «Скопировать заказ», затем перейдите в VK и вставьте текст в переписку.</p>
                <textarea id="orderText" readonly
                    style="width:100%;height:300px;box-sizing:border-box;padding:12px;font-size:15px;"></textarea>
                <br><br>
                <button id="copyButton" style="padding:12px 20px;cursor:pointer;">
                    Скопировать заказ
                </button>
                <button id="vkButton" style="padding:12px 20px;cursor:pointer;">
                    Открыть переписку VK
                </button>
                <p id="status"></p>
                <script>
                    const text = ${JSON.stringify(orderText)};
                    const area = document.getElementById("orderText");
                    area.value = text;

                    document.getElementById("copyButton").onclick = async () => {
                        area.focus();
                        area.select();

                        try {
                            await navigator.clipboard.writeText(text);
                            document.getElementById("status").textContent =
                                "Заказ скопирован! Теперь вставьте его в VK сочетанием Ctrl + V.";
                        } catch (e) {
                            const copied = document.execCommand("copy");
                            document.getElementById("status").textContent = copied
                                ? "Заказ скопирован! Теперь вставьте его в VK сочетанием Ctrl + V."
                                : "Выделите текст в поле и нажмите Ctrl + C.";
                        }
                    };

                    document.getElementById("vkButton").onclick = () => {
                        window.open(${JSON.stringify(VK_LINK)}, "_blank");
                    };
                <\/script>
            </body>
            </html>
        `);

        orderWindow.document.close();
    } else {
        // Если браузер заблокировал новое окно
        prompt("Скопируйте текст заказа сочетанием Ctrl + C:", orderText);
    }
};

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

let product = null;

// =====================
// Поиск товара
// =====================

if (typeof cakes !== "undefined") {
    product = cakes.find(item => item.id === id);
}

if (!product && typeof bakery !== "undefined") {
    product = bakery.find(item => item.id === id);
}

if (!product && typeof desserts !== "undefined") {
    product = desserts.find(item => item.id === id);
}

if (!product) {
    alert("Товар не найден");
    throw new Error("Product not found");
}

// =====================
// Вывод информации
// =====================

document.getElementById("productName").textContent = product.name;
document.getElementById("productImage").src = product.image;
document.getElementById("productImage").alt = product.name;
document.getElementById("productDescription").innerHTML = product.description;

// =====================
// Категории
// =====================

const isCake = product.category === "cakes";
const isBakery = product.category === "bakery";
const isDessert = product.category === "desserts";

// =====================
// Цена
// =====================

const priceElement = document.getElementById("productPrice");

if (product.fixedWeight) {

    priceElement.textContent =
        `${product.price} ₽ / ${product.fixedWeight * 1000} г`;

} else if (isDessert) {

    priceElement.textContent =
        `${product.price} ₽`;

} else {

    priceElement.textContent =
        `от ${product.price} ₽ / кг`;

}

// =====================
// Скрываем ненужные поля
// =====================

if (isBakery || isDessert) {

    document.getElementById("textBlock").style.display = "none";
    document.getElementById("photoBlock").style.display = "none";

    document.querySelector("#wishBlock h3").textContent = "Комментарий";

}

// =====================
// Вес / Количество
// =====================

const weightBlock = document.getElementById("weightBlock");
const countBlock = document.getElementById("countBlock");

const weightValue = document.getElementById("weightValue");
const countValue = document.getElementById("countValue");

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");

const countPlus = document.getElementById("countPlus");
const countMinus = document.getElementById("countMinus");

let weight = product.fixedWeight || 1;
let count = 1;

function updateWeight() {
    weightValue.textContent = weight + " кг";
}

function updateCount() {
    countValue.textContent = count;
}

// Для фиксированного веса ИЛИ десертов показываем количество

if (product.fixedWeight || isDessert) {

    weightBlock.style.display = "none";
    countBlock.style.display = "block";

    updateCount();

    countPlus.onclick = () => {
        count++;
        updateCount();
    };

    countMinus.onclick = () => {
        if (count > 1) {
            count--;
            updateCount();
        }
    };

} else {

    weightBlock.style.display = "block";
    countBlock.style.display = "none";

    updateWeight();

    plus.onclick = () => {
        weight += 0.5;
        updateWeight();
    };

    minus.onclick = () => {
        if (weight > 1) {
            weight -= 0.5;
            updateWeight();
        }
    };

}

// =====================
// Начинки
// =====================

const fillingBlock = document.getElementById("fillingBlock");
const fillingSelect = document.getElementById("filling");

if (product.fillings) {

    fillingSelect.innerHTML = "";

    product.fillings.forEach(fill => {

        fillingSelect.innerHTML += `
            <option>${fill}</option>
        `;

    });

} else {

    fillingBlock.style.display = "none";

}

// =====================
// Добавление в корзину
// =====================

const addCart = document.getElementById("addCart");

addCart.onclick = () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalPrice;

    if (product.fixedWeight || isDessert) {

        totalPrice = product.price * count;

    } else {

        totalPrice = product.price * weight;

    }

    cart.push({

        id: product.id,
        name: product.name,
        image: product.image,

        weight: isDessert
            ? null
            : (product.fixedWeight ? product.fixedWeight : weight),

        count: count,

        filling: product.fillings
            ? fillingSelect.value
            : "",

        text: document.getElementById("cakeText")
            ? document.getElementById("cakeText").value
            : "",

        wishes: document.getElementById("cakeWish")
            ? document.getElementById("cakeWish").value
            : "",

        pricePerKg: product.price,

        price: totalPrice

    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Товар добавлен в корзину!");

};
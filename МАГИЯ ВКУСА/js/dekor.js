const decor = [

{
    id: 401,

    name: "Печать на сахарной бумаге",

    image: "img/saharnay.jpg",

    price: 200,

    description: `
🧁 Печать на сахарной бумаге

Съедобная печать для украшения тортов, капкейков и других десертов.

✨ Особенности:
• Яркие цвета
• Высокое качество печати
• Любое изображение
• Полностью съедобная

📍 Чебоксары.
`
},

{
    id: 402,

    name: "Печать на вафельной бумаге",

    image: "img/vafelnay.jpg",

    price: 100,

    description: `
🧁 Печать на вафельной бумаге

Идеально подходит для украшения тортов и десертов.

✨ Особенности:
• Любые изображения
• Качественная печать
• Съедобная бумага

📍 Чебоксары.
`
},

{
    id: 403,

    name: "Топперы",

    image: "img/topper.jpg",

    price: 150,

    description: `
🎉 Топперы

Красивые декоративные топперы для украшения тортов.

✨ Особенности:
• Имена
• Надписи
• Любые праздники
• Индивидуальный дизайн

📍 Чебоксары.
`
}

];

const decorGrid = document.getElementById("decorGrid");

if (decorGrid) {

    decor.forEach(item => {

        decorGrid.innerHTML += `

        <div class="cake-card">

            <img src="${item.image}" alt="${item.name}">

            <div class="cake-info">

                <h3>${item.name}</h3>

                <p>от ${item.price} ₽</p>

                <a href="product.html?id=${item.id}" class="cake-btn">
                    Подробнее
                </a>

            </div>

        </div>

        `;

    });

}
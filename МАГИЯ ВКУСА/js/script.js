console.log("Магия вкуса запущена 🚀");

// =================== Торты ===================

const cakesGrid = document.getElementById("cakesGrid");

if (cakesGrid && typeof cakes !== "undefined") {

    cakesGrid.innerHTML = cakes.map(cake => `
        <div class="cake-card">

            <img src="${cake.image}" alt="${cake.name}">

            <div class="cake-info">

                <h3>${cake.name}</h3>

                <p>от ${cake.price} ₽ / кг</p>

                <a href="product.html?id=${cake.id}" class="cake-btn">
                    Подробнее
                </a>

            </div>

        </div>
    `).join("");

}

// =================== Боковые точки ===================

const sections = document.querySelectorAll("section[id]");
const dots = document.querySelectorAll(".side-menu a");

if (sections.length && dots.length) {

    function changeActiveDot() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 250;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight) {

                current = section.id;

            }

        });

        dots.forEach(dot => {

            dot.classList.remove("active");

            if (dot.getAttribute("href") === "#" + current) {
                dot.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", changeActiveDot);

    changeActiveDot();

}
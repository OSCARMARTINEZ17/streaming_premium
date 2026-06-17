// ==============================
// BOTONES DE COMPRA WHATSAPP
// ==============================

const botones = document.querySelectorAll(".card button");

botones.forEach((boton) => {

    boton.addEventListener("click", () => {

        const tarjeta = boton.parentElement;

        const titulo = tarjeta.querySelector("h3")?.textContent || "";
        const descripcion = tarjeta.querySelector("p")?.textContent || "";
        const precio = tarjeta.querySelector("span")?.textContent || "";

        const mensaje = `
Hola 👋

Estoy interesado en:

📺 ${titulo}
📝 ${descripcion}
💰 ${precio}

¿Me puedes brindar más información?
        `;

        const url = `https://wa.me/573224717356?text=${encodeURIComponent(mensaje)}`;

        window.open(url, "_blank");

    });

});

// ==============================
// ANIMACIÓN DE ENTRADA
// ==============================

window.addEventListener("load", () => {

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";

        setTimeout(() => {

            card.style.transition = "0.5s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 80);

    });

});

// ==============================
// MENÚ HAMBURGUESA
// ==============================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

function cerrarMenu() {

    if (navMenu) {
        navMenu.classList.remove("active");
    }

    if (submenu) {
        submenu.classList.remove("open");
    }

}

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", (e) => {

        e.stopPropagation();

        navMenu.classList.toggle("active");

    });

    document.addEventListener("click", (e) => {

        if (
            !navMenu.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            cerrarMenu();
        }

    });

}

// ==============================
// SUBMENÚ CATEGORÍAS MÓVIL
// ==============================

const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdown = document.querySelector(".dropdown");
const submenu = document.querySelector(".submenu");

if (dropdownToggle && submenu) {

    dropdownToggle.addEventListener("click", (e) => {

        e.stopPropagation();

        submenu.classList.toggle("open");
        dropdown.classList.toggle("open");

    });

}

// ==============================
// MENÚ ACTIVO AUTOMÁTICO
// ==============================

const enlaces = document.querySelectorAll("nav a");
const paginaActual = window.location.pathname.split("/").pop();

enlaces.forEach((enlace) => {

    if (enlace.getAttribute("href") === paginaActual) {

        enlace.style.color = "#00ff88";
        enlace.style.fontWeight = "bold";

    }

});

// ==============================
// CERRAR MENÚ AL NAVEGAR
// ==============================

document.querySelectorAll(".submenu a, nav > ul > li > a:not(.dropdown > a)")
.forEach((enlace) => {

    enlace.addEventListener("click", () => {

        if (window.innerWidth <= 768) {

            cerrarMenu();

        }

    });

});

// ==============================
// SCROLL SUAVE PARA ANCLAS
// ==============================

document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((ancla) => {

    ancla.addEventListener("click", function (e) {

        const destino = document.querySelector(this.getAttribute("href"));

        if (destino) {

            e.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

console.log("SCRIPT OK");
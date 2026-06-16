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
    if (navMenu) navMenu.classList.remove("active");
    if (menuToggle) menuToggle.classList.remove("active");
}

function abrirCerrarMenu() {
    if (navMenu) navMenu.classList.toggle("active");
    if (menuToggle) menuToggle.classList.toggle("active");
}

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        abrirCerrarMenu();
    });

    // Cierra el menú al tocar fuera de él (botón o nav)
    document.addEventListener("click", (e) => {

        const clicDentroDelMenu = navMenu.contains(e.target) || menuToggle.contains(e.target);

        if (!clicDentroDelMenu) cerrarMenu();

    });

}

// ==============================
// MENÚ ACTIVO AUTOMÁTICO + CIERRE AL NAVEGAR
// ==============================

const enlaces = document.querySelectorAll("nav a");
const paginaActual = window.location.pathname.split("/").pop();

enlaces.forEach((enlace) => {

    if (enlace.getAttribute("href") === paginaActual) {

        enlace.style.color = "#00ff88";
        enlace.style.fontWeight = "bold";

    }

    // Si el usuario toca un enlace dentro del menú móvil, lo cerramos
    enlace.addEventListener("click", cerrarMenu);

});

// ==============================
// SCROLL SUAVE PARA ANCLAS
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(ancla => {

    ancla.addEventListener("click", function (e) {

        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        if (destino) {

            destino.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});
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
// MENÚ ACTIVO AUTOMÁTICO
// ==============================

const enlaces = document.querySelectorAll("nav a");

enlaces.forEach((enlace) => {

    const paginaActual = window.location.pathname.split("/").pop();

    if (enlace.getAttribute("href") === paginaActual) {

        enlace.style.color = "#00ff88";
        enlace.style.fontWeight = "bold";

    }

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
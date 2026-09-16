// ==============================
// BREADCRUMB DINÁMICO
// ==============================
// Se arma solo, leyendo el título de la página, así no hay
// que tocar los 10 archivos HTML.

(function () {
  const pagina = window.location.pathname.split("/").pop();

  // En el inicio no hace falta breadcrumb
  if (!pagina || pagina === "index.html") {
    return;
  }

  const heroContent = document.querySelector(".hero-content");

  if (!heroContent) {
    return;
  }

  const tituloPagina = document.title.split("|")[0].trim();

  const breadcrumb = document.createElement("div");
  breadcrumb.className = "breadcrumb";
  breadcrumb.innerHTML = `
        <a href="index.html">Inicio</a>
        <span aria-hidden="true">/</span>
        <a href="index.html#catalogo">Categorías</a>
        <span aria-hidden="true">/</span>
        <span class="breadcrumb-actual">${tituloPagina}</span>
    `;

  heroContent.insertBefore(breadcrumb, heroContent.firstChild);
})();

// ==============================
// BOTONES DE COMPRA WHATSAPP
// (con feedback visual al hacer clic)
// ==============================

function armarMensajeWhatsapp(tarjeta) {
  const titulo = tarjeta.querySelector("h3")?.textContent || "";
  const descripcion = tarjeta.querySelector("p")?.textContent || "";
  const precio = tarjeta.querySelector("span")?.textContent || "";

  return `
Hola 👋

Estoy interesado en:

📺 ${titulo}
📝 ${descripcion}
💰 ${precio}

¿Me puedes brindar más información?
        `;
}

document.querySelectorAll(".card button").forEach((boton) => {
  // Guardamos el contenido original para poder restaurarlo
  const contenidoOriginal = boton.innerHTML;

  boton.addEventListener("click", () => {
    const tarjeta = boton.closest(".card");
    if (!tarjeta || !tarjeta.querySelector("h3") || !tarjeta.querySelector("span")) {
      return; // ej: la tarjeta "en construcción" de Combos x6 no vende nada
    }

    const mensaje = armarMensajeWhatsapp(tarjeta);
    const url = `https://wa.me/573224717356?text=${encodeURIComponent(mensaje)}`;

    // Feedback visual inmediato en el botón
    boton.classList.add("btn-enviando");
    boton.disabled = true;
    boton.innerHTML =
      '<i class="fa-solid fa-circle-check" aria-hidden="true"></i> Abriendo WhatsApp...';

    mostrarToast("Abriendo WhatsApp...");

    window.open(url, "_blank");

    setTimeout(() => {
      boton.classList.remove("btn-enviando");
      boton.disabled = false;
      boton.innerHTML = contenidoOriginal;
    }, 1800);
  });
});

// Toast simple, reutilizable, sin dependencias
function mostrarToast(texto) {
  let toast = document.querySelector(".toast-aviso");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast-aviso";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  toast.textContent = texto;
  toast.classList.remove("toast-visible");

  // Forzar reflow para reiniciar la animación si ya estaba visible
  void toast.offsetWidth;

  toast.classList.add("toast-visible");

  clearTimeout(toast._timeoutId);
  toast._timeoutId = setTimeout(() => {
    toast.classList.remove("toast-visible");
  }, 2200);
}

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
    if (dropdownHeader) {
      dropdownHeader.setAttribute("aria-expanded", "false");
    }
  }
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    navMenu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      cerrarMenu();
    }
  });
}

// ==============================
// SUBMENÚ CATEGORÍAS MÓVIL
// (con soporte de accesibilidad: aria-expanded, teclado)
// ==============================

const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdown = document.querySelector(".dropdown");
const submenu = document.querySelector(".submenu");
const dropdownHeader = document.querySelector(".dropdown-header");

if (dropdownToggle && submenu && dropdownHeader) {
  dropdownHeader.setAttribute("role", "button");
  dropdownHeader.setAttribute("tabindex", "0");
  dropdownHeader.setAttribute("aria-haspopup", "true");
  dropdownHeader.setAttribute("aria-expanded", "false");

  const alternarSubmenu = () => {
    const abierto = submenu.classList.toggle("open");
    dropdown.classList.toggle("open", abierto);
    dropdownHeader.setAttribute("aria-expanded", abierto ? "true" : "false");
  };

  dropdownHeader.addEventListener("click", (e) => {
    e.stopPropagation();
    alternarSubmenu();
  });

  dropdownHeader.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      alternarSubmenu();
    }
  });
}

// ==============================
// MENÚ ACTIVO AUTOMÁTICO
// (clase CSS en vez de estilos inline)
// ==============================

const enlaces = document.querySelectorAll("nav a");
const paginaActual = window.location.pathname.split("/").pop() || "index.html";

enlaces.forEach((enlace) => {
  if (enlace.getAttribute("href") === paginaActual) {
    enlace.classList.add("nav-activo");
    enlace.setAttribute("aria-current", "page");
  }
});

// ==============================
// CERRAR MENÚ AL NAVEGAR
// ==============================

document
  .querySelectorAll(".submenu a, nav > ul > li > a:not(.dropdown > a)")
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
        behavior: "smooth",
      });
    }
  });
});

// ==============================
// COMBOS x6: insignia "Próximamente"
// (en vez de dejar el enlace como si ya estuviera listo)
// ==============================

document.querySelectorAll('a[href="combos-x6.html"]').forEach((enlace) => {
  if (enlace.querySelector(".badge-proximamente")) return;

  const badge = document.createElement("span");
  badge.className = "badge-proximamente";
  badge.textContent = "Pronto";
  enlace.appendChild(badge);
});

// ==============================
// BUSCADOR Y ORDEN POR PRECIO EN CATÁLOGO
// (solo se activa en páginas que tienen tarjetas con precio)
// ==============================

(function initHerramientasCatalogo() {
  const gruposDeTarjetas = Array.from(
    document.querySelectorAll(".planes .cards")
  ).filter((grupo) => grupo.querySelector(".card span"));

  if (gruposDeTarjetas.length === 0) return;

  // ---- Buscador global (filtra todas las tarjetas de la página) ----

  // Se ancla justo después del <h1> del banner, no después de toda la
  // sección #catalogo: en páginas como pantalla-individual.html el h1
  // y las tarjetas comparten la misma sección, así que anclarla a la
  // sección completa la mandaba hasta el final de la página.
  const bannerH1 = document.querySelector("#catalogo h1");

  const barra = document.createElement("div");
  barra.className = "catalogo-toolbar";
  barra.innerHTML = `
    <div class="catalogo-buscador">
      <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
      <input
        type="text"
        id="buscador-catalogo"
        placeholder="Buscar plataforma o combo... (ej: HBO, Netflix)"
        aria-label="Buscar plataforma o combo"
      />
    </div>
    <span class="catalogo-resultados" id="catalogo-resultados" aria-live="polite"></span>
  `;

  if (bannerH1) {
    bannerH1.insertAdjacentElement("afterend", barra);
  } else {
    gruposDeTarjetas[0].parentElement.insertBefore(barra, gruposDeTarjetas[0]);
  }

  const input = barra.querySelector("#buscador-catalogo");
  const contador = barra.querySelector("#catalogo-resultados");

  // Guardamos el texto original de cada tarjeta para poder resaltar/limpiar
  const todasLasTarjetas = Array.from(document.querySelectorAll(".planes .card"));

  todasLasTarjetas.forEach((tarjeta) => {
    const h3 = tarjeta.querySelector("h3");
    const p = tarjeta.querySelector("p");
    if (h3) tarjeta.dataset.textoH3 = h3.textContent;
    if (p) tarjeta.dataset.textoP = p.textContent;
  });

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function resaltar(texto, termino) {
    if (!termino) return texto;
    const idx = normalizar(texto).indexOf(termino);
    if (idx === -1) return texto;
    return (
      texto.slice(0, idx) +
      "<mark>" +
      texto.slice(idx, idx + termino.length) +
      "</mark>" +
      texto.slice(idx + termino.length)
    );
  }

  function filtrar() {
    const termino = normalizar(input.value.trim());
    let visibles = 0;

    todasLasTarjetas.forEach((tarjeta) => {
      const h3 = tarjeta.querySelector("h3");
      const p = tarjeta.querySelector("p");
      const textoCompleto = normalizar(
        (tarjeta.dataset.textoH3 || "") + " " + (tarjeta.dataset.textoP || "")
      );

      const coincide = !termino || textoCompleto.includes(termino);

      tarjeta.classList.toggle("card-oculta", !coincide);

      if (coincide) {
        visibles++;
        if (h3) h3.innerHTML = resaltar(tarjeta.dataset.textoH3, termino);
        if (p) p.innerHTML = resaltar(tarjeta.dataset.textoP, termino);
      } else if (h3 || p) {
        if (h3) h3.textContent = tarjeta.dataset.textoH3;
        if (p) p.textContent = tarjeta.dataset.textoP;
      }
    });

    // Ocultar el título de grupo (h2) si ninguna de sus tarjetas coincide
    gruposDeTarjetas.forEach((grupo) => {
      const algunaVisible = Array.from(grupo.querySelectorAll(".card")).some(
        (tarjeta) => !tarjeta.classList.contains("card-oculta")
      );

      const tituloGrupo = grupo.previousElementSibling;
      grupo.classList.toggle("grupo-oculto", !algunaVisible);

      if (tituloGrupo && tituloGrupo.tagName === "H2") {
        tituloGrupo.classList.toggle("grupo-oculto", !algunaVisible);
      }
    });

    contador.textContent = termino
      ? `${visibles} resultado${visibles === 1 ? "" : "s"}`
      : "";
  }

  input.addEventListener("input", filtrar);

  // ---- Orden por precio (un botón por cada grupo de tarjetas) ----

  function precioNumerico(tarjeta) {
    const texto = tarjeta.querySelector("span")?.textContent || "";
    return parseInt(texto.replace(/[^\d]/g, ""), 10) || 0;
  }

  gruposDeTarjetas.forEach((grupo) => {
    if (grupo.querySelectorAll(".card").length < 2) return;

    const botonOrden = document.createElement("button");
    botonOrden.type = "button";
    botonOrden.className = "btn-ordenar";
    botonOrden.innerHTML =
      '<i class="fa-solid fa-arrow-down-short-wide" aria-hidden="true"></i> Ordenar por precio';
    botonOrden.dataset.direccion = "asc";

    grupo.insertAdjacentElement("beforebegin", botonOrden);

    botonOrden.addEventListener("click", () => {
      const ascendente = botonOrden.dataset.direccion === "asc";
      const tarjetas = Array.from(grupo.querySelectorAll(".card"));

      tarjetas
        .sort((a, b) =>
          ascendente
            ? precioNumerico(a) - precioNumerico(b)
            : precioNumerico(b) - precioNumerico(a)
        )
        .forEach((tarjeta) => grupo.appendChild(tarjeta));

      botonOrden.dataset.direccion = ascendente ? "desc" : "asc";
      botonOrden.innerHTML = ascendente
        ? '<i class="fa-solid fa-arrow-up-wide-short" aria-hidden="true"></i> Precio: mayor a menor'
        : '<i class="fa-solid fa-arrow-down-short-wide" aria-hidden="true"></i> Precio: menor a mayor';
    });
  });
})();
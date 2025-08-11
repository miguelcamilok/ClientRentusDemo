<template>
  <div class="nosotros-page">
    <!-- Navbar -->
    <section class="property-hero">
      <header class="property-header">
        <div class="logo" @click="goHome" style="cursor: pointer">
          <img src="@/assets/img/logo.png" alt="Logo" />
          <div class="logo-text"><strong>Rent</strong><span>Us</span></div>
        </div>

        <nav class="property-nav">
          <a href="" class="nav-link" @click="goHome">Home</a>
          <a href="" class="nav-link">Propiedades</a>
          <a href="#" class="nav-link active">Sobre nosotros</a>
        </nav>

        <!-- Si no está logueado, botón Iniciar Sesión -->
        <button
          v-if="!isLoggedIn"
          @click="goLogin"
          class="login-btn"
          type="button"
        >
          Iniciar Sesión
        </button>

        <!-- Si está logueado, mostrar saludo con primer nombre -->
        <div
          v-else
          class="user-box"
          id="userToggle"
          @click="toggleUserDropdown"
          style="cursor: pointer; position: relative"
        >
          <img
            v-if="profilePhoto"
            :src="profilePhoto"
            alt="Usuario"
            class="user-img"
          />
          <img v-else src="/img/default.webp" alt="Usuario" class="user-img" />
          <div class="user-info">Hola, {{ firstName }}</div>
          <span class="user-arrow">▾</span>

          <!-- Menú desplegable -->
          <div
            class="user-dropdown"
            :class="{ show: showDropdown }"
            id="userDropdown"
            @click.stop
          >
            <div @click="goPerfil" style="cursor: pointer">
              <img
                src="https://img.icons8.com/ios-filled/20/user.png"
                alt="Perfil"
              />
              Perfil
            </div>
            <div
              @click="openMaintenanceModal"
              class="menu-item"
              style="cursor: pointer"
            >
              <img
                src="https://img.icons8.com/ios-filled/20/maintenance.png"
                alt="Mantenimiento"
              />
              Mantenimiento
            </div>
            <div @click="goContratos" style="cursor: pointer">
              <img
                src="https://img.icons8.com/ios-filled/20/agreement.png"
                alt="Contratos"
              />
              Contratos
            </div>
            <div @click="goPagos" style="cursor: pointer">
              <img
                src="https://img.icons8.com/ios-filled/20/bank-cards.png"
                alt="Pagos"
              />
              Pagos
            </div>
            <div @click="openSolicitudesModal" style="cursor: pointer">
              <img
                src="https://img.icons8.com/ios-filled/20/document--v1.png"
                alt="Solicitudes"
              />
              Solicitudes
            </div>
            <div
              id="openModalBtn"
              @click="openNotificaciones"
              style="cursor: pointer; position: relative"
            >
              <img
                src="https://img.icons8.com/ios-filled/20/appointment-reminders--v1.png"
                alt="Notificaciones"
              />
              Notificaciones
              <span class="notif-badge">3</span>
            </div>
            <div @click="goAjustes" style="cursor: pointer">
              <img
                src="https://img.icons8.com/ios-filled/20/settings.png"
                alt="Ajustes"
              />
              Ajustes
            </div>
            <div
              @click="logout"
              style="cursor: pointer; margin-top: 10px; color: red"
            >
              Cerrar sesión
            </div>
          </div>
        </div>
      </header>
    </section>

    <!-- Contenido principal -->
    <main class="nosotros-main">
      <!-- 1. Encabezado con barra translúcida -->
      <section class="barra-encabezado">
        <h1>¿Quiénes somos?</h1>
        <p class="subti">Rentus, una aplicación de Gestión Inmobiliaria</p>
      </section>

      <!-- 2. Nuestra Historia -->
      <section class="seccion-banner historia">
        <div class="banner-content">
          <h2>Nuestra Historia</h2>
          <p>
            RentUs nació con la misión de simplificar el proceso de arriendo de
            propiedades. Comenzamos como un pequeño equipo apasionado por la
            tecnología, con la idea de crear una plataforma eficiente, segura y
            accesible.
          </p>
        </div>
      </section>

      <!-- 3. Cards de Equipo y Ventajas -->
      <section class="seccion-doble-cards">
        <div class="card">
          <img
            src="@/assets/img/nosotros.jpg"
            alt="Nuestro equipo"
            class="card-img"
          />
          <div class="card-content">
            <h2 class="subtitulo">Nuestro Equipo</h2>
            <p class="parrafo">
              Un equipo diverso de desarrolladores, diseñadores y gestores
              trabaja día a día para ofrecerte una experiencia digital de
              calidad, segura y en constante evolución.
            </p>
          </div>
        </div>

        <div class="card card-lista">
          <img
            src="@/assets/img/casa3.webp"
            alt="¿Por qué Rentus?"
            class="card-img"
          />
          <div class="card-content">
            <h2 class="subtitulo">¿Por qué elegir Rentus?</h2>
            <ul class="lista-ventajas">
              <li>Interfaz intuitiva y adaptable</li>
              <li>Gestión completa de propiedades y contratos</li>
              <li>Notificaciones automatizadas</li>
              <li>Acceso multiusuario con roles</li>
              <li>Totalmente responsive</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 4. Misión y Visión -->
      <section class="seccion-banner">
        <div class="banner-content">
          <h2>♚ Nuestra Misión</h2>
          <p>
            Empoderar a propietarios e inquilinos mediante tecnología fácil,
            rápida y segura.
          </p>
          <h2>✎ Nuestra Visión</h2>
          <p>
            Convertirnos en la plataforma #1 de arriendo digital en
            Latinoamérica para 2030.
          </p>
        </div>
      </section>

      <!-- 5. Testimonios -->
      <section class="seccion-testimonios">
        <h2 class="subtitulo">Lo que dicen nuestros usuarios</h2>
        <div class="testimonios-grid">
          <div class="testimonio">
            <p class="comentario">
              "¡Una plataforma increíble! Me ayudó a encontrar mi apartamento en
              menos de 2 días."
            </p>
            <span class="autor">- Laura Gómez</span>
          </div>
          <div class="testimonio">
            <p class="comentario">
              "Como arrendador, ahora gestiono todos mis contratos y pagos en un
              solo lugar."
            </p>
            <span class="autor">- Juan Ríos</span>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-top">
        <div class="footer-col">
          <h4>Sobre Nosotros</h4>
          <p>
            Somos una plataforma dedicada a ayudarle a encontrar la casa ideal
            según tu estilo de vida.
          </p>
        </div>

        <div class="footer-col">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><router-link to="/nosotros">Quiénes Somos</router-link></li>
            <li><router-link to="/propiedades">Propiedades</router-link></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">Preguntas Frecuentes</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li>
              <img
                src="https://img.icons8.com/ios-glyphs/20/ffffff/new-post.png"
              />
              <a href="#">soporte@RentUs.com</a>
            </li>
            <li>
              <img
                src="https://img.icons8.com/ios-filled/20/ffffff/phone.png"
              />
              +57 3218598902
            </li>
            <li>
              <img
                src="https://img.icons8.com/ios-filled/20/ffffff/marker.png"
              />
              Calle RentUs 123, Popayán
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Síguenos</h4>
          <div class="social-icons">
            <a href="#"
              ><img
                src="https://img.icons8.com/ios-filled/24/ffffff/facebook-new.png"
                alt="Facebook"
            /></a>
            <a href="#"
              ><img
                src="https://img.icons8.com/ios-filled/24/ffffff/instagram-new.png"
                alt="Instagram"
            /></a>
            <a href="#"
              ><img
                src="https://img.icons8.com/ios-filled/24/ffffff/twitterx--v2.png"
                alt="X"
            /></a>
          </div>
        </div>
      </div>

      <hr />

      <div class="footer-bottom">
        <p>&copy; 2025 RentUs. Todos los derechos reservados</p>
        <div>
          <a href="#">Aviso Legal</a> |
          <a href="#">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showDropdown = ref(false);
const goHome = () => router.push("/");
const goLogin = () => router.push("/login");

const toggleUserDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

let styleLinks = [];

onMounted(async () => {
  const cssFiles = [
    "/css/home/index.css",
    "/css/home/propiedades.css",
    "/css/home/nosotros.css",
  ];

  styleLinks = cssFiles.map((href) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
    return link;
  });
});

onBeforeUnmount(() => {
  styleLinks.forEach((link) => {
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  });
});
</script>

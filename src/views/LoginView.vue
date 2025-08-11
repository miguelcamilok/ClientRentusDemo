<template>
  <div class="main-container">
    <!-- Panel Izquierdo -->
    <div class="left-panel">
      <div class="left-inner">
        <div class="left-content">
          <div class="logo">
            <img
              src="@/assets/img/logodark.png"
              alt="Logo RentUs"
              class="logo-img"
            />
            <h1>
              <span class="logo-black">Rent</span>
              <span class="logo-brown">Us</span>
            </h1>
          </div>

          <h3><em>Bienvenido de nuevo.</em></h3>
          <p>
            Retoma tu búsqueda donde la dejaste y sigue construyendo tu futuro
            hogar.
          </p>
        </div>
        <img class="house-img" src="@/assets/img/casa.png" alt="Casa" />
      </div>
    </div>

    <!-- Panel Derecho -->
    <div class="right-panel">
      <h2><strong>Iniciar Sesión</strong></h2>

      <div class="nav-buttons">
        <span class="slider-bg"></span>
        <button class="nav-btn active" @click="setTab('login')">
          Iniciar Sesión
        </button>
        <button class="nav-btn" @click="setTab('register')">Registrarse</button>
        <button class="nav-btn" @click="goBack">Volver</button>
      </div>

      <!-- Mensaje de error -->
      <div v-if="errorMessage" class="alert-error">
        {{ errorMessage }}
      </div>

      <!-- Formulario -->
      <form class="login-form" @submit.prevent="handleLogin">
        <input
          v-model="email"
          type="email"
          placeholder="Correo electrónico"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          required
        />
        <button type="submit" class="login-btn">Iniciar Sesión</button>
      </form>

      <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>

      <!-- Redes sociales -->
      <p class="or">O continúa con</p>
      <div class="social-login">
        <img
          src="https://img.icons8.com/ios-filled/40/mac-os.png"
          alt="Apple"
        />
        <img
          src="https://img.icons8.com/ios-filled/40/facebook-new.png"
          alt="Facebook"
        />
        <img
          src="https://img.icons8.com/ios-filled/40/google-logo.png"
          alt="Google"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();
const { login } = useAuth();

const handleLogin = async () => {
  errorMessage.value = "";
  try {
    const response = await login({
      email: email.value,
      password: password.value,
    });

    if (response?.token && response?.user) {
      // Guardar token y datos de usuario para Navbar.vue
      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.user.name,
        })
      );

      // Redirigir al Home
      router.push("/");
    } else {
      errorMessage.value = "Correo o contraseña incorrectos.";
    }
  } catch (err) {
    errorMessage.value = "Error al iniciar sesión. Intenta nuevamente.";
  }
};

const setTab = (tab: string) => {
  if (tab === "register") router.push("/register");
  if (tab === "login") router.push("/login");
};

const goBack = () => {
  router.push("/");
};
</script>

<style scoped>
.alert-error {
  background: #f8d7da;
  color: #842029;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
}
</style>

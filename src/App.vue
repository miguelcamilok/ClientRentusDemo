<template>
  <nav
    v-if="!['Login', 'Register', 'Home', 'SobreNosotros'].includes($route.name)"
  >
    <router-link to="/">Home</router-link>
  </nav>
  <router-view />
</template>

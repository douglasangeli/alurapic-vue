<template>
  <nav class="navbar navbar-inverse">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <span class="navbar-brand">AluraPIC</span>
    </div>
    <ul class="nav navbar-nav">
      <li
        role="presentation"
        v-for="rota in rotas"
        :key="rota.path"
        :class="$route.path.startsWith(rota.path) ? 'active' : ''"
      >
        <router-link :to="rota.path ? rota.path : '/'">
          {{ rota.titulo }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    rotas: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>

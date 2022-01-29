<template>
  <div class="painel panel panel-primary">
    <div class="panel-heading">
      <h2 class="panel-title" @dblclick="visivel = !visivel">
        {{ titulo }}
      </h2>
    </div>
    <transition name="panel-body painel-fade">
      <div class="painel-corpo" v-show="visivel">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["titulo"],
  data() {
    return {
      visivel: true,
    };
  },
};
</script>

<style scoped>
.painel {
  display: inline-block;
  margin: 5px;
  width: 200px;
  vertical-align: top;
  text-align: center;
}

.painel-fade-enter,
.painel-fade-leave-active {
  opacity: 0;
  height: 0;
}

.painel-fade-enter-active,
.painel-fade-leave-active {
  transition: opacity 0.5s, height 1s;
}

.painel-corpo {
  overflow: hidden;
}
</style>

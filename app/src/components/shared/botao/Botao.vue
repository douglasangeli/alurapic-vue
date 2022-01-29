<template>
  <button @click="disparaAcao()" :class="estiloDoBotao" :type="tipo">
    {{ rotulo }}
  </button>
</template>

<script>
export default {
  props: {
    tipo: {
      required: true,
      type: String,
    },
    rotulo: {
      required: true,
      type: String,
    },
    confirmacao: {
      required: false,
      type: Boolean,
    },
    estilo: {
      required: false,
      type: String,
      default: "padrao",
    },
  },
  methods: {
    disparaAcao() {
      if (!this.confirmacao || confirm("Confirma operação?")) {
        this.$emit("botaoAtivado");
      }
    },
  },
  computed: {
    estiloDoBotao() {
      if (this.estilo == "perigo") return "btn btn-danger";
      return "btn btn-primary";
    },
  },
};
</script>

<style scoped lang="scss">
@import "./Botao.scss";
</style>

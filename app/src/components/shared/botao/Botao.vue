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
      if (this.estilo == "perigo") return "botao botao-perigo";
      return "botao botao-padrao";
    },
  },
};
</script>

<style scoped>
.botao {
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  font-size: 1.2em;
}

.botao-perigo {
  background: firebrick;
  color: white;
}

.botao-padrao {
  background: darkcyan;
  color: white;
}
</style>

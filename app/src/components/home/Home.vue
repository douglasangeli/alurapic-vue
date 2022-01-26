<template>
  <div>
    <h1 class="titulo">{{ titulo }}</h1>

    <input
      type="search"
      class="filtro"
      placeholder="filtre por parte do título"
      @input="filtro = $event.target.value"
    />
    <ul class="lista-fotos">
      <li
        class="lista-fotos-item"
        v-for="foto in fotosComFiltro"
        :key="foto.titulo"
      >
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva v-meu-transform :url="foto.url" :titulo="foto.titulo" />
          <meu-botao
            tipo="button"
            rotulo="REMOVER"
            @botaoAtivado="remove(foto)"
            :confirmacao="true"
            estilo="perigo"
          ></meu-botao>
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";

export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao,
  },
  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
      filtro: "",
    };
  },
  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        const exp = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter((foto) => exp.test(foto.titulo));
      }
      return this.fotos;
    },
  },
  methods: {
    remove(foto) {
      const indice = this.fotos.indexOf(foto);
      this.fotos.splice(indice, 1);
    },
  },
  created() {
    this.$http.get("http://localhost:3000/v1/fotos").then(
      (response) => (this.fotos = response.body),
      (err) => console.log(err)
    );
  },
};
</script>

<style>
.titulo {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>

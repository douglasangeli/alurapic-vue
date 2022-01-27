<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>

    <p v-show="mensagem" class="centralizado">
      {{ mensagem }}
    </p>

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
          <imagem-responsiva
            v-meu-transform:scale.animate.reverse="1.1"
            :url="foto.url"
            :titulo="foto.titulo"
          />
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
import FotoService from "../../domain/foto/FotoService.js";

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
      mensagem: "",
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
      this.service.apaga(foto._id).then(
        () => {
          this.fotos = this.fotos.filter((f) => f._id !== foto._id);
          this.mensagem = "Foto removida com sucesso!";
        },
        (err) => {
          this.mensagem = "Não foi possível remover a foto";
          console.log(err);
        }
      );
    },
  },
  created() {
    this.service = new FotoService(this.$resource);

    this.service.lista().then(
      (response) => (this.fotos = response.body),
      (err) => console.log(err)
    );
  },
};
</script>

<style>
.centralizado {
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

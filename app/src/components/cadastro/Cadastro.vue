<template>
  <div>
    <div class="page-header">
      <h1 class="centralizado">
        Cadastro
        <small v-if="foto._id" class="centralizado">Alterando</small>
        <small v-else class="centralizado">Incluindo</small>
      </h1>
    </div>

    <form @submit.prevent="grava()" class="form-horizontal">
      <div
        class="form-group has-feedback"
        :class="errors.has('titulo') ? 'has-error' : ''"
      >
        <label class="col-sm-1 control-label" for="titulo">Título</label>
        <div class="col-sm-11">
          <input
            class="form-control"
            name="titulo"
            v-validate
            data-vv-rules="required|min:3|max:30"
            data-vv-as="título"
            id="titulo"
            placeholder="Digite o título da imagem"
            autocomplete="off"
            v-model="foto.titulo"
          />
          <template v-if="errors.has('titulo')">
            <span class="glyphicon glyphicon-remove form-control-feedback" />
            <small class="text-danger">
              {{ errors.first("titulo") }}
            </small>
          </template>
        </div>
      </div>

      <div
        class="form-group has-feedback"
        :class="errors.has('url') ? 'has-error' : ''"
      >
        <label class="col-sm-1 control-label" for="url">URL</label>
        <div class="col-sm-11">
          <input
            class="form-control"
            name="url"
            v-validate
            data-vv-rules="required"
            data-vv-as="URL"
            id="url"
            placeholder="Digite a URL da imagem"
            autocomplete="off"
            v-model="foto.url"
          />
          <template v-if="errors.has('url')">
            <span class="glyphicon glyphicon-remove form-control-feedback" />
            <small class="text-danger">
              {{ errors.first("url") }}
            </small>
          </template>
          <div v-if="foto.url" class="container imagem-responsavel">
            <imagem-responsiva :url="foto.url" :titulo="foto.titulo" />
          </div>
          <div v-else class="sem-imagem">
            <span class="glyphicon glyphicon-picture" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="col-sm-1 control-label" for="descricao">Descrição</label>
        <div class="col-sm-11">
          <textarea
            class="form-control"
            id="descricao"
            autocomplete="off"
            placeholder="Digite a descrição da imagem"
            v-model="foto.descricao"
          />
        </div>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit" />
        <router-link :to="{ name: 'home' }">
          <meu-botao rotulo="VOLTAR" tipo="button" />
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import Foto from "../../domain/foto/Foto.js";
import FotoService from "../../domain/foto/FotoService.js";

export default {
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao,
  },
  data() {
    return {
      foto: new Foto(),
      id: this.$route.params.id,
    };
  },
  methods: {
    grava() {
      this.$validator.validateAll().then((success) => {
        if (success) {
          this.service.cadastra(this.foto).then(
            () => {
              if (this.id) this.$router.push({ name: "home" });
              this.foto = new Foto();
            },
            (err) => console.log(err)
          );
        }
      });
    },
  },
  created() {
    this.service = new FotoService(this.$resource);
    if (this.id) {
      this.service.busca(this.id).then((foto) => (this.foto = foto));
    }
  },
};
</script>
<style scoped>
.centralizado {
  text-align: center;
}

.centralizado {
  text-align: center;
}

.erro {
  color: red;
  font-size: small;
}

.imagem-responsavel {
  width: 50%;
  margin: 50px auto;
}

.sem-imagem {
  text-align: center;
  padding: 10px;
}
</style>

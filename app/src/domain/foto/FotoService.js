export default class FotoService {
  constructor(resource) {
    this._resource = resource("v1/fotos{/id}");
  }

  lista() {
    return this._resource.query().catch(error => {
      console.log(error);
      throw Error("Não foi possível obter as fotos, tente mais tarde");
    });
  }

  cadastra(foto) {
    if (foto._id) {
      return this._resource.update({ id: foto._id }, foto);
    }
    return this._resource.save(foto);
  }

  apaga(id) {
    return this._resource.delete({ id });
  }

  busca(id) {
    return this._resource.get({ id }).then(response => response.json());
  }
}

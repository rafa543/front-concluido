import http from "../http-common";

class TarefaDataService {
  getAll() {
    return http.get("/tarefas");
  }

  get(id) {
    return http.get(`/tarefas/${id}`);
  } 

  create(data) {
    return http.post("/tarefas", data);
  }

  update(id, data) {
    return http.put(`/tarefas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tarefas/${id}`);
  }

  // deleteAll() {
  //   return http.delete(`/tarefas`);
  // }

  findByTitle(title) {
    return http.get(`/tarefas?title=${title}`);
  }
}

export default new TarefaDataService();
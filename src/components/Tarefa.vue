<template>
  <div class="submit-form mt-3 mx-auto">
   
     <div v-if="!submitted">
        <v-form ref="form" lazy-validation>
            <!-- HEADER-->
            <v-col cols="12" md="12">
                <div class="d-flex justify-space-between mb-1 align-center">
                    <h1 class="teste">Editar Tarefa</h1>
                    <v-icon color="black darken-2">mdi-help-circle</v-icon>
                </div>
                <v-divider></v-divider>
            </v-col>
            <!-- FINAL HEADER-->

            <!-- INPUTS FORMULARIOS -->
            <v-row class="mt-2">
                <v-col
                cols="12"
                sm="6"
                >
                <v-text-field
                    v-model="currentTarefa.title"
                    :rules="[(v) => !!v || 'Tarefa e requerida']"
                    dense
                    label="Titulo"
                    outlined
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                sm="6"
                >
                <v-text-field
                    dense
                    v-model="currentTarefa.description"
                    :rules="[(v) => !!v || 'Descrição e requerida']"
                    label="Descrição"
                    outlined
                    required
                ></v-text-field>
                </v-col>

            
                <v-col cols="12" sm="6" class="mt-n4">
                    <v-select
                    dense
                    v-model="currentTarefa.status"
                    :items="[{value: 'ABERTA', text: 'Aberta'}, {value: 'EM_ANDAMENTO', text: 'Em andamento'}, {value:'CONCLUIDA', text: 'Concluida'}]"
                    label="Status"
                    item-value="value"
                    item-text="text"
                    outlined
                    ></v-select>
                </v-col>
            
                <v-col cols="12" class="d-flex justify-space-between">
                    <v-btn
                    to="/"
                    color="#ECEFF1"
                    class="black--text mr-2"
                    >
                        <v-icon left>
                            mdi-keyboard-backspace
                        </v-icon>
                            voltar
                    </v-btn>

                    <v-btn
                        color="success"
                        @click="updateTutorial"
                    >
                        <v-icon left>
                            mdi-content-save
                        </v-icon>
                        Salvar
                    </v-btn>
                </v-col>

            </v-row>
            <!-- FINAL INPUTS FORMULARIOS -->

        </v-form>
     </div>

  </div>
</template>

<script>
import TarefaDataService from "../services/TarefaDataService";
import router from '../routes.js'

export default {
  name: "tutorial",
  data() {
    return {
      currentTarefa: {},
      submitted: false,
    };
  },
  methods: {
    getTutorial(id) {
      TarefaDataService.get(id)
        .then((response) => {
          this.currentTarefa = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateTutorial() {
      TarefaDataService.update(this.currentTarefa.id, this.currentTarefa)
        .then((response) => {
          console.log(response.data);
          router.push("/tarefas")
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    deleteTutorial() {
      TarefaDataService.delete(this.currentTarefa.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getTutorial(this.$route.params.id);
  },
};
</script>

<style>
.submit-form {
  max-width: 1000px;
}
</style>
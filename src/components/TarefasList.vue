<template>
  <v-row align="center" class="list px-3 mx-auto mt-6">

    <v-col cols="12" md="12">
        <div class="d-flex justify-space-between mb-1 align-center">
            <h1 class="teste">Tarefas</h1>
            <v-icon color="black darken-2">mdi-help-circle</v-icon>
        </div>
        <v-divider></v-divider>
    </v-col>

    <v-col  cols="12" md="12" class="mt-n2">
        <v-text-field
        v-model="title"
        dense
        class="input-serch"
        label="Titulo"
        placeholder="Titulo da tarefa"
        outlined
    ></v-text-field>
    </v-col>

    <v-col cols="12" md="12" class="d-flex justify-end">
        <v-btn
        @click="clear"
            color="#F9A825"
            class="white--text mr-2"
        >
            <v-icon left>
                mdi-eraser
            </v-icon>
                limpar
        </v-btn>

        <v-btn
            @click="searchTitle"
            color="blue"
            class="white--text mr-2"
        >
        <v-icon left>
            mdi-magnify
        </v-icon>
            Consulta
        </v-btn>

        <v-btn
        to="/add"
            color="success"
        >
        <v-icon left>
            mdi-plus
        </v-icon>
            Nova tarefa
        </v-btn>

        
    </v-col>
    
    
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Tarefas</v-card-title>
        

        <v-data-table
          :headers="headers"
          :items="tutorials"
          :items-per-page= 5
        >
        
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
          </template>

        </v-data-table>

        

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TarefaDataService from "../services/TarefaDataService";


export default {
  name: "tutorials-list",
  data() {
      return {
      
      tutorials: [],
      info:[],
      title: "",
      headers: [
        { text: "Titulo", align: "start", sortable: false, value: "title" },
        { text: "Descrição", value: "description", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "DataCriacao", value: "dataCriacao", sortable: false },
        { text: "Ações", value: "actions", sortable: false }
      ],
      
    };
  },
  methods: {
    retrieveTutorials() {
      TarefaDataService.getAll()
        .then((response) => {
          console.log(response.data);
          this.tutorials = response.data.map(this.getDisplayTutorial);
          this.info = response.data
          
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
    },

    searchTitle() {
      TarefaDataService.findByTitle(this.title)
        .then((response) => {
          console.log(response.data);
          this.tutorials = response.data.map(this.getDisplayTutorial);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editTutorial(id) {
      this.$router.push({ name: "tarefas-details", params: { id: id } });
    },

    deleteTutorial(id) {
      TarefaDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayTutorial(tutorial) {
      console.log(tutorial.dataCriacao)
      let date = new Date(tutorial.dataCriacao)
      let dataCriacao = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
      let status
      if(tutorial.status === "ABERTA"){
        status = 'ABERTA';
      }else if(tutorial.status === "EM_ANDAMENTO"){
        status = 'EM ANDAMENTO';
      }else{
        status = 'CONCLUIDO';
      }

      return {
        id: tutorial.id,
        title: tutorial.title,
        description: tutorial.description,
        status,
        dataCriacao
      };
    },

    clear() {
      this.title = ''
      this.retrieveTutorials();
    }
  },

  mounted() {
    this.retrieveTutorials();
  },
};
</script>

<style>
.list {
  max-width: 950px;
}
h1 {
    color: #0D47A1;
    font-size: 25px;
}
.v-icon.v-icon {
    font-size: 30px;
}
</style>
<template>
  <v-app>
    <v-app-bar app color="blue">
      <div class="d-flex align-center mr-2">
        CRUD
      </div>

      <v-btn to="/tarefas" text>
        Tarefas
      </v-btn>

      <v-btn to="/add" text>
        Add
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>
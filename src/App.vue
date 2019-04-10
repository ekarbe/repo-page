<!-- root component -->
<template>
  <v-app>
   <v-content>
     <board></board>
   </v-content>
  </v-app>
</template>

<script>
import Board from './components/Board.vue';

export default {
  name: 'App',
  components: {Board},
};
</script>

<!-- toolbar component delievers the tools to search, sort and filter repositories -->
<template>
  <v-layout 
  row 
  wrap>
    <v-flex 
    xs5
    sm4
    md4
    lg6
    xl6>
      <v-text-field
      height="25px"
      v-model="searchText"
      ></v-text-field>
    </v-flex>
    <v-flex 
    xs3
    sm3
    md3
    lg2
    xl2
    class="toolbar-element">
      <v-select
            label="Sort"
            :items="sort"
            v-model="selectedSort"
            outline
            clearable
          ></v-select>
    </v-flex>
    <v-flex 
    xs3
    sm3
    md3
    lg2
    xl2
    class="toolbar-element">
      <v-select
            label="Filter"
            :items="languages"
            v-model="selectedFilter"
            outline
            clearable
          ></v-select>
    </v-flex>
    <v-flex 
    xs0
    sm2
    md2
    lg2
    xl2>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Toolbar',
  data: () => ({
    // Variations of sorting
    sort: ['Alphabetical', 'Stars', 'Updated'],
  }),
  computed: {
    // gets all languages found in repositories
    languages: {
      get() {
        return this.$store.state.languages;
      },
    },
    // gets and sets the selected sorting
    selectedSort: {
      get() {
        return this.$store.state.selectedSort;
      },
      set(selectedSort) {
        this.$store.dispatch('updateSelectedSort', selectedSort);
      },
    },
    // gets and sets the selected filtering
    selectedFilter: {
      get() {
        return this.$store.state.selectedFilter;
      },
      set(selectedFilter) {
        this.$store.dispatch('updateSelectedFilter', selectedFilter);
      },
    },
    // gets and sets the text of the search
    searchText: {
      get() {
        return this.$store.state.searchText;
      },
      set(searchText) {
        this.$store.dispatch('updateSearchText', searchText);
      },
    },
  },
};
</script>

<style scoped>
.toolbar-element{
  margin-left: 1vh;
}
</style>

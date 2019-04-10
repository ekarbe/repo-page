<!-- toolbar component delievers the tools to search, sort and filter repositories -->
<template>
  <v-layout 
  row 
  wrap>
    <v-flex 
    xs6>
      <v-text-field
      height="25px"
      v-model="searchText"
      ></v-text-field>
    </v-flex>
    <v-flex 
    xs1>
      <v-select
            label="Sort"
            :items="sort"
            v-model="selectedSort"
            outline
            clearable
          ></v-select>
    </v-flex>
    <v-flex 
    xs1>
      <v-select
            label="Filter"
            :items="languages"
            v-model="selectedFilter"
            outline
            clearable
          ></v-select>
    </v-flex>
    <v-flex 
    xs4>
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

</style>

<!-- statistic component show stats for all repositories -->
<template>
  <v-card 
  class="statistic-card">
    <v-layout 
    row 
    wrap 
    v-if="repositoryCount != null">
      <v-label>
        Repositories: {{repositoryCount}}
      </v-label>
    </v-layout>
    <v-layout 
    row 
    wrap 
    v-if="ownRepositoriesCount != null">
      <v-label>
        Own repositories: {{ownRepositoriesCount}}
      </v-label>
    </v-layout>
    <v-layout 
    row 
    wrap 
    v-if="forkedRepositoriesCount != null">
      <v-label>
        Forked repositories: {{forkedRepositoriesCount}}
      </v-label>
    </v-layout>
    <v-layout 
    row 
    wrap 
    v-if="notMaintainedRepositoriesCount != null">
      <v-label>
        Not maintained: {{notMaintainedRepositoriesCount}}
      </v-label>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'Statistic',
  computed: {
    // gets the count of all repositories
    repositoryCount: {
      get() {
        if (this.$store.state.originalRepositories != null) {
          return this.$store.state.originalRepositories.length;
        }
        return 0;
      },
    },
    // gets the count of unforked repositories
    ownRepositoriesCount: {
      get() {
        return this.$store.state.ownRepositoriesCount;
      },
    },
    // gets the count of forked repositories
    forkedRepositoriesCount: {
      get() {
        return (this.repositoryCount - this.ownRepositoriesCount);
      },
    },
    // gets the count of unmaintained repositories (not updated in 6 Months)
    notMaintainedRepositoriesCount: {
      get() {
        return this.$store.state.notMaintainedRepositoriesCount;
      },
    },
  },
};
</script>

<style scoped>
.statistic-card{
  padding: 1vh;
  margin-bottom: 2vh;
}
</style>

<!-- The main component loading all other components -->
<template>
  <v-container>
    <v-layout 
    row 
    wrap>
      <v-flex 
      xs11
      sm11
      md11
      lg11
      xl11>
        <toolbar></toolbar>
      </v-flex>
      <v-flex 
      xs1
      sm1
      md1
      lg1
      xl1>
        <img 
        src="../assets/github_logo.png"
        heigth="50px" 
        width="50px"
        class="link" 
        v-on:click="openSource">
      </v-flex>
    </v-layout>
    <v-layout 
    row 
    wrap>
      <v-flex 
      xs6
      sm6
      md9
      lg9
      xl9>
        <div 
        class="scroll-container">
      <v-layout 
      row 
      wrap 
      v-if="repos !== null || repos !== undefined">
        <v-flex 
        xs6
        sm6
        md4
        lg4
        xl4
        v-for="repo in repos" 
        :key="repo.id">
          <repo 
          :repo="repo">
          </repo>
        </v-flex>
      </v-layout>
       <v-layout 
       row 
       wrap 
       text-xs-center 
       v-if="repos === null || repos === undefined">
         <v-flex 
         xs12
         sm12
         md12
         lg12
         xl12>
            <v-icon>
             report_problem
            </v-icon>
            <v-label>
              No repositories available!
            </v-label>
         </v-flex>
       </v-layout>
        </div>
      </v-flex>
      <v-flex 
      xs6
      sm6
      md3
      lg3
      xl3>
        <v-layout 
        row 
        wrap>
          <v-flex 
          xs12>
            <user></user>
          </v-flex>
          <v-flex 
          xs12>
            <chart></chart>
          </v-flex>
          <v-flex 
          xs12>
            <statistic></statistic>
          </v-flex>
          <v-flex 
          xs12
          sm12
          md12
          lg12
          xl12
          class="hidden-xs-only">
            <v-layout 
            row 
            wrap>
              <v-flex 
              xs6 
              v-if="newRepo != null" 
              style="height: 5vh">
                <v-label>
                  <v-icon>
                    whatshot
                  </v-icon>
                  Newest
                </v-label>
                <repo 
                :no_desc="true" 
                :repo="newRepo">
                </repo>
              </v-flex>
              <v-flex 
              xs6 
              v-if="oldRepo != null" 
              style="height: 5vh">
                <v-label>
                  <v-icon>
                    ac_unit
                  </v-icon>
                  Oldest
                </v-label>
                <repo 
                :no_desc="true" 
                :repo="oldRepo">
                </repo>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout 
    row 
    wrap 
    text-xs-center>
      <v-flex 
      xs12>
        <v-label>
        RepoPage Version 0.1.1 by ekarbe 
          <a 
          href="https://github.com/ekarbe/repo-page/issues" 
          target="_blank">
            <v-icon>
              bug_report
            </v-icon>
          </a>
        </v-label>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Toolbar from './Toolbar.vue';
import Repo from './Repo.vue';
import User from './User.vue';
import Chart from './Chart.vue';
import Statistic from './Statistic.vue';

export default {
  name: 'Board',
  components: {
    Toolbar, Repo, User, Chart, Statistic,
  },
  methods: {
    // opens the repository of this project
    openSource() {
      window.open('https://github.com/ekarbe/repo-page', '_blank');
    },
  },
  computed: {
    // gets all repositories
    repos: {
      get() {
        return this.$store.state.repositories;
      },
    },
    // gets the least updated repository
    oldRepo: {
      get() {
        return this.$store.state.oldRepository;
      },
    },
    // gets the latest updated repository
    newRepo: {
      get() {
        return this.$store.state.newRepository;
      },
    },
  },
};
</script>

<style scoped>
.link{
  cursor: pointer;
}
.scroll-container{
  overflow: scroll;
  height: 75vh;
  scrollbar-width: none;
  margin: 10px;
}
::-webkit-scrollbar {
    display: none;
}
</style>

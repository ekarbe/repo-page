<!-- repo component shows repo data in a card -->
<template>
  <v-card 
  v-on:click="openRepo" 
  class="repo-card link">
    <v-layout 
    row 
    wrap>
      <v-label>
        {{repo.name}}
      </v-label>
    </v-layout>
    <v-layout 
    row 
    wrap 
    class="repo-description">
      <v-flex
      class="hidden-xs-only">
        <v-label 
        v-if="!no_desc">
          {{repo.description}}
        </v-label>
      </v-flex>
    </v-layout>
      <v-flex
      class="repo-license hidden-xs-only">
        <v-label 
        v-if="repo.license !== null && !no_desc">
          {{repo.license.name}}
        </v-label>
      </v-flex>
      <v-layout 
      row 
      wrap>
        <div> 
          <br> 
        </div>
      </v-layout>
      <v-layout 
      row 
      wrap 
      class="repo-footer hidden-xs-only">
        <v-flex 
        xs2 
        v-if="!no_desc">
          <v-icon>
            star_rate
          </v-icon>
        </v-flex>
        <v-flex 
        xs4 
        v-if="!no_desc">
          <v-label>
            {{repo.stargazers_count}}
          </v-label>
        </v-flex>
      <v-flex 
      xs4>
        <v-label 
        v-if="!no_desc">
          {{repo.language}}
        </v-label>
      </v-flex>
      <v-flex 
      xs2>
        <v-icon 
        v-if="repo.fork" 
        class="repo-fork">
          file_copy
        </v-icon>
      </v-flex>
      </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'Repo',
  props: ['repo', 'no_desc'],
  methods: {
    // opens the address of the repository in a new tab
    openRepo() {
      window.open(this.repo.html_url, '_blank');
    },
  },
};
</script>

<style scoped>
.link{
  cursor: pointer;
}
.repo-card{
  padding: 1vh;
  margin-right: 2vh;
  margin-bottom: 2vh;
  height: 90%;
}
.repo-footer{
  bottom:0;
  position: absolute;
}
.repo-description{
  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.repo-license{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.repo-fork{
  float: inline-end;
}
</style>

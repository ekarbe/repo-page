<template>
  <v-card 
  v-on:click="openUser" 
  class="link user-card" 
  v-if="user != null">
    <v-layout 
    row 
    wrap>
      <v-flex 
      xs4>
        <img 
        :src="user.avatar_url" 
        height=60 
        width=60>
      </v-flex>
      <v-flex 
      xs8>
        <h2>
          {{user.login}}
        </h2>
      </v-flex>
      <v-flex 
      xs8>
      </v-flex>
    </v-layout>
    <v-layout 
    row 
    wrap>
      <v-flex 
      xs6>
        <v-layout 
        row 
        wrap>
          <v-label>
            {{user.name}}
          </v-label>
        </v-layout>
        <v-layout 
        row 
        wrap>
          <v-label>
            {{user.company}}
          </v-label>
        </v-layout>
      </v-flex>
      <v-flex 
      xs6>
        <v-layout 
        row 
        wrap>
          <v-label>
            {{user.location}}
          </v-label>
        </v-layout>
        <v-layout 
        row 
        wrap>
          <v-label>
            Followers: {{user.followers}}
          </v-label>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'User',
  computed: {
    // gets the user
    user: {
      get() {
        return this.$store.state.user;
      },
    },
  },
  methods: {
    // opens the user url in a new tab
    openUser() {
      window.open(this.user.html_url, '_blank');
    },
  },
};
</script>

<style scoped>
.link{
  cursor: pointer;
}
.user-card{
  padding: 1vh;
  margin-bottom: 2vh;
}
</style>

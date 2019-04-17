import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  render(h) { return h(App); },
  beforeMount() {
    // load store data before mount
    store.dispatch('getConfiguration')
      .then(() => {
        store.dispatch('getRepositories')
          .then(() => {
            // only temporary timeout
            setTimeout(() => { store.dispatch('parseRepositories'); }, 2000);
          });
        store.dispatch('getUser');
      });
  },
}).$mount('#app');

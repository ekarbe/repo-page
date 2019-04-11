import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    repositories: [],
    originalRepositories: null,

    oldRepository: null,
    newRepository: null,

    user: null,

    configuration: null,

    selectedSort: [],
    selectedFilter: [],

    ownRepositoriesCount: 0,
    notMaintainedRepositoriesCount: 0,

    languages: null,
  },

  mutations: {

    // sets repositories
    push_repositories(state, repositories) {
      this.state.repositories.push(...repositories);
      this.state.originalRepositories = repositories;
    },

    // sets the oldest repository
    set_oldRepository(state, oldRepository) {
      this.state.oldRepository = oldRepository;
    },

    // sets the newest repository
    set_newRepository(state, newRepository) {
      this.state.newRepository = newRepository;
    },

    // sets the user
    set_user(state, user) {
      this.state.user = user;
    },

    // sets the configuration
    set_configuration(state, configuration) {
      this.state.configuration = configuration;
    },

    // sets the selected sort
    set_selectedSort(state, selectedSort) {
      this.state.selectedSort = selectedSort;
    },

    // sets the selected filter
    set_selectedFilter(state, selectedFilter) {
      this.state.selectedFilter = selectedFilter;
    },

    // sets count of own repositories
    set_ownRepositoriesCount(state, ownRepositoriesCount) {
      this.state.ownRepositoriesCount = ownRepositoriesCount;
    },

    // sets count of not maintained repositories
    set_notMaintainedRepositoriesCount(state, notMaintainedRepositoriesCount) {
      this.state.notMaintainedRepositoriesCount = notMaintainedRepositoriesCount;
    },

    // sets languages
    set_languages(state, languages) {
      this.state.languages = languages;
    },

    // search with a regular expression through all repositories
    search_repositories(state, searchText) {
      this.state.selectedFilter = null;
      this.state.selectedSort = null;
      if (searchText === '' || searchText === null) {
        this.state.repositories = this.state.originalRepositories;
      } else {
        const regex = new RegExp(searchText, 'gi');
        this.state.repositories = this.state.originalRepositories
          .filter(repository => regex.test(repository.name));
      }
    },

    // sorts repositories by alphabet, stars or update
    sort_repositories(state, selectedSort) {
      switch (selectedSort) {
        case 'Alphabetical':
          this.state.repositories.sort((a, b) => {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            if (textA < textB) {
              return -1;
            } if (textA > textB) {
              return 1;
            }
            return 0;
          });
          break;
        case 'Stars':
          this.state.repositories.sort((a, b) => b.stargazers_count - a.stargazers_count);
          break;
        case 'Updated':
          this.state.repositories.sort((a, b) => b.updated_at > a.updated_at);
          break;
        default:
          this.state.repositories = this.state.originalRepositories;
          break;
      }
    },

    // filters repositories by language
    filter_repositories(state, selectedFilter) {
      this.state.selectedSort = null;
      this.state.searchText = '';
      if (selectedFilter === null || selectedFilter === undefined) {
        this.state.repositories = this.state.originalRepositories;
      } else {
        this.state.repositories = [];
        for (let i = 0; i < this.state.originalRepositories.length; i += 1) {
          if (this.state.originalRepositories[i].language === selectedFilter) {
            this.state.repositories.push(this.state.originalRepositories[i]);
          }
        }
      }
    },
  },

  actions: {

    // sends request to get repositories
    getRepositories({ state, commit }) {
      return new Promise((resolve, reject) => {
        let pages;
        axios.head(
          `https://api.github.com/${state.configuration.type}/${state.configuration.name}/repos?per_page=20&page=1`,
        )
          .then((response) => {
            if (response.headers.link !== undefined) {
              const page = response.headers.link.split('&page=');
              pages = page[2].split('>')[0];
            } else {
              pages = 1;
            }
            for (let i = 1; i <= pages; i += 1) {
              axios.get(
                `https://api.github.com/${state.configuration.type}/${state.configuration.name}/repos?per_page=20&page=${i}`,
              )
                .then((res) => {
                  commit('push_repositories', res.data);
                })
                .catch(() => {
                  reject();
                });
            }
            resolve();
          })
          .catch((err) => {
            alert(`API ${err}\n`);
            reject();
          });
      });
    },

    // parses through all repositories
    parseRepositories({ state, commit }) {
      let oldRepository = this.state.repositories[0];
      let newRepository = this.state.repositories[0];
      let ownRepositoriesCount = 0;
      let notMaintainedRepositoriesCount = 0;
      const languages = [];
      const currentDate = new Date();
      const halfYear = currentDate.setMonth(currentDate.getMonth() - 6);
      for (let i = 0; i < this.state.repositories.length; i += 1) {
        if (state.repositories[i].updated_at < oldRepository.updated_at) {
          oldRepository = this.state.repositories[i];
        }
        if (state.repositories[i].updated_at > newRepository.updated_at) {
          newRepository = state.repositories[i];
        }
        if (!state.repositories[i].fork) {
          ownRepositoriesCount += 1;
        }
        if (new Date(state.repositories[i].updated_at)
        < halfYear) {
          notMaintainedRepositoriesCount += 1;
        }
        if (languages.indexOf(state.repositories[i].language)
          === -1 && state.repositories[i].language != null) {
          languages.push(state.repositories[i].language);
        }
      }
      commit('set_oldRepository', oldRepository);
      commit('set_newRepository', newRepository);
      commit('set_ownRepositoriesCount', ownRepositoriesCount);
      commit('set_notMaintainedRepositoriesCount', notMaintainedRepositoriesCount);
      commit('set_languages', languages);
    },

    // sends request to get user
    getUser({ state, commit }) {
      return new Promise((resolve, reject) => {
        axios.get(
          `https://api.github.com/${state.configuration.type}/${state.configuration.name}`,
        )
          .then((response) => {
            commit('set_user', response.data);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },

    // gets config from config.json
    getConfiguration({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/config.json')
          .then((response) => {
            commit('set_configuration', response.data);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },

    // updates the selected sort
    updateSelectedSort({ commit }, selectedSort) {
      commit('set_selectedSort', selectedSort);
      commit('sort_repositories', selectedSort);
    },

    // updates the selected filter
    updateSelectedFilter({ commit }, selectedFilter) {
      commit('set_selectedFilter', selectedFilter);
      commit('filter_repositories', selectedFilter);
    },

    // updates the search text
    updateSearchText({ commit }, searchText) {
      commit('search_repositories', searchText);
    },
  },
});

/*
  https://api.github.com/users/mapolin/repos
*/

import { Ajax } from './ajax.js';
import { Helper } from './helper.js';

Vue.component('github-list', {
  data: function() {
    return {
      repos: []
    };
  },
  template: `<div class="github-repos-wrapper">
              <div v-for="repo in repos" class="github-repo--container">
                <div class="github-repo--title">{{ repo.name }}</div>
                <div class="github-repo--description">{{ repo.description }}</div>
                <a tabindex="-1" target="_blank" class="github-repo--link" :href="repo.html_url" :title="repo.html_url"">{{ repo.html_url }}</a>
              </div>
            </div>`,
  mounted: function() {
    this.$nextTick(() => {
      Ajax.get('https://api.github.com/users/mapolin/repos').then((result) => {
        this.repos = JSON.parse(result);
      }).catch((err) => {
        console.log(err);
      });
    });
  }
});
// define a view component for result of commands
let figlet = require('./figlet.js');

const CONSTANTS = {};
window.CONSTANTS = CONSTANTS;

Vue.component('command-result', {
  template: `
    <div class="command-result" v-if="command.text || command.name">
      <div class="command-name"><pre>{{ command.title }}</pre></div>
        <div class="command-text">
          <div v-if="command.name == 'github'">
            <github-list></github-list>
          </div>
          <div v-if="command.text">
            <pre>{{ command.text[currentPage] }}</pre>
            <button v-if="hasScript" v-on:click="runScript" class="btn btn-primary">{{ buttonText }}</button>
            <pre v-if="ascii_name && hasScript">{{ascii_name}}</pre>
          </div>
        </div>
      <div class="command-pager">{{ humanFriendlyPage }} / {{ totalPages }}</div>
    </div>
  `,
  props: ['command', 'params'],
  data: function() {
    return {
      hasScript: false,
      currentPage: 0,
      totalPages: 1,
      buttonText: 'Run',
      user_name: false,
      ascii_name: false
    }
  },
  computed: {
    humanFriendlyPage: function() {
      return parseInt(this.currentPage) + 1;
    }
  },
  methods: {
    goToPage: function(index) {
      if(index <= 0) {
        this.currentPage = 0;
      } else if(index >= this.totalPages) {
        this.currentPage = this.totalPages - 1;
      } else {
        this.currentPage = index;
      }

      if(this.command.text) {
        this.hasScript = this.command.text[this.currentPage].match(/<script>(.|\n)*?<\/script>/gi);
      }
    },
    runScript: function() {
      let script = this.command.text[this.currentPage].match(/<script>(.|\n)*?<\/script>/gi);
      if(script) {
        script = script[0];
        script = script.replace('<script>', '').replace('</script>', '');
        eval(script);
      }
    }
  },
  watch: {
    user_name: function(val) {
      figlet(val, 'Big Money-nw', (err, text) => {
        if (err) {
          this.ascii_name = '';
          return;
        }

        this.ascii_name = text;
      });
    },
    command: function(cmd) {
      if(cmd && cmd.text) {
        this.totalPages = cmd.text.length;

        this.hasScript = this.command.text[this.currentPage].match(/<script>(.|\n)*?<\/script>/gi);
      }
    },
    params: function(params) {
      if(params.page) {
        this.currentPage = params.page - 1;
      } else {
        this.currentPage = 0;
      }

      if(this.command.text && this.currentPage) {
        this.hasScript = this.command.text[this.currentPage].match(/<script>(.|\n)*?<\/script>/gi);
      }
    }
  },
  mounted: function() {
    window.addEventListener('keyup', (event) => {
      if(event.keyCode == 37) {
        this.goToPage(this.currentPage - 1);
      }

      if(event.keyCode == 39) {
        this.goToPage(this.currentPage + 1);
      }
    });
  }
});
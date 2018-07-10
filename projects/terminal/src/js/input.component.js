import { Helper } from './helper.js';

Vue.component('input-field', {
  data: function() {
    return {
      command: '',
      history: []
    };
  },
  template: `<div class="input-field-wrapper">
              <div tabindex="0" v-on:keyup.enter="addCommand" v-on:keyup.up="goBack" class="input" contenteditable="true">{{ command }}</div>
            </div>`,
  methods: {
    addCommand: function(event) {
      let elem = (event.target) ? event.target : event;

      this.command = elem.textContent;

      elem.textContent = '';

      this.history.push(this.command);
      this.$emit('add-command', this.command);
    },
    goBack: function(event) {
      let elem = (event.target) ? event.target : event;

      if(this.history.length > 0) {
        this.command = this.history.pop();
        elem.textContent = this.command;

        Helper.setCursorPosition('.input', 1);
      }
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      let input = this.$el.querySelector('.input');

      Helper.type(input, 'welcome', () => {
        this.addCommand(input);
      });
    });
  },
  watch: {
    command: function(val) {

    }
  }
});
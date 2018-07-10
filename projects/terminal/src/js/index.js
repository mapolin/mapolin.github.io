import './input.component.js';
import './command.component.js';
import './github.list.component.js';
import { CommanderInterface } from './commander.js';
import { Helper } from './helper.js';

const Commander = new CommanderInterface();

var app = new Vue({
  el: '.terminal',
  data: {
    command: {
      text: '',
      valid: false
    },
    commands: [],
    activeCommand: {},
    params: []
  },
  computed: {
    renderCommands: function() {
      let temp = [];

      for(let i = this.commands.length-1; i >= 0; i--) {
        temp.push(this.commands[i]);
      }

      return temp;
    }
  },
  methods: {
    parseCommand: function(command) {
      let input = Helper.parseUserInput(command);

      this.commands.push({
        text: command,
        valid: Commander.isValid(input)
      });

      this.selectCommand(input);
    },
    selectCommand: function(command) {
      Commander.run(command, (params, response) => {
        if(response) {
          this.params = params;
          this.activeCommand = response;
        }
      });
    }
  }
});
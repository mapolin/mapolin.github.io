import _ from 'lodash';
import { Command } from './command.abstract.js';
import { CommandList } from './command.list.js';

class CommanderInterface {
  constructor() {
    this.commands = {};

    _.each(CommandList, (cmd) => {
      this.commands[cmd.name] = new Command(cmd.name, cmd.exec, cmd.callback, cmd.data);

      if(cmd.alias) {
        cmd.alias.forEach((name) => {
          this.commands[name] = this.commands[cmd.name];
        });
      }
    });
  }

  isValid(command) {
    return _.has(this.commands, command.cmd || command);
  }

  run(command, callback) {
    if(this.isValid(command.cmd)) {
      this.commands[command.cmd].run(command.args, callback);
    }
  }
}

export { CommanderInterface, Command, CommandList };
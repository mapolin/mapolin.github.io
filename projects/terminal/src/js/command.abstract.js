import _ from 'lodash';
import { Ajax } from './ajax.js';

class Command {
  constructor(name, executes = '', callback = null, data = false) {
    this.name = name;
    this.executes = executes;
    this.callback = callback;
    this.data = data;
  }

  run(params = [], callback) {
    if(_.isString(this.executes)) {
      if(this.data) {
        if(!this.data.name) {
          this.data = Object.assign({name: this.name}, this.data);
        }

        if(_.isFunction(this.callback)) {
          this.callback(params, this.data).then((modified) => {
              callback(modified.params, modified.response);
            }).catch(e => {
              callback(null, params, e);
            });
        } else {
          callback(params, this.data);
        }
      } else {
        return Ajax.get(this.executes).then(response => {
          if(!response.name) {
            response = Object.assign({name: this.name}, response);
          }

          if(_.isFunction(this.callback)) {
            this.callback(params, response).then((modified) => {
              callback(modified.params, modified.response);
            }).catch(e => {
              callback(null, params, e);
            });
          } else {
            callback(params, response);
          }
        }).catch(error => {
          if(_.isFunction(this.callback)) {
            this.callback(false, params, error);
          } else {
            callback(false, params, error);
          }
        });
      }
    }
  }
}

export { Command }
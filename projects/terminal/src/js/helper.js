import _ from 'lodash';

const Helper = {
  parseUserInput: function(input) {
    let pieces = input.split(' ');
    
    if(pieces.length == 0) return {
      cmd: 'help',
      args: []
    };

    let final = {
      cmd: pieces[0],
      args: {}
    };

    for(let i = 1; i < pieces.length; i++) {
      if(pieces[i].indexOf('--') == 0) {
        let arg = pieces[i].slice(2).split('=');
        
        final.args[arg[0].trim()] = arg[1].trim();
      }
    }

    return final;
  },

  setCursorPosition: function(element, pos) {
    let elem = (_.isString(element)) ? document.querySelector(element) : element;

    if(elem) {
      let range = document.createRange();
      let sel = window.getSelection();
      range.setStart(elem, pos);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  },

  _typer: function(elem, text) {
    elem.textContent = text;
  },

  type: function(elem, text, callback) {
    clearTimeout(this._typetimeout);

    let string = text.split('').reverse();
    let proggress = '';

    this._typertimeout = setInterval(() => {
      if(string.length > 0) {
        proggress += string.pop();
        this._typer(elem, proggress);
      } else {
        clearTimeout(this._typertimeout);
        callback && callback();
      }
    }, 100);
  }
}

export { Helper }
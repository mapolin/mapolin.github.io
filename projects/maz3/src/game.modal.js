import { HTML_PARSER } from './game.html.js';
import { HTML_BUILDER } from './game.html.js';

export class Modal {
  constructor(selector = null, data = {}) {
    this.data = data;

    if(typeof selector == 'string') {
      this.modal = document.querySelector(selector);
    } else if(typeof selector.dom == 'function') {
      this.modal = selector.dom();
    } else {
      this.modal = selector;
    }
  }

  createModal() {
    let canvas = document.querySelector('canvas');
    document.body.insertBefore(this.modal, canvas);

    return this;
  }

  parseModal() {
    HTML_PARSER.parse(this.modal, this.data);

    return this;
  }

  open() {
    if(this.modal) {
      this.modal.classList.add('opened');
    } else {
      console.warn('Modal DOM element has been removed.');
    }
  }

  close() {
    if(this.modal) {
      this.modal.classList.remove('opened');
    } else {
      console.warn('Modal DOM element has been removed.');
    }
  }

  remove() {
    let node = this.modal.parentNode;
    node.removeChild(this.modal);

    this.modal = null;

    return true;
  }

  _createEvent(name = 'generic', data = {}) {
    let event = new CustomEvent(name, data)

    return event;
  }

  _createOpenEvent() {
    let event = this._createEvent('open', {
      modal: this.modal
    });
  }

  trigger(event = null) {
    if(!event) return;

    if(typeof event == 'string') {

    }
  }
}
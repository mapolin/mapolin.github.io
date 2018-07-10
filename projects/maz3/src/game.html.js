import { GUID } from './game.utils.js';

export class HTML_PARSER {
  static find_and_replace(source = '', field = '', text = '') {
    let exp = new RegExp('{' + field + '}', 'gi');
    return source.replace(exp, text);
  }

  static parse(element = null, data = {}) {
    if(element) {
      if(!element.dataset.original) {
        element.dataset.original = element.innerHTML;
      }

      let html = element.dataset.original;

      Object.keys(data).forEach((key, value) => {
        html = this.find_and_replace(html, key, data[key]);
      });

      element.innerHTML = html;

      return element;
    }
  }
}

export class HTML_ELEMENT {
  constructor(type = 'div', attributes = {}) {
    this.element = this.createElement(type, attributes);

    return this.element;
  }

  createElement(type = 'div', attributes = {}) {
    let element = document.createElement(type);
    Object.keys(attributes).forEach((key, value) => {
      element.setAttribute(key, attributes[key]);
    });

    return element;
  }
}

export class HTML_BUILDER {
  static root(type = 'div', attributes = {}) {
    let rootNode = new HTML_ELEMENT(type, Object.assign(attributes, {
      'data-uid': GUID()
    }));

    this.nodes = [];
    this.rootNode = rootNode;

    return this;
  }

  static parent() {
    if(this.parentNode && this.nodes.length > 1) {
      this.nodes.splice(-1);
      this.parentNode = this.nodes[this.nodes.length - 1];
    }

    return this;
  }

  static node(type = 'div', attributes = {}) {
    if(!this.rootNode) {
      return console.warn('No root node in current context.');
    }
    
    let element = new HTML_ELEMENT(type, attributes)
    
    if(this.parentNode) {
      this.parentNode.appendChild(element);
      this.parentNode = element;
    } else {
      this.rootNode.appendChild(element);
      this.parentNode = element;
    }

    this.nodes.push(this.parentNode);

    return this;
  }

  static content(content = '') {
    let contentNode = document.createTextNode(content);
    if(this.parentNode) {
      this.parentNode.appendChild(contentNode);
    } else {
      this.rootNode.appendChild(contentNode);
    }

    return this;
  }

  static clone() {
    return this.rootNode.cloneNode(true);
  }

  static dom() {
    return this.rootNode;
  }
}
import { ABOUT, HELP, SKILLS, WELCOME, CONTACT, GITHUB } from '../../content/bundle.js';

const CommandList = [
  {
    name: 'help',
    alias: ['help', 'use'],
    data: HELP,
    exec: ''
  },
  {
    name: 'about',
    alias: ['me', 'info', 'martin'],
    data: ABOUT,
    exec: ''
  },
  {
    name: 'clear',
    data: {},
    alias: ['cls', 'cl'],
    exec: '',
    callback: function(params, response, error) {
      return new Promise((resolve, reject) => {
        resolve({
          params: [],
          response: {}
        });
      });
    }
  },
  {
    name: 'skills',
    alias: ['competence', 'tech', 'technology', 'technologies', 'stack', 'env'],
    data: SKILLS,
    exec: ''
  },
  {
    name: 'welcome',
    alias: ['hello', 'begin', 'start'],
    data: WELCOME,
    exec: ''
  },
  {
    name: 'contact',
    alias: ['email', 'mail', 'linkedin', 'profile'],
    data: CONTACT,
    exec: ''
  },
  {
    name: 'github',
    alias: ['github', 'git', 'work', 'repos'],
    data: GITHUB,
    exec: ''
  }
];

export { CommandList }
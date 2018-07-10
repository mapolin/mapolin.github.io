import { Game } from './game.js';
import { Loader } from './game.loader.js';
import { Hero } from './game.hero.js';
import { Create } from './game.create.js';
import { Loop } from './game.loop.js';
import { Render } from './game.render.js';
import { Modal } from './game.modal.js';
import { HTML_BUILDER } from './game.html.js';
import {
  GAME_ASSETS,
  GAME_LAYERS,
  GAME_PHYSICS,
  GAME_COLLISION_GROUPS,
  GAME_HERO_SETTINGS,
  GAME_HERO_ANIMATIONS,
  GAME_DEBUG,
  GAME_FONT,
  GAME_LABELS
} from './game.constants.js';

// Set debug option as global
window.GAME_DEBUG = true; //GAME_DEBUG;

// Define game logic handling instances
// expose as globals for debugging
window.GAME_LOADER = null;
window.GAME_CREATE = null;
window.GAME_HERO = null;
window.GAME_LOOP = null;
window.GAME_RENDER = null;

// Define and initialize the game itself
const Maz3 = new Game({
  // All assets are loaded here
  preload: () => {
    GAME_LOADER = new Loader( Maz3.GAME_INSTANCE );

    GAME_LOADER.map( GAME_ASSETS.map_name, GAME_ASSETS.map );
    GAME_LOADER.image( GAME_ASSETS.map_image_name, GAME_ASSETS.map_image );
    GAME_LOADER.sprite( GAME_ASSETS.hero_sprite_name, GAME_ASSETS.hero_sprite, ...GAME_ASSETS.hero_sprite_size );
    GAME_LOADER.font( GAME_FONT );
  },
  // All game updates are handled here
  update: () => {
    GAME_LOOP = new Loop( Maz3.GAME_INSTANCE );

    GAME_LOOP.heroUpdate( GAME_HERO.HERO_INSTANCE );
    GAME_LOOP.labelUpdate( GAME_HERO.label );
  },
  // All objects are created here
  create: () => {
    // Resize the game viewport
    Maz3.resize((width, height) => {
      GAME_CREATE.fitWorld(width, height);
    });

    // Create the game world
    GAME_CREATE = new Create( Maz3.GAME_INSTANCE );

    // ORDER IS IMPORTANT !!!
    GAME_CREATE.world( GAME_ASSETS.map_name, GAME_ASSETS.map_image_name );
    GAME_CREATE.physics( GAME_PHYSICS );
    GAME_CREATE.layers( GAME_LAYERS );
    GAME_CREATE.collisionGroups( GAME_COLLISION_GROUPS )

    // Create the hame hero
    GAME_HERO = new Hero( Maz3.GAME_INSTANCE, GAME_CREATE );

    GAME_HERO.create( ...GAME_HERO_SETTINGS )
    GAME_HERO.addAnimations( GAME_HERO_ANIMATIONS );
    GAME_HERO.setCollisionGroup( GAME_CREATE.PlayerCollisionGroup );
    GAME_HERO.collides( GAME_CREATE.BoundCollisionGroup );

    // Create the game labels (buildings, objectives, etc)
    GAME_CREATE.labels( GAME_LABELS );
  },
  // All additional rendering is done here
  render: () => {
    GAME_RENDER = new Render( Maz3.GAME_INSTANCE );
  }
});

// Build the Generic modal markup
const GENERIC_MODAL_HTML = HTML_BUILDER
  .root('section', {
    class: 'modal-window'
  }).node('div', { class: 'modal-wrapper' })
      .node('span', { class: 'modal-close' })
        .node('i', { class: 'close-icon' })
      .parent().node('div', { class: 'modal-header' })
        .content('{title}')
      .parent().node('div', { class: 'modal-content' })
        .content('{description}');

// initialize the Home modal
const HOME_MODAL = new Modal(GENERIC_MODAL_HTML.clone(), {
  title: 'Home',
  description: 'Welcome to my humble house. Feel free to look around!'
});

// Build the North Valley modal markup
const NORTH_VALLEY_MODAL = new Modal(GENERIC_MODAL_HTML.clone(), {
  title: 'North Valley',
  description: 'This is the North Valley. People sometimes come here to harvest berries of all sorts... but sometimes, some of them never return!'
});

document.addEventListener('DOMContentLoaded', () => {
  // HOME_MODAL.createModal().parseModal();
  // NORTH_VALLEY_MODAL.createModal().parseModal();
});

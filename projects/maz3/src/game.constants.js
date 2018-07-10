export const GAME_DEBUG = true;
export const GAME_ASSETS = {
  map: 'assets/map.json',
  map_name: 'map',
  map_image_name: 'tmw_desert_spacing',
  map_image: 'assets/map_tiles.png',
  hero_sprite_name: 'hero_sprite',
  hero_sprite: 'assets/hero.png',
  hero_sprite_size: [32, 32]
};
export const GAME_LAYERS = ['Ground', 'Grass', 'Roads', 'Buildings', 'Signs'];
export const GAME_PHYSICS = Phaser.Physics.P2JS;
export const GAME_COLLISION_GROUPS = [
  {
    name: 'Walls',
    addToWorld: true,
  },
  {
    name: 'Signs',
    addToWorld: true
  }
];
export const GAME_HERO_SETTINGS = [20, 20, GAME_ASSETS.hero_sprite_name];
export const GAME_HERO_ANIMATIONS = [
  {
    name: 'left',
    frames: [0, 1],
    fps: 6
  },
  {
    name: 'right',
    frames: [6, 7],
    fps: 6
  },
  {
    name: 'up',
    frames: [4, 5],
    fps: 6
  },
  {
    name: 'down',
    frames: [2, 3],
    fps: 6
  }
];
export const GAME_FONT = {
  name: 'carrier_command',
  xml: 'assets/fonts/carrier_command.xml',
  image: 'assets/fonts/carrier_command.png'
};
export const GAME_LABELS = [
  {
    x: 120,
    y: 175,
    font: GAME_FONT.name,
    text: 'Home',
    size: 16
  },
  {
    x: 1350,
    y: 980,
    font: GAME_FONT.name,
    text: 'North Valley',
    size: 16
  },
  {
    x: 780,
    y: 375,
    font: GAME_FONT.name,
    text: 'Maze',
    size: 16
  },
  {
    x: 90,
    y: 1140,
    font: GAME_FONT.name,
    text: 'Garden',
    size: 16
  },
  {
    x: 780,
    y: 1110,
    font: GAME_FONT.name,
    text: 'Mountian',
    size: 16
  },
  {
    x: 780,
    y: 1110,
    font: GAME_FONT.name,
    text: 'Valley',
    size: 16
  },
  {
    x: 780,
    y: 1110,
    font: GAME_FONT.name,
    text: 'About',
    size: 16
  },
  {
    x: 780,
    y: 1110,
    font: GAME_FONT.name,
    text: 'Forest',
    size: 16
  }
];
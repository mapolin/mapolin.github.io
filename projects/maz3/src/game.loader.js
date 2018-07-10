export class Loader {
  constructor(Game = window.GameInstance) {
    if(Game) {
      this.Game = Game;
    }
  }

  map(name = undefined, source = undefined) {
    if(name && source) {
      this.Game.load.tilemap(`${name}`, `${source}`, null, Phaser.Tilemap.TILED_JSON);
    }
  }

  image(name = undefined, source = undefined) {
    if(name && source) {
      this.Game.load.image(`${name}`, `${source}`);
    }
  }

  sprite(name = undefined, source = undefined, frameWidth = null, frameHeight = null) {
    if(arguments.length >= 4) {
      this.Game.load.spritesheet(`${name}`, `${source}`, frameWidth, frameHeight);
    }
  }

  font(fontData = undefined) {
    if(fontData) {
      this.Game.load.bitmapFont(fontData.name, fontData.image, fontData.xml);
    }
  }
}
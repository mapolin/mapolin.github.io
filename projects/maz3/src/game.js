export class Game {
  constructor(opts = {}) {
    this.GAME_INSTANCE = window.GameInstance = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'awesomeness', {
        preload: opts.preload,
        create: opts.create,
        update: opts.update,
        render: opts.render
    });
  }

  resize(cb = function() {}) {
    this.GAME_INSTANCE.scale.scaleMode = Phaser.ScaleManager.SCALE;
    this.GAME_INSTANCE.scale.parentIsWindow = true;
    this.GAME_INSTANCE.scale.setResizeCallback(() => {
      this.GAME_INSTANCE.scale.setMaximum();
      cb(this.GAME_INSTANCE.scale.width, this.GAME_INSTANCE.scale.height);
    });
  }
}
export class Loop {
  constructor(Game = window.GameInstance) {
    this.Game = Game;
    this.cursors = this.Game.input.keyboard.createCursorKeys();
    this.spaceKey = this.Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  heroUpdate(hero = null) {
    if(!hero) return;

    //  Reset the players velocity (movement)
    hero.body.setZeroVelocity();

    if (this.cursors.left.isDown) {
      //  Move to the left
      hero.body.moveLeft(200);

      hero.animations.play('left');
    } else if (this.cursors.right.isDown) {
      //  Move to the right
      hero.body.moveRight(200);

      hero.animations.play('right');
    } else if (this.cursors.up.isDown) {
      //  Move to the right
      hero.body.moveUp(200);

      hero.animations.play('up');
    } else if (this.cursors.down.isDown) {
      //  Move to the right
      hero.body.moveDown(200);

      hero.animations.play('down');
    } else {
      hero.animations.stop();
    }
  }

  labelUpdate(label = null) {
    if(!label) return;

    // handle spacebar
    if (this.spaceKey.isDown) {
      if(label && !label.isVsiible) {
        label.appear();
      }
    }
  }
}
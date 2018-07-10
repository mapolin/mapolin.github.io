import { Random } from './game.utils.js';

export class Label {
  constructor(x, y, font, text, size, game) {
    this.Game = game;
    this.labelGroup = this.Game.add.group();
    this.background = this.Game.add.graphics(0, 0);

    this.label = this.Game.add.bitmapText(
      x,
      y,
      font,
      text,
      size
    );
    this.label.tint = 0x000000;

    let labelX = x - this.label.width/2;
    let labelY = y - this.label.height/2;
    let padding = 15;

    this.background.x = labelX - padding;
    this.background.y = labelY - padding
    this.background.beginFill(0xFFFFFF, 1);
    this.background.lineStyle(2, 0x000000, 1);
    this.background.drawRoundedRect(0, 0, this.label.width + padding*2, this.label.height + padding, 10);

    this.labelGroup.add(this.background);
    this.labelGroup.add(this.label);
    this.labelGroup.alpha = 0;
  }

  startDisappearTimer() {
    clearTimeout(this._distimeout);
    this._distimeout = setTimeout(() => {
      this.disappear();
    }, 2000);
  }

  appear() {
    this.Game.add.tween(this.labelGroup).to({ y: -20 }, Random(400, 600), Phaser.Easing.Quadratic.InOut, true);
    this.Game.add.tween(this.labelGroup).to({ alpha: 1 }, Random(400, 600), Phaser.Easing.Quadratic.InOut, true);

    this.startDisappearTimer();
  }

  disappear() {
    this.Game.add.tween(this.labelGroup).to({ y: 0 }, Random(400, 600), Phaser.Easing.Quadratic.InOut, true);
    this.Game.add.tween(this.labelGroup).to({ alpha: 0 }, Random(400, 600), Phaser.Easing.Quadratic.InOut, true);
  }

  get isVisible() {
    return this.labelGroup.alpha > 0;
  }

  get group() {
    return this.labelGroup;
  }

  get name() {
    return this.label.text;
  }

  get x() {
    return this.label.position.x;
  }

  get y() {
    return this.label.position.y;
  }

  set x(value) {
    this.label.left = value;
  }

  set y(value) {
    this.label.top = value;
  }

  get width() {
    return this.label.width;
  }

  get height() {
    return this.label.height;
  }

  get centerX() {
    return this.label.width/2;
  }

  get centerY() {
    return this.label.height/2;
  }

  get options() {
    return {
      x: this.label.x,
      y: this.label.y,
      font: this.label.font,
      text: this.label.text,
      size: this.label.size
    }
  }
}
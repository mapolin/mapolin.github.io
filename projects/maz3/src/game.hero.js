const _ = require('lodash');

export class Hero {
  constructor(Game = window.GameInstance, CreatedWorld = {}) {
    this.Game = Game;
    this.CreatedWorld = CreatedWorld;
  }

  get HERO_INSTANCE() {
    return this.Hero;
  }

  get label() {
    return this.closestLabel;
  }

  create(x, y, sprite) {
    this.Hero = this.Game.add.sprite(...arguments);

    this.Game.physics.p2.enable(this.Hero);
    this.Game.physics.p2.setPostBroadphaseCallback((bodySource, bodyTarget) => {
      return this.interact(bodySource, bodyTarget);
    }, this.Game);

    this.Hero.body.fixedRotation = true;
    this.Hero.body.collideWorldBounds = true;

    this.Game.camera.follow(this.Hero);

    this.Hero.body.debug = !!window.GAME_DEBUG;
  }

  setCollisionGroup(group) {
    this.Hero.body.setCollisionGroup(group);
  }

  collides(group) {
    this.Hero.body.collides(group);
  }

  addAnimations(collection = []) {
    collection.forEach(anim => {
      this.Hero.animations.add(anim.name, anim.frames, anim.fps, true);
    });
  }

  findLabel(name) {
    return _.find(this.CreatedWorld._labels, (item) => {
      return item.name == name;
    });
  }

  interact(bodySource, bodyTarget) {
    this.closestLabel = false;

    if(bodySource.name) {
      let label = this.findLabel(bodySource.name);
      
      if(!label.isVisible) {
        this.closestLabel = label;
      }

      return true;
    }

    return true;
  }
}
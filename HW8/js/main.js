"use strict";

var Game5 = {};

var score= 0;










  // You might want to start with a template that uses GameStates:
  //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
  
  // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
  // You will need to change the fourth parameter to "new Phaser.Game()" from
  // 'phaser-example' to 'game', which is the id of the HTML element where we
  // want the game to go.
  // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
  // You will need to change the paths you pass to "game.load.image()" or any other
  // loading functions to reflect where you are putting the assets.
  // All loading functions will typically all be found inside "preload()".
  
  //"use strict";
  
  //var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
  Game5.StateA = function (game) {
  this.background;
  this.enemy;
  this.enemies;
};





//This is State A
Game5.StateA.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    this.load.image( 'background', 'assets/road1.jpg' );
	this.load.image( 'enemy', 'assets/copcar.png' );
  },
  
  
  create: function () {
	this.game.add.tileSprite(0, 0, 500, 500, 'background');
	this.game.time.events.add(Phaser.Timer.SECOND * 4, addEnemy, this);
	this.enemies = this.game.add.group();
  },
  

  update: function () {
	  
  },

  addEnemy: function(){
	  var banana = game.add.sprite(450,400, 'enemy');
	  this.enemies.add(banana);
		game.physics.arcade.enable(banana);
		
		banana.body.velocity.y = 200;
		
		banana.checkWorldBounds = true;
		banana.outOfBoundsKill = true;		  
	  
  }

  
  };



var game = new Phaser.Game(500, 500, Phaser.AUTO, 'game');

game.state.add('StateA', Game5.StateA);


game.state.start('StateA');
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
  this.text;

  this.background;

};





//This is State A
Game5.StateA.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    this.load.image( 'background', 'assets/swat.jpg' );

  },
  
  
  create: function () {
	this.game.add.tileSprite(0, 0, 800, 600, 'background');


  },
  

  update: function () {

  },

  
  gotoStateB: function () {

        this.game.state.start('StateB', this.score);

    }
  
  };
  
 



var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.state.add('StateA', Game5.StateA);

game.state.start('StateA');
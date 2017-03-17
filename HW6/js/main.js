"use strict";

  Game5.State1 = function (game) {

  this.text;
  this.yes;
  this.no;
  this.background;
  this.keys;
  this.space;
  this.win_text;
};

//This is State 1
Game5.State1.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    
    this.load.image( 'background', 'assets/swat.jpg' );
    
  },
  
  
  create: function () {
    // Create a sprite at the center of the screen using the 'logo' image.
   this.game.add.tileSprite(0, 0, 800, 600, 'background');
    this.keys = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    var style = { font: "25px Verdana", fill: "#000000", align: "center" };
    this.win_text = this.add.text(200, 500, '(Press the SPACEBAR to continue)', style);
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    if (this.space.isDown)
      {
     //   this.gotoState2();
      }
      
     
  },
  
  
  
  gotoState2: function () {

     //   this.game.state.start('State2', this.score);

    }


  };








var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.state.add('State1', Game5.State1);

game.state.start('State1');
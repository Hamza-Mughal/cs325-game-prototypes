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
  this.points;
  this.space;
};





//This is State A
Game5.StateA.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    this.load.image( 'background', 'assets/swat.jpg' );

  },
  
  
  create: function () {
	this.game.add.tileSprite(0, 0, 800, 600, 'background');
	var style1 = { font: "25px Verdana", fill: "#ffffff", align: "center" };
	this.points = this.add.text(155,75,'You are tasked with an important task... \nto protect a person', style1);
	var style = { font: "25px Verdana", fill: "#000000", align: "center" };
	this.text = this.add.text(200, 500, 'Press SPACEBAR to continue', style);
	this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  

  update: function () {
    if (this.space.isDown)
      {
        this.gotoStateB();
      }
  },

  
  gotoStateB: function () {

        this.game.state.start('StateB', this.score);

    }
  
  };
  
  
  Game5.StateB = function (game) {
this.background;
this.text;
this.text1;
this.text2;
this.text3;
this.text4;
this.timer;
this.time;
this.keys;
};


Game5.StateB.prototype = {

  preload: function () {
		this.load.image('roomi', 'assets/room.jpg');


  },
  
  
  create: function () {
	this.game.stage.backgroundColor = '#94fcc0';
	this.timer = game.add.text(50,200,'Time Left: ', {font:'32px Arial', fill: '#000000'});
	this.time = 500;
	
	this.keys = this.input.keyboard.createCursorKeys();
	
	var style = { font: "25px Verdana", fill: "#000000", align: "center" };
	this.text = this.add.text(300,200,'The Derivate of x is ', style);
	this.text1 = this.add.text(325,250,'↑  : 1', style);
	this.text2 = this.add.text(325,275,'→ : 0', style);
	this.text3 = this.add.text(325,300,'↓  : x^2', style);
	this.text4 = this.add.text(325,325,'← : Dog', style);
  },
  

  update: function () {
	 this.timer.text = 'Time Left: ' + this.time;
	  this.time--;
	  
		if(this.keys.up.isDown){
		}
		if(this.keys.right.isDown){
			this.gotoStateC();
		}	  
		if(this.keys.down.isDown){
			this.gotoStateC();
		}	  
		if(this.keys.left.isDown){
			this.gotoStateC();
		}		  
  },

  
  gotoStateC: function () {

        this.game.state.start('StateC', this.score);

    }
	
	
  
  };

  Game5.StateC = function (game) {
this.background;
this.text;

};


Game5.StateC.prototype = {

  preload: function () {


  },
  
  
  create: function () {
	this.game.stage.backgroundColor = '#94fcc0';

  },
  

  update: function () {
		  
  },

  
  gotoStateC: function () {

        this.game.state.start('StateC', this.score);

    }
	
  
  };  
  
 



var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.state.add('StateA', Game5.StateA);
game.state.add('StateB', Game5.StateB);
game.state.add('StateC', Game5.StateC);


game.state.start('StateA');
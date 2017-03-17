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
    this.room;
	this.player;
	this.input;
	this.enemy;
	
	this.needle;
	this.bulletTime = 0;
	this.steto;
	this.bullets;
this.winText;
this.loseText;
this.loseText2;
	
this.music;
	
this.livesText;
this.lives = 3;
	
this.bool = true;
};


Game5.StateB.prototype = {

  preload: function () {
		this.load.image('roomi', 'assets/room.jpg');
		this.load.image('player', 'assets/gown.png');
		this.load.image('doctor', 'assets/doctor.png');
		this.load.image('needle', 'assets/needle.png');
		this.load.image('stet', 'assets/stet.png');
		this.load.audio('running', 'assets/running.mp3');

  },
  
  
  create: function () {
	  
	this.game.add.tileSprite(0, 0, 800, 600, 'roomi');
	
			this.input = game.input.keyboard.createCursorKeys();
			
		this.player = game.add.sprite(game.world.centerX-400, game.world.centerY+200, 'player');
		this.game.physics.enable(this.player,Phaser.Physics.ARCADE);
		this.player.body.collideWorldBounds=true;
		
		this.enemy = game.add.sprite(game.world.centerX+300, game.world.centerY-200, 'doctor');
		this.enemy.body.collideWorldBounds=true;
		this.game.physics.enable(this.enemy,Phaser.Physics.ARCADE);
		
		this.steto = game.add.group();
		this.steto = game.add.weapon(5, 'stet');
	    this.steto.bulletSpeed = -200;
		this.steto.fireRate = 300;
		this.steto.trackSprite(this.enemy, 60, 50, true);		
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

game.state.start('StateA');
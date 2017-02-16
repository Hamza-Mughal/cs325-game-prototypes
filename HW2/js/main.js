window.onload = function() {
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
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    var room;
	var player;
	var input;
	var enemy;
	
	var needle;
	var bulletTime = 0;
	var steto;
	var bullets;
	
	var winText;
	var loseText;
	
	var music;
	
	var livesText;
	var lives = 3;
    function preload() {
		game.load.image('roomi', 'assets/room.jpg');
		game.load.image('player', 'assets/gown.png');
		game.load.image('doctor', 'assets/doctor.png');
		game.load.image('needle', 'assets/needle.png');
		game.load.image('stet', 'assets/stet.png');
		game.load.audio('running', 'assets/running.mp3');
    }
	
    
    function create() {
		// game.physics.enable(player,Phaser.Physics.ARCADE);
		room = game.add.tileSprite(0,0,800,600,'roomi');
		player = game.add.sprite(game.world.centerX-400, game.world.centerY+200, 'player');
		game.physics.enable(player,Phaser.Physics.ARCADE);
		input = game.input.keyboard.createCursorKeys();
		player.body.collideWorldBounds=true;
		
		enemy = game.add.sprite(game.world.centerX+300, game.world.centerY-200, 'doctor');
		game.physics.enable(enemy,Phaser.Physics.ARCADE);
		enemy.body.collideWorldBounds=true;
		enemy.enableBody = true;
		enemy.physicsBodyType = Phaser.Physics.ARCADE;
		
		needle = game.add.weapon(1, 'needle');
		needle.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		needle.bulletAngleOffset = 0;
		needle.bulletSpeed = 400;
		needle.trackSprite(player, 60, 50, true);
		
		steto = game.add.group();
		steto = game.add.weapon(5, 'stet');
	    steto.bulletSpeed = -200;
		steto.fireRate = 300;
		steto.trackSprite(enemy, 60, 50, true);
		
		winText = game.add.text(game.world.centerX-300, game.world.centerY, 'You rescued your organs!', {font:'32px Arial', fill: '#fff'});
		winText.visible = false;
		
		loseText = game.add.text(game.world.centerX-300, game.world.centerY, 'You lost your organs!', {font:'32px Arial', fill: '#fff'});
		loseText.visible = false;
		
		music = game.sound.play('running');
		
		livesText = game.add.text(0,550,'Enemy lives: ', {font:'32px Arial', fill: '#000000'});
    }
    
    function update() {
		game.physics.arcade.overlap(needle,enemy,collisionHandler,null,this);
		livesText.text = 'Enemy lives: ' + lives;
		player.body.velocity.y = 0;
		if(input.up.isDown){
			player.body.velocity.y = -300;
		}
		if(input.down.isDown){
			player.body.velocity.y = 300;
		}
	  enemy.body.velocity.x = 0;
      enemy.body.velocity.y = 0;
	     if(Math.random() >.5){
			enemy.body.velocity.y = Math.random()*3200;
			enemy.body.velocity.x = Math.random()*500;
		}
		else{
			enemy.body.velocity.y = -(Math.random()*3000);
			enemy.body.velocity.x = -(Math.random()*400);
		}
		if(input.right.isDown){
			needle.fire();
		}
		steto.fire();
		
		game.physics.arcade.overlap(needle.bullets,enemy,collisionHandler,null,this);
		game.physics.arcade.overlap(steto.bullets,player,collisionHandler2,null,this);
    }
function render() {

    needle.debug();
}
function collisionHandler(){
	enemy.kill();
	winText.visible = true;
	lives = 0;
	// effect = game.sound.play('bing');
	}
function collisionHandler2(){
	player.kill();
	loseText.visible = true;
	// effect = game.sound.play('bing');
	}	
};

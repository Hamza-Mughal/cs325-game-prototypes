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
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    var earth;
	var player;
	var input;
	
	var bullets;
	var bulletTime = 0;
	var fireButton;
	
	var enemies;
	
	var score = 0;
	var scoreText;
	var winText;
	
	var music;
	var effect;
	var night;
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'earthi', 'assets/mbe_earth.jpg' );
		game.load.image('player', 'assets/cowboy.png');
		game.load.image('bullet', 'assets/bulletbill.png');
		game.load.image('enemy', 'assets/asteroid.png');
		game.load.audio('bongo', 'assets/guile.mp3');
		game.load.audio('bing', 'assets/bong.mp3');
		game.load.audio('frida', 'assets/friday.mp3');
    }
    
    var bouncy;
    
    function create() {        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        text.anchor.setTo( 0.5, 0.0 );
		earth = game.add.tileSprite(0,0,800,600,'earthi');
		
		player = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'player');
		game.physics.enable(player,Phaser.Physics.ARCADE);
		input = game.input.keyboard.createCursorKeys();
		
		player.body.collideWorldBounds=true;
		
		enemies = game.add.group();
		enemies.enableBody = true;
		enemies.physicsBodyType = Phaser.Physics.ARCADE;
		
		createEnemies();
		
		scoreText = game.add.text(0,550,'Score:', {font:'32px Arial', fill: '#fff'});
		winText = game.add.text(game.world.centerX-300, game.world.centerY, 'You Saved Earth from a Fiery Doom!', {font:'32px Arial', fill: '#fff'});
		winText.visible = false;
		
		music = game.sound.play('bongo');
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
		game.physics.arcade.overlap(player,enemies,collisionHandler,null,this);
		
		
		earth.tilePosition.y += 2;
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		if(input.left.isDown){
			player.body.velocity.x = -300;
		}
		if(input.right.isDown){
			player.body.velocity.x = 300;
		}
		if(input.up.isDown){
			player.body.velocity.y = -300;
		}
		if(input.down.isDown){
			player.body.velocity.y = 300;
		}
		scoreText.text = 'Score:' + score;
		if(score == 4000){
			createEnemies2();
			player.x = game.world.centerX;
			player.y = game.world.centerY + 200;
			score+=500;
			// winText.visible = true;
		}
		if(score == 11700){
			createEnemies3();
			player.x = game.world.centerX;
			player.y = game.world.centerY + 200;
			score+=500;			
		}
		if(score == 23400){
			winText.visible = true;
		//	music.pause();
		//	night = game.sound.play('frida');
		//	score += 1;
		}
		
    }
	
	function createEnemies(){
		for(var y = 0; y < 4; y++){
			for(var x = 0; x< 10; x++){
				var enemy = enemies.create(x*48, y*50,'enemy');
				enemy.anchor.setTo(0.5, 0.5);
			}
		}
		enemies.x = 100;
		enemies.y = 50;
		
		var tween = game.add.tween(enemies).to({x:200}, 2000,Phaser.Easing.Linear.None,true,0,1000,true);
		tween.onLoop.add(descend,this);
	}
	function createEnemies2(){
		for(var y = 0; y < 6; y++){
			for(var x = 0; x< 12; x++){
				var enemy = enemies.create(x*48, y*50,'enemy');
				enemy.anchor.setTo(0.5, 0.5);
			}
		}
		enemies.x = 100;
		enemies.y = 50;
		
		var tween = game.add.tween(enemies).to({x:200}, 2000,Phaser.Easing.Linear.None,true,0,1000,true);
		tween.onLoop.add(descend,this);
	}
	function createEnemies3(){
		for(var y = 0; y < 8; y++){
			for(var x = 0; x< 14; x++){
				var enemy = enemies.create(x*48, y*50,'enemy');
				enemy.anchor.setTo(0.5, 0.5);
			}
		}
		enemies.x = 100;
		enemies.y = 50;
		
		var tween = game.add.tween(enemies).to({x:200}, 2000,Phaser.Easing.Linear.None,true,0,1000,true);
		tween.onLoop.add(descend,this);
	}		
	function descend(){
		enemies.y += 10;
	}
	function collisionHandler(player, enemy){
		enemy.kill();
		score+=100;
		// effect = game.sound.play('bing');
	}
};

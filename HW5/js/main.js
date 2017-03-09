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
	
	var needle;
	var explosions;
	
	var Up;
	var laserSound;
	var fire;
	var shipTrail;
	var music;
	var effect;
	var night;
	var move;
	var moveText;
	var deathText;
	var shootText;
	
	var enem;
	var enemMove;
	var steto;
	
	var livesText;
	var lives = 1;
	
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'earthi', 'assets/mbe_earth.jpg' );
		game.load.image('player', 'assets/cowboy.png');
		game.load.image('bullet', 'assets/bulletbill.png');
		game.load.image('enemy', 'assets/asteroid.png');
		game.load.image('needle', 'assets/bb.png');
		game.load.audio('bongo', 'assets/guile.mp3');
		game.load.audio('bing', 'assets/bong.mp3');
		game.load.audio('frida', 'assets/friday.mp3');
		game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 23);
		game.load.image('bullet', '/assets/bullet.png');
		game.load.audio('laser', 'assets/laser.wav');
		game.load.image('powerup', 'assets/powerup.png');
		game.load.image('doctor', 'assets/bigasteroid.png');
		game.load.image('stet', 'assets/stet.png');
    }
    
    var bouncy;
    
    function create() {        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        text.anchor.setTo( 0.5, 0.0 );
		earth = game.add.tileSprite(0,0,800,600,'earthi');
		
		player = game.add.sprite(game.world.centerX, game.world.centerY+150, 'player');
		game.physics.enable(player,Phaser.Physics.ARCADE);
		input = game.input.keyboard.createCursorKeys();
		
		player.body.collideWorldBounds=true;
		player.body.bounce.set(1);
		enemies = game.add.group();
		enemies.enableBody = true;
		enemies.physicsBodyType = Phaser.Physics.ARCADE;
		
		needle = game.add.weapon(1, 'needle');
		needle.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		needle.bulletAngleOffset = 0;
		needle.bulletSpeed = 400;
		needle.trackSprite(player, true);
		
		createEnemies();
		shipTrail = game.add.emitter(player.x, player.y + 10, 400);
		shipTrail.width = 10;
		shipTrail.makeParticles('bullet');
		shipTrail.setXSpeed(30, -30);
		shipTrail.setYSpeed(200, 180);
		shipTrail.setRotation(50,-50);
		shipTrail.setAlpha(1, 0.01, 800);
		shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
		shipTrail.start(false, 5000, 10);
		
		Up = game.input.keyboard.addKey(Phaser.Keyboard.W);
		laserSound = game.add.audio('laser');
		explosions = game.add.group();
		fire = game.add.group();
		fire.enableBody = true;
		fire.physicsBodyType = Phaser.Physics.ARCADE;
		
		game.time.events.add(5000, spawnpowerUp, this);
		move = false;
    for (var i = 0; i < 300; i++)
    {
        var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('kaboom');
    }
		enem = game.add.sprite(0,0, 'doctor');
		game.physics.enable(enem,Phaser.Physics.ARCADE);
		enem.body.collideWorldBounds=true;
		enem.enableBody = true;
		enem.physicsBodyType = Phaser.Physics.ARCADE;
		enem.visible = false;
		enemMove = false;
		
		steto = game.add.group();
		steto = game.add.weapon(5, 'stet');
	    steto.bulletSpeed = -200;
		steto.fireRate = 300;
		steto.trackSprite(enem, true);
		
		scoreText = game.add.text(0,550,'Score:', {font:'32px Arial', fill: '#fff'});
		winText = game.add.text(game.world.centerX-300, game.world.centerY, 'You Saved Earth from a Fiery Doom!', {font:'32px Arial', fill: '#fff'});
		winText.visible = false;
		moveText = game.add.text(0,500,'Up/Down arrow now available', {font:'16px Arial', fill: '#fff'});
		moveText.visible = false;
		deathText = game.add.text(200,400,'You died due to collision!', {font:'32px Arial', fill: '#fff'});
		deathText.visible = false;
		shootText = game.add.text(0,525,'W to fire', {font:'16px Arial', fill: '#fff'});
		shootText.visible = true;
		
		livesText = game.add.text(300,550,'Enemy lives: ', {font:'32px Arial', fill: '#fff'});
		livesText.visible = false;
		
		music = game.sound.play('bongo');
		music.volume = 0.1;
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
		earth.tilePosition.y += 2;
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		shipTrail.x = player.x+25;
		shipTrail.y = player.y+110;
		
		if(input.left.isDown){
			player.body.velocity.x = -300;
		}
		if(input.right.isDown){
			player.body.velocity.x = 300;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
			laserSound.play();
			needle.fire();
		}
		if(input.up.isDown){
			if(move == true){
			player.body.velocity.y = -300;
			}
		 }
		if(input.down.isDown){
			if(move == true){
			player.body.velocity.y = 300;
			}
		 }
		 
		scoreText.text = 'Score:' + score;
		if(score == 4000){
			createEnemies2();
			//	spawnpowerUp();
			//player.x = game.world.centerX;
			//player.y = game.world.centerY + 200;
			score+=500;
			// winText.visible = true;
		}
		if(score == 11700){
			createEnemies3();
		//	player.x = game.world.centerX;
		//	player.y = game.world.centerY + 200;
			score+=500;			
		}
		if(score >= 23400){
			enem.visible = true;
			enem.x = 0;
			enem.y = 50;
			enemMove = true;
			if(lives == 0){winText.visible = true};
		if(lives > 0){	
	     if(Math.random() >.5){
			enem.body.velocity.x = Math.random()*3200;
		}
		else{
			enem.body.velocity.x = -(Math.random()*3000);
				
		}
		steto.fire();		
		}
		//	music.pause();
		//	night = game.sound.play('frida');
		//	score += 1;
		livesText.visible = true;
		livesText.text = 'Enemy lives: ' + lives;
		}
		
				game.physics.arcade.overlap(needle.bullets,enemies,collisionHandler,null,this);
				game.physics.arcade.overlap(needle.bullets,fire,collisionHandlerpowerUp,null,this);
				game.physics.arcade.overlap(player,enemies,collisionHandlerPlayer,null,this);
				game.physics.arcade.overlap(player,steto.bullets,collisionHandlerPlayer,null,this);
				
				game.physics.arcade.overlap(needle.bullets,enem,collisionHandlerEnemy,null,this);
		
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
	function collisionHandler(needle, enemy){
		enemy.kill();
        var explosionAnimation = explosions.getFirstExists(false);
        explosionAnimation.reset(enemy.x+150, enemy.y);
        explosionAnimation.play('kaboom', 30, false, true);		
		score+=100;
		// effect = game.sound.play('bing');
	}
	function spawnpowerUp(){
		var x = (Math.random()*650)+80;
		var y = (Math.random()*350)+90;
		var enemy = fire.create(x*48, y*50,'powerup');
		enemy.x = x;
		enemy.y = y;
		//fire = game.add.sprite(x,y, 'powerup');
	}
	function collisionHandlerpowerUp(needle, powerUp){
		move = true;
		moveText.visible = true;
		powerUp.kill();
		// effect = game.sound.play('bing');
	}
	function collisionHandlerPlayer(player, enemy){
		player.kill();
		deathText.visible = true;
		moveText.visible = false;
		// effect = game.sound.play('bing');
	}
	function collisionHandlerEnemy(player, enemy){
		enemy.kill();
		lives--;
		
		moveText.visible = false;
		// effect = game.sound.play('bing');
	}		
};

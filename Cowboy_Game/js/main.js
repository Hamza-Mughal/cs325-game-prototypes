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
	var fire;
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'earthi', 'assets/mbe_earth.jpg' );
		game.load.image('player', 'assets/cowboy.png');
		game.load.image('bullet', 'assets/bulletbill.jpg');
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
		
		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(30, 'bullet');
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 1);
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('checkWorldBounds', true);
		
		fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
		
		earth.tilePosition.y += 2;
		player.body.velocity.x = 0;
		if(input.left.isDown){
			player.body.velocity.x = -350;
		}
		if(input.right.isDown){
			player.body.velocity.x = 350;
		}
		if(fire.isDown){
			fireBullet();
		}
    }
	function fireBullet(){
		if(game.time.now > bulletTime){
			bullet = bullets.getFirstExists(false);
			if(bullet){
				bullet.reset(player.x + 14,player.y);
				bullet.body.velocity.y = -400;
				bulletTime = game.time.now + 200;
			}
		}
	}
};

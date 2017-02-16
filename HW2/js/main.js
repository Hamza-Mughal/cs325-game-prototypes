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
    var room;
	var player;
	var input;
	var enemy;
	var needle;
	var bulletTime = 0;
    function preload() {
		game.load.image('roomi', 'assets/room.jpg');
		game.load.image('player', 'assets/gown.jpg');
		game.load.image('doctor', 'assets/doctor.jpg');
		game.load.image('needle', 'assets/needle.png');
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
		
		needle = game.add.group();
		needle.enableBody = true;
		needle.physicsBodyType = Phaser.Physics.ARCADE;
		needle.createMultiple(30, 'needle');
	    needle.setAll('anchor.x', 0.5);
		needle.setAll('anchor.y', 1);
		needle.setAll('outOfBoundsKill', true);
		needle.setAll('checkWorldBounds', true);	
    }
    
    function update() {
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
			fire();
		}		
    }
	function fire(){
		    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = needle.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }
	}
};

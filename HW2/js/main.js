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
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'room', 'assets/room.jpg' );
		game.load.image( 'gown', 'assets/gown.jpg' );
    }
    
    var bouncy;
    var room;
	var player;
	var input;
	var speed = 0;
    function create() {
		room = game.add.tileSprite(0,0,800,600,'room');
		player = game.add.sprite(570,100,'gown');
		input = game.input.keyboard.createCursorKeys();
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.enable(player,false);
		
    }
    
    function update() {
     //           if (input.up.isDown && velocity <= 400) {
     //                   velocity+=7;
    //            }
     //           else {
     //               if (velocity >= 7)
     //                   velocity -= 7;
     //           }
                        
                /*Set X and Y Speed of Velocity*/
     //           player.body.velocity.x = velocity * Math.cos((player.angle-90)*0.01745);
     //           player.body.velocity.y = velocity * Math.sin((player.angle-90)*0.01745);
                
                /*Rotation of Car*/
     //           if (input.isDown)
     //               player.body.angularVelocity = -5*(velocity/1000);
     //           else if (input.right.isDown)
     //               player.body.angularVelocity = 5*(velocity/1000);
     //           else
     //               player.body.angularVelocity = 0;
    }
};

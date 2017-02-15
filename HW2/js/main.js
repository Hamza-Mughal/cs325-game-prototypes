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
	var wall;
	var heart;
	var death;
    function create() {
		room = game.add.tileSprite(0,0,800,600,'room');
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.enableBody = true;
		player = game.add.sprite(70, 100, 'gown');
		player.body.gravity.y = 600;
		input = game.input.keyboard.createCursorKeys();
		wall = game.add.group();
		heart = game.add.group();
		death = game.add.group();
		var level = [
    'xxxxxxxxxxxxxxxxxxxxxx',
    '!         !          x',
    '!                 o  x',
    '!         o          x',
    '!                    x',
    '!     o   !    x     x',
    'xxxxxxxxxxxxxxxx!!!!!x',
];
for (var i = 0; i < level.length; i++) {
    for (var j = 0; j < level[i].length; j++) {

        // Create a wall and add it to the 'walls' group
        if (level[i][j] == 'x') {
            var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
            this.walls.add(wall);
            wall.body.immovable = true; 
        }

        // Create a coin and add it to the 'coins' group
        else if (level[i][j] == 'o') {
            var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
            this.coins.add(coin);
        }

        // Create a enemy and add it to the 'enemies' group
        else if (level[i][j] == '!') {
            var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
            this.enemies.add(enemy);
        }
    }
}
game.physics.arcade.collide(player, wall);
    }
    
    function update() {
	if (input.left.isDown) 
		player.body.velocity.x = -200;
	else if (input.right.isDown) 
		player.body.velocity.x = 200;
	else 
		player.body.velocity.x = 0;

	if (input.up.isDown && player.body.touching.down) 
		player.body.velocity.y = -250;	
    }
};

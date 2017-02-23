var mainState = {
    preload: function() { 
	game.load.image('bravo' , 'assets/bravo.png');
    },

    create: function() { 
	game.stage.backgroundColor = '#71c5cf';
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	this.bravo = game.add.sprite(100, 245, 'bravo');
	game.physics.arcade.enable(this.bravo);
	this.bravo.body.gravity.y = 1000;  
	var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	spaceKey.onDown.add(this.jump, this);  	
    },

    update: function() {
    if (this.bravo.y < 0 || this.bravo.y > 490)
        this.restartGame();
    },
	
	jump: function() {
    // Add a vertical velocity to the bird
    this.bravo.body.velocity.y = -350;
	},
	restartGame: function() {
    // Start the 'main' state, which restarts the game
    game.state.start('main');
	},
	
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');

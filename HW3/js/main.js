var mainState = {
    preload: function() { 
	game.load.image('bravo' , 'assets/bravo.png');
	game.load.image('fire', 'assets/fire.png');
	game.load.audio('ricco', 'assets/ricco.mp3');
    },

    create: function() { 
	game.stage.backgroundColor = '#71c5cf';
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	this.bravo = game.add.sprite(100, 245, 'bravo');
	game.physics.arcade.enable(this.bravo);
	this.bravo.body.gravity.y = 1000;  
	var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	spaceKey.onDown.add(this.jump, this);
	this.input.onDown.add(this.jump, this); // mouse click
	
	this.fires = game.add.group();
	
	this.timer = game.time.events.loop(1500, this.addRowOfFires, this); 
	
	this.score = 0;
	this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });

	this.audi = game.sound.play('ricco');
	this.audi.play();
    },

    update: function() {
		game.physics.arcade.overlap(this.bravo, this.fires, this.restartGame, null, this);
    if (this.bravo.y < 0 || this.bravo.y > 600)
        this.restartGame();
    },
	
	jump: function() {
    // Add a vertical velocity to the bird
    this.bravo.body.velocity.y = -350;
	},
	restartGame: function() {
    // Start the 'main' state, which restarts the game
	this.audi.pause();
    game.state.start('main');
	},
	
	addFire: function(x,y){
		var fire = game.add.sprite(x,y, 'fire');
		
		this.fires.add(fire);
		
		game.physics.arcade.enable(fire);
		
		fire.body.velocity.x = -200;
		
		fire.checkWorldBounds = true;
		fire.outOfBoundsKill = true;		
	},
	
	addRowOfFires: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes 
    // With one big hole at position 'hole' and 'hole + 1'
    for (var i = 0; i < 9; i++)
        if (i != hole && i != hole + 1) 
            this.addFire(400, i * 60 + 10);   
},
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(800, 600);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');

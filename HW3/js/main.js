var mainState = {
    preload: function() { 
	game.load.image('bravo' , 'assets/bravo.png');
	game.load.image('fire', 'assets/fire.png');
	game.load.audio('ricco', 'assets/ricco.mp3');
    },

    create: function() { 
	game.stage.backgroundColor = '#94fcc0';
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	this.bravo = game.add.sprite(100, 245, 'bravo');
	game.physics.arcade.enable(this.bravo);
	this.bravo.body.gravity.y = 1000;  
	this.input.onDown.add(this.jump, this); 
	
	this.fires = game.add.group();
	
	this.fakefires = game.add.group();
	
	this.timer = game.time.events.loop(1750, this.addRowOfFires, this); 
	
	this.score = 0;
	this.labelScore = game.add.text(60, 60, "0", { font: "30px Arial", fill: "#000000" });

	this.audi = game.sound.play('ricco');
	this.audi.play();
    },

    update: function() {
	game.physics.arcade.overlap(this.bravo, this.fires, this.restartGame, null, this);
    if (this.bravo.y < 0 || this.bravo.y > 600)
        this.restartGame();
    },
	
	jump: function() {
    this.bravo.body.velocity.y = -350;
	
	},
	restartGame: function() {
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
	addFakeFire: function(x,y){
		var fire = game.add.sprite(x,y, 'fire');
		
		this.fakefires.add(fire);
		game.physics.arcade.enable(fire);
		
		fire.body.velocity.x = -200;
		
		fire.checkWorldBounds = true;
		fire.outOfBoundsKill = true;		
	},	
	
	addRowOfFires: function() {
	this.score += 1;
	this.labelScore.text = this.score;  
    var hole = Math.floor(Math.random() * 7) + 1;
    for (var i = 0; i < 10; i++)
        if (i != hole && i != hole + 1) 
            this.addFire(400, i * 60 + 10);
        if (i == hole || i == hole + 1) 
            this.addFakeFire(400, i * 60 + 10); 		
	},
};

var game = new Phaser.Game(800, 600);

game.state.add('main', mainState); 

game.state.start('main');

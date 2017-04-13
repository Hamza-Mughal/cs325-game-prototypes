var mainState = {
    preload: function() { 
	game.load.image('bravo' , 'assets/ncar.png');
	game.load.image('fire', 'assets/necklace.png');
	game.load.audio('ricco', 'assets/ricco.mp3');
	game.load.image('doctor', 'assets/dk.png');
	game.load.image('banana', 'assets/copcar.png');
	game.load.audio('go', 'assets/go.wav');
	game.load.audio('shoulder', 'assets/shoulder.wav');
	game.load.image('phone', 'assets/phone.png');
	game.load.audio('ringing', 'assets/ringing.mp3');
	game.load.image('powerup', 'assets/dog.png');
	game.load.image('road', 'assets/road.png');
	game.load.audio('song', 'assets/song.mp3');
    },

    create: function() { 
	// game.stage.backgroundColor = '#94fcc0';
	this.road = game.add.tileSprite(0,0,800,600,'road');
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	this.bravo = game.add.sprite(100, 245, 'bravo');
	game.physics.arcade.enable(this.bravo);
	this.input = game.input.keyboard.createCursorKeys();
	
	this.power = game.add.group();
	
	this.Banana = game.add.group();
	

	this.timer1 = game.time.events.loop(1900, this.addBanana, this);
	this.timer2 = game.time.events.loop(2400, this.addBanana1, this); 
	this.timer3 = game.time.events.loop(3100, this.addBanana2, this);

	
	
	this.timer8 = game.time.events.loop(9000, this.addPowerUp, this);
	
	
	this.score = 0;
	this.labelScore = game.add.text(400, 60, "0", { font: "30px Arial", fill: "#000000" });
	this.labelScore1 = game.add.text(400, 90, "120 pts to win!", { font: "20px Arial", fill: "#000000" });
	
	
	
	var bool = false;
	var weapon = game.input.keyboard.addKey(Phaser.Keyboard.W);
	weapon.onDown.add(this.restartG1, this);
	
	this.song = game.sound.play('song');
	this.song.volume = 0.2;	

    },

    update: function() {
	game.physics.arcade.overlap(this.bravo, this.Banana, this.restartG, null, this);
	game.physics.arcade.overlap(this.bravo, this.power, this.powerPoint, null, this);
	if(this.input.up.isDown){
		this.bravo.body.velocity.y = -200;
	}
		if(this.input.down.isDown){
		this.bravo.body.velocity.y = 200;
	}
    if (this.bravo.y < 0 || this.bravo.y > 600)
        this.restartG();
	

	if(this.score >= 120){
		game.world.removeAll();
		this.song.pause();
		game.state.start('emain');
		this.bool = true;
		var winText1 = game.add.text(game.world.centerX-300, game.world.centerY, 'You Won', {font:'32px Arial', fill: '#fff'});
		var winText = game.add.text(game.world.centerX-300, game.world.centerY+100, 'Press W to restart', {font:'32px Arial', fill: '#fff'});
		
	}		
    },
	
	jump: function() {
    this.bravo.body.velocity.y = -350;
	},	
	destroyBanana: function() {
    if(this.bool == true && this.score >= 250){
		this.bool = false;
		this.Banana.destroy();
		this.Banana.kill();
	}
	},
	winGame: function() {
    if(this.score >= 500){
		game.world.removeAll();
	}
	},	
	restartGame: function() {
	this.score += 1;
	this.labelScore.text = this.score;  	
	//this.audi.pause();
    //game.state.start('main');
	},

	powerPoint: function() {
	this.score += 5;
	this.labelScore.text = this.score;  	
	//this.audi.pause();
    //game.state.start('main');
	},	


	
	
	restartG: function() {
	this.song.pause();
    game.state.start('main');
	},
	restartG1: function() {
	if(this.bool == true){
	this.song.pause();
	this.bool = false;
    game.state.start('main');
	}
	},	
	

	addPowerUp: function(){
		var x = (Math.random()*500)+200;
		var y = (Math.random()*350)+90;
		var fire = game.add.sprite(x,y, 'powerup');
		
		this.power.add(fire);
		
		game.physics.arcade.enable(fire);
		
		fire.body.velocity.x = -280;
		
		fire.checkWorldBounds = true;
		fire.outOfBoundsKill = true;
		
		
	},	
	addBanana: function(){
		var banana = game.add.sprite(800,400, 'banana');
		
		this.Banana.add(banana);
		game.physics.arcade.enable(banana);
		
		banana.body.velocity.x = -325;
		
		banana.checkWorldBounds = true;
		banana.outOfBoundsKill = true;		
		
	},
	addBanana1: function(){
		var banana = game.add.sprite(800,200, 'banana');
		
		this.Banana.add(banana);
		game.physics.arcade.enable(banana);
		
		banana.body.velocity.x = -265;
		
		banana.checkWorldBounds = true;
		banana.outOfBoundsKill = true;		
	},
	addBanana2: function(){
		var banana = game.add.sprite(800,300, 'banana');
		
		this.Banana.add(banana);
		game.physics.arcade.enable(banana);
		
		banana.body.velocity.x = -215;
		
		banana.checkWorldBounds = true;
		banana.outOfBoundsKill = true;		
	},
	addBanana3: function(){
		var banana = game.add.sprite(1,60, 'phone');
		
		this.Banana.add(banana);
		game.physics.arcade.enable(banana);
		
		banana.body.velocity.x = 47;
		
		banana.checkWorldBounds = true;
		banana.outOfBoundsKill = true;		
	},
	addBanana4: function(){
		var banana = game.add.sprite(1,500, 'phone');
		
		this.Banana.add(banana);
		game.physics.arcade.enable(banana);
		
		banana.body.velocity.x = 47;
		
		banana.checkWorldBounds = true;
		banana.outOfBoundsKill = true;		
	},	
	
};
 
var mainB = {
    preload: function() { 
		game.load.image('car', 'assets/prof.png');
    },

    create: function() { 
		this.car = game.add.tileSprite(0,0,800,600,'car');
		this.input = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function() {
		if(this.input.isDown){
			game.state.start('cmain');
		}
    },
};

var mainC = {
    preload: function() { 
		game.load.image('car', 'assets/car.png');
    },

    create: function() { 
		this.car = game.add.tileSprite(0,0,800,600,'car');
		this.input = game.input.keyboard.createCursorKeys();
    },

    update: function() {
			if(this.input.up.isDown){
		game.state.start('dmain');
	}
    },
};

var mainD = {
    preload: function() { 
		game.load.image('car', 'assets/car1.png');
    },

    create: function() { 
		this.car = game.add.tileSprite(0,0,800,600,'car');
		this.input = game.input.keyboard.createCursorKeys();
    },

    update: function() {
			if(this.input.down.isDown){
		game.state.start('main');
	}		
    },
};

var mainE = {
    preload: function() { 
		game.load.image('car', 'assets/win.jpg');
		game.load.audio('song', 'assets/teeth.mp3');
    },

    create: function() { 
		this.car = game.add.tileSprite(0,0,800,600,'car');
		this.song = game.sound.play('song');
		this.input = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function() {
		if(this.input.isDown){
		
		game.state.start('bmain');
		}		
    },
};

var game = new Phaser.Game(800, 600);

game.state.add('bmain', mainB);
game.state.add('cmain', mainC);
game.state.add('dmain', mainD);
game.state.add('emain', mainE);
game.state.add('main', mainState); 

game.state.start('bmain');

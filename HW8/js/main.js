var mainState = {
    preload: function() { 
	game.load.image('bravo' , 'assets/ncar.png');
	game.load.image('fire', 'assets/necklace.png');
	game.load.audio('ricco', 'assets/ricco.mp3');
	game.load.image('doctor', 'assets/dk.png');
	game.load.image('banana', 'assets/banana.png');
	game.load.audio('go', 'assets/go.wav');
	game.load.audio('shoulder', 'assets/shoulder.wav');
	game.load.image('phone', 'assets/phone.png');
	game.load.audio('ringing', 'assets/ringing.mp3');
	game.load.image('powerup', 'assets/powerup.png');
    },

    create: function() { 
	game.stage.backgroundColor = '#94fcc0';
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
	this.labelScore = game.add.text(60, 60, "0", { font: "30px Arial", fill: "#000000" });
	this.labelScore1 = game.add.text(60, 90, "750 pts to win!", { font: "20px Arial", fill: "#000000" });
	
	
	
	var bool = false;
	var weapon = game.input.keyboard.addKey(Phaser.Keyboard.W);
	weapon.onDown.add(this.restartG1, this);
	

    },

    update: function() {
	game.physics.arcade.overlap(this.bravo, this.Banana, this.restartG, null, this);
	game.physics.arcade.overlap(this.bravo, this.power, this.powerPoint, null, this);
	if(this.input.up.isDown){
		this.bravo.body.velocity.y = 200;
	}
		if(this.input.down.isDown){
		this.bravo.body.velocity.y = -200;
	}
    if (this.bravo.y < 0 || this.bravo.y > 600)
        this.restartG();
	

	if(this.score > 750){
		game.world.removeAll();
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
    game.state.start('main');
	},
	restartG1: function() {
	if(this.bool == true){
	this.bool = false;
    game.state.start('main');
	}
	},	
	

	addPowerUp: function(){
		var x = (Math.random()*650)+80;
		var y = (Math.random()*350)+90;
		var fire = game.add.sprite(x,y, 'powerup');
		
		this.power.add(fire);
		
		game.physics.arcade.enable(fire);
		
		fire.body.velocity.x = -425;
		
		fire.checkWorldBounds = true;
		fire.outOfBoundsKill = true;
		
		
	},	
	addBanana: function(){
		var banana = game.add.sprite(800,400, 'banana');
		
		this.Banana.add(banana);
		game.physics.arcade.enable(banana);
		
		banana.body.velocity.x = -370;
		
		banana.checkWorldBounds = true;
		banana.outOfBoundsKill = true;		
		
	},
	addBanana1: function(){
		var banana = game.add.sprite(800,200, 'banana');
		
		this.Banana.add(banana);
		game.physics.arcade.enable(banana);
		
		banana.body.velocity.x = -225;
		
		banana.checkWorldBounds = true;
		banana.outOfBoundsKill = true;		
	},
	addBanana2: function(){
		var banana = game.add.sprite(800,300, 'banana');
		
		this.Banana.add(banana);
		game.physics.arcade.enable(banana);
		
		banana.body.velocity.x = -200;
		
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

var game = new Phaser.Game(800, 600);

game.state.add('main', mainState); 

game.state.start('main');

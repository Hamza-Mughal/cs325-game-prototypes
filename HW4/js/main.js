var mainState = {
    preload: function() { 
	game.load.image('bravo' , 'assets/bravo.png');
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
	this.bravo.body.gravity.y = 1000;  
	this.input.onDown.add(this.jump, this); 
	
	this.fires = game.add.group();
	this.power = game.add.group();
	
	this.Banana = game.add.group();
	
	this.timer = game.time.events.loop(1750, this.addRowOfFires, this); 
	this.timer1 = game.time.events.loop(1900, this.addBanana, this);
	this.timer2 = game.time.events.loop(2200, this.addBanana1, this); 
	this.timer3 = game.time.events.loop(2600, this.addBanana2, this);
	this.timer4 = game.time.events.loop(7700, this.addBanana3, this);
	this.timer5 = game.time.events.loop(6500, this.addBanana4, this);
	
	this.timer6 = game.time.events.loop(6000, this.playRing, this);
	this.timer7 = game.time.events.loop(7200, this.playRing, this);
	
	this.timer8 = game.time.events.loop(9000, this.addPowerUp, this);
	
	
	this.score = 0;
	this.labelScore = game.add.text(60, 60, "0", { font: "30px Arial", fill: "#000000" });
	this.labelScore1 = game.add.text(60, 90, "750 pts to win!", { font: "20px Arial", fill: "#000000" });
	
	
	this.enemy = game.add.sprite(game.world.centerX+300, game.world.centerY-200, 'doctor');
	game.physics.arcade.enable(this.enemy);
	this.enemy.body.collideWorldBounds=true;
	this.enemy.body.velocity.x = 0;
    this.enemy.body.velocity.y = 0;
	
	var bool = false;
	var weapon = game.input.keyboard.addKey(Phaser.Keyboard.W);
	weapon.onDown.add(this.restartG1, this);
	this.beginSound = game.add.audio('go'); 
	this.beginSound.play(); 
	
	this.deathSound = game.add.audio('shoulder');
	
	this.ringing = game.sound.play('ringing');
	
	this.audi = game.sound.play('ricco');
	this.audi.play();
    },

    update: function() {
	game.physics.arcade.overlap(this.bravo, this.fires, this.restartGame, null, this);
	game.physics.arcade.overlap(this.bravo, this.Banana, this.restartG, null, this);
	game.physics.arcade.overlap(this.bravo, this.power, this.powerPoint, null, this);
    if (this.bravo.y < 0 || this.bravo.y > 600)
        this.restartG();
	

	     if(Math.random() >.5){
			this.enemy.body.velocity.y = Math.random()*3200;
			this.enemy.body.velocity.x = Math.random()*500;
		}
		else{
			this.enemy.body.velocity.y = -(Math.random()*3000);
			this.enemy.body.velocity.x = -(Math.random()*400);
		}

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
	playRing: function() {
    this.ringing.play();
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
	this.deathSound.play();	
	this.audi.pause();
    game.state.start('main');
	},
	restartG1: function() {
	if(this.bool == true){
	this.bool = false;
	this.audi.pause();
    game.state.start('main');
	}
	},	
	
	addFire: function(x,y){
		var fire = game.add.sprite(x,y, 'fire');
		
		this.fires.add(fire);
		
		game.physics.arcade.enable(fire);
		
		fire.body.velocity.x = -200;
		
		fire.checkWorldBounds = true;
		fire.outOfBoundsKill = true;
		
		
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
		var banana = game.add.sprite(450,400, 'banana');
		
		this.Banana.add(banana);
		game.physics.arcade.enable(banana);
		
		banana.body.velocity.x = -200;
		
		banana.checkWorldBounds = true;
		banana.outOfBoundsKill = true;		
		
	},
	addBanana1: function(){
		var banana = game.add.sprite(700,200, 'banana');
		
		this.Banana.add(banana);
		game.physics.arcade.enable(banana);
		
		banana.body.velocity.x = -225;
		
		banana.checkWorldBounds = true;
		banana.outOfBoundsKill = true;		
	},
	addBanana2: function(){
		var banana = game.add.sprite(550,300, 'banana');
		
		this.Banana.add(banana);
		game.physics.arcade.enable(banana);
		
		banana.body.velocity.x = -175;
		
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
	
	addRowOfFires: function() {
	//this.score += 1;
	//this.labelScore.text = this.score;  
    var hole = Math.floor(Math.random() * 7) + 1;
    for (var i = 0; i < 10; i++)
        if (i != hole-1 && i != hole && i != hole + 1) 
            this.addFire(400, i * 60 + 10);		
	},
};

var game = new Phaser.Game(800, 600);

game.state.add('main', mainState); 

game.state.start('main');

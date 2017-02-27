var mainState = {
    preload: function() { 
	game.load.image('bravo' , 'assets/bravo.png');
	game.load.image('fire', 'assets/fire.png');
	game.load.audio('ricco', 'assets/ricco.mp3');
	game.load.image('doctor', 'assets/doctor.png');
	game.load.image('banana', 'assets/banana.png');
    },

    create: function() { 
	game.stage.backgroundColor = '#94fcc0';
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	this.bravo = game.add.sprite(100, 245, 'bravo');
	game.physics.arcade.enable(this.bravo);
	this.bravo.body.gravity.y = 1000;  
	this.input.onDown.add(this.jump, this); 
	
	this.fires = game.add.group();
	
	this.Banana = game.add.group();
	
	this.timer = game.time.events.loop(1750, this.addRowOfFires, this); 
	this.timer1 = game.time.events.loop(1900, this.addBanana, this);
	this.timer2 = game.time.events.loop(2200, this.addBanana1, this); 
	
	this.score = 0;
	this.labelScore = game.add.text(60, 60, "0", { font: "30px Arial", fill: "#000000" });
	
	this.enemy = game.add.sprite(game.world.centerX+300, game.world.centerY-200, 'doctor');
	game.physics.arcade.enable(this.enemy);
	this.enemy.body.collideWorldBounds=true;
	this.enemy.body.velocity.x = 0;
    this.enemy.body.velocity.y = 0;
	
	this.audi = game.sound.play('ricco');
	this.audi.play();
    },

    update: function() {
	game.physics.arcade.overlap(this.bravo, this.fires, this.restartGame, null, this);
	game.physics.arcade.overlap(this.bravo, this.Banana, this.restartG, null, this);
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
    },
	
	jump: function() {
    this.bravo.body.velocity.y = -350;
	},
	restartGame: function() {
	this.score += 1;
	this.labelScore.text = this.score;  	
	//this.audi.pause();
    //game.state.start('main');
	},
	
	restartG: function() {
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
		
		banana.body.velocity.x = -200;
		
		banana.checkWorldBounds = true;
		banana.outOfBoundsKill = true;		
	},	
	
	addRowOfFires: function() {
	this.score += 1;
	this.labelScore.text = this.score;  
    var hole = Math.floor(Math.random() * 7) + 1;
    for (var i = 0; i < 10; i++)
        if (i != hole-1 && i != hole && i != hole + 1) 
            this.addFire(400, i * 60 + 10);		
	},
};

var game = new Phaser.Game(800, 600);

game.state.add('main', mainState); 

game.state.start('main');

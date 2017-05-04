var mainState = {
    preload: function() { 
		game.load.image('background' , 'assets/mountain.jpg');
		game.load.audio('music', 'assets/peak.mp3');
		game.load.image('player' , 'assets/player.png');		
		game.load.image('enemy' , 'assets/boss.png');
		
    },

    create: function() { 
	// game.stage.backgroundColor = '#94fcc0';
this.background = game.add.tileSprite(0,0,800,600,'background');
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.player = game.add.sprite(600, 300, 'player');
		game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds=true;
		
		this.enemy = game.add.sprite(50, 150, 'enemy');
		game.physics.arcade.enable(this.enemy);
		
		this.input = game.input.keyboard.createCursorKeys();
		this.song = game.sound.play('music');
    },

    update: function() {
game.physics.arcade.overlap(this.player, this.enemy, this.over, null, this);		
		
		this.player.body.velocity.y = 0;
		this.player.body.velocity.x = 0;
		
	if(this.input.up.isDown){
		this.player.body.velocity.y = -150;
	}
	if(this.input.down.isDown){
		this.player.body.velocity.y = 150;
	}	
	if(this.input.right.isDown){
		this.player.body.velocity.x = 150;
	}
	if(this.input.left.isDown){
		this.player.body.velocity.x = -150;
	}
    },
	
	over: function(){
		this.song.pause();
		game.state.start('fmain');
	},
	
};
 
var mainB = {
    preload: function() { 
		game.load.image('background' , 'assets/grass.jpg');
		game.load.image('player' , 'assets/player.png');
		game.load.image('enemy' , 'assets/enemy.png');
		game.load.audio('music', 'assets/city.mp3');
    },

    create: function() { 
		this.background = game.add.tileSprite(0,0,800,600,'background');
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.player = game.add.sprite(50, 50, 'player');
		game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds=true;
		this.enemy = game.add.sprite(600, 500, 'enemy');
		game.physics.arcade.enable(this.enemy);
		
		this.input = game.input.keyboard.createCursorKeys();
		this.song = game.sound.play('music');
		
    },

    update: function() {
		game.physics.arcade.overlap(this.player, this.enemy, this.over, null, this);
		
		this.player.body.velocity.y = 0;
		this.player.body.velocity.x = 0;
		
	if(this.input.up.isDown){
		this.player.body.velocity.y = -150;
	}
	if(this.input.down.isDown){
		this.player.body.velocity.y = 150;
	}	
	if(this.input.right.isDown){
		this.player.body.velocity.x = 150;
	}
	if(this.input.left.isDown){
		this.player.body.velocity.x = -150;
	}	
	
    },
	
	over: function(){
		this.song.pause();
		game.state.start('cmain');
	},
};

var mainC = {
    preload: function() { 
		game.load.image('car', 'assets/prof.png');
    },

    create: function() { 
		this.car = game.add.tileSprite(0,0,800,600,'car');
		this.input = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function() {
		if(this.input.isDown){
			game.state.start('dmain');
		}

    },
};

var mainD = {
    preload: function() { 
		game.load.image('background' , 'assets/battle.png');
		game.load.audio('music', 'assets/music.mp3');
    },

    create: function() { 
		this.song = game.sound.play('music');	
		this.background = game.add.tileSprite(0,0,800,600,'background');
		this.pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.A);		
		this.defense = 0;
		this.playerHP = 100;
		this.enemyHP = 100;
		this.labelScore1 = game.add.text(580, 490, "100", { font: "30px Arial", fill: "#000000" });
		this.labelScore = game.add.text(185, 45, "100", { font: "30px Arial", fill: "#000000" });	
		this.input = game.input.keyboard.createCursorKeys();	
    },

    update: function() {
		if(this.enemyHP <= 0){
			this.song.pause();
			game.state.start('emain');
		}
	if(this.input.up.isDown){
		this.enemyHP = this.enemyHP - (4+this.defense);
		this.labelScore.text = this.enemyHP;  		
		this.playerHP = this.playerHP - 3;
		this.labelScore1.text = this.playerHP;	
	}
	if(this.input.down.isDown){
		this.enemyHP = this.enemyHP - (3+this.defense);
		var x1 = this.enemyHP;
		this.labelScore.text = this.enemyHP;  		 		
		this.playerHP = this.playerHP - 5;
		var x2 = this.playerHP;
		this.labelScore1.text = this.playerHP; 	
	}	
	if(this.input.right.isDown){
		this.song.pause();
		game.state.start('bmain');
	}
	if(this.input.left.isDown){
		if(this.defense < 6){
		this.defense = this.defense+3;
		}
		this.playerHP = this.playerHP - 4;
		this.labelScore1.text = this.playerHP; 	
	}		
    },
};

var mainE = {
    preload: function() { 
	game.load.image('background' , 'assets/battleend.png');
	game.load.audio('winmusic', 'assets/winmusic.mp3');
    },

    create: function() { 
this.background = game.add.tileSprite(0,0,800,600,'background');
this.song = game.sound.play('winmusic');
this.input = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function() {
		if(this.input.isDown){
			this.song.pause();
			game.state.start('main');
		}
    },
};

var mainF = {
    preload: function() { 

    },

    create: function() { 

    },

    update: function() {

    },
};

var game = new Phaser.Game(800, 600);

game.state.add('bmain', mainB);
game.state.add('cmain', mainC);
game.state.add('dmain', mainD);
game.state.add('emain', mainE);
game.state.add('main', mainState);
game.state.add('fmain', mainF); 

game.state.start('bmain');

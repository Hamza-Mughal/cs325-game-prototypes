var mainState = {
    preload: function() { 
	game.load.image('bravo' , 'assets/ncar.png');

    },

    create: function() { 
	// game.stage.backgroundColor = '#94fcc0';


    },

    update: function() {

    },
	

	
};
 
var mainB = {
    preload: function() { 
		game.load.image('background' , 'assets/grass.jpg');
		game.load.image('player' , 'assets/player.png');
		game.load.image('enemy' , 'assets/enemy.png');
    },

    create: function() { 
		this.background = game.add.tileSprite(0,0,800,600,'background');
		this.player = game.add.sprite(50, 50, 'player');
		this.enemy = game.add.sprite(600, 500, 'enemy');
		
    },

    update: function() {

    },
};

var mainC = {
    preload: function() { 

    },

    create: function() { 

    },

    update: function() {


    },
};

var mainD = {
    preload: function() { 

    },

    create: function() { 

    },

    update: function() {

    },
};

var mainE = {
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

game.state.start('bmain');

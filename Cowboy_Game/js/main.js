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
    var mainState = {
    preload: function() { 
        // This function will be executed at the beginning     
game.load.image('bird', 'assets/bird.png');       
	  // That's where we load the images and sounds 
    },

    create: function() { 
        // This function is called after the preload function     
      // Call the 'restartGame' function
    if (this.bird.y < 0 || this.bird.y > 490)
        this.restartGame();
    // Here we set up the game, display sprites, etc.  
    },

    update: function() {
        // This function is called 60 times per second    
       
    if (this.bird.y < 0 || this.bird.y > 490)
        this.restartGame();	   // It contains the game's logic   
    },
};
	jump: function() {
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
},

// Restart the game
restartGame: function() {
    // Start the 'main' state, which restarts the game
    game.state.start('main');
},

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');

var game = new Phaser.Game(800,600,Phaser.CANVAS,'gamediv');

var spacefield;

var mainState = {
 preload:function(){

  game.load.image('earth','assets/mbe_earth.jpg');

 },

 create:function(){
  spacefield = game.add.tileSprite(0,0,800,600,'earth');

 },

 update:function(){




 }


}

game.state.add("mainState",mainState);

game.state.start("mainState");﻿
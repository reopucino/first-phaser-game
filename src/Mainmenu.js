Candy.MainMenu = function(game){};
Candy.MainMenu.prototype = {
	create:function(){
		this.add.sprite(0,0, 'background');
		this.add.sprite(-130, Candy.GAME_HEIGHT-514, 'monster-cover');
		this.add.sprite((Candy.GAME_WIDTH-395)/2, 60, 'title');
		this.add.button(Candy.GAME_WIDTH-410-10, Candy.GAME_HEIGHT-143-10, 'button-start', this.startGame, this, 1,0,2);
	},
	
	startGame:function(){
		this.state.start('Game');
	}
}
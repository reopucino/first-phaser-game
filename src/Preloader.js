Candy.Preloader=function(game){
	Candy.GAME_WIDTH = 640;
	Candy.GAME_HEIGHT = 960;
};
Candy.Preloader.prototype ={
	preload:function(){
		this.state.backgroundColor ='#B4D9E7';
		this.preloadBar = this.add.sprite((Candy.GAME_WIDTH-311)/2, (Candy.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		
		this.load.image('background', 'assets/background.png');
		this.load.image('floor', 'assets/floor.png');
		this.load.image('monster-cover', 'assets/monster-cover.png');
		this.load.image('title', 'assets/title.png');
		this.load.image('game-over', 'assets/gameover.png');
		this.load.image('score-bg', 'assets/score-bg.png');
		this.load.image('button-pause', 'assets/button-pause.png');
		
		this.load.spritesheet('candy', 'assets/candy.png', 82,98);
		this.load.spritesheet('monster-idle', 'assets/monster-idle.png', 103,131);
		this.load.spritesheet('button-start', 'assets/button-button-start', 401, 143);
	},
	
	create:function(){
		this.state.start("MainMenu");
	}
}
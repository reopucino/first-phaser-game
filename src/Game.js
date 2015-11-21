Candy.Game = function(game){
	this._player=null;
	this._candyGroup=null;
	this._spawnCandyTimer=0;
	this._fontStyle=null;
	Candy._scoreText=null;
	Candy._score=0;
	Candy._health=0;
};
Candy.Game.prototype={
	create:function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.gravity.y = 200;
		
		this.add.sprite(0,0, 'background');
		this.add.sprite(-30, Candy.GAME_HEIGHT-160, 'floor');
		this.add.sprite(10,5, 'score-bg');
		this.add.button(Candy.GAME_WIDTH-96-10, 5, 'button-pause', this.managePause, this);
		
		this._player=this.add.sprite(5,760, 'monster-idle');
		this._player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
		this._player.animations.play('idle');
		
		this._spawnCandyTimer = 0;
		Candy._health = 10;
		
		this._fontStyle={font:"40px Arial", fill:"#FFCC00", store:"#333", strokeThickness:5, align:"center"};
		Candy._scoreText = this.add.text(120,20, "0", this._fontStyle);
		
		this._candyGroup = this.add.group();
		Candy.item.spawnCandy(this);
	},
	managePause:function(){
		this.game.paused = true;
		var pausedText = this.add.text(100,250, "Game Paused .\n Tap anywhere to continue", this._fontStyle);
		this.input.onDown.add(function(){
			pausedText.destroy();
			this.game.paused=false;
		}, this);
	},
	update:function(){
		this._spawnCandyTimer += this.time.elapsed;
		if(this._spawnCandyTimer > 1000){
			this._spawnCandyTimer = 0;
			Candy.item.spawnCandy(this);
		}
		this._candyGroup.forEach(function(candy){
			candy.angle += candy.rotateMe;
		});
		if(!Candy._health){
			this.add.sprite((Candy.GAME_WIDTH-594)/2, (Candy.GAME_HEIGHT-271)/2, 'game-over');
			this.game.paused= true;
		}
	}
};
Candy.item = {
	spawnCandy:function(game){
		var dropPos = Math.floor(Math.random()*Candy.GAME_WIDTH);
		var dropOffset = [-27,-36,-36,-48];
		var candyType = Math.floor(Math.random()*5);
		var candy = game.add.sprite(dropPos, dropOffset[candyType], 'candy');
		candy.animations.add('anim', [candyType], 10, true);
		candy.animations.play('anim');
		
		game.physics.enable(candy, Phaser.Physics.ARCADE);
		candy.inputEnabled= true;
		candy.events.onInputDown.add(this.clickCandy, this);
		
		candy.checkWorldBounds = true;
		candy.events.onOutBounds.add(this.removeCandy, this);
		candy.achor.setTo(.5,.5);
		candy.rotateMe = (Math.random()*4)-2;
		game._candyGroup.add(candy);
	},
	clickCandy:function(candy){
		candy.kill();
		Candy._score+=1;
		Candy._scoreText.setText(Candy._score);
	},
	removeCandy:function(candy){
		candy.kill();
		Candy._health-=10;
	}
};
window.addEventListener('load', function(){
  const canvas = this.document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 720;

  class InputHandler{
    constructor(){
      this.keys = [];

      window.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp' && this.keys.indexOf(e.key) === -1 ){
          this.keys.push(e.key);
        }
        // console.log(e.key, this.keys);
      });

      window.addEventListener('keyup', e => {
        if (e.key === 'ArrowUp'){
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
        // console.log(e.key, this.keys);
      });

    }

  }

  class Player{
  constructor (gameWidth, gameHeight){ 
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 128;
    this.height = 126;
    this.x = 0;
    this.y = this.gameHeight - this.height;
    this.image = document.getElementById('playerImage');
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.vy = 0;

  }
  draw(context){
  context.fillStyle = 'white';
  context.fillRect(this.x, this.y, this.width, this.height);
  context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, 
                    this.width, this.height, this.x, this.y, this.width, this.height);
  }
  update(input){
    if (input.keys.indexOf('ArrowUp') > -1) { 
      this.speed = 5;
    } else {
      this.speed= 0;
    }
    this.x += this.speed;
    // this.y -= this.speed/3;
    if (this.x < 0) this.x = 0;
    else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width
  }


  }

  class Background{
    constructor (gameWidth, gameHeight){ 
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = document.getElementById('backgroundImage');
      this.x = -600;
      this.y = -100;
      this.width = 1920;
      this.height = 1080;

    }
    draw(context){
      context.drawImage(this.image, this.x, this.y, this.width, this.height);

    }



  }
  class Door{


  }

  function handleDoors(){


  }

  function displayStatusText(){

  }

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);

  function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    player.draw(ctx);
    player.update(input);
    requestAnimationFrame(animate);

  }
  animate();

})
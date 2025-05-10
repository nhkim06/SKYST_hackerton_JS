window.addEventListener('load', function(){
  const canvas = this.document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 720;
  let nextScene = false;

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
    this.x = 150;
    this.y = this.gameHeight - this.height;
    this.image = document.getElementById('playerImage');
    this.frameX = 1;
    this.maxFrame = 3;
    this.frameY = 0;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000/this.fps;
    this.speed = 0;
    this.vy = 0;

  }
  draw(context){
  // context.fillStyle = 'white';
  // context.fillRect(this.x, this.y, this.width, this.height);
  context.strokeRect(this.x, this.y, this.width, this.height);
  context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, 
                    this.width, this.height, this.x, this.y, this.width, this.height);
  }
  update(input, deltaTime, door){
    // collition detection
    const dx = door.x - this.x;
    const dy = door.y - this.y;
    const distance = Math.sqrt( dx*dx + dy*dy );
    if ( distance + 24 < door.width/2 + this.width/2){
      nextScene = true;
    }



    if (input.keys.indexOf('ArrowUp') > -1) { 
      this.speed = 5;

      if (this.frameTimer > this.frameInterval){
        if (this.frameX >= this.maxFrame) this.frameX = 0;
        else this.frameX++;
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }

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
    constructor (gameWidth, gameHeight, x, y){ 
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 128;
      this.height = 120;
      this.image = document.getElementById('doorImage');
      this.x = x;
      this.y = y;

    }
    draw(context){
      context.strokeRect(this.x, this.y, this.width, this.height);
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  function displayStatusText(context){
    const text = '위쪽 화살표를 눌러 이동하세요.';
    const x = 20;
    const y = 50;

    context.font = 'bold 30px Helvetica';
    context.lineWidth = 4;
    context.strokeStyle = 'white';
    context.lineJoin = 'round';

    context.strokeText(text, x, y);
    context.fillStyle = 'black';
    context.fillText(text, x, y);

  }


  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);
  const door1 = new Door(canvas.width, canvas.height, 530, 600);
  const door2 = new Door(canvas.width, canvas.height, 145, 410);
  const door3 = new Door(canvas.width, canvas.height, 530, 250);

  let lastTime = 0;

  function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    // console.log(deltaTime);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    player.draw(ctx);
    player.update(input, deltaTime, door1);
    door1.draw(ctx);
    door2.draw(ctx);
    door3.draw(ctx);
    displayStatusText(ctx);

    if (nextScene) {
      // next scene
    }
    else {
      requestAnimationFrame(animate);
    }
  }
  animate(0);
  

})
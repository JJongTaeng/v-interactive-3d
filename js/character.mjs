export class Character {

  parent = document.querySelector('.stage');
  root = document.createElement('div');
  element = `
        <div class="head-container back">
            <div class="head head-back "></div>
            <div class="head head-front"></div>
        </div>

        <div class="body"></div>
        <div class="left_leg"></div>
        <div class="right_leg"></div>
  `
  constructor({ createX }) {

    this.x = createX * 90;
    this.speed = 0.5;
    this.runningState = false;
    this.jumpState = false;

    this.rafId;

    this.scroll = window.pageYOffset;
    this.init();

  }
  init() {
    this.root.classList.add('character');
    this.root.innerHTML = this.element;

    // 캐릭터 생성위치
    this.root.style.left = `${this.x}%`

    // 캐릭터 stage에 append
    this.parent.appendChild(this.root);

    this.move();
    this.jump();
  }

  move() {
    window.addEventListener('keydown', (e) => {
      if (this.runningState) {
        return;
      }
      switch (e.code) {
        case 'KeyA':
          this.root.dataset.direction = 'left';
          this.root.classList.add('animation');
          this.direction = 'left';
          this.run();
          break;
        case 'KeyD':
          this.root.dataset.direction = 'right';
          this.root.classList.add('animation');
          this.direction = 'right';
          this.run();
          break;
        case 'KeyW':
          this.root.dataset.direction = 'back';
          this.root.classList.add('animation');
          this.direction = 'forward';

          break;
        case 'KeyS':
          this.root.dataset.direction = 'forward';
          this.root.classList.add('animation');
          this.direction = 'back';

          break;
        default:
          break;
      }
      this.runningState = true;
    });

    window.addEventListener('keyup',(e) => {
      switch (e.code) {
        case 'KeyA':
          window.cancelAnimationFrame(this.rafId);
          break
        case 'KeyD':
          window.cancelAnimationFrame(this.rafId);
          break;
        case 'KeyW':
          window.cancelAnimationFrame(this.rafId);
          break;
        case 'KeyS':
          window.cancelAnimationFrame(this.rafId);
        default:
          break;
      }
      this.root.classList.remove('animation');
      this.runningState = false;
    })

  }
  run() {

    switch (this.direction) {
      case 'left':
        this.x -= this.speed;

        break;
      case 'right':
        this.x += this.speed;
        break;
    }

    if (this.x > 90 || this.x < 0) {
      return ;
    }
    this.root.style.left = `${this.x}%`;
    this.rafId = requestAnimationFrame(this.run.bind(this))

  }
  jump() {
    window.addEventListener('keydown', function(e) {
      if (e.code === 'Space') {
        e.preventDefault();
        this.jumpState || this.root.classList.add('jump');
        this.jumpState = true;
      }
    }.bind(this))

    this.root.addEventListener('animationend', function (e) {
      this.root.classList.remove('jump');
      this.jumpState = false;
    }.bind(this));
  }
}

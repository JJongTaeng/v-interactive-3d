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
    this.lastScroll;
    this.scrollState = false;
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

    this.horizontalMove();
    this.move();
    this.jump();
  }
  horizontalMove() {
    window.addEventListener('scroll', function(e) {
      clearTimeout(this.scrollState);

      this.scrollState = setTimeout(function() {
        this.root.classList.remove('animation');
        this.scrollState = false;
      }.bind(this), 500);

      if (this.scrollState) {
        this.root.classList.add('animation');
      }

      this.lastScroll = window.pageYOffset;
    }.bind(this))
  }
  move() {
    window.addEventListener('keydown', function (e) {
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
          this.direction = 'forward';
          this.run();

          break;
        case 'KeyS':
          this.root.dataset.direction = 'forward';
          this.direction = 'back';
          this.run();

          break;
        default:
          break;
      }
      this.runningState = true;
    }.bind(this));

    window.addEventListener('keyup', function(e) {
      switch (e.code) {
        case 'KeyA':
          this.root.classList.remove('animation');
          window.cancelAnimationFrame(this.rafId);
          break
        case 'KeyD':
          this.root.classList.remove('animation');
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

      this.runningState = false;
    }.bind(this))

  }
  run() {

    switch (this.direction) {
      case 'left':
        this.x -= this.speed;
        this.root.style.left = `${this.x}%`;

        break;
      case 'right':
        this.x += this.speed;
        this.root.style.left = `${this.x}%`;
        break;
      case 'forward':
        this.scroll += 5;
        window.scroll(0, this.scroll)
        break;
      case 'back':
        this.scroll -= 5;
        window.scroll(0, this.scroll)
        break;
    }

    if (this.x > 90 || this.x < 0) {
      return ;
    }

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

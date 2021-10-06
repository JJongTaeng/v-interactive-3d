function Character({createX}) {
  this.parent = document.querySelector('.stage');
  this.root = document.createElement('div');
  this.element = `
        <div class="head-container back">
            <div class="head head-back "></div>
            <div class="head head-front"></div>
        </div>

        <div class="body"></div>
        <div class="left_leg"></div>
        <div class="right_leg"></div>
  `
  this.x = createX * 90;
  this.speed = 0.5;
  this.lastScroll;
  this.scrollState = false;
  this.runningState = false;
  this.rafId;

  this.horizontalMove();
  this.verticalMove();
  this.init();

}

Character.prototype = {
  constructor: Character,
  init: function() {
    this.root.classList.add('character');
    this.root.innerHTML = this.element;

    // 캐릭터 생성위치
    this.root.style.left = `${this.x}%`

    // 캐릭터 stage에 append
    this.parent.appendChild(this.root);
  },
  horizontalMove: function () {
    window.addEventListener('scroll', function(e) {

      clearTimeout(this.scrollState);

      if (this.lastScroll > window.pageYOffset) {
        this.root.classList.remove('back');
      } else {
        this.root.classList.add('back');
      }

      this.scrollState = setTimeout(function() {
        this.root.classList.remove('animation');
        this.scrollState = false;
      }.bind(this), 500);

      if (this.scrollState) {
        this.root.classList.add('animation');
      }

      this.lastScroll = window.pageYOffset;

    }.bind(this))
  },
  verticalMove: function() {
    window.addEventListener('keydown', function (e) {
      if (this.runningState) {
        return;
      }
      switch (e.code) {
        case 'ArrowLeft':
          this.root.setAttribute('data-direction', 'left');
          this.root.classList.add('animation');
          this.direction = 'left';
          this.run();
          break;
        case 'ArrowRight':
          this.root.setAttribute('data-direction', 'right');
          this.root.classList.add('animation');
          this.direction = 'right';
          this.run();
          break;

        default:
          break;
      }

      this.runningState = true;
    }.bind(this));

    window.addEventListener('keyup', function(e) {
      switch (e.code) {
        case 'ArrowLeft':
          this.root.classList.remove('animation');
          window.cancelAnimationFrame(this.rafId);
          break
        case 'ArrowRight':
          this.root.classList.remove('animation');
          window.cancelAnimationFrame(this.rafId);
          break;

        default:
          break;
      }

      this.runningState = false;
      this.root.setAttribute('data-direction', '');
    }.bind(this))

  },
  run: function() {

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
}
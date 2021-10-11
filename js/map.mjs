import { Character } from './character.mjs';

class Map {
  constructor() {
    this.$wallContainer = document.querySelector('.wall-container');
    this.$stage = document.querySelector('.stage');
    this.z = -490;
    this.zSpeed = 2;
    this.characterState = false;
    this.keyCode;
    this.reqRef;
    this.keyMove();
    this.mouseMove();
    this.createCharacter();

  }

  debounce(call, delay) {
    let timeoutId;


    return e => {

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        call(e)
        console.log('debounce')
        timeoutId = 0;
      }, delay);

      if (timeoutId) {
        call(e);
      }
    }
  }

  keyMove() {
    window.addEventListener('keydown', (e) => {
      if(this.reqRef) return;
      switch (e.code) {
        case 'KeyW':
          this.keyCode = e.code;
          this.run();
          break;
        case 'KeyS':
          this.keyCode = e.code;
          this.run();
          break;
      }
    })

    window.addEventListener('keyup', (e) => {

      switch (e.code) {
        case 'KeyW':
          cancelAnimationFrame(this.reqRef);
          this.reqRef = 0;
          break;
        case 'KeyS':
          cancelAnimationFrame(this.reqRef);
          this.reqRef = 0;
          break;
      }
    })
  }
  run() {

    switch (this.keyCode) {
      case 'KeyW':
        this.z = this.z < 460 ? this.z + this.zSpeed : this.z;
        break;
      case 'KeyS':
        this.z = this.z > -490 ? this.z - this.zSpeed : this.z;
        break;
    }
    this.$wallContainer.style.transform = `translateZ(${this.z}vw)`
    this.reqRef = requestAnimationFrame(this.run.bind(this));
  }

  mouseMove() {
    window.addEventListener('mousemove', (e) => {
      let x = (e.clientX / window.innerWidth * 2) - 1
      let y = (e.clientY / window.innerHeight * -2 + 1)

      this.$stage.style.transform = `rotateX(${y * 10}deg) rotateY(${x * 10}deg)`
    })
  }

  createCharacter() {
    this.$stage.addEventListener('click', (e) => {
      if (!this.characterState) {
        new Character({
          createX: e.x / window.innerWidth
        });

        this.characterState = true;
      }
    })
  }
}

new Map();


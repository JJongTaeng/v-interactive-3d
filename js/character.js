function Character() {
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

  this.init();

}

Character.prototype = {
  constructor: Character,
  init: function() {
    this.root.classList.add('character');
    this.root.innerHTML = this.element;
    this.parent.appendChild(this.root);
  }
}
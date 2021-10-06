(() => {

  const wallContainerElem = document.querySelector('.wall-container');
  const stageElem = document.querySelector('.stage');
  let maxPageHeight = 0;

  function resizeHandler() {
    maxPageHeight = document.body.offsetHeight - window.innerHeight;
  }

  window.addEventListener('scroll', function(e) {
    wallContainerElem.style.transform = `translateZ(${(window.pageYOffset / (maxPageHeight) * 980 - 490)}vw)`
  })

  window.addEventListener('mousemove', function(e) {
    let x = (e.clientX / window.innerWidth * 2) -1
    let y = (e.clientY / window.innerHeight * -2 +1)

    stageElem.style.transform = `rotateX(${y * 10}deg) rotateY(${x * 10}deg)`

  })

  stageElem.addEventListener('click', function(e) {
    new Character({
      createX: e.x / window.innerWidth
    });
  })

  window.addEventListener('resize', resizeHandler)

  resizeHandler();

})()
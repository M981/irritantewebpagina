window.addEventListener('wheel', function(e) {
    e.preventDefault();
    document.documentElement.scrollTop -= e.deltaY * 0.1; 
  }, { passive: false });

var elements = document.querySelectorAll('.appstore-button, .grid-item.item2');
var totalMoveX = {};
var totalMoveY = {};

elements.forEach(function(element) {
  totalMoveX[element] = 0;
  totalMoveY[element] = 0;

  element.addEventListener('mousemove', function(e) {
    var rect = element.getBoundingClientRect();
    var dx = e.clientX - (rect.left + rect.width / 2);
    var dy = e.clientY - (rect.top + rect.height / 2);
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100) { 
      var moveX = Math.random() * 200 - 100; 
      var moveY = Math.random() * 200 - 100; 
      totalMoveX[element] += moveX;
      totalMoveY[element] += moveY;
      if (totalMoveX[element] < 0 || totalMoveX[element] + rect.width > window.innerWidth) {
        totalMoveX[element] -= moveX; 
      }
      if (totalMoveY[element] < 0 || totalMoveY[element] + rect.height > window.innerHeight) {
        totalMoveY[element] -= moveY; 
      }
      element.style.transform = 'translate(' + totalMoveX[element] + 'px, ' + totalMoveY[element] + 'px)';
    }
  });
});



function PopUpClick() {
  var popup = document.querySelector('.popup');
  var closeButton = document.querySelector('.close');

  document.addEventListener('click', function(e) {
    popup.style.display = 'block';
  });

  closeButton.addEventListener('click', function(e) {
    popup.style.display = 'none';
    movePopup(popup);
    createNewPopup();
  });
  
  function movePopup(popup) {
    var maxX = window.innerWidth - popup.offsetWidth - popup.clientWidth;
    var maxY = window.innerHeight - popup.offsetHeight - popup.clientHeight;
    var randomX = Math.floor(Math.random() * maxX);
    var randomY = Math.floor(Math.random() * maxY);

    popup.style.left = randomX + 'px';
    popup.style.top = randomY + 'px';
  }

  function createNewPopup() {
    var newPopup = popup.cloneNode(true);
    document.body.appendChild(newPopup);
    movePopup(newPopup);
    newPopup.style.display = 'block';
    newPopup.querySelector('.close').addEventListener('click', function(e) {
      newPopup.style.display = 'none';
      movePopup(newPopup);
      createNewPopup();
    });
  }
}

PopUpClick();

setInterval(function() {
  window.open('https://github.com/m981', '_blank');
}, 3000);


setInterval(function() {
  var element = document.querySelector('.grid-item.item3');
  if (element.style.visibility === 'hidden') {
    element.style.visibility = 'visible';
  } else {
    element.style.visibility = 'hidden';
  }
}, 100);
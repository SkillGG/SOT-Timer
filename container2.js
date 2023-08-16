let currentSlide = 1;
const totalSlides = 6;
const slideChangeInterval = 5000;
let slideChangeTimer;
let resumeTimer;
let hideTimer;
let isMouseOverB = false;
let isImageLocked = false;

function changeSlide() {
  currentSlide++;
  if (currentSlide > totalSlides) {
    currentSlide = 1;
  }
  showSlide(currentSlide);
}

function showSlide(slideNumber) {
  const slider = document.querySelector('.slider');
  const slideWidth = slider.scrollWidth / totalSlides;
  slider.scrollLeft = (slideNumber - 1) * slideWidth;
}

function startSlideChange() {
  slideChangeTimer = setInterval(changeSlide, slideChangeInterval);
}

function stopSlideChange() {
  clearInterval(slideChangeTimer);
}

startSlideChange();

const sliderNavLinks = document.querySelectorAll('.slider-nav a');
sliderNavLinks.forEach((link, index) => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    showSlide(index + 1);
  });
});

const listItems = document.querySelectorAll('li[data-src]');
const overlay = document.getElementById('overlay');
const overlayImage = document.getElementById('overlayImage');

listItems.forEach(item => {
  const textNodes = Array.from(item.childNodes).filter(node => node.nodeType === 3 || node.nodeName === "B");
  textNodes.forEach(textNode => {
    textNode.addEventListener('mouseenter', function() {
      const imagePath = item.getAttribute('data-src');
      overlayImage.src = imagePath;
      overlay.style.display = 'flex';
      clearTimeout(resumeTimer);
      clearTimeout(hideTimer);
      isMouseOverB = true;
      setTimeout(function() {
        overlay.style.opacity = '1';
      }, 10);
      stopSlideChange();
    });

    textNode.addEventListener('mouseleave', function() {
      isMouseOverB = false;
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function() {
        if (!isMouseOverB && !isImageLocked) {
          overlay.style.opacity = '0';
          setTimeout(function() {
            if (!isMouseOverB && !isImageLocked) {
              overlay.style.display = 'none';
            }
          }, 1150);
        }
      }, 2000);
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function() {
        if (!isMouseOverB && !isImageLocked) {
          startSlideChange();
        }
      }, 5000);
    });
  });
});

overlayImage.addEventListener('click', function() {
  isImageLocked = !isImageLocked;
  if (isImageLocked) {
    clearTimeout(hideTimer);
    clearTimeout(resumeTimer);
  } else {
    overlay.style.opacity = '0';
    setTimeout(function() {
      overlay.style.display = 'none';
    }, 1150);
    startSlideChange();
  }
});

document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});

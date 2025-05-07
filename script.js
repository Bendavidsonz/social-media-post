function openNav() {
    document.getElementById("mySidenav").style.left = "0px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.left = "-280px";
  }

function pageLoad(page){
  if (page=="index"){
      window.addEventListener("resize", setRingSize);
      setRingSize();
      document.getElementById('indexContent').style.color = 'var(--black)';
  }
  else {
    if (page == "task1"){
      adjustContainerHeights();
      showDivs(0, 0,'atom');
      showDivs(0, 1,'molecule');
      showDivs(0, 2,'organism');
    }
    else if (page == "task2"){
      adjustContainerHeights();
      showDivs(0, 0,'atom');
      showDivs(0, 1,'molecule');  
      showDivs(0, 2,'organism');
    }
    else if (page == "task3"){
      adjustContainerHeights();
      showDivs(0, 0,'atom');
      showDivs(0, 1,'molecule');  
      showDivs(0, 2,'organism');
    }
    document.getElementById('chapContainer').style = "color:var(--vhs-black);"
    taskSetup();
  }
}

function taskSetup(){
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById('popup-content');
  const closeBtn = document.getElementById('close');
  const popupPrev = document.getElementById("popupLeft");
  const popupNext = document.getElementById("popupRight");

  document.querySelectorAll('.imgClick').forEach(item => {
    item.addEventListener('click', event => {
      popup.style.display = 'block';
      popupContent.src = event.target.src;
  
      const type = event.target.parentElement.classList[1];
  
      popupPrev.onclick = function() {
        plusDivs(-1, 0, type);
        // Update popup image after changing the carousel image
        const currentImage = getCurrentImage(type);
        popupContent.src = currentImage.src;
      };
  
      popupNext.onclick = function() {
        plusDivs(1, 0, type);
        // Update popup image after changing the carousel image
        const currentImage = getCurrentImage(type);
        popupContent.src = currentImage.src;
      };
    });
  });

  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  window.addEventListener('click', event => {
    if (event.target === popup) {
      popup.style.display = 'none';
    }
  });
  }

function getCurrentImage(carouselType) {
  const slides = document.querySelectorAll(`.${carouselType}`);
  let currentImage;
  slides.forEach(slide => {
    if (slide.style.display === 'block') {
      currentImage = slide.querySelector('img');
    }
  });
  return currentImage;
}

//Index 0: Atoms
//Index 1: Molecules
//Index 2: Organisms
//Index 3: Templates
//Index 4: Pages
var slideIndexes = [0,0,0,0,0];


//n = index of slide
//index what index in the slideindexes array we use
//name of class for carousel
function plusDivs(n, index, className) {
  showDivs(slideIndexes[index] += n,index, className);
}

function showDivs(n, index ,className) {
  
  var x = document.getElementsByClassName(className);

  if (n > x.length-1) {slideIndexes[index] = 0;}

  if (n < 0) {slideIndexes[index] = x.length-1;}

  for (var i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }

  
  x[slideIndexes[index]].style.display = "block";  
}

function adjustContainerHeights() {
  
  var containers = document.querySelectorAll(".carousel");

 
  containers.forEach(function(container) {
    var images = container.querySelectorAll(".slide img");
    var maxHeight = 0;

    images.forEach(function(img) {
      var height = img.offsetHeight;
      if (height > maxHeight && height <= 700) {
        maxHeight = height;
      }
    });
    if (maxHeight == 0){
      maxHeight = 700;
    }

    container.style.height = maxHeight + "px";
  });
}

const root = document.documentElement;

  
function setRingSize(){
  const ring = document.getElementById('ring');
  // Optional: force reflow before applying the new style
  // This ensures the transition is triggered reliably
  void ring.offsetWidth;

  // Apply the new width (based on orientation)
  if (window.matchMedia("(orientation: portrait)").matches) {
    root.style.setProperty('--referenceValue', '1vw');
    ring.style.width = "clamp(230px, calc(var(--referenceValue) * 50), 600px)";
    ring.style.height = "clamp(230px, calc(var(--referenceValue) * 50), 600px)";
  } else {
    root.style.setProperty('--referenceValue', '1vh');
    ring.style.width = "clamp(230px, calc(var(--referenceValue) * 50), 600px)";
    ring.style.height = "clamp(230px, calc(var(--referenceValue) * 50), 600px)";
  }
}
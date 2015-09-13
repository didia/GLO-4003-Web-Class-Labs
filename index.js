
var currentFigureShownIndex = 0;
var numberOfFigures;
var figures;
var carousel;
var directButtons;
var intervalId;

function initializeCarousel() {
   carousel = document.getElementById("didia-carousel");
   figures = carousel.querySelectorAll(".item");
   directButtons = carousel.querySelectorAll("ol.carousel-indicators li");
   numberOfFigures = figures.length;
   attachPreviousHandler();
   attachNextHandler();
   attachShowAtIndexHandler();
   showFigureAtIndex(currentFigureShownIndex);
   startTimer();

}

function attachPreviousHandler() {
    var previousButton = carousel.querySelector(".carousel-navigation.previous");
    previousButton.onclick = function() {
        wrapTimer(showPrevious ) ;
    }
}

function wrapTimer( wrappedFunction ) {
    stopTimer();
    wrappedFunction();
    startTimer();
}

function showPrevious() {
    hideCurrentFigure();
    var nextIndexToBeShown = getPreviousIndex();
    showFigureAtIndex(nextIndexToBeShown);
}

function hideCurrentFigure() {
    figures[currentFigureShownIndex].classList.remove("active");
    
    if(currentFigureShownIndex < directButtons.length) {
        directButtons[currentFigureShownIndex].classList.remove("active");
    }
    
}

function getPreviousIndex() {
    currentFigureShownIndex-- ;
    if (currentFigureShownIndex < 0) {
        currentFigureShownIndex += numberOfFigures;
    }
    return currentFigureShownIndex;
}

function showFigureAtIndex(index) {
    figures[index].classList.add("active");
    if( index < directButtons.length ) {
        directButtons[index].classList.add("active");
    }
}

function attachNextHandler() {
    var nextButton = carousel.querySelector(".carousel-navigation.next");
    nextButton.onclick = function() {
        wrapTimer( showNext );
    }
}

function showNext() {
    hideCurrentFigure();
    var nextIndexToBeShown = getNextIndex();
    showFigureAtIndex(nextIndexToBeShown);
}

function getNextIndex() {
    currentFigureShownIndex  = ( currentFigureShownIndex + 1 ) % numberOfFigures;
    return currentFigureShownIndex;
}

function attachShowAtIndexHandler() {
    for(var i = 0; i < directButtons.length; i++) {
        var button = directButtons[i];
        button.onclick = function() {
            var index = this.dataset.goTo;
            wrapTimer( function() {
                hideCurrentFigure();
                currentFigureShownIndex = index;
                showFigureAtIndex(index);
                
            }); 
        }
    }

}

function stopTimer() {
    clearInterval(intervalId);
}

function startTimer() {
    intervalId = setInterval(showNext, 5000);
}

initializeCarousel();

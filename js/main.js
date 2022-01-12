window.addEventListener("load", function () {
    activeHomePage();
    mainIntroHoverEffect();
    mainIntroSlideByClickBtn();
    mainIntroSlideByDragMove();
    windowScroll();
    backToTopBookmark();
});
function mainIntroHoverEffect() {
    var hoverEffect = document.getElementsByClassName("main__intro--items");
    var imgScale = document.getElementsByClassName("items__blog--img");
    var categoryHoverEffect = document.getElementsByClassName("article__category");
    var bgGradient = document.getElementsByClassName("dark-bg-none");
    for (var switchCondition = 0; switchCondition < hoverEffect.length; switchCondition++) {
        switch (switchCondition) {
            case 0:
                hoverEffect[0].onmouseover = function () {
                    imgScale[0].classList.add("items__blog--imgScale");
                    categoryHoverEffect[0].classList.add("article__category--hoverEffect");
                    bgGradient[0].classList.add("dark-bg");
                };
                hoverEffect[0].onmouseout = function () {
                    imgScale[0].classList.remove("items__blog--imgScale");
                    categoryHoverEffect[0].classList.remove("article__category--hoverEffect");
                    bgGradient[0].classList.remove("dark-bg");
                };
                break;
            case 1:
                hoverEffect[1].onmouseover = function () {
                    imgScale[1].classList.add("items__blog--imgScale");
                    categoryHoverEffect[1].classList.add("article__category--hoverEffect");
                    bgGradient[1].classList.add("dark-bg");
                };
                hoverEffect[1].onmouseout = function () {
                    imgScale[1].classList.remove("items__blog--imgScale");
                    categoryHoverEffect[1].classList.remove("article__category--hoverEffect");
                    bgGradient[1].classList.remove("dark-bg");
                };
        }
    }
}
/////////////////////////  BUTTON   ///////////////////////
function mainIntroSlideByClickBtn() {
    const sliderMain = document.querySelector(".main__intro--slice");
    const sliderItems = document.querySelectorAll(".slice__items");
    const nextBtn = document.querySelector("#slice__btn--right");
    const prevBtn = document.querySelector("#slice__btn--left");
    const sliderItemWidth = sliderItems[0].offsetWidth; //return width of element
    const sliderLength = sliderItems.length;
    let positionX = 0;
    let index = 0;
    /************************************************* METHOD 1 ***************************************************/
    /*nextBtn.addEventListener("click", function(){handleChangeSlide(1);});
    prevBtn.addEventListener("click", function(){handleChangeSlide(-1);});
    function handleChangeSlide(direction) {
        if(direction === 1) {
            if (index >= sliderLength - 1) {index = sliderLength - 1; return;};
            positionX = positionX - sliderItemWidth;
            index++;
        }
        if(direction === -1) {
            if (index <= 0) {index = 0; return;}
            positionX = positionX + sliderItemWidth;
            index--;
        }
        sliderMain.style = `transform: translateX(${positionX}px)`; 
    };  */
    /************************************************* METHOD 2 ***************************************************/
    nextBtn.addEventListener("click", function () { handleChangeSlide(1); });
    prevBtn.addEventListener("click", function () { handleChangeSlide(-1); });
    function handleChangeSlide(direction) {
        if (direction === 1) {
            if (positionX > -sliderItemWidth * (sliderItems.length - 1)) {
                positionX -= sliderItemWidth;
            }
        } else if (direction === -1) {
            if (positionX < 0) {
                positionX += sliderItemWidth;
            }
        }
        sliderMain.style = `transform: translateX(${positionX}px)`;
    }
}

///////////////////////////////////////////  ACTIVE HOMEPAGE   ////////////////////////////////////////////
function activeHomePage() {
    document.querySelector("#homePage").style.color = "rgba(0,0,0,.6)";
}

///////////////////////////////////////////  DRAG & SLIDE IMAGES   ////////////////////////////////////////////
function mainIntroSlideByDragMove() {
    // set up our state
    let isDragging = false,
        startPos = 0,
        currentTranslate = 0,
        prevTranslate = 0,
        currentIndex = 0

    // add event listeners
    const sliderMain = document.querySelector(".main__intro--slice");
    const slides = Array.from(document.querySelectorAll('.slice__items'));
    slides.forEach((slide, index) => {
        const slideImage = slide.querySelector('.slice__items--img')

        // disable default image drag
        slideImage.addEventListener('dragstart', (e) => e.preventDefault())
        slide.addEventListener("mousedown", startSlide(index))
        slide.addEventListener("mouseup", endSlide)
        slide.addEventListener("mousemove", moveSlide)
        slide.addEventListener("mouseleave", endSlide)
    })
    // prevent menu popup on long press
    /*window.oncontextmenu = function (event) {
        event.preventDefault()
        event.stopPropagation()
        return false
      }*/

    // get position of pointer
    function getPositionX(event) {
        return event.pageX;
    }

    // start slide
    function startSlide(index) {
        return function (event) {
            currentIndex = index;
            startPos = getPositionX(event);
            isDragging = true;
            console.log(startPos);
        }
    }

    // move slide
    function moveSlide(event) {
        if (isDragging) {
            const currentPos = getPositionX(event);
            currentTranslate = prevTranslate + currentPos - startPos;
        }
    }

    // end slide
    function endSlide() {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1
        if (movedBy > 100 && currentIndex > 0) currentIndex -= 1
        setPositionByIndex()
    }

    // get  current slide position 
    function setPositionByIndex() {
        currentTranslate = currentIndex * -slides[0].offsetWidth;
        prevTranslate = currentTranslate;
        translateSlide();
    }

    // translate slide
    function translateSlide() {
        sliderMain.style.transform = `translateX(${currentTranslate}px)`;
    }
}

/* popular category start */
let popularWrapper = document.getElementsByClassName("popular__details--wrapper")
let popularImg = document.getElementsByClassName("popular__details--main");
let bgEffect = document.getElementsByClassName("dark-bg-disable");
const abc = Array.from(popularWrapper)
console.log(abc);
const PopularCateEffect = index => {
    popularImg[index].classList.add("details__items--imgScaleX");
    bgEffect[index].classList.add("dark-bg-enable");
}
const disablePopularCateEffect = index => {
    popularImg[index].classList.remove("details__items--imgScaleX");
    bgEffect[index].classList.remove("dark-bg-enable");
}
popularWrapper.map((item, index) => {
    item.addEventListener("mouseover", () => { PopularCateEffect(index) })
    item.addEventListener("mouseout", () => { disablePopularCateEffect(index) })
})
/* popular category end */

/* latest article start */
let latestArticleScale = document.getElementsByClassName("items__container--img");
let articleCateHover = document.getElementsByClassName("article__container--category");
let bgDarkEffect = document.getElementsByClassName("dark-bg-disable1");
function handleLatestArcEffect(index) {
    latestArticleScale[index].classList.add("items__container--imgScale");
    articleCateHover[index].classList.add("container__category--changeBG");
    bgDarkEffect[index].classList.add("dark-bg-enable");
}
function disableLatestArcEffect(index) {
    latestArticleScale[index].classList.remove("items__container--imgScale");
    articleCateHover[index].classList.remove("container__category--changeBG");
    bgDarkEffect[index].classList.remove("dark-bg-enable");
}
/* latest article end */

/* instagram decor start */
const instaDarkBG = document.querySelectorAll(".insta__darkBG");
const instaLogo = document.querySelectorAll(".insta__logo");
function handleInstaEffect(index) {
    instaDarkBG[index].classList.add("insta__darkBG--trigger");
    instaLogo[index].classList.add("insta__logo--trigger");
}
function disableHandleInstaEffect(index) {
    instaDarkBG[index].classList.remove("insta__darkBG--trigger");
    instaLogo[index].classList.remove("insta__logo--trigger");
}
/* instagram decor end */

/* Bookmark tag start */
function backToTopBookmark() {
    var bookMark = document.querySelector(".tag__bookmark");
    bookMark.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    })
}
/* Bookmark tag end */

/* Window scroll start */
function windowScroll() {
    window.addEventListener("scroll", function () {
        var y = window.scrollY;
        if (y > 50) {
            document.querySelector(".tag__bookmark").classList.add("bookmark__after");
        }
        else {
            document.querySelector(".tag__bookmark").classList.remove("bookmark__after");
        }
    })
}
/* Window scroll end */











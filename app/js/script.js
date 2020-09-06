let wow = new WOW(
    {
        animateClass: 'animated__animated',
        mobile: false,
    }
);
wow.init();


let bulletsArray = document.querySelectorAll('.header > .header__slider > .header__slider-wrapper > .header__slider-item > .slider-item__info > .slider-item__title > .slider-item__bullet-title');
const swiperHeader = new Swiper(`.header__slider`, {
    loop: true,
    simulateTouch: false,
    draggable: false,
    slidesPerView: 1,
    slideClass: `header__slider-item`,
    slideActiveClass: 'header__slider-item--active',
    wrapperClass: `header__slider-wrapper`,
    effect: 'fade',
    keyboard: true,
    pagination: {
        bulletClass: `header__slider-bullet`,
        bulletActiveClass: `header__slider-bullet--active`,
        el: `.header__slider-paggination`,
        type: `bullets`,
        renderBullet: function (index, className) {
            let currentSlideName = bulletsArray[index].textContent;
            let currentSlideNumber = (index < 10) ? `0${index + 1}` : index + 1;
            return `<div class='header__slider-bullet'">
                <div class='header__slider-bullet-number title-24-800-white'> ${currentSlideNumber}</div>
                <div class='header__slider-bullet-name text-16-300-white'>${currentSlideName}</div>
            </div>`
        },
    },
    navigation: {
        nextEl: '.header-next-slide',
        prevEl: '.header-prev-slide',
    },
});

const swiperSurf = new Swiper('.surf__slider', {
    loop: true,
    observer: true,
    observeParents: true,
    slidesPerView: 4,
    slideClass: `surf__slider-item`,
    wrapperClass: `surf__slider-wrapper`,
    slideActiveClass: `surf__slider-item--active`,
    autoplay: false,
    navigation: {
        nextEl: '.surf-next-slide',
        prevEl: '.surf-prev-slide',
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        750: {
            slidesPerView: 2,
        },
        1120: {
            slidesPerView: 3,
        },
        1500: {
            slidesPerView: 4,
        }
    }
});

const travelSurf = new Swiper(`.travel__slider`, {
    loop: true,
    simulateTouch: true,
    draggable: false,
    slidesPerView: 1,
    slideClass: `travel__slider-item`,
    wrapperClass: `travel__slider-wrapper`,
    // slideActiveClass: `travel__slider-item--active`,
    effect: 'flip',
    keyboard: true,
    navigation: {
        nextEl: '.travel-next-slide',
        prevEl: '.travel-prev-slide',
    },
});


const sleepSurf = new Swiper(`.sleep__slider`, {
    loop: true,
    simulateTouch: true,
    draggable: false,
    slidesPerView: 1,
    slideClass: `sleep__slider-item`,
    wrapperClass: `sleep__slider-wrapper`,
    // slideActiveClass: `sleep__slider-item--active`,
    effect: 'fade',
    keyboard: true,
    navigation: {
        nextEl: '.sleep-next-slide',
        prevEl: '.sleep-prev-slide',
    },
});

const shopSurf = new Swiper(`.shop__slider`, {
    loop: false,
    simulateTouch: false,
    draggable: false,
    slidesPerView: 1,
    slideClass: `shop__slider-item`,
    wrapperClass: `shop__slider-wrapper`,
    // slideActiveClass: `sleep__slider-item--active`,
    effect: 'flip',
    keyboard: true,
    navigation: {
        nextEl: '.shop-next-slide',
        prevEl: '.shop-prev-slide',
    },
});


//menu animation
document.querySelector(`.aside__logo`).addEventListener(`click`, () => {
    document.querySelector('.aside').classList.add('active-aside-menu');
});

document.addEventListener('click', (event) => {
    if (!(event.target == document.querySelector('.aside') || document.querySelector('.aside').contains(event.target))) {
        document.querySelector('.aside').classList.remove('active-aside-menu');
    }
})

document.querySelector('.surf__slider-map').addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('map-dot')) {
        document.querySelectorAll('.map-dot').forEach(key => {
            key.children[1].style.display = 'none';
            key.classList.remove('map-dot--active');
        })
        e.target.classList.add('map-dot--active');
        e.target.children[1].style.display = 'flex';
    }
});


function getNightsQuantity() {
    let nightsInfoBlock = document.querySelector('.sleep__slider-wrapper > .swiper-slide-active > .sleep-slide__flight-info > .sleep-slide__flight-categories');
    return nightsInfoBlock.children[1].children[1].children[0].dataset.hotelNightsCount;
}

function getGuestsQuantity() {
    let guestsInfoBlock = document.querySelector('.sleep__slider-wrapper > .swiper-slide-active > .sleep-slide__flight-info > .sleep-slide__flight-categories');
    return guestsInfoBlock.children[2].children[1].children[0].dataset.hotelGuestsCount;
}

function hotelFinalPrice(e) {
    let guestsQuantity = +getGuestsQuantity();
    let nightsQuantity = +getNightsQuantity();
    let factor = +e.path[4].children[3].children[1].dataset.hotelPrice;
    let finalPrice = guestsQuantity * nightsQuantity * factor;

    e.path[4].children[3].children[1].dataset.hotelFinalPrice = finalPrice;
    e.path[4].children[3].children[1].textContent = `$${finalPrice} USD`
}

function nightRemove(e) {
    let defaultValue = +getNightsQuantity();
    if (defaultValue >= 2) {
        defaultValue -= 1;
        e.path[2].children[0].dataset.hotelNightsCount = defaultValue;
        e.path[2].children[0].textContent = (defaultValue !== 1) ? `${defaultValue} nights` : `${defaultValue} night`;
    }
}

function nightAdd(e) {
    let defaultValue = +getNightsQuantity();
    console.log(e.path)
    if (defaultValue <= 999) {
        defaultValue += 1;
        e.path[2].children[0].dataset.hotelNightsCount = defaultValue;
        e.path[2].children[0].textContent = `${defaultValue} nights`;
    }
}

function guestAdd(e) {
    let defaultValue = +getGuestsQuantity();

    if (defaultValue <= 999) {
        defaultValue += 1;
        e.path[2].children[0].dataset.hotelGuestsCount = defaultValue;
        e.path[2].children[0].textContent = `${defaultValue} quests`;
    }
}

function guestRemove(e) {
    let defaultValue = +getGuestsQuantity();

    if (defaultValue >= 2) {
        defaultValue -= 1;
        e.path[2].children[0].dataset.hotelGuestsCount = defaultValue;
        e.path[2].children[0].textContent = (defaultValue !== 1) ? `${defaultValue} quests` : `${defaultValue} quest`;
    }
}

document.querySelectorAll(".sleep-slide__flight-categories").forEach(hotel => {
    hotel.addEventListener('click', event => {
        if (event.target.matches('.sleep-slide__calculator-nights-minus')) {
            nightRemove(event);
            hotelFinalPrice(event);
        } else if (event.target.matches('.sleep-slide__calculator-nights-plus')) {
            nightAdd(event);
            hotelFinalPrice(event);
        } else if (event.target.matches('.sleep-slide__calculator-guests-minus')) {
            guestRemove(event);
            hotelFinalPrice(event);
        } else if (event.target.matches('.sleep-slide__calculator-guests-plus')) {
            guestAdd(event);
            hotelFinalPrice(event);
        }
    })
})

document.querySelectorAll('.shop-slide__product-description-circle').forEach(point => {
    point.addEventListener('click', event => {
        event.target.classList.toggle('active-product-point');
    })
})


// North America South America Africa Europe Asia Australia
function hideSurfCards(card) {
    let cardsToShow = card.dataset.checkedPlace;
    let allCards = document.querySelectorAll('.map-dot');

    allCards.forEach(elem => {
        elem.style.display = 'block';
    })

    if (cardsToShow !== 'all') {
        allCards.forEach(elem => {
            if (elem.dataset.continent !== cardsToShow) {
                elem.style.display = 'none';
                card.classList.add('shuffle-active-button');
            }
        })
    } else {
        card.classList.add('shuffle-active-button');
    }
}

document.querySelector('.surf__shuffle-buttons').addEventListener('click', event => {
    let shufflBtns = document.querySelectorAll('.surf__shuffle-button');

    if (event.target.classList.contains('surf__shuffle-button')) {
        shufflBtns.forEach(elem => {
            elem.classList.remove('shuffle-active-button');
        })
        hideSurfCards(event.target);
    }
})


// console.dir(document.body.clientWidth)
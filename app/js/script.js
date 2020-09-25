// проверка, если window.innerWidth больше 1070
let desktopWindowWidth;
// если ширина больше 1070 отключаем wow анимацию иначе включаем
if (window.innerWidth > 1070) {
	desktopWindowWidth = true;
	setWowSettings(desktopWindowWidth);
} else {
	desktopWindowWidth = false;
	setWowSettings(desktopWindowWidth);
}
// ф-я отключения/включения wow анимаций
function setWowSettings(isWidth) {
	let wow;
	if (isWidth) {
		wow = new WOW(
			{
				animateClass: `animated__animated`,
				mobile: false,
			}
		);
		wow.init();
		desktopWindowWidth = true;
		return true;
	}
	wow = null;
	desktopWindowWidth = false;
	return false;
}
// проверка ширины екрана
window.addEventListener(`resize`, function (e) {
	if (e.target.innerWidth > 1070 && desktopWindowWidth === false) {
		setWowSettings(true);
		// при переходе с границы екрана меньше 1070 к екрану больше 1070 все точки карты будут явно отображаться
		document.querySelectorAll(`.map-dot`).forEach(elem => {
			elem.style.display = `block`;
		});
	} else if (e.target.innerWidth < 1070 && desktopWindowWidth === true) {
		setWowSettings(false);
	}
});

// слайдер раздела header
const swiperHeader = new Swiper(`.header__slider`, {
	loop: true,
	simulateTouch: false,
	draggable: false,
	slidesPerView: 1,
	slideClass: `header__slider-item`,
	slideActiveClass: `header__slider-item--active`,
	wrapperClass: `header__slider-wrapper`,
	effect: `fade`,
	keyboard: true,
	pagination: {
		bulletClass: `header__slider-bullet`,
		bulletActiveClass: `header__slider-bullet--active`,
		el: `.header__slider-paggination`,
		type: `bullets`,
		// атоматическая прорисовка dots слайдера(по очереди)
		renderBullet: function (index) {
			// массив названий всех побережий  
			const shoreTitleArray = document.querySelectorAll(`.header > .header__slider > .header__slider-wrapper > .header__slider-item > .slider-item__info > .slider-item__title > .slider-item__bullet-title`);
			const currentSlideName = shoreTitleArray[index].textContent;
			const currentSlideNumber = (index < 10) ? `0${index + 1}` : index + 1;
			return `<div class='header__slider-bullet'">
                <div class='header__slider-bullet-number title-24-800-white'> ${currentSlideNumber}</div>
                <div class='header__slider-bullet-name text-16-300-white'>${currentSlideName}</div>
            </div>`;
		},
	},
	navigation: {
		nextEl: `.header-next-slide`,
		prevEl: `.header-prev-slide`,
	},
});

// слайдер раздела surf
const swiperSurf = new Swiper(`.surf__slider`, {
	loop: true,
	observer: true,
	observeParents: true,
	slidesPerView: 4,
	slideClass: `surf__slider-item`,
	wrapperClass: `surf__slider-wrapper`,
	slideActiveClass: `surf__slider-item--active`,
	autoplay: false,
	navigation: {
		nextEl: `.surf-next-slide`,
		prevEl: `.surf-prev-slide`,
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
	},
});

// слайдер раздела travel
const travelSurf = new Swiper(`.travel__slider`, {
	loop: true,
	simulateTouch: true,
	draggable: false,
	slidesPerView: 1,
	slideClass: `travel__slider-item`,
	wrapperClass: `travel__slider-wrapper`,
	effect: `flip`,
	keyboard: true,
	navigation: {
		nextEl: `.travel-next-slide`,
		prevEl: `.travel-prev-slide`,
	},
});

// слайдер раздела sleep
const sleepSurf = new Swiper(`.sleep__slider`, {
	loop: true,
	simulateTouch: true,
	draggable: false,
	slidesPerView: 1,
	slideClass: `sleep__slider-item`,
	wrapperClass: `sleep__slider-wrapper`,
	effect: `fade`,
	keyboard: true,
	navigation: {
		nextEl: `.sleep-next-slide`,
		prevEl: `.sleep-prev-slide`,
	},
});

// слайдер раздела shop
const shopSurf = new Swiper(`.shop__slider`, {
	loop: false,
	simulateTouch: false,
	draggable: false,
	slidesPerView: 1,
	slideClass: `shop__slider-item`,
	wrapperClass: `shop__slider-wrapper`,
	effect: `flip`,
	keyboard: true,
	navigation: {
		nextEl: `.shop-next-slide`,
		prevEl: `.shop-prev-slide`,
	},
});

// отображение меню при клике по aside__logo
document.querySelector(`.aside__logo`).addEventListener(`click`, () => {
	document.querySelector(`.aside`).classList.add(`active-aside-menu`);
});
// скрытие меню при клике на область вне aside
document.addEventListener(`click`, (event) => {
	if (!(event.target === document.querySelector(`.aside`) || document.querySelector(`.aside`).contains(event.target))) {
		document.querySelector(`.aside`).classList.remove(`active-aside-menu`);
	}
});
// отображение карточки побережья при клике по точке на карте
document.querySelector(`.surf__slider-map`).addEventListener(`mousedown`, (e) => {
	if (e.target.classList.contains(`map-dot`)) {
		// скрытие активной карточки, для отображения только одной карточки
		document.querySelectorAll(`.map-dot`).forEach(key => {
			key.children[1].style.display = `none`;
			key.classList.remove(`map-dot--active`);
		});
		e.target.classList.add(`map-dot--active`);
		e.target.children[1].style.display = `flex`;
	}
});
// при определенном разрешении карта скрывается и создается фильтр мест для серфинга
// доступные фильтры: North America, South America, Africa, Europe, Asia, Australia
// при нажатии на один из фильтров отображаются только те места, которые относятся
// к этому региону, остальные скрываются
function hideSurfCards(card) {
	// выбранный регион
	const cardRegion = card.dataset.checkedPlace;
	// все карточки
	const allCards = document.querySelectorAll(`.map-dot`);
	// отображаем все карточки
	allCards.forEach(elem => {
		elem.style.display = `block`;
	});
	// если выбран регион и не фильтр 'ALL'(отображение всех карточек всех регионов)
	// остальные карточки скрываются и к региону применяется active-класс
	if (cardRegion !== `all`) {
		// удлаяем все карточки, которые не относятся к выбраному региону
		allCards.forEach(elem => {
			if (elem.dataset.continent !== cardRegion) {
				elem.style.display = `none`;
			}
		});
	}
	// задаем активный класс
	card.classList.add(`shuffle-active-button`);
};
// нажатие на один из регионов
document.querySelector(`.surf__shuffle-buttons`).addEventListener(`click`, event => {
	const shufflBtns = document.querySelectorAll(`.surf__shuffle-button`);
	// если нажата кнопка фильтра, перебирем все кнопки и удаляем класс shuffle-active-button
	// который отвечает за выделение активного региона цветом
	if (event.target.classList.contains(`surf__shuffle-button`)) {
		shufflBtns.forEach(elem => {
			elem.classList.remove(`shuffle-active-button`);
		});
		hideSurfCards(event.target);
	}
});

// количество выбранных ночей
function getNightsQuantity() {
	const nightsInfoBlock = document.querySelector(`.sleep__slider-wrapper > .swiper-slide-active > .sleep-slide__flight-info > .sleep-slide__flight-categories`);
	return nightsInfoBlock.children[1].children[1].children[0].dataset.hotelNightsCount;
};

// количество выбранных гостей
function getGuestsQuantity() {
	const guestsInfoBlock = document.querySelector(`.sleep__slider-wrapper > .swiper-slide-active > .sleep-slide__flight-info > .sleep-slide__flight-categories`);
	return guestsInfoBlock.children[2].children[1].children[0].dataset.hotelGuestsCount;
};

// рассчет итоговой стоимости проживания в отеле
function hotelFinalPrice(e) {
	// кол-во гостей
	const guestsQuantity = +getGuestsQuantity();
	// кол-во ночей
	const nightsQuantity = +getNightsQuantity();
	// требуемые пути для работы с DOM
	const path = e.path || (e.composedPath && e.composedPath());
	// стоимость отеля на одну ночь с одного человека
	const factor = +path[4].children[3].children[1].dataset.hotelPrice;
	const finalPrice = guestsQuantity * nightsQuantity * factor;
	// dataset с актуальной финальной стоимостью отеля
	path[4].children[3].children[1].dataset.hotelFinalPrice = finalPrice;
	// отображение финальной цены
	path[4].children[3].children[1].textContent = `$${finalPrice} USD`;
};

function nightRemove(e) {
	const path = e.path || (e.composedPath && e.composedPath());
	let defaultValue = +getNightsQuantity();
	if (defaultValue >= 2) {
		defaultValue -= 1;
		path[2].children[0].dataset.hotelNightsCount = defaultValue;
		path[2].children[0].textContent = (defaultValue !== 1) ? `${defaultValue} nights` : `${defaultValue} night`;
	}
};

function nightAdd(e) {
	const path = e.path || (e.composedPath && e.composedPath());
	let defaultValue = +getNightsQuantity();
	if (defaultValue <= 999) {
		defaultValue += 1;
		path[2].children[0].dataset.hotelNightsCount = defaultValue;
		path[2].children[0].textContent = `${defaultValue} nights`;
	}
};

function guestAdd(e) {
	const path = e.path || (e.composedPath && e.composedPath());
	let defaultValue = +getGuestsQuantity();
	if (defaultValue <= 999) {
		defaultValue += 1;
		path[2].children[0].dataset.hotelGuestsCount = defaultValue;
		path[2].children[0].textContent = `${defaultValue} quests`;
	}
};

function guestRemove(e) {
	const path = e.path || (e.composedPath && e.composedPath());
	let defaultValue = +getGuestsQuantity();
	if (defaultValue >= 2) {
		defaultValue -= 1;
		path[2].children[0].dataset.hotelGuestsCount = defaultValue;
		path[2].children[0].textContent = (defaultValue !== 1) ? `${defaultValue} quests` : `${defaultValue} quest`;
	}
};

// проверка к какой категории относится '+' и '-' и выполнение операции перерасчета финальной цены
document.querySelectorAll(`.sleep-slide__flight-categories`).forEach(hotel => {
	hotel.addEventListener(`click`, event => {
		if (event.target.matches(`.sleep-slide__calculator-nights-minus`)) {
			nightRemove(event);
			hotelFinalPrice(event);
		} else if (event.target.matches(`.sleep-slide__calculator-nights-plus`)) {
			nightAdd(event);
			hotelFinalPrice(event);
		} else if (event.target.matches(`.sleep-slide__calculator-guests-minus`)) {
			guestRemove(event);
			hotelFinalPrice(event);
		} else if (event.target.matches(`.sleep-slide__calculator-guests-plus`)) {
			guestAdd(event);
			hotelFinalPrice(event);
		}
	});
});

// отображение дополнительной информации о товаре
document.querySelectorAll(`.shop-slide__product-description-circle`).forEach(point => {
	point.addEventListener(`click`, event => {
		event.target.classList.toggle(`active-product-point`);
	});
});
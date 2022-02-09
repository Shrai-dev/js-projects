import translateInfo from './translate.js';

const burgerIcon = document.querySelector('.burger__menu');
const navigationMenu = document.querySelector('.header__nav-list');
const navigationItems = document.querySelectorAll('.header__nav-link');

const portfolioBtns = document.querySelector('.portfolio__wrapper-btn');
const portfolioBtn = document.querySelectorAll('.portfolio__btn');
const portfolioImages = document.querySelectorAll('.portfolio__items-image');
const seasons = ['winter', 'spring', 'summer', 'autumn'];

const langEn = document.querySelector('.lang-en');
const langRu = document.querySelector('.lang-ru');
const translateData = document.querySelectorAll('[data-i18n]');

const toggler = document.querySelector('.header__theme-btn');

let lang = 'en';

if (burgerIcon) {
  burgerIcon.addEventListener('click', () => {
    open();
  });
}

navigationItems.forEach((el) => el.addEventListener('click', close));

function open() {
  navigationMenu.classList.toggle('show');
  burgerIcon.classList.toggle('active');
}

function close() {
  if (navigationMenu.classList.contains('show')) {
    navigationMenu.classList.remove('show');
    burgerIcon.classList.remove('active');
  }
}

function changeImage(e) {
  if (e.target.classList.contains('portfolio__btn')) {
    portfolioImages.forEach(
      (img, index) =>
        (img.src = `./assets/images/${e.target.dataset.season}/${
          index + 1
        }.jpg`)
    );
  }
}

function changeClassActiveBtn(e) {
  portfolioBtn.forEach((el) => el.classList.remove('btn-active'));
  e.target.classList.add('btn-active');
}

portfolioBtns.addEventListener('click', changeImage);
portfolioBtns.addEventListener('click', changeClassActiveBtn);

function preloadSummerImages() {
  seasons.forEach((el) => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/images/${el}/${i}.jpg`;
    }
  });
}
preloadSummerImages();

function changeLanguageEn() {
  if (langRu.classList.contains('active')) {
    langRu.classList.remove('active');
    langEn.classList.add('active');
    lang = 'en';
  }
  getTranslate();
}

function changeLanguageRu() {
  if (langEn.classList.contains('active')) {
    langEn.classList.remove('active');
    langRu.classList.add('active');
    lang = 'ru';
  }
  getTranslate();
}

function getTranslate() {
  translateData.forEach(
    (el) => (el.innerText = translateInfo[lang][el.dataset.i18n])
  );
}

langEn.addEventListener('click', changeLanguageEn);
langRu.addEventListener('click', changeLanguageRu);

function changeTheme() {
  const theme = document.getElementById('theme');

  if (theme.getAttribute('href') === 'css/style-light.css') {
    theme.href = 'css/style-dark.css';
    toggler.innerHTML = `<svg class="header__theme-icon" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.4528 40C15.7066 40 10.315 37.8174 6.27098 33.8545C2.22701 29.8915 5.02421e-07 24.6074 5.02421e-07 18.9761C-0.00085731 15.0913 1.09674 11.2823 3.17098 7.97181C5.24521 4.66132 8.21494 1.97886 11.7505 0.222165C12.1143 0.0404498 12.5246 -0.032245 12.9302 0.0131555C13.3359 0.058556 13.7189 0.220041 14.0315 0.477451C14.344 0.734861 14.5723 1.07679 14.6878 1.46057C14.8033 1.84434 14.8009 2.25294 14.6809 2.63538C13.672 5.82896 13.5728 9.23201 14.3941 12.4768C15.2154 15.7216 16.9259 18.6847 19.3408 21.046C21.0739 22.757 23.136 24.1141 25.4078 25.0388C27.6796 25.9635 30.116 26.4374 32.576 26.433C34.4579 26.4345 36.3292 26.1578 38.1269 25.6125C38.5172 25.4948 38.9342 25.4924 39.3258 25.6056C39.7175 25.7188 40.0665 25.9425 40.3291 26.2488C40.5918 26.5552 40.7566 26.9306 40.8029 27.3282C40.8492 27.7257 40.775 28.1279 40.5895 28.4843C38.7969 31.9492 36.0597 34.8596 32.6817 36.8923C29.3036 38.9251 25.4169 40.0008 21.4528 40ZM11.6763 3.31431C8.93463 4.94908 6.66986 7.24958 5.10105 9.99327C3.53225 12.737 2.71252 15.831 2.72115 18.9761C2.72115 29.0982 11.1241 37.3333 21.4528 37.3333C24.6621 37.3417 27.8193 36.5384 30.619 35.001C33.4187 33.4636 35.7662 31.2441 37.4343 28.5573C35.8413 28.9186 34.2114 29.1007 32.5762 29.1C29.7587 29.1053 26.9682 28.5628 24.3661 27.5041C21.764 26.4453 19.4021 24.8913 17.417 22.9319C14.8382 20.4094 12.9578 17.2845 11.9533 13.8522C10.9489 10.4199 10.8536 6.79279 11.6763 3.31431Z" fill="white"/>
    </svg>`;
  } else {
    theme.href = 'css/style-light.css';
    toggler.innerHTML = `<svg class="header__theme-icon" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.8375 17.2125C23.95 17.2125 25.0376 17.5424 25.9626 18.1605C26.8876 18.7786 27.6086 19.6571 28.0343 20.6849C28.4601 21.7127 28.5715 22.8437 28.3544 23.9349C28.1374 25.026 27.6016 26.0283 26.815 26.815C26.0283 27.6016 25.026 28.1374 23.9349 28.3544C22.8437 28.5715 21.7127 28.4601 20.6849 28.0343C19.6571 27.6086 18.7786 26.8876 18.1605 25.9626C17.5424 25.0376 17.2125 23.95 17.2125 22.8375C17.2144 21.3462 17.8076 19.9166 18.8621 18.8621C19.9166 17.8076 21.3462 17.2144 22.8375 17.2125ZM22.8375 14.4C21.1687 14.4 19.5374 14.8949 18.1499 15.822C16.7623 16.7491 15.6809 18.0669 15.0423 19.6086C14.4037 21.1504 14.2366 22.8469 14.5621 24.4836C14.8877 26.1203 15.6913 27.6237 16.8713 28.8037C18.0513 29.9837 19.5547 30.7873 21.1914 31.1129C22.8281 31.4384 24.5246 31.2713 26.0664 30.6327C27.6081 29.9941 28.9259 28.9127 29.853 27.5251C30.7802 26.1376 31.275 24.5063 31.275 22.8375C31.275 20.5997 30.3861 18.4536 28.8037 16.8713C27.2214 15.2889 25.0753 14.4 22.8375 14.4Z"
      fill="white" />
    <path d="M7.58531 9.58078L9.57375 7.59094L14.5041 12.5213L12.5156 14.5097L7.58531 9.58078Z"
      fill="white" />
    <path d="M2.8125 21.1008H9.84375V23.9133H2.8125V21.1008Z" fill="white" />
    <path d="M7.58531 35.4333L12.5156 30.503L14.5041 32.4928L9.57375 37.4217L7.58531 35.4333Z"
      fill="white" />
    <path d="M21.0938 35.1633H23.9062V42.1945H21.0938V35.1633Z" fill="white" />
    <path d="M30.4973 32.4928L32.4858 30.503L37.4161 35.4333L35.4277 37.4217L30.4973 32.4928Z"
      fill="white" />
    <path d="M35.1562 21.1008H42.1875V23.9133H35.1562V21.1008Z" fill="white" />
    <path d="M30.4973 12.5213L35.4277 7.59094L37.4161 9.58078L32.4858 14.5097L30.4973 12.5213Z"
      fill="white" />
    <path d="M21.0938 2.81953H23.9062V9.85078H21.0938V2.81953Z" fill="white" />
  </svg>`;
  }
}

toggler.addEventListener('click', changeTheme);

console.log(`Оценка - 75 баллов`);

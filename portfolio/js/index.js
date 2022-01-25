const burgerIcon = document.querySelector('.burger__menu');
const navigationMenu = document.querySelector('.header__nav-list');
const navigationItems = document.querySelectorAll('.header__nav-link');

const portfolioBtns = document.querySelector('.portfolio__wrapper-btn');
const portfolioBtn = document.querySelectorAll('.portfolio__btn');
const portfolioImages = document.querySelectorAll('.portfolio__items-image');
const seasons = ['winter', 'spring', 'summer', 'autumn'];

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

console.log(`Оценка - 75 баллов`);

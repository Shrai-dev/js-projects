const burgerIcon = document.querySelector('.burger__menu');
const navigationMenu = document.querySelector('.header__nav-list');
const navigationItems = document.querySelectorAll('.header__nav-link');

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

console.log(`Оценка - 75 баллов`);

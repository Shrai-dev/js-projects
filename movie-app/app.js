const searchBar = document.getElementById('search-bar');
const mainContent = document.querySelector('.main-content');
const APIKey = '1522de262832f8a37e8d96e7ed928ba5';

const popular = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`;

async function getData() {
  const res = await fetch(popular);
  const data = await res.json();
  renderCards(data);
}

getData();

function renderCards(data) {
  mainContent.innerHTML = '';
  data.results.forEach((el, index) => {
    const container = document.createElement('div');
    container.classList.add('movie-container');
    container.innerHTML = `<img class='movie-img' src='https://image.tmdb.org/t/p/w1280${data.results[index]['poster_path']}' alt='movie poster'>
    <div class='movie-info'>
    <h3 class='movie-title'>${data.results[index]['title']}</h3>
    <p class='movie-rating'>${data.results[index]['vote_average']}</p>
    </div>
    <div class='movie-overview'>${data.results[index]['overview']}</div>`;
    mainContent.append(container);
  });
}

searchBar.addEventListener('input', (event) => {
  if (event.target.value !== '') {
    doSearch();
  } else {
    getData();
  }
});

async function doSearch() {
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${searchBar.value}&page=1`;
  const res = await fetch(searchUrl);
  const searchData = await res.json();
  mainContent.innerHTML = '';
  renderCards(searchData);
}

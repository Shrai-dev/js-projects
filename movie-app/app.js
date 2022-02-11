const mainContent = document.querySelector('.main-content');
const APIKey = '1522de262832f8a37e8d96e7ed928ba5';
const popular = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`;

async function getData() {
  const res = await fetch(popular);
  const data = await res.json();
  console.log(data);
  console.log(data.results[0]['backdrop_path']);
  renderCards(data);
}

getData();

function renderCards(data) {
  data.results.forEach((el, index) => {
    const container = document.createElement('div');
    container.classList.add('movie-container');
    container.innerHTML = `<img class='movie-img' src='https://image.tmdb.org/t/p/w1280${data.results[index]['poster_path']}' alt='movie poster'>
    <div class='movie-info'>
    <h3 class='movie-title'>${data.results[index]['title']}</h3>
    <p class='movie-rating'>${data.results[index]['vote_average']}</p>
    </div>`;
    mainContent.append(container);
  });
}

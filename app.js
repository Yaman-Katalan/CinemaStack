const menu = document.getElementById("menu");
const side_bar = document.getElementById("side-bar");
let check = false;

// console.log(menu);
// console.log(side_bar);

menu.onclick = () => {
  side_bar.classList.add("appear");
  setTimeout(() => {
    check = true;
  }, 300);
};

addEventListener("click", () => {
  if (check) {
    if (!side_bar.contains(event.target)) {
      side_bar.classList.remove("appear");
      check = false;
    }
  }
});

// Start Handle Pop Side List
const popSideList = document.querySelectorAll("ul.pop li");
console.log(popSideList);

popSideList.forEach((li) => {
  li.onclick = () => {
    //
    popSideList.forEach((li) => {
      li.classList.remove("active");
    });
    //
    li.classList.add("active");
  };
});

// End Handle Pop Side List

// Start Section (1)

//
const movies_container = document.querySelector(".movie-sec");
console.log(movies_container);

//

fetch("./data.json")
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    // console.log(data.results);
    loopThrough(data.results);
  })
  .then(() => {
    handleMovieDetails();
  });

// ------

// ------

function loopThrough(data) {
  data.forEach((data_ele) => {
    const movie = createMovie(data_ele);
    const movie_detail = createMovieDetail(data_ele);
    movie.appendChild(movie_detail);
    movies_container.appendChild(movie);
  });
}

function createMovie(movieData) {
  const movie = document.createElement("div");
  movie.classList.add("movie");
  //
  const img = document.createElement("img");
  img.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w1280${movieData.poster_path}`
  );
  //
  const h2 = document.createElement("h2");
  h2.textContent = movieData.title;
  //
  const span = document.createElement("span");
  span.textContent = movieData.vote_average.toFixed(1);
  //
  h2.appendChild(span);
  movie.appendChild(img);
  movie.appendChild(h2);
  //
  return movie;
}

function createMovieDetail(movieData) {
  const movieDetail = document.createElement("div");
  movieDetail.classList.add("movie-details");
  //
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  const span3 = document.createElement("span");
  const span4 = document.createElement("span");
  //
  span1.textContent = `ID: ${movieData.id}`;
  span2.textContent = `Type: ${movieData.media_type}`;
  span3.textContent = `Adult: ${movieData.adult}`;
  span4.textContent = `Rating: ${movieData.vote_average}`;
  //
  movieDetail.append(span1);
  movieDetail.append(span2);
  movieDetail.append(span3);
  movieDetail.append(span4);
  //
  return movieDetail;
}

function handleMovieDetails() {
  const allMovies = document.querySelectorAll(".movie");
  const allDetails = document.querySelectorAll(".movie-details");
  // console.log(allDetails);

  allMovies.forEach((movie, index) => {
    // console.log(movie);
    movie.addEventListener("mouseover", () => {
      allDetails[index].classList.add("active");
    });

    movie.addEventListener("mouseout", () => {
      allDetails[index].classList.remove("active");
    });
  });
}

// End Section (1)

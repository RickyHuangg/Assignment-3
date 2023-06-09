import { TMDB_API_KEY } from "./key.js";

const movies = document.getElementById("movies");

const getTMDBData = async (url) => {
  return (await axios.get(url)).data;
};

const createMovieTile = (
  id,
  poster,
  title,
  date,
  description,
  revenue,
  popular,
  runtime,
  tagline,
  voterating,
  backdrop
) => {
  const tile = document.createElement("div");
  const details = document.createElement("div");
  const img = document.createElement("img");
  const h1 = document.createElement("h1");
  const h3 = document.createElement("h3");
  const h4 = document.createElement("h4");
  const rev = document.createElement("h5");
  const pop = document.createElement("h5");
  const run = document.createElement("h5");
  const tag = document.createElement("h5");
  const vote = document.createElement("h5");
  const trailerButton = document.createElement("button");
  document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${backdrop})`;

  tile.classList.add("tile");
  img.src = `https://image.tmdb.org/t/p/original/${poster}`;
  h1.innerText = title;
  h3.innerText = date;
  h4.innerText = description;
  rev.innerHTML = `Revenue: $${revenue}`;
  pop.innerHTML = `Popularity: ${popular}`;
  run.innerHTML = `Runtime: ${runtime} mins`;
  tag.innerHTML = `Tagline: ${tagline}`;
  vote.innerHTML = `Rating: ${voterating}`;
  trailerButton.innerText = "Trailer";

  trailerButton.addEventListener("click", async () => {
    const trailersData = await getTMDBData(
      `https://api.themoviedb.org/3//movie/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US&adult=false`
    );

    const trailer = trailersData.results.filter((trailer) => {
      return trailer.type === "Trailer";
    });

    !trailer.length
      ? alert("Sorry! No trailers for this film.")
      : window.open(`https://www.youtube.com/watch?v=${trailer.at(0).key}`);
  });

  details.append(h1);
  details.append(h3);
  details.append(h4);
  details.append(rev);
  details.append(pop);
  details.append(run);
  details.append(tag);
  details.append(vote);

  tile.append(img);
  tile.append(details);
  tile.append(trailerButton);

  return tile;
};

function clearDiv(id) {
  let checkEmpty = document.getElementById(id).innerHTML === "";
  if (checkEmpty) {
    return;
  } else {
    document.getElementById(id).innerHTML = "";
  }
}

async function getData(id) {
  let movie = await getTMDBData(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&adult=false`
  );

  let backdropPath = await getTMDBData(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&adult=false`
  );
  console.log(backdropPath.backdrop_path);
  console.log(backdropPath);
  const tile = createMovieTile(
    movie.id,
    movie.poster_path,
    movie.title,
    movie.release_date,
    movie.overview,
    movie.revenue,
    movie.popularity,
    movie.runtime,
    movie.tagline,
    movie.vote_average,
    movie.backdrop_path
  );
  movies.appendChild(tile);
}

document.getElementById("get1").addEventListener("click", (e) => {
  clearDiv("movies");
  let movieId = document.getElementById("options").value;

  getData(movieId);
});

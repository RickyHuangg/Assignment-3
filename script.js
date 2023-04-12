import { TMDB_API_KEY } from "./key.js";

const cartContents = new Set();

const getTMDBData = async (url) => {
  return (await axios.get(url)).data;
};

const createMovieTile = (id, poster, title, date, description) => {
  const tile = document.createElement("div");
  const details = document.createElement("div");
  const img = document.createElement("img");
  const h1 = document.createElement("h1");
  const h3 = document.createElement("h3");
  const h4 = document.createElement("h4");
  const buyButton = document.createElement("button");
  const trailerButton = document.createElement("button");

  tile.classList.add("tile");
  img.src = `https://image.tmdb.org/t/p/original/${poster}`;
  h1.innerText = title;
  h3.innerText = date;
  h4.innerText = description;
  buyButton.innerText = "Buy";
  trailerButton.innerText = "Trailer";

  buyButton.addEventListener("click", () => {
    cartContents.add(id);
    const cart = document.getElementById("cart");
    cart.innerHTML = `Your cart contains ${cartContents.size} movies`;
  });

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

  tile.append(img);
  tile.append(details);
  tile.append(buyButton);
  tile.append(trailerButton);

  return tile;
};

function clearDiv(id) {
  let isEmpty = document.getElementById(id).innerHTML === "";
  if (isEmpty) {
    return;
  } else {
    document.getElementById(id).innerHTML = "";
  }
}

async function getData(id) {
  let movie = await getTMDBData(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&adult=false`
  );
  const tile = createMovieTile(
    movie.id,
    movie.poster_path,
    movie.title,
    movie.release_date,
    movie.overview
  );
  movies.appendChild(tile);
}

document.getElementById("get1").addEventListener("click", (e) => {
  clearDiv("movies");
  console.log(document.getElementById("options").value);
  let movieId = document.getElementById("options").value;
  getData(movieId);
});

const movies = document.getElementById("movies");

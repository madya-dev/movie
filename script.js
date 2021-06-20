const apiKey = "97be4f2";
const url = "https://www.omdbapi.com/";
const searchInput = document.getElementById("keyword");
const searchBtn = document.getElementById("keywordBtn");

searchBtn.addEventListener("click", () => {
  let keyword = searchInput.value;
  const apiSearch = `${url}?s=${keyword}&apikey=${apiKey}`;

  fetch(apiSearch)
    .then((response) => response.json())
    .then((response) => {
      let movies = response.Search;
      movieUI(movies);
    });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-detail")) {
    let id = e.target.dataset.id;
    const apiDetail = `${url}?i=${id}&apikey=${apiKey}`;
    fetch(apiDetail)
      .then((response) => response.json())
      .then((m) => {
        modalUI(m);
      });
  }
});

function movieUI(movies) {
  let movieContainer = document.getElementById("movie-container");
  let movieContent = `<h2 class="text-center mt-5 mb-5">"${
    keyword == "" ? "Movie" : keyword
  }" not found!!</h1>`;
  if (movies !== undefined) {
    movieContent = "";
    movies.forEach((m) => {
      movieContent += `<div class="col-md-4 my-2 h-100">
                              <div class="card">
                                <div class="card-body text-center h-100" >
                                  <img src="${m.Poster}" class="card-image mb-3">
                                  <h5 class="card-title mb-3">${m.Title} (${m.Year})</h5>
                                  <h6 class="card-subtitle mb-3 text-muted">${m.Type}</h6>
                                  <button class="btn btn-primary w-100 btn-detail" data-id="${m.imdbID}" data-bs-toggle="modal" data-bs-target="#modalDetail" id="btn-detail">Detail</button>
                                </div>
                              </div>
                            </div>`;
    });
  }
  movieContainer.innerHTML = movieContent;
}

let modalUI = (m) => {
  let modalDetail = document.getElementById("modalDetail");
  modalContent = `
          <div class="modal-dialog modal-xl">
            <div class="modal-content ">
              <div class="modal-header">
                <h5 class="modal-title" id="modalDetailLabel">${m.Title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6 text-center">
                    <img src='${m.Poster}' style="width:80%">
                  </div>
                  <div class="col-md-6">
                    <h2 class="card-title">${m.Title}</h2>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Type}</h6>
                    <p class="card-text">Language : ${m.Language}</p>
                    <p class="card-text">Rating : ${m.imdbRating}</p>
                    <p class="card-text">Released : ${m.Released}</p>
                    <p class="card-text">Year : ${m.Year}</p>
                    <p class="card-text">Runtime : ${m.Runtime}</p>
                    <p class="card-text">Genre : ${m.Genre}</p>
                    <p class="card-text">Director : ${m.Director}</p>
                    <p class="card-text">Writer : ${m.Writer}</p>
                    <p class="card-text">Actors : ${m.Actors}</p>
                    <p class="card-text">Plot : ${m.Plot}</p>
                    <p class="card-text">Actors : ${m.Awards}</p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>`;
  modalDetail.innerHTML = modalContent;
};

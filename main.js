import { getGenres, searchPlaylistsByGenre } from "./src/api/apiController.js";
import {
  addGenre,
  getGenresState,
  getPlaylistsState,
  addPlaylist,
} from "./src/stateVariables.js";
import { showPlaylists, showGenres } from "./src/utils/domUtils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const pageTitle = document.getElementById("page-title");
  const genresBody = document.getElementById("genresBody");
  const playlistsBody = document.getElementById("playlistsBody");
  const checkBoxInput = document.querySelector("#showPlaylist");
  const searchBody = document.querySelector("#searchBody");
  const searchBtn = document.querySelector("#searchBtn");
  const resetBtn = document.querySelector("#resetBtn");

  let topGenresLoaded = false;
  let scrollPosition = 0; // To remember the scroll position
  const numGenresToLoad = 5;
  let nextGenresIndex = numGenresToLoad;

  const loadPlaylistsForGenres = async (genres) => {
    await Promise.all(
      genres.map(async (genre) => {
        const playlists = await searchPlaylistsByGenre(genre);
        addPlaylist({ genre, playlists });
      })
    );
    // Show playlists after adding them
    if (checkBoxInput.checked) showPlaylists(playlistsBody, pageTitle);
    // Restore scroll position
    window.scrollTo(0, scrollPosition);
  };

  const loadNextGenresPlaylists = async () => {
    if (checkBoxInput.checked) {
      const genres = getGenresState();
      const nextGenres = genres.slice(
        nextGenresIndex,
        nextGenresIndex + numGenresToLoad
      );
      await loadPlaylistsForGenres(nextGenres);
      nextGenresIndex += numGenresToLoad;
      // If all genres are loaded, do not remove the scroll listener
      if (nextGenresIndex >= genres.length) {
        topGenresLoaded = true;
      }
    }
  };

  const scrollHandler = async () => {
    if (checkBoxInput.checked) {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !topGenresLoaded) {
        await loadNextGenresPlaylists();
      }
    }
  };

  const updateGenresAndPlaylists = async () => {
    const genres = await getGenres();
    genres.forEach(addGenre);
    const topGenres = genres.slice(0, numGenresToLoad);
    await loadPlaylistsForGenres(topGenres);
    // Remember scroll position after initial load
    scrollPosition = window.scrollY;
  };

  const showFilteredGenres = (query) => {
    genresBody.innerHTML = "";
    showGenres(genresBody, pageTitle, true, query);
  };

  const resetPage = () => {
    searchBody.style.display = "none";
    genresBody.innerHTML = "";
    playlistsBody.innerHTML = "";
    checkBoxInput.checked = false;
    showGenres(genresBody, pageTitle);
  };

  checkBoxInput.addEventListener("change", () => {
    if (checkBoxInput.checked) {
      genresBody.innerHTML = "";
      searchBody.style.display = "none";
      showPlaylists(playlistsBody, pageTitle);
    } else {
      resetPage();
    }
  });

  searchBtn.addEventListener("click", () => {
    let timer;
    playlistsBody.innerHTML = "";
    searchBody.style.display = "block";
    showGenres(genresBody, pageTitle, true);

    const searchInput = document.querySelector("#searchInput");
    searchInput.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(
        () => showFilteredGenres(searchInput.value.toLowerCase()),
        500
      );
    });
  });

  resetBtn.addEventListener("click", resetPage);

  await updateGenresAndPlaylists();
  showGenres(genresBody, pageTitle);
  window.addEventListener("scroll", scrollHandler);
});

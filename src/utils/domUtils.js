import { getPlaylistsState, getGenresState } from "../stateVariables.js";
import {
  createPlaylistCard,
  createGenreCard,
  createTrackCard,
} from "../components/cards.js";
import { createMessage } from "../components/messages.js";

export const showPlaylists = (bodyContainer, pageTitle) => {
  pageTitle.textContent = "All Playlists";
  const playlists = getPlaylistsState();

  console.log(playlists);

  playlists.forEach((playlist) => {
    const playListContainer = document.createElement("div");
    const genreHeader = document.createElement("h2");
    genreHeader.textContent = playlist.genre;
    genreHeader.classList.add(
      "text-2xl",
      "font-bold",
      "my-4",
      "text-white",
      "capitalize"
    );
    playListContainer.appendChild(genreHeader);

    const playlistsCards = document.createElement("div");
    playlistsCards.classList.add(
      "grid",
      "grid-cols-2",
      "sm:grid-cols-3",
      "md:grid-cols-4",
      "lg:grid-cols-4",
      "gap-4"
    );

    const { playlists } = playlist;

    playlists.forEach((playlist) => {
      const playlistElement = createPlaylistCard(
        playlist,
        bodyContainer,
        pageTitle
      );
      playlistsCards.appendChild(playlistElement);
    });
    playListContainer.appendChild(playlistsCards);
    bodyContainer.appendChild(playListContainer);
  });
};

export const showGenres = (
  bodyContainer,
  pageTitle,
  search = false,
  userInput = "all"
) => {
  pageTitle.textContent = search ? "Search" : "All Genres";

  const genres = getGenresState();

  if (userInput == "all") {
    genres?.forEach((genre) => {
      const genreElement = createGenreCard(genre);
      bodyContainer.appendChild(genreElement);
    });
  } else {
    const filteredGenre = genres.filter((genre) =>
      genre.toLowerCase().includes(userInput.toLowerCase())
    );
    filteredGenre.forEach((genre) => {
      const genreElement = createGenreCard(genre);
      bodyContainer.appendChild(genreElement);
    });
  }
};

export const showTracks = (
  bodyContainer,
  pageTitle,
  playlistName,
  tracksPromise
) => {
  bodyContainer.innerHTML = "";

  tracksPromise.then((tracks) => {
    if (!tracks || !tracks.length) {
      createMessage(bodyContainer, "No tracks found");
      return;
    }

    pageTitle.textContent = playlistName;

    tracks.forEach((track) => {
      const trackElement = createTrackCard(track);
      bodyContainer.appendChild(trackElement);
    });
  });
};

import { getTracks } from "../api/apiController.js";
import { showTracks } from "../utils/domUtils.js";

export const createPlaylistCard = (playlist, bodyContainer, pageTitle) => {
  const card = document.createElement("div");
  card.classList.add(
    "max-w-xs",
    "rounded",
    "overflow-hidden",
    "shadow-lg",
    "bg-white",
    "cursor-pointer"
  );

  const image = document.createElement("img");
  image.classList.add("w-full");
  image.src = playlist.images[0].url;
  image.alt = "Playlist Image";
  card.appendChild(image);

  const details = document.createElement("div");
  details.classList.add("px-6", "py-4");

  const title = document.createElement("div");
  title.classList.add("font-bold", "text-xl", "mb-2");
  title.textContent = playlist.name;
  details.appendChild(title);

  card.appendChild(details);

  const action = document.createElement("div");
  action.classList.add(
    "px-6",
    "py-4",
    "flex",
    "justify-between",
    "items-center"
  );

  const tag = document.createElement("span");
  tag.classList.add(
    "inline-block",
    "bg-gray-200",
    "rounded-full",
    "px-3",
    "py-1",
    "text-sm",
    "font-semibold",
    "text-gray-700",
    "mr-2"
  );
  tag.textContent = "#Playlist";
  action.appendChild(tag);

  const spotifyLink = document.createElement("a");
  spotifyLink.href = playlist.external_urls.spotify;
  spotifyLink.classList.add(
    "inline-block",
    "bg-blue-500",
    "rounded-full",
    "px-3",
    "py-1",
    "text-sm",
    "font-semibold",
    "text-white",
    "hover:bg-blue-700"
  );
  spotifyLink.textContent = "On Spotify";
  action.appendChild(spotifyLink);

  card.appendChild(action);

  card.addEventListener("click", () => {
    showTracks(
      bodyContainer,
      pageTitle,
      playlist.name,
      getTracks(playlist.tracks.href)
    );
  });

  return card;
};

export const createTrackCard = ({ track }) => {
  const card = document.createElement("div");
  card.classList.add(
    "w-full",
    "rounded",
    "overflow-hidden",
    "shadow-lg",
    "bg-white",
    "mb-4",
    "flex",
    "flex-row",
    "items-center"
  );

  // Track image container
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("flex", "justify-center", "items-center");
  const image = document.createElement("img");
  image.classList.add("w-40", "h-40", "object-cover");
  // Check if track.album.images exists before accessing its properties
  image.src = track.album.images ? track.album.images[0].url : "";
  image.alt = "Track Image";
  imageContainer.appendChild(image);
  card.appendChild(imageContainer);

  const container = document.createElement("div");
  container.classList.add("flex", "justify-between", "w-full");

  // Track details container
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add(
    "flex",
    "flex-col",
    "justify-between",
    "p-4",
    "w-3/6",
    "ml-4"
  );

  const title = document.createElement("div");
  title.classList.add("font-bold", "text-xl", "mb-2");
  title.textContent = track.name;
  detailsContainer.appendChild(title);

  const artists = document.createElement("p");
  artists.classList.add("text-gray-700", "text-base", "mb-2");
  const artistNames = track.artists.map((artist) => artist.name).join(", ");
  artists.textContent = `Artists: ${artistNames}`;
  detailsContainer.appendChild(artists);

  const album = document.createElement("p");
  album.classList.add("text-gray-700", "text-base", "mb-2");
  album.textContent = `Album: ${track.album.name}`;
  detailsContainer.appendChild(album);

  const duration = document.createElement("p");
  duration.classList.add("text-gray-700", "text-base");
  const durationMinutes = Math.floor(track.duration_ms / 60000);
  const durationSeconds = Math.round((track.duration_ms % 60000) / 1000);
  duration.textContent = `Duration: ${durationMinutes}:${
    durationSeconds < 10 ? "0" : ""
  }${durationSeconds}`;
  detailsContainer.appendChild(duration);

  container.appendChild(detailsContainer);

  // Play button container
  const playContainer = document.createElement("div");
  playContainer.classList.add(
    "w-1/6",
    "flex",
    "justify-center",
    "items-center"
  );
  const playLink = document.createElement("a");
  playLink.href = track.external_urls.spotify;
  playLink.target = "_blank";
  playLink.rel = "noopener noreferrer";
  playLink.classList.add(
    "inline-block",
    "bg-blue-500",
    "rounded-full",
    "p-4",
    "text-white",
    "hover:bg-blue-700",
    "transition",
    "duration-300",
    "ease-in-out",
    "transform",
    "hover:scale-110"
  );
  const playIcon = document.createElement("i");
  playIcon.classList.add("fas", "fa-play");
  playLink.appendChild(playIcon);
  playContainer.appendChild(playLink);
  container.appendChild(playContainer);

  card.appendChild(container);

  return card;
};

export const createGenreCard = (genre) => {
  const genreElement = document.createElement("div");
  genreElement.classList.add(
    "p-10",
    "bg-white",
    "rounded-lg",
    "shadow",
    "text-center",
    "hover:shadow-lg",
    "cursor-pointer",
    "transition",
    "duration-300",
    "ease-in-out",
    "transform",
    "hover:scale-105"
  );
  genreElement.textContent = genre;
  return genreElement;
};

const genres = [];
const playlists = [];

const addGenre = (genre) => {
  genres.push(genre);
  localStorage.setItem("genres", JSON.stringify(genres));
};

const addPlaylist = (playlist) => {
  playlists.push(playlist);
  localStorage.setItem("playlists", JSON.stringify(playlists));
};

const getGenresState = () => {
  const storedGenres = localStorage.getItem("genres");
  return storedGenres ? JSON.parse(storedGenres) : [];
};

const getPlaylistsState = () => {
  const storedPlaylists = localStorage.getItem("playlists");
  return storedPlaylists ? JSON.parse(storedPlaylists) : [];
};

export { addGenre, addPlaylist, getGenresState, getPlaylistsState };

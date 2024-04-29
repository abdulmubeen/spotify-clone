// Import the necessary function from the spotifyService module
import { fetchFromSpotify } from "./spotifyService.js";

// Define an asynchronous function to fetch available genre seeds from Spotify
export const getGenres = async () => {
  // Use the fetchFromSpotify function to make a request to the Spotify API
  const data = await fetchFromSpotify(
    "https://api.spotify.com/v1/recommendations/available-genre-seeds"
  );
  // Return the genres array from the response data
  return data.genres;
};

// Define an asynchronous function to search for playlists by genre
export const searchPlaylistsByGenre = async (genre) => {
  // Construct the URL for the Spotify API request, including the genre as a query parameter
  let url = `https://api.spotify.com/v1/search?q=${genre}&type=playlist&limit=10`;
  // Use the fetchFromSpotify function to make a request to the Spotify API
  const data = await fetchFromSpotify(url);
  // Return the items array from the playlists object in the response data
  return data.playlists.items;
};

// Define an asynchronous function to fetch tracks from a URL
export const getTracks = async (url) => {
  // Use the fetchFromSpotify function to make a request to the Spotify API
  const data = await fetchFromSpotify(url);
  // Return the items array from the response data
  return data.items;
};

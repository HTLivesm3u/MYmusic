// Song playlist data
const playlist = [
  {
    title: "Song Title 1",
    artist: "Artist Name 1",
    src: "song1.mp3",
    cover: "cover1.jpg",
  },
  {
    title: "Song Title 2",
    artist: "Artist Name 2",
    src: "song2.mp3",
    cover: "cover2.jpg",
  },
  {
    title: "Song Title 3",
    artist: "Artist Name 3",
    src: "song3.mp3",
    cover: "cover3.jpg",
  },
];

// Elements
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");
const coverImage = document.getElementById("cover-image");
const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const suggestionsList = document.getElementById("suggestions-list");

let currentSongIndex = 0; // Start with the first song
let isPlaying = false;

// Load a song into the player
function loadSong(song) {
  audio.src = song.src;
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  coverImage.src = song.cover;
  updateMediaSession(song); // Update lock screen metadata
}

// Play or pause the song
playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = "▶️"; // Change to play icon
  } else {
    audio.play();
    playPauseBtn.textContent = "⏸️"; // Change to pause icon
  }
  isPlaying = !isPlaying;
});

// Play the next song manually
nextBtn.addEventListener("click", () => {
  playNextSong();
});

// Play the previous song
prevBtn.addEventListener("click", () => {
  currentSongIndex =
    (currentSongIndex - 1 + playlist.length) % playlist.length; // Loop to the last song
  loadSong(playlist[currentSongIndex]);
  if (isPlaying) {
    audio.play(); // Automatically play the previous song if already playing
  }
});

// Automatically play the next song when the current one ends
audio.addEventListener("ended", () => {
  playNextSong();
});

// Play the next song function
function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length; // Loop back to the first song
  loadSong(playlist[currentSongIndex]);
  if (isPlaying) {
    audio.play(); // Automatically play the next song if already playing
  } else {
    playPauseBtn.textContent = "▶️"; // Ensure play icon is updated
  }
}

// Search for a song and show suggestions
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase().trim();
  suggestionsList.innerHTML = ""; // Clear previous suggestions

  if (query) {
    // Find matching songs
    const matches = playlist.filter(
      (song) =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query)
    );

    // Display suggestions
    matches.forEach((song) => {
      const suggestionItem = document.createElement("li");
      suggestionItem.textContent = `${song.title} - ${song.artist}`;
      suggestionItem.addEventListener("click", () => {
        // Load the selected song
        const index = playlist.findIndex(
          (s) => s.title === song.title && s.artist === song.artist
        );
        currentSongIndex = index;
        loadSong(song);
        if (isPlaying) {
          audio.play(); // Play immediately if already playing
        }
        searchBar.value = ""; // Clear search bar
        suggestionsList.innerHTML = ""; // Clear suggestions
      });
      suggestionsList.appendChild(suggestionItem);
    });
  }
});

// Search Button Click
searchBtn.addEventListener("click", () => {
  const query = searchBar.value.toLowerCase().trim();
  if (!query) return;

  const songIndex = playlist.findIndex(
    (song) =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
  );

  if (songIndex !== -1) {
    currentSongIndex = songIndex;
    loadSong(playlist[currentSongIndex]);
    if (isPlaying) {
      audio.play();
    }
  } else {
    alert("No matching song found!");
  }

  searchBar.value = ""; // Clear search bar
  suggestionsList.innerHTML = ""; // Clear suggestions
});

// Load the first song on page load
loadSong(playlist[currentSongIndex]);

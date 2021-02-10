// first way
// const searchSongs = () => {
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`;
//     fetch(url)
//         .then(response => response.json())
//         .then(data => displaySongs(data.data));
// }

// async way
const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    const response = await fetch(url);
    const data = await response.json();
    displaySongs(data.data);
}

const displaySongs = (songs) => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.classList = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songContainer.appendChild(songDiv);
    });
};
// normal way
// const getLyric = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
//     fetch(url)
//         .then(response => response.json())
//         .then(data => displayLyrics(data.lyrics));
// };

// async way
const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    const response = await fetch(url);
    const data = await response.json();
    displayLyrics(data.lyrics);
};

const displayLyrics = (lyrics) => {
    const lyricsContainer = document.getElementById('lyrics-container');
    lyricsContainer.innerText = lyrics;
}

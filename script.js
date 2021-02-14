// first way
// const searchSongs = () => {
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`;
//     fetch(url)
//         .then(response => response.json())
//         .then(data => displaySongs(data.data))
//         .catch(error => displayError('Something went wrong. Please Try Again'));
// }

// async way
const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    displaySpinner(true);
    try {
        const response = await fetch(url);
        const data = await response.json();
        displaySongs(data.data);
    }
    catch (error) {
        displayError('Something went wrong. Please Try Again')
    }
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
        displaySpinner(false);
    });
};
// normal way
// const getLyric = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
//     fetch(url)
//         .then(response => response.json())
//         .then(data => displayLyrics(data.lyrics))
//         .catch(error => displayError('Something went wrong. Please Try Again'));
// };

// async way
const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    displaySpinner(true);
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        displayError('Sorry! I failed to load Lyrics, Please Try Again');
    }
};

const displayLyrics = (lyrics) => {
    const lyricsContainer = document.getElementById('lyrics-container');
    lyricsContainer.innerText = lyrics;
    displaySpinner(false);
}
const displayError = (error) => {
    const errorTag = document.getElementById('error');
    errorTag.innerText = error;
}
// loading spinner function
// (1)
// const displaySpinner = (show) => {
//     const loadingSpinner = document.getElementById('loading-spinner');
//     if (show) {
//         loadingSpinner.classList.remove('d-none');
//     }
//     else {
//         loadingSpinner.classList.add('d-none');
//     }
// }

// (2)
const displaySpinner = (show) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    const songContainer = document.getElementById('song-container');
    loadingSpinner.classList.toggle('d-none');
    songContainer.classList.toggle('d-none');
}

// search box enter keypress
document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        document.getElementById('search-button').click();
    }
})
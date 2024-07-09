document.addEventListener('DOMContentLoaded', ()=> {
    loadDarkMode();
});

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Mensagem enviada com sucesso!');
});
// Função para obter uma piada sobre Chuck Norris da API
function getChuckNorrisJoke() {
    // Endpoint da API de piadas do Chuck Norris
    const apiUrl = 'https://api.chucknorris.io/jokes/random';

    // Realiza a requisição HTTP
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const joke = data.value; // Obtém a piada do campo 'value' do objeto retornado
            displayJoke(joke); // Chama a função para exibir a piada na página
        })
        .catch(error => console.error('Erro ao obter piada:', error));
}

// Função para exibir a piada na página
function displayJoke(joke) {
    const jokeContainer = document.getElementById('joke-container');
    jokeContainer.innerHTML = `<p>${joke}</p>`;
}

// Função para obter músicas aleatórias de um cantor no Spotify
function getRandomArtistSongs() {
    const artistName = document.getElementById('artist-input').value;
    const apiUrl = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`;

    fetch(apiUrl, {
        headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Substitua YOUR_ACCESS_TOKEN pelo seu token de acesso do Spotify
        }
    })
        .then(response => response.json())
        .then(data => {
            const artistId = data.artists.items[0].id; // Obtém o ID do primeiro artista retornado
            return fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=BR`);
        })
        .then(response => response.json())
        .then(data => {
            const tracks = data.tracks.slice(0, 5); // Obtém as primeiras 5 músicas
            displaySongs(tracks); // Chama a função para exibir as músicas na página
        })
        .catch(error => console.error('Erro ao buscar músicas:', error));
}

// Função para exibir as músicas na página
function displaySongs(tracks) {
    const songsContainer = document.getElementById('songs-container');
    songsContainer.innerHTML = '';

    if (tracks.length === 0) {
        songsContainer.innerHTML = '<p>Nenhuma música encontrada para este cantor.</p>';
        return;
    }

    const ul = document.createElement('ul');
    tracks.forEach(track => {
        const li = document.createElement('li');
        li.textContent = `${track.name} - ${track.artists[0].name}`;
        ul.appendChild(li);
    });

    songsContainer.appendChild(ul);
}

// Função para alternar entre Dark Mode e Light Mode
function toggleDarkMode() {
    const isChecked = document.getElementById('dark-mode-toggle').checked;

    document.body.classList.toggle('dark-mode', isChecked);
    document.querySelector('header').classList.toggle('dark-mode', isChecked);
    document.querySelector('footer').classList.toggle('dark-mode', isChecked);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.toggle('dark-mode', isChecked));

    const experiencia = document.querySelectorAll('.experiencia');
    experiencia.forEach(experiencia => experiencia.classList.toggle('dark-mode', isChecked));

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.classList.toggle('dark-mode', isChecked));

    localStorage.setItem('darkMode', isChecked);
}

function loadDarkMode() {
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode'));

    if (isDarkMode) {
        document.getElementById('dark-mode-toggle').checked = true;

        document.body.classList.add('dark-mode');
        document.querySelector('header').classList.add('dark-mode');
        document.querySelector('footer').classList.add('dark-mode');

        const sections = document.querySelectorAll('section');
        sections.forEach(section => section.classList.add('dark-mode'));

        const experiencia = document.querySelectorAll('.experiencia');
        experiencia.forEach(experiencia => experiencia.classList.add('dark-mode'));

        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => button.classList.add('dark-mode'));
    }
}



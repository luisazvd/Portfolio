document.addEventListener('DOMContentLoaded', ()=> {
    loadDarkMode();
    loadTasks();
    loadGrades();
});

const apiKey = '87bb53ca391277908ce975d92d8da13b';

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

function copiarDado(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand('copy');
    alert(`Copiado: ${element.value}`);
}

function calculateIMC() {
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    if (weight && height) {
        const imc = (weight / (height * height)).toFixed(2);
        document.getElementById('imc-result').textContent = `Seu IMC é ${imc}`;
    } else {
        document.getElementById('imc-result').textContent = 'Valores inválidos!';
    }
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const ul = document.getElementById('tasks');
    ul.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(index));

        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.completed) {
            span.classList.add('completed');
        }

        li.appendChild(checkbox);
        li.appendChild(span);
        ul.appendChild(li);
    });
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskText = document.getElementById('new-task').value;
    if (taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);
        document.getElementById('new-task').value = '';
        loadTasks();
    }
}


function toggleTaskCompletion(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    loadTasks();
}

function loadGrades() {
    const grades = JSON.parse(localStorage.getItem('grades')) || [];
    const ul = document.getElementById('grades');
    ul.innerHTML = '';
    grades.forEach((grade, index) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = `Disciplina: ${grade.discipline}, Conceito: ${grade.grade}`;

        const select = document.createElement('select');
        ['A', 'B', 'C', 'D'].forEach(optionValue => {
            const option = document.createElement('option');
            option.value = optionValue;
            option.textContent = optionValue;
            if (grade.grade === optionValue) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        select.addEventListener('change', () => updateGrade(index, select.value));

        li.appendChild(span);
        li.appendChild(select);
        ul.appendChild(li);
    });
}

function saveGrades(grades) {
    localStorage.setItem('grades', JSON.stringify(grades));
}

function addGrade() {
    const disciplineName = document.getElementById('discipline-name').value;
    const gradeValue = document.getElementById('grade-value').value;
    if (disciplineName && gradeValue) {
        const grades = JSON.parse(localStorage.getItem('grades')) || [];
        grades.push({ discipline: disciplineName, grade: gradeValue });
        saveGrades(grades);
        document.getElementById('discipline-name').value = '';
        document.getElementById('grade-value').value = 'A';
        loadGrades();
    }
}

function updateGrade(index, newGrade) {
    const grades = JSON.parse(localStorage.getItem('grades')) || [];
    grades[index].grade = newGrade;
    saveGrades(grades);
    loadGrades();
}

function fetchSoundtracks() {
    const movieTitle = document.getElementById('movie-title').value;
    if (movieTitle) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}`)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    const movieId = data.results[0].id;
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
                        .then(response => response.json())
                        .then(movieDetails => {
                            const ul = document.getElementById('soundtracks');
                            ul.innerHTML = '';
                            const li = document.createElement('li');
                            li.innerHTML = `<strong>Título:</strong> ${movieDetails.title}<br>
                                            <strong>Data de Lançamento:</strong> ${movieDetails.release_date}<br>
                                            <strong>Sinopse:</strong> ${movieDetails.overview}`;
                            ul.appendChild(li);
                        });
                } else {
                    alert('Nenhum filme encontrado com esse título.');
                }
            })
            .catch(error => console.error('Erro ao buscar filme:', error));
    } else {
        alert('Insira o título do filme.');
    }
}

function fetchMovieReleases() {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const ul = document.getElementById('movie-releases');
            ul.innerHTML = '';
            data.results.forEach(movie => {
                const li = document.createElement('li');
                li.textContent = `${movie.title} - ${movie.release_date}`;
                ul.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao buscar filmes:', error));
}
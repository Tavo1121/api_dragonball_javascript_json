let currentPage = 1;

function fetchCharacters(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => displayCharacters(data));
}

function displayCharacters(characters) {
  const characterList = document.getElementById('character-list');
  characterList.innerHTML = '';
  characters.forEach(character => {
    const row = document.createElement('tr');
    
    const idCell = document.createElement('td');
    idCell.textContent = character.id;

    const nameCell = document.createElement('td');
    nameCell.textContent = character.name;

    const raceCell = document.createElement('td');
    raceCell.textContent = character.race;

    const genderCell = document.createElement('td');
    genderCell.textContent = character.gender;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(raceCell);
    row.appendChild(genderCell);

    row.addEventListener('click', () => showCharacterDetails(character.id));

    characterList.appendChild(row);
  });
}

function searchCharacters() {
  const name = document.getElementById('name').value.trim();
  const race = document.getElementById('race').value.trim();
  const gender = document.getElementById('gender').value.trim();
  let url = 'https://dragonball-api.com/api/characters?';

  if (name) {
    url += `name=${encodeURIComponent(name)}`;
  }
  if (race) {
    url += `&race=${encodeURIComponent(race)}`;
  }
  if (gender && gender !== 'Tood') {
    url += `&gender=${encodeURIComponent(gender)}`;
  }
  if (gender == 'Todo') {
    fetchCharacters(`${url}&page=${currentPage}`);
  }

  fetchCharacters(`${url}&page=${currentPage}`);
}

function showCharacterDetails(characterId) {
  const detailsContainer = document.getElementById('character-details');
  detailsContainer.innerHTML = '<p>Cargando detalles del personaje...</p>';

  fetch(`https://dragonball-api.com/api/characters/${characterId}`)
      .then(response => response.json())
      .then(character => {
        detailsContainer.innerHTML = `
          <div class="character-info">
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}">
            <p><strong>Raza:</strong> ${character.race}</p>
            <p><strong>Género:</strong> ${character.gender}</p>
            <p><strong>Ki:</strong> ${character.ki}</p>
            <p><strong>Máximo Ki:</strong> ${character.maxKi}</p>
            <p><strong>Descripción:</strong> ${character.description}</p>
          </div>
        `;
      })
      .catch(error => {
        console.error('Error al cargar los detalles del personaje:', error);
        detailsContainer.innerHTML = '<p>Ocurrió un error al cargar los detalles del personaje.</p>';
      });
  }

  // Cargar lista inicial de personajes
  fetchCharacters('https://dragonball-api.com/api/characters');

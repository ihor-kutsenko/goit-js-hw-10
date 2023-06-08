import './css/style.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelectRef = document.querySelector('.breed-select');
const catInfoRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');



loaderRef.classList.add('hidden');
catInfoRef.classList.add('hidden');
errorRef.classList.add('hidden'); 
let breeds = [];
let selectedBreedId = null;

function showBreeds() {
  hideCatInfo();
  fetchBreeds()
    .then(data => {
        breeds = data;
      renderBreedsSelect();

      if (breeds.length > 0) {
        selectedBreedId = breeds[0].id;
        
      } else {
        
        showError('No breeds found.');
      }
    })
    .catch(error => {
      loaderRef.classList.add('hidden');
      errorNotiflix();
    });
}

function renderBreedsSelect() {
  breedSelectRef.innerHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
  showCatByBreed(selectedBreedId); 
  
}

function showCatByBreed(breedId) {
  hideCatInfo();

  fetchCatByBreed(breedId)
    .then(data => {
      if (data) {
        renderCatInfo(data);
        catInfoRef.classList.remove('hidden');
      } else {
        
        errorRef.classList.remove('hidden');
      }
      loaderRef.classList.add('hidden');
    })
    .catch(error => {
      loaderRef.classList.add('hidden');
      errorNotiflix();
    });
}

function renderCatInfo(cat) {
  catInfoRef.innerHTML = `
    <img class="cat-img" src="${cat.image}" alt="${cat.name}">
    <div class="cat-text">
    <h2 class="cat-header">${cat.name}</h2>
    <p>${cat.description}</p>
    <p><span><b>Temperament: </b></span>${cat.temperament}</p>
    <p><span><b>Origin: </b></span>${cat.origin}</p>
    <p><span><b>Life Span: </b></span>${cat.life_span}</p>
   </div>`;
}

breedSelectRef.addEventListener('change', event => {
  selectedBreedId = event.target.value;
  showCatByBreed(selectedBreedId);
});

showBreeds();
hideCatInfo();

function hideCatInfo() {
  if (!catInfoRef.classList.contains('hidden')) {
    catInfoRef.classList.add('hidden');
  }
  loaderRef.classList.remove('hidden');
  errorRef.classList.add('hidden'); 
}

function showError(message) {
  errorRef.textContent = message;
  errorRef.classList.remove('hidden');
}

function errorNotiflix() {
  Notiflix.Notify.failure(
    `Oops! Something went wrong! Try reloading the page!`,
    {
      clickToClose: true,
      timeout: 4000,
    }
  );
}
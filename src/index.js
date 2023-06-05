import './css/style.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelectRef = document.querySelector('.breed-select');
const catInfoRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');

let breeds = [];
let selectedBreedId = null;

function showBreeds() {
  loaderRef.style.display = 'block';

  fetchBreeds()
    .then(data => {
      breeds = data;
      renderBreedsSelect();
      loaderRef.style.display = 'none';

      if (breeds.length > 0) {
        selectedBreedId = breeds[0].id;
        showCatByBreed(selectedBreedId);
      }
    })
    .catch(error => {
      loaderRef.style.display = 'none';
      showError();
    });
}

function renderBreedsSelect() {
  breedSelectRef.innerHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
}

function showCatByBreed(breedId) {
  loaderRef.style.display = 'block';
  catInfoRef.style.display = 'none';

  fetchCatByBreed(breedId)
    .then(data => {
      if (data) {
        renderCatInfo(data);
        catInfoRef.style.display = 'block';
      }
      loaderRef.style.display = 'none';
    })
    .catch(error => {
      loaderRef.style.display = 'none';
      showError();
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

function showError() {
  errorRef.style.display = 'block';
}

function hideError() {
  errorRef.style.display = 'none';
}

breedSelectRef.addEventListener('change', event => {
  selectedBreedId = event.target.value;
  showCatByBreed(selectedBreedId);
});

showBreeds();

import './css/style.css';
import Notiflix from 'notiflix';
import {  fetchBreeds } from './cat-api';

const breedSelectRef = document.querySelector('.breed-select');
// const catInfoRef = document.querySelector('.cat-info');


breedSelectRef.addEventListener('click', showBreedList);

function showBreedList() {

  fetchBreeds()
    .then(data => {
      data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        breedSelectRef.appendChild(option);
      });
      breedSelectRef.removeEventListener('click', showBreedList); // Видалення події, щоб списку не показувалося знову
    })
    .catch(error => {
      console.log(error);
      breedSelectRef.style.display = 'none'; // Приховати випадаючий список у разі помилки
      document.querySelector('.error').style.display = 'block'; // Показати повідомлення про помилку
    });
}



const BASE_URL = 'https://api.thecatapi.com/v1/';
const api_key = 'live_dBc4fojOrDESHLNCbpbJ45KUaEhuj84Kw5rhVztHg1MHrhqWXOgCU9j784cwbTN8';

export function fetchBreeds() {
  return fetch(`${BASE_URL}breeds?api_key=${api_key}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data.map(breed => ({
        id: breed.id,
        name: breed.name
      }));
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}images/search?breed_ids=${breedId}&api_key=${api_key}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 0) {
        const cat = data[0];
        const breed = cat.breeds[0];
        return {
          name: breed.name,
          description: breed.description,
          temperament: breed.temperament,
          origin: breed.origin,
          life_span: breed.life_span,
          image: cat.url
        };
      }
    });
}

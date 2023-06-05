const BASE_URL = 'https://api.thecatapi.com/v1/';
const api_key = 'live_dBc4fojOrDESHLNCbpbJ45KUaEhuj84Kw5rhVztHg1MHrhqWXOgCU9j784cwbTN8';


export function fetchBreeds() { 
  return fetch(`${BASE_URL}breeds?&${api_key}`)
  .then(response =>
    response.json())
  .then(data => {
    console.log(data)
      return data;
  })
  .catch(erorr => {
    console.log(erorr);
    throw erorr;
  });
} 

// export function fetchCatByBreed(breedId) {
//   return fetch(`${BASE_URL}images/search?breed_ids=${breedId}&${api_key}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     });
// }
 

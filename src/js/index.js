import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const select = document.querySelector('select');
const container = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
loader.classList.add('visually-hidden');
error.classList.add('visually-hidden');

function animalCard(info) {
  const markup = `<div class='picture-container'>
      <img class="picture" src="${info[0].url}" alt="${info[0].breeds[0].name}" height='300'/>
    <h1>${info[0].breeds[0].name}</h1>
    <p>${info[0].breeds[0].description}</p>
    <p>Temperament: ${info[0].breeds[0].temperament}</p>
    </div>`;
  return markup;
}

fetchBreeds()
  .then(data => {
    const dataArr = data.map(element => ({
      text: element.name,
      value: element.id,
    }));
    new SlimSelect({
      select: select,
      data: dataArr,
    });
  })
  .catch(() => {
    Notiflix.Notify.failure(`${error.textContent}`);
    select.classList.add('visually-hidden');
  });

select.addEventListener('change', event => {
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      container.classList.add('visually-hidden');
      loader.classList.remove('visually-hidden');
      setTimeout(() => {
        container.classList.remove('visually-hidden');
        loader.classList.add('visually-hidden');
        container.innerHTML = animalCard(data);
      }, 2000);
    })
    .catch(() => {
      Notiflix.Notify.failure(`${error.textContent}`);
      container.innerHTML = '';
    });
});

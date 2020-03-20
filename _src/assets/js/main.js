'use strict';

// 1. Variables y arrays
let listSeries = [];
let favoritesSeries = [];

const inputSearch = document.querySelector('.js-inputSearch');
const btnSearch = document.querySelector('.js-btnSearch');
const listSection = document.querySelector('.js-listSection');
const form = document.querySelector('.js-form');
const favoritesSection = document.querySelector('.js-favoritesSection');

// 3. Funciones

// 4ª: Añadir de la lista de favoritas
// 5ª: Pintar series en favoritas
// 6ª:  Guardar en localStorage (y añadir al principio leer localStorage)
// 7ª: Quitar de la lista de favoritas

// -----

// 1ª: Escuchar la búsqueda y obtener datos de la API

function preventDefault(ev) {
  ev.preventDefault();
}

let userSearch = '';
function getValue() {
  userSearch = inputSearch.value;
}

function addList(ev) {
  ev.preventDefault;
  fetch(`http://api.tvmaze.com/search/shows?q=${userSearch}`)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        listSeries.push({
          image: getImage(),
          name: data[i].show.name,
          id: data[i].show.id
        });
      }
      function getImage() {
        for (let i = 0; i < data.length; i++) {
          if (data[i].show.image === null) {
            image: 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
          } else {
            image: data[i].show.image.medium;
          }
        }
      }
      paintSeries();
      listenToList();
    });
}

// 2ª: Pintar listado de series
function paintSeries() {
  listSection.innerHTML = '';
  for (let i = 0; i < listSeries.length; i++) {
    // listSection.innerHTML += `<article class="js-article article" id="${listSeries[i].id}">`;
    // listSection.innerHTML += `<img src="${listSeries[i].image}" alt="Imagen de la serie ${listSeries[i].name}" />`;
    // listSection.innerHTML += `<h3>${listSeries[i].name}</h3>`;
    // listSection.innerHTML += `</article>`;
    listSection.innerHTML += `<article class="js-article main__list__div__article" id="${listSeries[i].id}"><img src="${listSeries[i].image}" alt="Imagen de la serie ${listSeries[i].name}" /><h3>${listSeries[i].name}</h3></article>`;
  }
}

// 3ª: Escuchar el click en la lista de series

function listenToList() {
  const articlesSeries = document.querySelectorAll('.js-article');
  for (const article of articlesSeries) {
    articlesSeries[article].addEventListener('click', addToFavorites);
  }
}
// 4ª: Añadir de la lista de favoritas
let clickListId = [];
function addToFavorites(ev) {
  console.log(ev.target);
  clickListId = parseInt(ev.target.id);

  console.log(clickListId);
  console.log(listSeries);
  let clickedSerie = {};
  for (let i = 0; i < listSeries.length; i++) {
    if (listSeries[i].id === clickListId) {
      clickedSerie = listSeries[i];
    }
  }

  console.log(clickedSerie);
}
// 2. Listeners
inputSearch.addEventListener('keyup', getValue);
btnSearch.addEventListener('click', addList);
form.addEventListener('click', preventDefault);
listSection.addEventListener('click', listenToList());

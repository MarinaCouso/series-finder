'use strict';

// 1. Variables y arrays
let listSeries = [];
let favoritesSeries = [];

const inputSearch = document.querySelector('.js-inputSearch');
const btnSearch = document.querySelector('.js-btnSearch');
const listSection = document.querySelector('.js-listSection');
const form = document.querySelector('.js-form');
// 3. Funciones

// 1ª: Escuchar la búsqueda y obtener datos de la API
// 2ª: Pintar listado de series
// 3ª: Escuchar el click en la lista de series
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
  console.log(userSearch);
}

function addList(ev) {
  ev.preventDefault;
  fetch(`http://api.tvmaze.com/search/shows?q=${userSearch}`)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        listSeries.push({
          image: data[i].show.image.medium,
          name: data[i].show.name
        });
      }
      paintSeries();
    });
  console.log(listSeries);
}

// PENDIENTE ARREGLAR PINTAR
function paintSeries() {
  for (let i = 0; i < listSeries.length; i++) {
    listSection.innerHTML += '<article>';
    listSection.innerHTML += '<img src="' + listSeries[i].image + '" alt="poster" />';
    listSection.innerHTML += '<h3>' + listSeries[i].name + '</h3>';
    listSection.innerHTML += '</article>';
  }
}
// 2. Listeners
inputSearch.addEventListener('keyup', getValue);
btnSearch.addEventListener('click', addList);
form.addEventListener('click', preventDefault);

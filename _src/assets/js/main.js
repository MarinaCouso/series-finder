'use strict';

// 1. Variables y arrays
let listSeries = [];
let favoriteSeries = [];

const inputSearch = document.querySelector('.js-inputSearch');
const btnSearch = document.querySelector('.js-btnSearch');
const listSection = document.querySelector('.js-listSection');
const form = document.querySelector('.js-form');
const favoritesSection = document.querySelector('.js-favoritesSection');

// -----

// 2. Funciones

// -Guardar en localStorage (y añadir al principio leer localStorage)

const getLocalStorage = () => {
  const favoriteSeriesString = localStorage.getItem('favorites');
  if (favoriteSeriesString !== null) {
    favoriteSeries = JSON.parse(favoriteSeriesString);
    paintFavorites();
  }
};
getLocalStorage();

const setLocalStorage = () => {
  localStorage.setItem('favorites', JSON.stringify(favoriteSeries));
  localStorage.setItem('list', JSON.stringify(listSeries));
};

// -Escuchar la búsqueda y obtener datos de la API

function preventDefault(ev) {
  ev.preventDefault();
}

let userSearch = '';
function getValue() {
  userSearch = inputSearch.value;
}

function getImage(serie) {
  if (serie.show.image === null) {
    return 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
  } else {
    return serie.show.image.medium;
  }
}
function addList(ev) {
  ev.preventDefault;
  listSeries = [];
  fetch(`http://api.tvmaze.com/search/shows?q=${userSearch}`)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        listSeries.push({
          image: getImage(data[i]),
          name: data[i].show.name,
          id: data[i].show.id
        });
      }
      paintSeries();
      listenToList();
    });
}

// -Pintar listado de series

function isInFavorites(id, arrayId) {
  for (let i = 0; i < arrayId.length; i++) {
    if (arrayId[i].id === id) {
      return true;
    }
  }
  return false;
}
function paintSeries() {
  listSection.innerHTML = '';
  let codeHTML = '';
  for (let i = 0; i < listSeries.length; i++) {
    if (isInFavorites(listSeries[i].id, favoriteSeries)) {
      codeHTML += `<article class="js-article main__list__div__article reverseColor" id="${listSeries[i].id}">`;
    } else {
      codeHTML += `<article class="js-article main__list__div__article" id="${listSeries[i].id}">`;
    }
    codeHTML += `<img src="${listSeries[i].image}" alt="Imagen de la serie ${listSeries[i].name}" />`;
    codeHTML += `<h3>${listSeries[i].name}</h3>`;
    codeHTML += `</article>`;
  }
  listSection.innerHTML += codeHTML;
}

// -Escuchar el click en la lista de series

function listenToList() {
  const articlesSeries = document.querySelectorAll('.js-article');
  for (const article of articlesSeries) {
    article.addEventListener('click', addToFavorites);
  }
}

// -Limpiar lista favoritas
function listenToFavoriteRemoveAll() {
  const btnRemoveAll = document.querySelector('.js-btnRemoveAll');
  function cleanFavoriteList() {
    favoriteSeries = [];
    paintFavorites();
    setLocalStorage();
  }
  btnRemoveAll.addEventListener('click', cleanFavoriteList);
}
// -Pintar series en favoritas
function paintFavorites() {
  favoritesSection.innerHTML = '';
  let codeHTML = '';
  for (let i = 0; i < favoriteSeries.length; i++) {
    codeHTML += `<article class="js-article div__article" id="${favoriteSeries[i].id}">`;
    codeHTML += `<img class="div__article__img" src="${favoriteSeries[i].image}" alt="Imagen de la serie ${favoriteSeries[i].name}" />`;
    codeHTML += `<h3 class="div__article__name">${favoriteSeries[i].name}</h3>`;
    codeHTML += `<input class="js-btnRemove div__article__btnRemove" type="submit" value="x" id="${favoriteSeries[i].id}"/>`;
    codeHTML += `</article>`;
  }
  codeHTML += '<input class="js-btnRemoveAll div__btnRemoveAll" type="submit" value="Eliminar favoritas" />';
  favoritesSection.innerHTML += codeHTML;
  listenToFavoriteRemove();
  listenToFavoriteRemoveAll();
}

// -Añadir de la lista de favoritas

let clickListId = [];
function addToFavorites(ev) {
  clickListId = parseInt(ev.currentTarget.id);
  let clickedSerie = {};
  for (let i = 0; i < listSeries.length; i++) {
    if (listSeries[i].id === clickListId) {
      clickedSerie = listSeries[i];
    }
  }
  let foundSerie;
  for (const serie of favoriteSeries) {
    if (serie.id === clickListId) {
      foundSerie = serie;
    }
  }
  if (foundSerie === undefined) {
    ev.currentTarget.classList.add('reverseColor');
    favoriteSeries.push(clickedSerie);
  } else if (foundSerie.id !== clickedSerie.id) {
    ev.currentTarget.classList.add('reverseColor');
    favoriteSeries.push(clickedSerie);
  } else if (foundSerie.id === clickedSerie.id) {
    for (let i = 0; i < favoriteSeries.length; i++) {
      if (foundSerie.id === favoriteSeries[i].id) {
        favoriteSeries.splice(i, 1);
        ev.currentTarget.setAttribute('class', 'js-article main__list__div__article');
      }
    }
  }
  paintFavorites();
  setLocalStorage();
}
// -Quitar de la lista de favoritas

function listenToFavoriteRemove() {
  const btnRemove = document.querySelectorAll('.js-btnRemove');
  for (const btn of btnRemove) {
    btn.addEventListener('click', removeFavorites);
  }
}

function removeFavorites(ev) {
  let clickedBtnRemoveId = parseInt(ev.currentTarget.id);
  let clickedFavoriteSerie = {};
  for (let i = 0; i < favoriteSeries.length; i++) {
    if (i === clickedBtnRemoveId) {
      clickedFavoriteSerie = favoriteSeries[i];
    }
  }
  let serieToRemove = '';
  for (let i = 0; i < favoriteSeries.length; i++) {
    if (favoriteSeries[i].id === clickedFavoriteSerie.id) {
      serieToRemove = ev.currentTarget.parentElement;
      serieToRemove.parentElement.removeChild(serieToRemove);
    }
  }
  setLocalStorage();
}

// 3. Listeners
inputSearch.addEventListener('keyup', getValue);
btnSearch.addEventListener('click', addList);
form.addEventListener('click', preventDefault);
listSection.addEventListener('click', listenToList);

let pokemons = [];
let numberOfPokemons = 20;
let nextBatchNumber = 20;
let currentPokedex;
let pokemonsmoves = [];
let moveNames = [];
let backgroundcolor =
  {
  "grass": "#46D1B2",
  "fire": "#FB6C6C",
  "water": "#76BDFE",
  "bug": "#9CAD1A",
  "normal": "#8C682E",
  "poison": "#654DA4",
  "electric": "#FFA500",
  "ground": "#A4A4A6",
  "fairy": "red",
  "fighting": "brown",
  "psychic": "#eb0888",
  "rock":" #6c757d",
  "ghost": "#9D25A2",
  "dragon": "#E78AD7",
  "ice": "#CFF3F9",
  "dark": "#ACA985",
  "steel": "#3a6aa3"
}
;


async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = " Page not found";
    }
  }
}


async function init() {
  includeHTML();
  await renderPokedex();
  document.getElementById('loadPokedex').innerHTML = /*html*/`
  <div id="loadPokedex-btn"class="loadPokedex-btn">
      <button onclick="loadMorePokedex()"type="button" class="btn btn-light mt-3">Load Pokedex</button>
    </div>`;
 getBackGroundColors();
 
  
}


async function renderPokedex() {
  let content = document.getElementById('content');
    for (let j = 1; j <= numberOfPokemons; j++) {
      let url = `https://pokeapi.co/api/v2/pokemon/${j}`;
      let response = await fetch(url);
      currentPokedex = await response.json();
      pokemons.push(currentPokedex);
      let secondTypeButton = currentPokedex["types"][1]
        ? `<button class="btn-types">${currentPokedex["types"][1]["type"]["name"]}</button>`
        : "";
      getBackGroundColors();
      content.innerHTML += /*html*/ `
        <div id="pokedex-container" class="pokedex-container" onclick="showPokedexInfo(${j})">
          <p class="title">${currentPokedex["name"]}</p>
          <div class="btns-img-container">
            <div class="types-container">
              <button class="btn-types">${currentPokedex["types"]["0"]["type"]["name"]}</button>
              ${secondTypeButton}
            </div>
            <img id="pokedex-img" src="${currentPokedex["sprites"]["other"]["official-artwork"]["front_shiny"]}">
          </div>
        </div>`;
    }
  
    getBackGroundColors(); 
}


function getBackGroundColors() {
  let pokedexContainers = document.querySelectorAll(".pokedex-container");

  pokedexContainers.forEach((container, j) => {
    let pokemonType = pokemons[j]["types"][0]["type"]["name"];
    let backgroundColor = backgroundcolor[pokemonType];

    container.style.backgroundColor = backgroundColor;
  });
}


function showPokedexInfo(j) {
  content.innerHTML ='';
  document.getElementById('loadPokedex-btn').classList.add('d-none');
  let pokemonType = pokemons[j - 1]["types"][0]["type"]["name"];
  let backgroundColor = backgroundcolor[pokemonType];
  let ability1 = pokemons[j-1]["abilities"][0]["ability"]["name"];
let ability2 = pokemons[j-1]["abilities"][1] ? pokemons[j-1]["abilities"][1]["ability"]["name"]:"";
let ability3 = pokemons[j-1]["abilities"][2] ? pokemons[j-1]["abilities"][2]["ability"]["name"]:"";
let heightInMeters = pokemons[j-1]["height"] / 10; 
  let weightInKg = pokemons[j-1]["weight"] / 10;
  content.innerHTML = /*html*/ `
    <div id="pokedex-popUp-container"class="pokedex-popUp-container mt-5">
    <div id="pokedex-name"class="pokedex-name" style="background-color: ${backgroundColor};">
    <div class="title-closebtn">
    <p>${pokemons[j - 1]["name"]}</p>
    <button onclick="closePokedexInfo()"class="close-btn">X</button>
    </div>
    <div class="change-buttons">
    <button onclick="previousPokedex(${j})" class="close-btn"><</button>
    <button onclick="nextPokedex(${j})"class="close-btn">></button>
    </div>
    </div>
    <div class="pokedex-info-container">
        <div class="pokedexImg-container">
    <img class="pokedex-img-popUp"src="${
      pokemons[j - 1]["sprites"]["other"]["official-artwork"]["front_shiny"]
    }">
</div>
    <ul class="nav nav-underline">
  <li class="nav-item">
    <a onclick="showPokedexAbout(${j})"class="nav-link" href="#">About</a>
  </li>
  <li class="nav-item">
    <a onclick="showPokedexBaseStats(${j})"class="nav-link" href="#">Base Stats</a>
  </li>
  <li class="nav-item">
    <a onclick="showPokedexMoves(${j})"class="nav-link" href="#">Moves</a>
  </li> 
</ul>
<div id="pokedex-info"class="pokedex-info">
<div>
<ul class="list-group">
  <li class="list-group-item">
    Height  
  </li>
  <li class="list-group-item">
    Weight 
  </li>
  <li class="list-group-item">
    Abilities 
  </li>
  </ul>
</div>
    <div>
<ul class="list-group ml-1">
  <li class="list-group-item">
 ${heightInMeters} m
  </li>
  <li class="list-group-item">
  ${weightInKg} kg
  </li>
  <li class="list-group-item">
  ${ability1},
  ${ability2},
  ${ability3}
</li>
</ul>
</div>
</div>

    </div>

    </div>
    `;  
}


function closePokedexInfo() {
  content.innerHTML ='';
  renderPokedex();
  document.getElementById('loadPokedex-btn').classList.remove('d-none');
  pokemons.splice(currentPokedex);
}


function nextPokedex(j) {
  j++;
  if (j > pokemons.length) {
    j = 1;
  }
  showPokedexInfo(j);
}


function previousPokedex(j) {
  j--;
  if (j < 1) {
    j = pokemons.length;
  }
  showPokedexInfo(j);
}


function showPokedexAbout(j) {
  showPokedexInfo(j);
}


function showPokedexBaseStats(j) {
  document.getElementById("pokedex-info").innerHTML = '';
  document.getElementById("pokedex-info").innerHTML += /*html*/ `
  <div>
  <canvas id="myChart" class="canvas"></canvas>
</div>
`;
  renderStats(j);
}


function showPokedexMoves(j) {
  document.getElementById("pokedex-info").innerHTML = "";
  let moves = pokemons[j - 1]["moves"];

  for (let i = 0; i < moves.length; i++) {
    moveNames.push(moves[i].move.name);
  }

  document.getElementById("pokedex-info").innerHTML += /*html*/ `
  
  <div id="moves-container"class="moves-container"></div>`;

  for (let i = 0; i < moveNames.length; i++) {
    document.getElementById("moves-container").innerHTML += /*html*/ `<div class="move" > ${moveNames[i]} </div>`;
  }
}


function filterPokedex() {
  content.innerHTML ='';
  document.getElementById('loadPokedex-btn').classList.remove('d-none');
  let search = document.getElementById('search').value;
  search = search.toLowerCase();
  
  for (let j = 0; j < pokemons.length; j++) {
    let pokemon = pokemons[j];
    let secondTypeButton = pokemon["types"][1]
      ? `<button class="btn-types">${pokemon["types"][1]["type"]["name"]}</button>`
      : "";
 if(pokemon["name"].toLowerCase().includes(search)){
    let backgroundColor = backgroundcolor[pokemon["types"]["0"]["type"]["name"]];

    content.innerHTML += /*html*/ `
      <div id="pokedex-container" class="pokedex-container" onclick="showPokedexInfo(${j + 1})" style="background-color: ${backgroundColor};">
        <p>${pokemon["name"]}</p>
        <div class="btns-img-container">
          <div class="types-container">
            <button class="btn-types">${pokemon["types"]["0"]["type"]["name"]}</button>
            ${secondTypeButton}
          </div>
          <img id="pokedex-img" src="${pokemon["sprites"]["other"]["official-artwork"]["front_shiny"]}">
        </div>
      </div>
    `;
 }
}
}


async function loadMorePokedex() {
  let start = numberOfPokemons +1 ;
  let end =  numberOfPokemons + nextBatchNumber ;
  for (let j = start; j <= end; j++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${j}`;
    let response = await fetch(url);
    currentPokedex = await response.json();
    pokemons.push(currentPokedex);
    let secondTypeButton = pokemons[j-1]["types"][1]
      ? `<button class="btn-types">${pokemons[j-1]["types"][1]["type"]["name"]}</button>`
      : "";

    let backgroundColor = backgroundcolor[pokemons[j-1]["types"]["0"]["type"]["name"]];

    content.innerHTML += /*html*/ `
      <div id="pokedex-container" class="pokedex-container" onclick="showPokedexInfo(${j})" style="background-color: ${backgroundColor};">
        <p>${pokemons[j-1]["name"]}</p>
        <div class="btns-img-container">
          <div class="types-container">
            <button class="btn-types">${pokemons[j-1]["types"]["0"]["type"]["name"]}</button>
            ${secondTypeButton}
          </div>
          <img id="pokedex-img" src="${pokemons[j-1]["sprites"]["other"]["official-artwork"]["front_shiny"]}">
        </div>
      </div>
    `;
  }

  numberOfPokemons = end;

}


  

 


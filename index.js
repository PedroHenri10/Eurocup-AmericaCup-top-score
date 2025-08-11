import { updatePage } from './updatePage.js';
import { updateLanguage } from './language.js';

const topscoresTable = document.getElementById("topscoresTable");
const tablebody = document.getElementById("data-table");
let yearSelected = document.querySelector(".yearSelected");
const faviconLink = document.querySelector('link[rel="icon"]');
const bgbody = document.querySelector("body");
const logoeuro = document.getElementById("logo-euro");
const h1 = document.querySelector("h1");
const logocampeao = document.getElementById("logo-campeao");
let SelectedYear = parseInt(yearSelected.value);
let bgModal = document.querySelector('dialog');

const languageSelect = document.getElementById("language-select");
let selectedLanguage = languageSelect.value;
let flagLanguage = document.querySelector(".flag");
const edition = document.querySelector(".label-edicao");
const player = document.querySelector(".title-header th:nth-child(2)");
const position = document.querySelector(".title-header th:nth-child(3)");

const team = document.querySelector(".title-header th:nth-child(4)");
const country = document.querySelector(".title-header th:nth-child(5)");
const goals = document.querySelector(".title-header th:nth-child(6)");
const games = document.querySelector(".title-header th:nth-child(8)");

yearSelected.addEventListener("change", () =>
  {SelectedYear = parseInt(yearSelected.value);
    updatePage();
  }); 
  
languageSelect.addEventListener("change", () =>{
  selectedLanguage = languageSelect.value;
  updateLanguage();
  fetchCampaignData(SelectedYear, selectedLanguage);
  updatePage();
});

updatePage();
updateLanguage();

window.addEventListener("load", updatePage);

export { topscoresTable, tablebody, logoeuro, yearSelected, faviconLink, bgbody, h1, logocampeao, SelectedYear, bgModal,
languageSelect, edition, player, position, team, country, goals, games, selectedLanguage, flagLanguage };
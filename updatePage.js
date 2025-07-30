import { topscoresTable, tablebody, logoeuro, h1, yearSelected, faviconLink, bgbody, logocampeao, SelectedYear, selectedLanguage, languageSelect, country, bgModal } from './index.js';
import { updateLanguage } from './language.js';

function updatePage(){
    updateLanguage();
    logoeuro.src = `src/img/logoeurocopa${SelectedYear}.png`;
    logocampeao.src = `src/img/logocampeaeuro${SelectedYear}.png`;
    faviconLink.href = `src/icones/iconeeurocopa${SelectedYear}.png`;
    bgbody.style.backgroundImage = `url(src/backgronds/bg${SelectedYear}eurocopa2000.jpg)`;
    bgModal.style.backgroundImage = `url(src/img/teameuro${SelectedYear}champions1800.jpg)`;
  
  fetch("TopScoresEuroCupAPI.json")
    .then(response => response.json())
    .then(data => {
      
      tablebody.innerHTML = ''; 
      
      let artilheiros = data.competitions[0].editions.find(edition => edition.year === SelectedYear).topScorers;
  
      artilheiros.forEach((artilheiro, index) => { 
  
        const row = document.createElement("tr");
  
        const assists = artilheiro.assists !== undefined ? artilheiro.assists : "0";
        
          const classificationCell = document.createElement("td");
          const playerCell = document.createElement("td");
          const positionCell = document.createElement("td");
          const teamCell = document.createElement("td");
          const countryCell = document.createElement("td");
          const goalsCell = document.createElement("td");
          const assistsCell = document.createElement("td");
          const gamesCell = document.createElement("td");
  
          classificationCell.textContent = artilheiro.classification;
          playerCell.textContent = artilheiro.player;
          positionCell.textContent = selectedLanguage === "En-UK" ? artilheiro.position_UK : artilheiro.position;
          teamCell.textContent = artilheiro.team;
          const countryImage = document.createElement("img");
          countryImage.src = `src/icones/${artilheiro.country}.png`;
          countryImage.alt = artilheiro.country;
          countryImage.className = "country-icone";
          countryCell.appendChild(countryImage);
          goalsCell.textContent = artilheiro.goals;
          assistsCell.textContent = assists;
          gamesCell.textContent = artilheiro.games;
  
          row.appendChild(classificationCell);
          row.appendChild(playerCell);
          row.appendChild(positionCell);
          row.appendChild(teamCell);
          row.appendChild(countryCell);
          row.appendChild(goalsCell);
          row.appendChild(assistsCell);
          row.appendChild(gamesCell);
  
          tablebody.appendChild(row);
      
      });
    })
  }

  export { updatePage };
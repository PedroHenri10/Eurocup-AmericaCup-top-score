import { yearSelected, SelectedYear, selectedLanguage } from './index.js';
import { updateLanguage } from './language.js';

const openModal = document.querySelector(".open-modal");

const divGames = document.querySelector('.divGames');

function fetchCampaignData(selectedYear, selectedLanguage) {

 /* console.log(selectedLanguage);*/

fetch("campaign.json")
  .then(response => response.json())
  .then(data => {
    
    let campanha = data.competitions[0].editions.find(edition => edition.year === SelectedYear).campaign;

    campanha.forEach( campaign => {
        let boxgame = document.createElement('div');

        divGames.appendChild(boxgame);

        boxgame.innerHTML = `
            <h3 class="match">${selectedLanguage === "Pt-BR" ? campaign.round : campaign.round_UK}</h3>
            <h4 class="match">
                <img class="flag-modal" src="src/icones/${campaign.champion}.png" class"flag-campaign" alt="imagem seleção ${campaign.champion}"/>
                <span class="goals">${campaign.goals_champions}</span>
                ${campaign.match}
                <span class="goals">${campaign.goals_opponent}</span>
                <img class="flag-modal" src="src/icones/${campaign.opponent}.png" class"flag-campaign" alt="imagem seleção ${campaign.opponent}"/>
                </h4>
                <p class="penalty"><sub>${campaign.penalty}</sub></p>
            <h5>${campaign.stadium}</h5>
        `
    }

    )
  }) 
}

  openModal.addEventListener("click", () => {
    const modalId = openModal.getAttribute('data-modal');
    const modal = document.getElementById('modal-champion');

    updateLanguage();

    modal.showModal();

    fetchCampaignData(SelectedYear, selectedLanguage); 
  });
  

import { yearSelected, SelectedYear, selectedLanguage } from './index.js';
import { updateLanguage } from './language.js';

document.addEventListener("DOMContentLoaded", () => {
  const openModal = document.querySelector(".open-modal");
  const divGames = document.querySelector('.divGames');
  const modal = document.getElementById('modal-champion');
  const closeModal = document.querySelector('.close');

  function fetchCampaignData(selectedYear, selectedLanguage) {
    fetch("campaign.json")
      .then(response => response.json())
      .then(data => {
        let campanha = data.competitions[0].editions.find(edition => edition.year === SelectedYear).campaign;

        campanha.forEach(campaign => {
          let boxgame = document.createElement('div');
          divGames.appendChild(boxgame);

          boxgame.innerHTML = `
            <h3 class="match">${selectedLanguage === "Pt-BR" ? campaign.round : campaign.round_UK}</h3>
            <h4 class="match">
              <img class="flag-modal" src="src/icones/${campaign.champion}.png" alt="imagem seleção ${campaign.champion}"/>
              <span class="goals">${campaign.goals_champions}</span>
              ${campaign.match}
              <span class="goals">${campaign.goals_opponent}</span>
              <img class="flag-modal" src="src/icones/${campaign.opponent}.png" alt="imagem seleção ${campaign.opponent}"/>
            </h4>
            <p class="penalty"><sub>${campaign.penalty}</sub></p>
            <h5>${campaign.stadium}</h5>
          `;
        });
      });
  }

  openModal.addEventListener("click", () => {
    updateLanguage();
    modal.showModal();
    fetchCampaignData(SelectedYear, selectedLanguage);
  });

  closeModal.addEventListener("click", () => {
    modal.close();
    divGames.innerHTML = "";
  });

  modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.close();
        divGames.innerHTML = "";
      }
  });
});


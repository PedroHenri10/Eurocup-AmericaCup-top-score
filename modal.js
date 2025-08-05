import { yearSelected, SelectedYear, selectedLanguage } from './index.js';
import { updateLanguage } from './language.js';

document.addEventListener("DOMContentLoaded", () => {
  const openModal = document.querySelector(".open-modal");
  const divGames = document.querySelector('.divGames');
  const modal = document.getElementById('modal-champion');
  const closeModal = document.querySelector('.close');

  function fetchCampaignData(selectedYear, selectedLanguage) {
  divGames.innerHTML = '';

  fetch("campaign.json")
    .then(response => response.json())
    .then(data => {
      const edition = data.competitions[0].editions.find(edition => edition.year === SelectedYear);
      const campanha = edition.campaign;
      const cores = edition.colors;

      campanha.forEach((campaign, index) => {
        setTimeout(() => {
          let boxgame = document.createElement('div');
          const isLast = index === campanha.length - 1;
          boxgame.classList.add(isLast ? 'card-ultimo' : 'card-animado');

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

          const bordas = ['topo', 'direita', 'baixo', 'esquerda'];
          bordas.forEach(pos => {
            const span = document.createElement('span');
            span.className = `borda-animada borda-${pos}`;
            boxgame.appendChild(span);
          });

          const spans = boxgame.querySelectorAll('.borda-animada');

          if (cores && cores.cor1 && cores.cor2) {
            spans.forEach(span => {
              let gradiente = `linear-gradient(to right, transparent, ${cores.cor1}, ${cores.cor2}`;
              if (cores.cor3) gradiente += `, ${cores.cor3}`;
              gradiente += `)`;

              if (span.classList.contains("borda-topo")) {
                span.style.background = gradiente.replace("to right", "to right");
              } else if (span.classList.contains("borda-direita")) {
                span.style.background = gradiente.replace("to right", "to bottom");
              } else if (span.classList.contains("borda-baixo")) {
                span.style.background = gradiente.replace("to right", "to left");
              } else if (span.classList.contains("borda-esquerda")) {
                span.style.background = gradiente.replace("to right", "to top");
              }
            });
          }

          setTimeout(() => {
            boxgame.classList.add('animacao-iniciada');
          }, 500);

          divGames.appendChild(boxgame);

          boxgame.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
          });

        }, index * 500);
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
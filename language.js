import { languageSelect, h1, edition, player, position, team, country, goals, games, SelectedYear, selectedLanguage, flagLanguage } from './index.js';

function updateLanguage(){
    let selectedLanguage = languageSelect.value;

    if (selectedLanguage === "Pt-BR"){
        flagLanguage.src = `src/icones/brasilflag.png`;
        h1.textContent = `Artilheiros Eurocopa ${SelectedYear}`;
        edition.textContent = "Edição";
        player.textContent = "Jogador";
        position.textContent = "Posição";
        team.textContent = "Time";
        country.textContent = "País";
        goals.textContent = "Gols"
        games.textContent = "Jogos";
    }else if (selectedLanguage === "En-UK"){
        flagLanguage.src = `src/icones/unitedKingdom.png`;
        h1.textContent = `Euro Cup Top Scorers ${SelectedYear}`;
        edition.textContent = "Edition";
        player.textContent = "Player";
        position.textContent = "Position";
        team.textContent = "Team";
        country.textContent = "Country";
        goals.textContent ="Goals";
        games.textContent ="Games";
    }
}

export { updateLanguage };
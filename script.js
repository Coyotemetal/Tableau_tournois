document.addEventListener('DOMContentLoaded', (event) => {
    chargerDonnees();
});

function ajouterLigne() {
    const pseudo = document.getElementById('pseudo').value;
    const mission = document.getElementById('mission').value;
    const equipe1 = document.getElementById('equipe1').value;
    const equipe2 = document.getElementById('equipe2').value;
    const equipe3 = document.getElementById('equipe3').value;
    const equipe4 = document.getElementById('equipe4').value;

    const tableau = document.getElementById('tableau').getElementsByTagName('tbody')[0];
    const nouvelleLigne = tableau.insertRow();

    nouvelleLigne.insertCell(0).textContent = pseudo;
    nouvelleLigne.insertCell(1).textContent = mission;
    nouvelleLigne.insertCell(2).textContent = equipe1;
    nouvelleLigne.insertCell(3).textContent = equipe2;
    nouvelleLigne.insertCell(4).textContent = equipe3;
    nouvelleLigne.insertCell(5).textContent = equipe4;

    const actionsCell = nouvelleLigne.insertCell(6);
    const editButton = document.createElement('button');
    editButton.textContent = 'Éditer';
    editButton.className = 'edit-button';
    editButton.onclick = function() { editerLigne(nouvelleLigne); };
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function() { supprimerLigne(nouvelleLigne); };
    actionsCell.appendChild(deleteButton);

    document.getElementById('form').reset();

    sauvegarderDonnees();
}

function editerLigne(ligne) {
    const cellules = ligne.getElementsByTagName('td');

    for (let i = 0; i < cellules.length - 1; i++) {
        const contenu = cellules[i].textContent;
        cellules[i].innerHTML = `<input type="text" value="${contenu}">`;
    }

    const actionsCell = cellules[cellules.length - 1];
    actionsCell.innerHTML = '';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Enregistrer';
    saveButton.className = 'save-button';
    saveButton.onclick = function() { enregistrerLigne(ligne); };
    actionsCell.appendChild(saveButton);
}

function enregistrerLigne(ligne) {
    const cellules = ligne.getElementsByTagName('td');

    for (let i = 0; i < cellules.length - 1; i++) {
        const input = cellules[i].getElementsByTagName('input')[0];
        cellules[i].textContent = input.value;
    }

    const actionsCell = cellules[cellules.length - 1];
    actionsCell.innerHTML = '';

    const editButton = document.createElement('button');
    editButton.textContent = 'Éditer';
    editButton.className = 'edit-button';
    editButton.onclick = function() { editerLigne(ligne); };
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function() { supprimerLigne(ligne); };
    actionsCell.appendChild(deleteButton);

    sauvegarderDonnees();
}

function rechercherLigne() {
    const pseudoRecherche = document.getElementById('searchPseudo').value.toLowerCase();
    const tableau = document.getElementById('tableau').getElementsByTagName('tbody')[0];
    const lignes = tableau.getElementsByTagName('tr');

    for (let i = 0; i < lignes.length; i++) {
        const cellules = lignes[i].getElementsByTagName('td');
        const pseudo = cellules[0].textContent.toLowerCase();

        if (pseudo.includes(pseudoRecherche)) {
            lignes[i].style.display = '';
        } else {
            lignes[i].style.display = 'none';
        }
    }
}

function sauvegarderDonnees() {
    const tableau = document.getElementById('tableau').getElementsByTagName('tbody')[0];
    const lignes = tableau.getElementsByTagName('tr');
    const donnees = [];

    for (let i = 0; i < lignes.length; i++) {
        const cellules = lignes[i].getElementsByTagName('td');
        const ligneData = {
            pseudo: cellules[0].textContent,
            mission: cellules[1].textContent,
            equipe1: cellules[2].textContent,
            equipe2: cellules[3].textContent,
            equipe3: cellules[4].textContent,
            equipe4: cellules[5].textContent,
        };
        donnees.push(ligneData);
    }

    localStorage.setItem('tableauMissions', JSON.stringify(donnees));
}

function chargerDonnees() {
    const donnees = JSON.parse(localStorage.getItem('tableauMissions'));

    if (donnees) {
        const tableau = document.getElementById('tableau').getElementsByTagName('tbody')[0];
        tableau.innerHTML = '';

        for (const ligneData of donnees) {
            const nouvelleLigne = tableau.insertRow();
            nouvelleLigne.insertCell(0).textContent = ligneData.pseudo;
            nouvelleLigne.insertCell(1).textContent = ligneData.mission;
            nouvelleLigne.insertCell(2).textContent = ligneData.equipe1;
            nouvelleLigne.insertCell(3).textContent = ligneData.equipe2;
            nouvelleLigne.insertCell(4).textContent = ligneData.equipe3;
            nouvelleLigne.insertCell(5).textContent = ligneData.equipe4;

            const actionsCell = nouvelleLigne.insertCell(6);
            const editButton = document.createElement('button');
            editButton.textContent = 'Éditer';
            editButton.className = 'edit-button';
            editButton.onclick = function() { editerLigne(nouvelleLigne); };
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.className = 'delete-button';
            deleteButton.onclick = function() { supprimerLigne(nouvelleLigne); };
            actionsCell.appendChild(deleteButton);
        }
    }
}

function supprimerLigne(ligne) {
    const tableau = document.getElementById('tableau').getElementsByTagName('tbody')[0];
    tableau.deleteRow(ligne.rowIndex - 1);
    sauvegarderDonnees();
}


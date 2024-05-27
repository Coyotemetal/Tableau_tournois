function ajouterLigne() {
    // Récupérer les valeurs des champs du formulaire
    const pseudo = document.getElementById('pseudo').value;
    const mission = document.getElementById('mission').value;
    const equipe1 = document.getElementById('equipe1').value;
    const equipe2 = document.getElementById('equipe2').value;
    const equipe3 = document.getElementById('equipe3').value;
    const equipe4 = document.getElementById('equipe4').value;

    // Créer une nouvelle ligne et ajouter les valeurs des champs
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

    // Réinitialiser le formulaire
    document.getElementById('form').reset();
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

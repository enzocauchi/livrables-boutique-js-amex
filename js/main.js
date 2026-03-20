document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');

    // On appelle ton API PHP
    fetch('get_vehicules.php')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur réseau : Impossible de joindre get_vehicules.php");
            }
            return response.json();
        })
        .then(data => {
            // On vide le message de chargement
            gallery.innerHTML = "";

            if (data.length === 0) {
                gallery.innerHTML = "<p>Aucun véhicule trouvé dans la base de données.</p>";
                return;
            }

            data.forEach(vehicule => {
                // Création de l'élément carte
                const card = document.createElement('div');
                card.className = 'card';

                /* Correction dynamique du chemin :
                   Si tes données SQL ont "static/images/..." (minuscule)
                   on force "static/Images/..." (Majuscule) pour coller à ton dossier
                */
                let imgPath = vehicule.image_url;
                if (imgPath.includes('static/images/')) {
                    imgPath = imgPath.replace('static/images/', 'static/Images/');
                }

                card.innerHTML = `
                    <img src="${imgPath}" alt="${vehicule.nom_modele}" 
                         onerror="this.onerror=null; this.src='https://via.placeholder.com/300x170?text=Image+Introuvable';">
                    <h3>${vehicule.nom_modele}</h3>
                    <p>${vehicule.marque.toUpperCase()} • ${vehicule.categorie}</p>
                `;

                gallery.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Erreur Fetch :", error);
            gallery.innerHTML = `<p style="color:red;">Erreur de chargement : ${error.message}</p>`;
        });
});
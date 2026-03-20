<?php
require 'config.php';

// On récupère les véhicules avec le nom de leur constructeur et catégorie
$sql = "SELECT v.*, c.nom as categorie, m.nom as marque
        FROM vehicules v
        JOIN categories c ON v.category_id = c.id
        JOIN constructeurs m ON v.constructeur_id = m.id";

$stmt = $pdo->query($sql);
$vehicules = $stmt->fetchAll();

header('Content-Type: application/json');
echo json_encode($vehicules);
?>
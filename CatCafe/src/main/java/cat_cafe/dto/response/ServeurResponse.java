package cat_cafe.dto.response;

import cat_cafe.model.Serveur;

public record ServeurResponse(
    Integer id,
    String login, // necessaire ??
    String nom,
    String prenom,
    Integer nbCommande
) {

   public static ServeurResponse convert(Serveur serveur) {

        Integer nbCommande = 0;

        /*if (serveur.getListeCommande()!=null){
            nbCommande = serveur.getListeCommande().size();
        }*/

        return new ServeurResponse(
            serveur.getId(), 
            serveur.getLogin(),
            serveur.getNom(),
            serveur.getPrenom(),

            nbCommande

        );
    }

    
}

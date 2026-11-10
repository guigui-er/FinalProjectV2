package cat_cafe.dto.response;

import cat_cafe.model.Genre;
import cat_cafe.model.Serveur;

public record ServeurResponse(
    Integer id,
    String login, // necessaire ??
    String nom,
    String prenom,
    Genre genre
) {

   public static ServeurResponse convert(Serveur serveur) {
        return new ServeurResponse(
            serveur.getId(), 
            serveur.getLogin(),
            serveur.getNom(),
            serveur.getPrenom(),
            serveur.getGenre()

        );
    }

    
}

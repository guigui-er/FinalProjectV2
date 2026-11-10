package cat_cafe.dto.response;

import cat_cafe.model.Commande;

public record CommandeResponse(Integer commandeId) {

     public static CommandeResponse convert(Commande commande) {
        return new CommandeResponse(
            commande.getId()
        );
     }
}

package cat_cafe.dto.response;

import java.util.List;

import cat_cafe.model.Commande;

public record CommandeResponse(
    Integer commandeId, 
    Integer idReservation,
    List <DetailCommandeResponse> details,
    double prixTotal
) {

     public static CommandeResponse convert(Commande commande, double prixTotal) {
        Integer idReservation = null;

        if (commande.getReservation() != null) {
            idReservation = commande.getReservation().getId();
        }

        List<DetailCommandeResponse> details = commande.getDetails()
            .stream()
            .map(DetailCommandeResponse::convert)
            .toList();

        return new CommandeResponse(
            commande.getId(),
            idReservation,
            details,
            prixTotal
        );
     }
}

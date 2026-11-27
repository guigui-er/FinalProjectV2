package cat_cafe.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import cat_cafe.model.Commande;
import cat_cafe.model.Reservation;
import cat_cafe.model.StatutCommande;

public record CommandeResponse(
    Integer commandeId, 
    LocalDateTime date,
    StatutCommande statutCommande,
    Reservation reservation,
    List <DetailCommandeResponse> details,
    double prixTotal
) {

     public static CommandeResponse convert(Commande commande, double prixTotal) {
        Reservation reservation = null;
        LocalDateTime date = null;
        StatutCommande statutCommande = null;

        if (commande.getReservation() != null) {
            reservation = commande.getReservation();
        }
        if (commande.getDate() != null) {
            date = commande.getDate();
        }
        if (commande.getStatutCommande() != null) {
            statutCommande = commande.getStatutCommande();
        }

        List<DetailCommandeResponse> details = commande.getDetails()
            .stream()
            .map(DetailCommandeResponse::convert)
            .toList();

        return new CommandeResponse(
            commande.getId(),
            date,
            statutCommande,
            reservation,
            details,
            prixTotal
        );
        
     }

    
}

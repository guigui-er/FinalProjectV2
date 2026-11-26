package cat_cafe.dto.response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import cat_cafe.model.Commande;
import cat_cafe.model.DetailCommande;
import cat_cafe.model.Genre;
import cat_cafe.model.Reservation;

import cat_cafe.model.StatutCommande;




public record CommandeResponseV2(    
    Integer id,
    LocalDateTime date, // necessaire ??
    StatutCommande statutCommande,
    Reservation reservation,
    List <DetailCommandeResponse> details,
    double prixTotal
) {

   public static CommandeResponseV2 convert(Commande commande, double prixTotal) {

    
        List<DetailCommandeResponse> details = commande.getDetails()
            .stream()
            .map(DetailCommandeResponse::convert)
            .toList();

        return new CommandeResponseV2(
            commande.getId(), 
            commande.getDate(),
            commande.getStatutCommande(),
            commande.getReservation(),
            details,
            prixTotal
        );
    }
}




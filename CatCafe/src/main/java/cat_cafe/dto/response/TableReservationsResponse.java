package cat_cafe.dto.response;

import java.util.List;

import cat_cafe.model.Commande;
import cat_cafe.model.Reservation;

public record TableReservationsResponse(

    int id,
    String dateTime,
    int assiseId,
    String clientNom,
    String clientPrenom,
    int nbClient,
    Integer commandeId, 
    Integer idReservation,
    double prixTotal,
    CommandeResponse commandeResponse,
    boolean accepterPaiement,
    String commandeStatut

) {

    public static TableReservationsResponse convert(Reservation reservation,Commande commande,double prixTotal){
        if (reservation == null) {
        return null;
    }
        String clientNom = null;
        String clientPrenom = null;

        if (reservation.getClient()!=null){
            clientNom = reservation.getClient().getNom();
            clientPrenom = reservation.getClient().getPrenom();
        }

        Integer commandeId = null;
        Integer idReservation = null;
        double total = 0.0;
        CommandeResponse commandeResponse = null;
        boolean accepterPaiement = false;
        String commandeStatut =null;

        if (commande != null && commande.getStatutCommande()!=null){
            commandeResponse = CommandeResponse.convert(commande, prixTotal);
            commandeId = commandeResponse.commandeId();
            idReservation = commandeResponse.idReservation();
            total = commandeResponse.prixTotal();
            accepterPaiement = commande.isAccepter_paiement();
            commandeStatut = commande.getStatutCommande().toString();
        }

        return new TableReservationsResponse(
            reservation.getId(),
            reservation.getDateTime().toString(),
            reservation.getAssise().getId(),
            clientNom,
            clientPrenom,
            reservation.getNbClient(),
            commandeId,
            idReservation,
            total,
            commandeResponse,
            accepterPaiement,
            commandeStatut);

    }


}

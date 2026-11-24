package cat_cafe.dto.response;

import java.util.List;

import cat_cafe.model.Assise;
import cat_cafe.model.Commande;
import cat_cafe.model.Reservation;

public record TableAssisesResponse(

    int id,
    int capacite,
    String clientNom,
    String clientPrenom,
    String commandeStatut,
    boolean complet
) {

    public static TableAssisesResponse convert(Assise assise, Reservation reservation, Commande commande){
        String clientNom = null;
        String clientPrenom = null;
        String commandeStatut = null;

        if (reservation != null && reservation.getClient()!=null){
            clientNom = reservation.getClient().getNom();
            clientPrenom = reservation.getClient().getPrenom();
        }
        if(commande !=null && commande.getStatutCommande()!=null){
            commandeStatut = commande.getStatutCommande().toString();
        }
        
        boolean estComplet = assise.isComplet() || commande != null;

        return new TableAssisesResponse(
            assise.getId(), 
            assise.getCapacite(), 
            clientNom,
            clientPrenom,
            commandeStatut,
            estComplet
        );

    }
}

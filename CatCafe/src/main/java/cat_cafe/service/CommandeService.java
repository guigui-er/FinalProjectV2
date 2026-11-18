package cat_cafe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import cat_cafe.dao.IDAOCommande;
import cat_cafe.model.Commande;
import cat_cafe.model.StatutCommande;
import jakarta.transaction.Transactional;

@Service
public class CommandeService {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private IDAOCommande daoCommande;

    public double calculerPrixTotal(Commande commande) {

        return commande.getDetails()
            .stream()
            .mapToDouble(detail -> detail.getPrix() * detail.getQte())
            .sum();
    }


    /*
        Quand la commande est terminée ou annulée, on libère l'assise liée
        en appellant le service de reservation.
        On ne peut pas revenir en arrière et passer la commande 
        de (Terminee | Annulee) à En_cours
    */
    @Transactional
    public Commande changerStatut(Integer id, StatutCommande nouveauStatut) {
        Commande commande = daoCommande.findById(id).orElseThrow(null);

        StatutCommande ancienStatut = commande.getStatutCommande();
        if (ancienStatut == nouveauStatut) {
            return commande;
        }

        if (commandeTerminer(ancienStatut)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Commande déjà clôturée, statut non modifiable");
        }

        commande.setStatutCommande(nouveauStatut);
        Commande sauvegardee = daoCommande.save(commande);

        if (commandeTerminer(nouveauStatut)) {
            reservationService.liberer(sauvegardee.getReservation().getId());
        }
        return sauvegardee;
    }

    private boolean commandeTerminer(StatutCommande statut) {
        return statut == StatutCommande.Terminee || statut == StatutCommande.Annulee;
    }
}

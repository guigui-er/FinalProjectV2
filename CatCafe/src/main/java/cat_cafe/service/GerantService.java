package cat_cafe.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import cat_cafe.dao.IDAOArticle;
import cat_cafe.dao.IDAOAssise;
import cat_cafe.dao.IDAOCommande;
import cat_cafe.dao.IDAOCompte;
import cat_cafe.dao.IDAODetailCommande;
import cat_cafe.dao.IDAOReservation;
import cat_cafe.dto.response.StatsGerantResponse;
import cat_cafe.model.Assise;
import cat_cafe.model.Commande;
import cat_cafe.model.DetailCommande;
import cat_cafe.model.Reservation;
import cat_cafe.model.StatutCommande;
import jakarta.transaction.Transactional;


@Service 
@Transactional
public class GerantService {

    IDAOReservation daoReservation;
    IDAOAssise daoAssise;
    IDAOArticle daoArticle;
    IDAOCommande daoCommande;

    public GerantService(IDAOCommande daoCommande,
        IDAOReservation daoReservation,IDAOAssise daoAssise,IDAOArticle daoArticle)
    {
        this.daoReservation=daoReservation;
        this.daoAssise=daoAssise;
        this.daoArticle=daoArticle;
        this.daoCommande=daoCommande;
    }

    public StatsGerantResponse stats() {
        return new StatsGerantResponse(
            montantEnCaisse(),
            nbCommandesEnCours(),
            nbClientsPresents(),
            nbTablesOccupees()
        );
    }

    public double montantEnCaisse(){
        double total = 0;
        for(Commande commande: daoCommande.findAll()){
            if (commande.getStatutCommande() == StatutCommande.Terminee && commande.isAccepter_paiement() && commande.getDate().toLocalDate().equals(LocalDate.now())){
                for(DetailCommande detail: commande.getDetails()){
                    total+=detail.getPrix()*detail.getQte();
                }
            }
        }return total;
    }

    public int nbCommandesEnCours(){
        return daoCommande.countByStatutCommande(StatutCommande.En_cours);
    }

    public int nbClientsPresents(){
        int total = 0;
        for (Reservation reservation : daoReservation.findAll()){
            if(reservation.getAssise() != null && reservation.getAssise().isComplet()){
                total+=reservation.getNbClient();
            }
        }
        return total;
    }

    public int nbTablesOccupees(){
        return daoAssise.countByCompletTrue();
    }

    /*
    public int nbCommandeEnCours(){
        List <Commande> commandes = daoCommande.findAll();
        int nb = 0;
        for(Commande commande: commandes){
            if (commande.getStatutCommande() == StatutCommande.En_cours){
                 nb +=1;
            }
        }return nb;
    }
    */

    public Reservation trouverReservation(Assise assise){
        return this.daoReservation.findByAssiseIdOrderByDateTimeDesc(assise.getId()).orElse(null);
    }

    public Commande trouverCommande(Reservation reservation){
        if (reservation == null) {
            return null;
        }
        Commande commande = this.daoCommande.findByReservationId(reservation.getId()).orElse(null);
        if (commande == null){
            return null;
        }
        if(commande.getStatutCommande() != StatutCommande.Terminee && commande.getStatutCommande() != StatutCommande.Annulee){
            return commande;
        }return null;
    }

}

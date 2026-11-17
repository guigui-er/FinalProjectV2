package cat_cafe.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cat_cafe.dao.IDAOArticle;
import cat_cafe.dao.IDAOAssise;
import cat_cafe.dao.IDAOChat;
import cat_cafe.dao.IDAOCommande;
import cat_cafe.dao.IDAOCompte;
import cat_cafe.dao.IDAODetailCommande;
import cat_cafe.dao.IDAOReservation;
import cat_cafe.dto.response.StatsGerantResponse;
import cat_cafe.model.Article;
import cat_cafe.model.Assise;
import cat_cafe.model.Chat;
import cat_cafe.model.Commande;
import cat_cafe.model.DetailCommande;
import cat_cafe.model.Reservation;
import cat_cafe.model.StatutCommande;
import jakarta.transaction.Transactional;


@Service 
@Transactional
public class GerantService {

    IDAOReservation daoReservation;
    IDAOChat daoChat;
    IDAOAssise daoAssise;
    IDAOArticle daoArticle;
    
    IDAOCompte daoCompte;
    IDAOCommande daoCommande;
    IDAODetailCommande daoDetail;

    public GerantService(IDAOCompte daoCompte,IDAOCommande daoCommande,IDAODetailCommande daoDetail,
        IDAOReservation daoReservation,IDAOChat daoChat,IDAOAssise daoAssise,IDAOArticle daoArticle)
    {
        this.daoReservation=daoReservation;
        this.daoChat=daoChat;
        this.daoAssise=daoAssise;
        this.daoArticle=daoArticle;

        this.daoCompte=daoCompte;
        this.daoCommande=daoCommande;
        this.daoDetail = daoDetail;
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

}

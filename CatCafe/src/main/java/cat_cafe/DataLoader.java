package cat_cafe;

import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

//import cat_cafe.dao.IDAOCommande;
//import cat_cafe.model.Commande;
import cat_cafe.dao.IDAOCompte;
import cat_cafe.model.Gerant;
import cat_cafe.model.Serveur;
import cat_cafe.model.Genre;

@Component 
public class DataLoader implements CommandLineRunner{

    public final IDAOCompte daoCompte;
    //public final IDAOCommande daoCommande;

    public DataLoader(IDAOCompte daoCompte){
        this.daoCompte = daoCompte;
        //this.daoCommande = daoCommande;
    }

    @Override 
    public void run(String... args) throws Exception{

        /*Gerant gerant1 = new Gerant(null,"s_matou","miaoudu123","Matou","Sophie",Genre.Femme,2700.0);
        Gerant gerant2 = new Gerant(null,"g_bernard","pizza789","Bernard","Garfield",Genre.Homme,2800.0);

        daoCompte.save(gerant1);
        daoCompte.save(gerant2);

        Serveur serveur1 = new Serveur(null,"e_beaupoil","test123","Beaupoil","Emma",Genre.Femme,1800.0);
        Serveur serveur2 = new Serveur(null,"j_felin","test123","Félin","Jon",Genre.Homme,1850.0);
        Serveur serveur3 = new Serveur(null, "l_griffon","test123","Griffon","Lina",Genre.Femme,1900.0);
        
        daoCompte.save(serveur1);
        daoCompte.save(serveur2);
        daoCompte.save(serveur3);

        //Commande commande1 = new Commande(null,LocalDateTime.now().minusHours(2),true,serveur1);
        //Commande commande2 = new Commande(null,LocalDateTime.now().minusHours(2),true,serveur2);
        //Commande commande3 = new Commande(null,LocalDateTime.now().minusHours(2),true,serveur1);
        //Commande commande4 = new Commande(null,LocalDateTime.now().minusHours(2),true,serveur3);
        //Commande commande5 = new Commande(null,LocalDateTime.now().minusHours(2),true,serveur3);

        //daoCommande.save(commande1);
        //daoCommande.save(commande2);
        //daoCommande.save(commande3);
        //daoCommande.save(commande4);
        //daoCommande.save(commande5);*/

    }

}

package cat_cafe.model;

import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

@Entity 
public class Serveur extends Employe{

    @OneToMany(mappedBy = "serveur")
    private List<Commande> listeCommande;

    public Serveur() {
    }

    public Serveur(Integer id, String login, String password, String nom, String prenom, Genre genre, double salaire) {
        super(id, login, password, nom, prenom, genre, salaire);
    }


    public List<Commande> getListeCommande() {
        return listeCommande;
    }

    public void setListeCommande(List<Commande> listeCommande) {
        this.listeCommande = listeCommande;
    }

    @Override
    public String toString() {
        return "Serveur [id=" + id + ", login=" + login + ", password=" + password + ", nom=" + nom + ", prenom="
                + prenom + ", genre=" + genre + "]";
    }

    

}

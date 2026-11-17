package cat_cafe.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity 
public class Gerant extends Employe{
    
    public Gerant(Integer id, String nom, String prenom, Genre genre, String login, String password, double salaire) {
        super(id, nom, prenom, genre, login, password, salaire);
    }

    public Gerant() {
    }


    @Override
    public String toString() {
        return "Gerant []";
    }

    
    
}

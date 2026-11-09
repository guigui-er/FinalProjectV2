package cat_cafe.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity 
public class Gerant extends Employe{

    public Gerant(Integer id, String login, String password, String nom, String prenom, Genre civilite,
            Double salaire) {
        super(id, login, password, nom, prenom, civilite, salaire);
    }
    

    public Gerant() {
    }


    @Override
    public String toString() {
        return "Gerant []";
    }

    
    
}

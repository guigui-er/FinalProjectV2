package cat_cafe.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public abstract class Employe extends Compte {

    @Column(length = 30,unique = true)
	protected String login;

    @Column(length = 60)
	protected String password;

    protected double salaire;


    public Employe(Integer id, String nom, String prenom, Genre genre, String login, String password, double salaire) {
        super(id, nom, prenom, genre);
        this.login = login;
        this.password = password;
        this.salaire = salaire;
    }

    public Employe(){}

    public double getSalaire() {
        return salaire;
    }

    public void setSalaire(double salaire) {
        this.salaire = salaire;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    
    

}

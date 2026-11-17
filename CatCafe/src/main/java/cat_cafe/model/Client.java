package cat_cafe.model;

import jakarta.persistence.Entity;

@Entity
public class Client extends  Compte{

    public Client(Integer id, String nom, String prenom, Genre genre) {
        super(id, nom, prenom, genre);
        //TODO Auto-generated constructor stub
    }
    public Client(){}

	@Override
	public String toString() {
		return "Client [id=" + id + ", nom=" + nom + ", prenom="
				+ prenom + ", genre=" + genre + "]";
	}


}

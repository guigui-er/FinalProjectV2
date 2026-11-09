package cat_cafe.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import cat_cafe.model.Client;
import cat_cafe.model.Compte;
import cat_cafe.model.Gerant;
import cat_cafe.model.Serveur;

public interface IDAOCompte extends JpaRepository<Compte,Integer> {
	@Query("FROM Client")
	public List<Client> findAllClients(); 

	@Query("FROM Serveur")
	public List<Serveur> findAllServeurs(); 

	@Query("FROM Gerant")
	public List<Gerant> findAllGerants(); 
	
	public Compte findByLoginAndPassword(String login,String password);

}

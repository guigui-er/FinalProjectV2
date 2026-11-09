package cat_cafe.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import cat_cafe.model.Client;
import cat_cafe.model.Compte;

public interface IDAOCompte extends JpaRepository<Compte,Integer> {
	@Query("FROM Client")
	public List<Client> findAllClients(); 
	
	public Client findByLoginAndPassword(String login,String password);

}

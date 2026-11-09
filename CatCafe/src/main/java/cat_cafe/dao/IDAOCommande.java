package cat_cafe.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import cat_cafe.model.Commande;

public interface IDAOCommande extends JpaRepository<Commande, Integer> {

}

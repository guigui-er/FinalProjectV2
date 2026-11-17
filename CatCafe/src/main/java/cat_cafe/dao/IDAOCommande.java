package cat_cafe.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import cat_cafe.model.Commande;
import cat_cafe.model.StatutCommande;

public interface IDAOCommande extends JpaRepository<Commande, Integer> {

    List<Commande> findAllByStatutCommande(StatutCommande statutCommande);

    int countByStatutCommande(StatutCommande statutCommande);
}

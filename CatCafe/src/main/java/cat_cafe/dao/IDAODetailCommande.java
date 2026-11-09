package cat_cafe.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import cat_cafe.model.DetailCommande;

public interface IDAODetailCommande extends JpaRepository<DetailCommande, Integer> {

}
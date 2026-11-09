package cat_cafe.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import cat_cafe.model.Serveur;

public interface IDAOServeur extends JpaRepository<Serveur,Integer>{

}

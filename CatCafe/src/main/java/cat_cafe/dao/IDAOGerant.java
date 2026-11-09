package cat_cafe.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import cat_cafe.model.Gerant;

public interface IDAOGerant extends JpaRepository<Gerant,Integer>{

}

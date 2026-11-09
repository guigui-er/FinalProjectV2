package cat_cafe.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import cat_cafe.model.Boisson;
import java.util.List;


public interface IDAOBoisson extends JpaRepository<Boisson, Integer>{

    public List<Boisson> findByChaudTrue ();

    public List<Boisson> findByChaudFalse ();

}




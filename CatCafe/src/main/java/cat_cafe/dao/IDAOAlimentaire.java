package cat_cafe.dao;

import cat_cafe.model.Alimentaire;
import cat_cafe.model.TypeAliment;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface IDAOAlimentaire extends JpaRepository<Alimentaire, Integer>{

    public List<Alimentaire> findByType(TypeAliment type);

}

package cat_cafe.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import cat_cafe.model.Employe;
import cat_cafe.model.Gerant;

public interface IDAOEmploye extends JpaRepository<Employe,Integer>{
    public Employe findByLoginAndPassword(String login,String password);

    public Optional<Gerant> findByLogin(String login);

    
}

package cat_cafe.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import cat_cafe.model.Employe;

public interface IDAOEmploye extends JpaRepository<Employe,Integer>{
    public Employe findByLoginAndPassword(String login,String password);
}

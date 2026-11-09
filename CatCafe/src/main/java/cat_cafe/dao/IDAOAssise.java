package cat_cafe.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cat_cafe.model.Assise;

public interface IDAOAssise extends JpaRepository<Assise, Integer> {
    List<Assise> findByCompletFalse();
    List<Assise> findByCompletFalseAndCapaciteGreaterThanEqual(int capacite);
}

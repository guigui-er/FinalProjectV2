package cat_cafe.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import cat_cafe.model.Assise;

public interface IDAOAssise extends JpaRepository<Assise, Integer> {
    // Toutes les tables libres/ ayant une capacite > x
}

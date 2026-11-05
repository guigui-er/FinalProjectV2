package dao;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Assise;

public interface IDAOAssise extends JpaRepository<Assise, Integer> {
    // Toutes les tables libres/ ayant une capacite > x
}

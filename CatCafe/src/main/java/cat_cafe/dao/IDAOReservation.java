package cat_cafe.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cat_cafe.model.Reservation;

public interface IDAOReservation extends JpaRepository<Reservation,Integer>{
    Optional<Reservation> findByAssiseId(Integer idAssise);
}

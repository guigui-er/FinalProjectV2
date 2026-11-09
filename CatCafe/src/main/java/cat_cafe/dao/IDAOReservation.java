package cat_cafe.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cat_cafe.model.Reservation;

public interface IDAOReservation extends JpaRepository<Reservation,Integer>{
    public List<Reservation> findAllByAssiseId(Integer idAssise);
}

package cat_cafe.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import cat_cafe.dao.IDAOAssise;
import cat_cafe.dao.IDAOReservation;
import cat_cafe.model.Assise;
import cat_cafe.model.Reservation;

@Service
public class ReservationService {

    @Autowired
    private IDAOReservation dao;

    @Autowired
    private IDAOAssise daoAssise;

    @Transactional(readOnly = true)
    public List<Reservation> trouverTous() {
        return dao.findAll();
    }

    @Transactional(readOnly = true)
    public Reservation trouverParId(Integer id) {
        return dao.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Réservation inconnue"));
    }

    @Transactional
    public Reservation creer(Reservation reservation) {
        Assise assise = chargerAssise(reservation);

        if (assise.isComplet()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Assise déjà occupée");
        }
        verifierCapacite(reservation, assise);

        reservation.setAssise(assise);
        assise.setComplet(true);
        daoAssise.save(assise);

        return dao.save(reservation);
    }

    @Transactional
    public Reservation modifier(Integer id, Reservation donnees) {
        Reservation existante = trouverParId(id);
        Assise nouvelle = chargerAssise(donnees);
        Assise ancienne = existante.getAssise();

        boolean changementAssise = ancienne == null || ancienne.getId() != nouvelle.getId();

        if (changementAssise && nouvelle.isComplet()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Assise déjà occupée");
        }
        verifierCapacite(donnees, nouvelle);

        existante.setDateTime(donnees.getDateTime());
        existante.setNbClient(donnees.getNbClient());

        if (changementAssise) {
            if (ancienne != null) {
                ancienne.setComplet(false);
                daoAssise.save(ancienne);
            }
            nouvelle.setComplet(true);
            daoAssise.save(nouvelle);
            existante.setAssise(nouvelle);
        }

        return dao.save(existante);
    }

    @Transactional
    public void supprimer(Integer id) {
        Reservation reservation = trouverParId(id);
        Assise assise = reservation.getAssise();

        dao.delete(reservation);

        if (assise != null) {
            assise.setComplet(false);
            daoAssise.save(assise);
        }
    }

    private Assise chargerAssise(Reservation reservation) {
        if (reservation.getAssise() == null || reservation.getAssise().getId() == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Assise obligatoire");
        }
        return daoAssise.findById(reservation.getAssise().getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Assise inconnue"));
    }

    private void verifierCapacite(Reservation reservation, Assise assise) {
        if (reservation.getNbClient() > assise.getCapacite()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Capacité de l'assise dépassée");
        }
    }
}
package cat_cafe.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import cat_cafe.dao.IDAOAssise;
import cat_cafe.dao.IDAOReservation;
import cat_cafe.model.Assise;
import cat_cafe.model.Reservation;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

    @Mock IDAOReservation dao;
    @Mock IDAOAssise daoAssise;

    @InjectMocks ReservationService service;

    @Test
    void trouverParId_ok() {
        Reservation r = new Reservation();
        r.setId(1);
        when(dao.findById(1)).thenReturn(Optional.of(r));

        assertEquals(r, service.trouverParId(1));
    }

    @Test
    void trouverParId_inconnu_erreur() {
        when(dao.findById(1)).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> service.trouverParId(1));
    }

    @Test
    void creer_ok() {
        Assise a = new Assise();
        a.setId(1);
        a.setCapacite(4);
        a.setComplet(false);

        Reservation r = new Reservation();
        r.setAssise(a);
        r.setNbClient(2);

        when(daoAssise.findById(1)).thenReturn(Optional.of(a));
        when(dao.save(r)).thenReturn(r);

        Reservation res = service.creer(r);

        assertTrue(a.isComplet());
        assertEquals(r, res);
    }

    @Test
    void creer_assiseOccupee_erreur() {
        Assise a = new Assise();
        a.setId(1);
        a.setCapacite(4);
        a.setComplet(true);

        Reservation r = new Reservation();
        r.setAssise(a);
        r.setNbClient(2);

        when(daoAssise.findById(1)).thenReturn(Optional.of(a));

        assertThrows(ResponseStatusException.class, () -> service.creer(r));
    }

    @Test
    void modifier_changementAssise_ok() {
        Assise ancienne = new Assise();
        ancienne.setId(1);
        ancienne.setComplet(true);

        Assise nouvelle = new Assise();
        nouvelle.setId(2);
        nouvelle.setCapacite(4);
        nouvelle.setComplet(false);

        Reservation existante = new Reservation();
        existante.setId(10);
        existante.setAssise(ancienne);

        Reservation maj = new Reservation();
        maj.setAssise(nouvelle);
        maj.setNbClient(3);
        maj.setDateTime(LocalDateTime.now());

        when(dao.findById(10)).thenReturn(Optional.of(existante));
        when(daoAssise.findById(2)).thenReturn(Optional.of(nouvelle));
        when(dao.save(existante)).thenReturn(existante);

        service.modifier(10, maj);

        assertFalse(ancienne.isComplet());
        assertTrue(nouvelle.isComplet());
        assertEquals(nouvelle, existante.getAssise());
    }

    @Test
    void liberer_ok() {
        Assise a = new Assise();
        a.setId(1);
        a.setComplet(true);

        Reservation r = new Reservation();
        r.setId(5);
        r.setAssise(a);

        when(dao.findById(5)).thenReturn(Optional.of(r));

        service.liberer(5);

        assertFalse(a.isComplet());
    }

    @Test
    void supprimer_ok() {
        service.supprimer(3);

        verify(daoAssise).deleteById(3);
    }
}

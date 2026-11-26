package cat_cafe.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import cat_cafe.dao.IDAOArticle;
import cat_cafe.dao.IDAOAssise;
import cat_cafe.dao.IDAOCommande;
import cat_cafe.dao.IDAOReservation;
import cat_cafe.model.Assise;
import cat_cafe.model.Commande;
import cat_cafe.model.DetailCommande;
import cat_cafe.model.Reservation;
import cat_cafe.model.StatutCommande;

@ExtendWith (MockitoExtension.class)
class GerantServiceTest {

    @Mock IDAOReservation daoReservation;
    @Mock IDAOAssise daoAssise;
    @Mock IDAOArticle daoArticle;
    @Mock IDAOCommande daoCommande;

    @InjectMocks GerantService service;

    @Test
    void montantEnCaisse_ok() {
        DetailCommande d = new DetailCommande();
        d.setPrix(10.0);
        d.setQte(2);

        Commande c = new Commande();
        c.setStatutCommande(StatutCommande.Terminee);
        c.setAccepter_paiement(true);
        c.setDate(LocalDateTime.now());
        c.setDetails(List.of(d));

        when(daoCommande.findAll()).thenReturn(List.of(c));

        assertEquals(20.0, service.montantEnCaisse());
    }

    @Test
    void nbCommandesEnCours_ok() {
        when(daoCommande.countByStatutCommande(StatutCommande.En_cours)).thenReturn(4);

        assertEquals(4, service.nbCommandesEnCours());
    }

    @Test
    void nbClientsEtTablesOccupees_ok() {
        Assise a = new Assise();
        a.setId(1);
        a.setComplet(true);

        Reservation r = new Reservation();
        r.setId(10);
        r.setNbClient(3);

        when(daoAssise.findAll()).thenReturn(List.of(a));
        when(daoReservation.findByAssiseIdOrderByDateTimeDesc(1)).thenReturn(List.of(r));
        when(daoCommande.findByReservationId(10)).thenReturn(List.of());

        assertEquals(3, service.nbClientsPresents());
        assertEquals(1, service.nbTablesOccupees());
    }

    @Test
    void trouverReservation_vide_retourneNull() {
        Assise a = new Assise();
        a.setId(1);
        when(daoReservation.findByAssiseIdOrderByDateTimeDesc(1)).thenReturn(List.of());

        assertNull(service.trouverReservation(a));
    }
}

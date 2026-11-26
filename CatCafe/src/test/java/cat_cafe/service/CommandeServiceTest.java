package cat_cafe.service;

import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

// pour programmer et vérifier les mocks
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.never;
import static org.mockito.ArgumentMatchers.any;

// assertions JUnit
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

// tes classes
import cat_cafe.dao.IDAOCommande;
import cat_cafe.model.Commande;
import cat_cafe.model.DetailCommande;
import cat_cafe.model.Reservation;
import cat_cafe.model.StatutCommande;

@ExtendWith(MockitoExtension.class)
class CommandeServiceTest {

    @Mock private IDAOCommande daoCommande;
    @Mock private ReservationService reservationService;
    @InjectMocks private CommandeService commandeService;

    @Test
    void calculerPrixTotal_shouldSumPriceTimesQuantityOfEachDetail() {

        DetailCommande cafe = new DetailCommande();
        cafe.setPrix(3.50);
        cafe.setQte(2);

        DetailCommande gateau = new DetailCommande();
        gateau.setPrix(4.20);
        gateau.setQte(1);

        Commande commande = new Commande();
        commande.setDetails(List.of(cafe, gateau));

        double total = commandeService.calculerPrixTotal(commande);

        // Delta obligatoire avec les double
        assertEquals(11.20, total, 0.001);
    }

    @Test
    void changerStatut_shouldThrowConflict_whenCommandeAlreadyTerminee() {

        Commande commande = new Commande();
        commande.setStatutCommande(StatutCommande.Terminee);

        when(daoCommande.findById(1)).thenReturn(Optional.of(commande));

        
        ResponseStatusException ex = assertThrows(
            ResponseStatusException.class,
            () -> commandeService.changerStatut(1, StatutCommande.En_cours)
        );
        assertEquals(HttpStatus.CONFLICT, ex.getStatusCode());

        // Les effets de bord qui ne doivent PAS avoir lieu
        verify(daoCommande, never()).save(any());
        verify(reservationService, never()).liberer(any());
    }

    @Test
    void changerStatut_shouldNotThrowConflict_whenCommandeGoFromEnCoursToTermine() {
        
        Reservation reservation = new Reservation();
        reservation.setId(1);

        Commande commande = new Commande();
        commande.setStatutCommande(StatutCommande.En_cours);
        commande.setReservation(reservation);

        when(daoCommande.findById(1)).thenReturn(Optional.of(commande));
        when(daoCommande.save(commande)).thenReturn(commande);

        
        Commande resultat = commandeService.changerStatut(1, StatutCommande.Terminee);

        
        assertEquals(StatutCommande.Terminee, resultat.getStatutCommande());

        // Effets de bord attendus
        verify(daoCommande).save(commande);
        verify(reservationService).liberer(1);
    }

}
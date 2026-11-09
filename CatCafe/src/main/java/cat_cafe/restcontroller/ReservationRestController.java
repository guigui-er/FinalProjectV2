package cat_cafe.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import cat_cafe.model.Reservation;
import cat_cafe.service.ReservationService;

@RestController
@RequestMapping("/api/reservation")
public class ReservationRestController {

    @Autowired
    private ReservationService service;

    @GetMapping
    public List<Reservation> afficherTous() {
        return service.trouverTous();
    }

    @GetMapping("/{id}")
    public Reservation afficherParId(@PathVariable Integer id) {
        return service.trouverParId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation ajouter(@RequestBody Reservation reservation) {
        return service.creer(reservation);
    }

    @PutMapping("/{id}")
    public Reservation modifier(@PathVariable Integer id, @RequestBody Reservation reservation) {
        return service.modifier(id, reservation);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void supprimer(@PathVariable Integer id) {
        service.supprimer(id);
    }
}
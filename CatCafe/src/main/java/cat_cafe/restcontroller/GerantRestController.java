package cat_cafe.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cat_cafe.dao.IDAOAssise;
import cat_cafe.dao.IDAOChat;
import cat_cafe.dao.IDAOCommande;
import cat_cafe.dao.IDAOCompte;
import cat_cafe.dao.IDAOReservation;
import cat_cafe.dto.response.GerantResponse;
import cat_cafe.dto.response.StatsGerantResponse;
import cat_cafe.dto.response.TableAssisesResponse;
import cat_cafe.dto.response.TableReservationsResponse;
import cat_cafe.model.Chat;
import cat_cafe.model.Commande;
import cat_cafe.model.Gerant;
import cat_cafe.model.Reservation;
import cat_cafe.service.CommandeService;
import cat_cafe.service.GerantService;
import cat_cafe.service.ReservationService;
import jakarta.transaction.Transactional;

import org.springframework.web.bind.annotation.RequestParam;


    
@RestController 
@CrossOrigin("*")
@RequestMapping("/api/gerant")
public class GerantRestController {

    private GerantService gerantService;
    private CommandeService commandeService;
    private IDAOAssise daoAssise;
    private IDAOReservation daoReservation;

    public GerantRestController(GerantService gerantService, CommandeService commandeService, IDAOAssise daoAssise, IDAOReservation daoReservation){
        this.gerantService=gerantService;
        this.commandeService=commandeService;
        this.daoAssise= daoAssise;
        this.daoReservation = daoReservation;
    }
    
    @GetMapping("/stats")
    public StatsGerantResponse stats() {
        return gerantService.stats();

    }

    @GetMapping("/etattable")
    public List<TableAssisesResponse> findAllAssisesResponse(){
        return this.daoAssise.findAll()
        .stream()
        .map(assise -> {
            Reservation reservation = gerantService.trouverReservation(assise);
            Commande commande = gerantService.trouverCommandeTable(reservation);
            if (commande == null) {
                reservation = null;
            }
            return TableAssisesResponse.convert(assise, reservation, commande);
        })
        .toList();
    }

    @Transactional 
    @GetMapping("/etatreservation")
    public List<TableReservationsResponse> findAllReservationsResponse(){
        return this.daoReservation.findAll()
        .stream()
        .map(reservation -> {
            Commande commande = gerantService.trouverCommandeReservation(reservation);
            double prixTotal = (commande != null) ? commandeService.calculerPrixTotal(commande) : 0.0;
            return TableReservationsResponse.convert(reservation,commande,prixTotal);
        })
        .toList();
    }

}



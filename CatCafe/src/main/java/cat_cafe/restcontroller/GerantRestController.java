package cat_cafe.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import cat_cafe.dao.IDAOCompte;
import cat_cafe.dao.IDAOReservation;
import cat_cafe.dto.response.GerantResponse;
import cat_cafe.dto.response.StatsGerantResponse;
import cat_cafe.model.Chat;
import cat_cafe.model.Gerant;
import cat_cafe.model.Reservation;
import cat_cafe.service.GerantService;
import cat_cafe.service.ReservationService;

import org.springframework.web.bind.annotation.RequestParam;


    
@RestController 
@RequestMapping("/api/gerant")
public class GerantRestController {

    private GerantService gerantService;

    public GerantRestController(GerantService gerantService){
        this.gerantService=gerantService;
    }
    
    @GetMapping("/stats")
    public StatsGerantResponse stats() {
        return gerantService.stats();

    }

}



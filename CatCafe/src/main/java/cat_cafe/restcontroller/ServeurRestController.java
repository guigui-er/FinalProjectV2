package cat_cafe.restcontroller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cat_cafe.dao.IDAOCompte;

import cat_cafe.dto.response.ServeurResponse;
import cat_cafe.model.Serveur;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController 
@RequestMapping("/api/serveur")
public class ServeurRestController {

    @Autowired
	IDAOCompte dao;
    
   @GetMapping
    public List<ServeurResponse> findAll(){
        return this.dao.findAllServeurs().stream()
        //.map(serveur -> ServeurResponse.convert(serveur))
        .map(ServeurResponse::convert)
        .toList();
    }

    @GetMapping("/{id}")
    public ServeurResponse findById(@PathVariable Integer id){
        Serveur serveur = (Serveur) this.dao.findById(id).orElse(null);
        return ServeurResponse.convert(serveur); 
    }

    @PostMapping
    public ServeurResponse add(@RequestBody Serveur serveur){
        return ServeurResponse.convert(this.dao.save(serveur));
    }

    @PutMapping ("/{id}")
    public ServeurResponse save(@PathVariable Integer id, @RequestBody Serveur serveur){
        serveur.setId(id);
        return ServeurResponse.convert(this.dao.save(serveur));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        this.dao.deleteById(id);
    }
    

}

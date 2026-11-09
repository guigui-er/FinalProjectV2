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

import cat_cafe.dao.IDAOCompte;
import cat_cafe.dto.response.GerantResponse;
import cat_cafe.model.Gerant;

    
@RestController 
@RequestMapping("/api/gerant")
public class GerantRestController {

    @Autowired
	IDAOCompte dao;

    
    @GetMapping
    public List<GerantResponse> findAll(){
        return this.dao.findAllGerants().stream()
        //.map(gerant -> GerantResponse.convert(gerant))
        .map(GerantResponse::convert)
        .toList();
    }

    @GetMapping("/{id}")
    public GerantResponse findById(@PathVariable Integer id){
        Gerant gerant = (Gerant)this.dao.findById(id).orElse(null);
        return GerantResponse.convert(gerant); 
    }

    @PostMapping
    public GerantResponse add(@RequestBody Gerant gerant){
        return GerantResponse.convert(this.dao.save(gerant));
    }

    @PutMapping ("/{id}")
    public GerantResponse save(@PathVariable Integer id, @RequestBody Gerant gerant){
        gerant.setId(id);
        return GerantResponse.convert(this.dao.save(gerant));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        this.dao.deleteById(id);
    }
    

}



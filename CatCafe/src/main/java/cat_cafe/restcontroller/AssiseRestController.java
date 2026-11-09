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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cat_cafe.dao.IDAOAssise;
import cat_cafe.model.Assise;

@RestController 
@RequestMapping ("/api/assise")
public class AssiseRestController {
    @Autowired
	IDAOAssise dao;

    @GetMapping
	public List<Assise> afficherTous() 
	{
	  return dao.findAll();
	}

	@GetMapping("/{id}")
	public Assise afficherParId(@PathVariable Integer id) 
	{
		return  dao.findById(id).orElse(null);
	}
	
	@DeleteMapping("/{id}")
	public void supprimer(@PathVariable Integer id)
	{
		dao.deleteById(id);
	}

	@PostMapping
	public Assise ajouter(@RequestBody Assise assise)
	{
		dao.save(assise);
		return assise;
	}
	
	@PutMapping("/{id}")
	public Assise modifier(@PathVariable Integer id,@RequestBody Assise assise) 
	{
	  assise.setId(id);
      dao.save(assise);
      return assise;
	}

    @GetMapping("/disponibles")
    public List<Assise> afficherDisponibles(@RequestParam(required = false) Integer capacite) {
        if (capacite == null) {
            return dao.findByCompletFalse();
        }
        return dao.findByCompletFalseAndCapaciteGreaterThanEqual(capacite);
    }

}

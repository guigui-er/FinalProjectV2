package cat_cafe.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cat_cafe.dao.IDAOBoisson;
import cat_cafe.model.Boisson;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController 
@RequestMapping ("/api/boissons")
public class BoissonRestController {

    @Autowired 
    IDAOBoisson daoBoisson;

    @GetMapping
    public List<Boisson> afficherTous()
	{
	  return daoBoisson.findAll();
	}

    @GetMapping("/{id}")
	public Boisson afficherParId(@PathVariable Integer id)
	{
		return daoBoisson.findById(id).orElse(null);
	}

     @GetMapping("/chaudes")
	public List<Boisson> afficherBoissonsChaudes()
	{
		return daoBoisson.findByChaudTrue();
	}

    @GetMapping("/froides")
	public List<Boisson> afficherBoissonsFroides()
	{
		return daoBoisson.findByChaudFalse();
	}

    @DeleteMapping("/{id}")
	public void supprimer(@PathVariable Integer id)
	{
		daoBoisson.deleteById(id);
	}

	@PostMapping
	public Boisson ajouter(@RequestBody Boisson boisson)
	{
		daoBoisson.save(boisson);
		return boisson;
	}



    

}

package cat_cafe.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import cat_cafe.dao.IDAOAlimentaire;
import cat_cafe.model.Alimentaire;
import cat_cafe.model.TypeAliment;

public class AlimentaireRestController {

    @Autowired
	IDAOAlimentaire daoAlimentaire;

	@GetMapping
	public List<Alimentaire> afficherTous()
	{
	  return daoAlimentaire.findAll();
	}

	@GetMapping("/{id}")
	public Alimentaire afficherParId(@PathVariable Integer id)
	{
		return daoAlimentaire.findById(id).orElse(null);
	}

    @GetMapping ("/{type}")
    public List<Alimentaire> afficherParType(@PathVariable TypeAliment type)
	{
		return daoAlimentaire.findByType(type);
	}


	@DeleteMapping("/{id}")
	public void supprimer(@PathVariable Integer id)
	{
		daoAlimentaire.deleteById(id);
	}

	@PostMapping
	public Alimentaire ajouter(@RequestBody Alimentaire alimentaire)
	{
		daoAlimentaire.save(alimentaire);
		return alimentaire;
	}

}

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

import cat_cafe.dao.IDAOCommande;
import cat_cafe.model.Commande;

@RestController 
@RequestMapping("/api/commande")
public class CommandeRestController {

    @Autowired 
    IDAOCommande daoCommande;

    @GetMapping
	public List<Commande> afficherTous() 
	{
	  return daoCommande.findAll();
	}

    @GetMapping("/{id}")
	public Commande afficherParId(@PathVariable Integer id)
	{
		return daoCommande.findById(id).orElse(null);
	}

    @DeleteMapping("/{id}")
	public void supprimer(@PathVariable Integer id)
	{
		daoCommande.deleteById(id);
	}

    @PostMapping
	public Commande ajouter(@RequestBody Commande commande)
	{
		daoCommande.save(commande);
		return commande;
	}

    @PutMapping("/{id}")
	public Commande modifier(@PathVariable Integer id,@RequestBody Commande commande)
	{
	  commande.setId(id);
      daoCommande.save(commande);
      return commande;
	}

}

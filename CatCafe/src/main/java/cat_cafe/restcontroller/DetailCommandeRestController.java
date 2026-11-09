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
import cat_cafe.dao.IDAODetailCommande;
import cat_cafe.dto.request.DetailCommandeRequest;
import cat_cafe.dto.response.DetailCommandeResponse;
import cat_cafe.model.Commande;
import cat_cafe.model.DetailCommande;

@RestController 
@RequestMapping("/api/detailCommande")
public class DetailCommandeRestController {

    @Autowired
    IDAODetailCommande daoDetailCommande;

	@Autowired 
	IDAOCommande daoCommande;

     @GetMapping
	public List<DetailCommande> afficherTous() 
	{
	  return daoDetailCommande.findAll();
	}

    @GetMapping("/{id}")
	public DetailCommande afficherParId(@PathVariable Integer id)
	{
		return daoDetailCommande.findById(id).orElse(null);
	}
    
    @DeleteMapping("/{id}")
	public void supprimer(@PathVariable Integer id)
	{
		daoDetailCommande.deleteById(id);
	}

    @PostMapping
	public DetailCommandeResponse ajouter(@RequestBody DetailCommandeRequest detailCommandeRequest)
	{
		DetailCommande detailCommande = new DetailCommande();

		detailCommande.setQte(detailCommandeRequest.qte());
		detailCommande.setPrix(detailCommandeRequest.prix());
		detailCommande.setCommande(this.daoCommande.getReferenceById(detailCommandeRequest.commandeId()));
		daoDetailCommande.save(detailCommande);
		return DetailCommandeResponse.convert(detailCommande);
	
	}

    @PutMapping("/{id}")
	public DetailCommande modifier(@PathVariable Integer id,@RequestBody DetailCommande detailCommande)
	{
	  detailCommande.setId(id);
      daoDetailCommande.save(detailCommande);
      return detailCommande;
	}

}

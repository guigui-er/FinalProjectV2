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

import cat_cafe.dao.IDAOCommande;
import cat_cafe.dto.response.CommandeResponse;
import cat_cafe.dto.response.CommandeResponseV2;
import cat_cafe.model.Commande;
import cat_cafe.model.StatutCommande;
import cat_cafe.service.CommandeService;
import jakarta.transaction.Transactional;

@RestController 
@RequestMapping("/api/commande")
@CrossOrigin(origins = "http://localhost:4200")
public class CommandeRestController {

    @Autowired 
    IDAOCommande daoCommande;

	@Autowired
	CommandeService commandeService;

    @GetMapping
	@Transactional 
	public List<CommandeResponse> afficherTous() 
	{
	  return this.daoCommande.findAll().stream()
	  .map(commande -> CommandeResponse.convert(
    	commande,
    	commandeService.calculerPrixTotal(commande)
		))
	  .toList();
	}

	@GetMapping("/paiementDisponible")
	@Transactional 
	public List<CommandeResponse> afficherToutesLesCommandesEnCoursEtServie() 
	{
	  return this.daoCommande.findAllByStatutCommandeIn(List.of(StatutCommande.En_cours, StatutCommande.Servie)).stream()
	  .map(commande -> CommandeResponse.convert(
    	commande,
    	commandeService.calculerPrixTotal(commande)
    ))
  .toList();
	}
      
	@GetMapping("/allObject")
	@Transactional 
	public List<CommandeResponseV2> afficherTousAvecReservation() 
	{
	  return this.daoCommande.findAll().stream()
	  .map(commande -> CommandeResponseV2.convert(
    	commande,commandeService.calculerPrixTotal(commande)
		))
	  .toList();
	}


    @GetMapping("/{id}")
	@Transactional 
	public CommandeResponse afficherParId(@PathVariable Integer id)
	{
		return daoCommande.findById(id)
		.map(commande -> CommandeResponse.convert(
    	commande,
    	commandeService.calculerPrixTotal(commande)
		))
		.orElse(null);
	}

	

	@GetMapping("/statut/{statut}")
	@Transactional
	public List<CommandeResponse> afficherParStatut(
    @PathVariable StatutCommande statut
	) {
    	return daoCommande.findAllByStatutCommande(statut)
        	.stream()
        	.map(commande -> CommandeResponse.convert(
    		commande,
    		commandeService.calculerPrixTotal(commande)
			))
        	.toList();
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

	@PutMapping("/{id}/statut/{statut}")
	@Transactional
	public CommandeResponse changerStatut(@PathVariable Integer id, @PathVariable StatutCommande statut) {
		Commande commande = commandeService.changerStatut(id, statut);
		return CommandeResponse.convert(commande, commandeService.calculerPrixTotal(commande));
	}

}

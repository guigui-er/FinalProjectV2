package cat_cafe.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cat_cafe.dao.IDAOChat;
import cat_cafe.dao.IDAOCompte;
import cat_cafe.dto.request.ChatAdoptionRequest;
import cat_cafe.dto.response.ChatAdoptionResponse;
import cat_cafe.dto.response.ChatResponse;
import cat_cafe.dto.response.ChatResponse.AdoptableResponse;
import cat_cafe.model.Chat;
import cat_cafe.model.ChatMF;
import cat_cafe.model.Client;
import jakarta.transaction.Transactional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/chat")
@CrossOrigin ("*")
public class ChatRestController {	
    
    @Autowired
	IDAOChat daoChat;

	@Autowired 
	IDAOCompte daoClient;

	// Opérations CRUD basiques

	@GetMapping // TESTÉ POSTMAN
	public List<ChatResponse> afficherTous()
	{
	  return daoChat.findAll()
	  .stream()
	  .map(ChatResponse::convert)
	  .toList();
	}
	
	@GetMapping("/id/{id}") // TESTÉ POSTMAN
	public ChatResponse afficherParId(@PathVariable Integer id)
	{
		return daoChat.findById(id).stream().map(ChatResponse::convert).findFirst().orElse(null);
	}

	@DeleteMapping("/id/{id}") // TESTÉ POSTMAN
	public void supprimer(@PathVariable Integer id)
	{
		daoChat.deleteById(id);
	}

	@PostMapping // TESTÉ POSTMAN
	public ChatResponse ajouter(@RequestBody Chat chat)
	{
	// Vérification que le chat n'existe pas déjà en bdd
		if (daoChat.existsByNomIgnoreCaseAndRaceIgnoreCaseAndAge(chat.getNom(), chat.getRace(), chat.getAge())){
			throw new IllegalArgumentException("Erreur de saisie : un chat avec des attributs identiques existe déjà.");
		}
		daoChat.save(chat);
		return ChatResponse.convert(chat);
	}

	@PutMapping("/id/{id}") // TESTÉ POSTMAN
	public ChatResponse modifier(@PathVariable Integer id,@RequestBody Chat chat)
	{
	  chat.setId(id);
      daoChat.save(chat);
      return ChatResponse.convert(chat);
	}

	@PatchMapping("/id/{id}") // TESTÉ POSTMAN pour modifier le propriétaire insérer un objet Client au format JSON {"id":1,"login":"login1" etc...)}
	public ChatResponse modifierPartiel(@PathVariable Integer id,@RequestBody Chat chat) 
	{

      Chat chatBdd=  (Chat) daoChat.findById(id).orElse(null);

      chatBdd.setNom(chat.getNom()!=null? chat.getNom() : chatBdd.getNom());
	  chatBdd.setRace(chat.getRace()!=null? chat.getRace() : chatBdd.getRace());
	  chatBdd.setSexe(chat.getSexe()!=null? chat.getSexe() : chatBdd.getSexe());
	  chatBdd.setAge(chat.getAge()!=0? chat.getAge() : chatBdd.getAge());
	  chatBdd.setProprietaire(chat.getProprietaire()!=null? chat.getProprietaire() : chatBdd.getProprietaire());

      daoChat.save(chatBdd);
      return ChatResponse.convert(chatBdd);
	}

	// Méthodes spécifiques

	// GET mappingz

	@GetMapping("/nom/{nom}") // TESTÉ POSTMAN
	public List<ChatResponse> chatsParNom(@PathVariable String nom) {

		if(this.daoChat.findByNomIgnoreCase(nom).isEmpty() == true){
			throw new IllegalArgumentException("Aucun chat ne correspond à votre recherche.");
		}
		return daoChat.findByNomIgnoreCase(nom)
			.stream()
			.map(ChatResponse::convert)
			.toList();
	}

	@GetMapping("/sexe/{sexe}") // TESTÉ POSTMAN
	public List<ChatResponse> chatsParSexe(@PathVariable ChatMF sexe) {

		return daoChat.findBySexe(sexe)
			.stream()
			.map(ChatResponse::convert)
			.toList();
	}

	@GetMapping("/age/{age}") // TESTÉ POSTMAN
	public List<ChatResponse> chatsParAge(@PathVariable int age) {
		return daoChat.findByAge(age)
			.stream()
			.map(ChatResponse::convert)
			.toList();
	}

	@GetMapping("/adoptable") // TESTÉ POSTMAN
	public AdoptableResponse chatsAdoptables() {

		List<ChatResponse> chats = daoChat.findByAdoptedFalse()
			.stream()
			.map(ChatResponse::convert)
			.toList();

		Integer nombreAdoptables = daoChat.countByAdoptedFalse();

		return new AdoptableResponse(chats, nombreAdoptables);
	}
	
	// POST mappingz

	@PostMapping("/adopter") // TESTÉ POSTMAN
	@Transactional // chatAdoptionRequest nécessite un idChat et un idClient
	public ChatAdoptionResponse adopterChat(@RequestBody ChatAdoptionRequest chatAdoptionRequest) {

		Chat chat = (Chat) daoChat.findById(chatAdoptionRequest.chatId()).orElse(null);
		Client proprietaire = (Client) daoClient.findById(chatAdoptionRequest.proprietaireId()).orElse(null);
		Chat chatAdoptéBdd = (Chat) daoChat.findAll() // Pour vérifier si un chat a déjà été adopté par le client/la cliente
		.stream() 
		.filter(c -> c.getProprietaire() != null && c.getProprietaire().getId().equals(proprietaire.getId())).findFirst().orElse(null);
		// .filter (chaque chat de la liste -> check s'il y a un propriétaire != null && si un autre chat a pas déjà été adopté par le client/la cliente)
		if (chatAdoptéBdd != null) {
			throw new IllegalArgumentException("Vous ne pouvez adopter qu'un chat de la boutique.");
		}
		
		if (chat == null || proprietaire == null) {
			throw new IllegalArgumentException("Le chat ou le client n'existe pas en base de données.");
		} 

		if (chat.isAdopted()) {
			throw new IllegalArgumentException(chat.getNom() + " a déjà trouvé une nouvelle famille !");
		}
		else {
			chat.setAdopted(true);
			chat.setProprietaire(proprietaire);
			daoChat.save(chat);
   		    return new ChatAdoptionResponse(
			"Félicitations ! Vous avez adopté " + chat.getNom() + " ! Amicalement, l'équipe du Chat Perché :)", // partie message de la response
			ChatResponse.convert(chat));		
		}

	}
}
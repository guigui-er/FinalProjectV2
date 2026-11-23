package cat_cafe.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cat_cafe.dao.IDAOChat;
import cat_cafe.dto.response.ChatResponse;
import cat_cafe.dto.response.ChatResponse.AdoptableResponse;
import cat_cafe.model.Chat;
import cat_cafe.model.ChatMF;




@RestController
@RequestMapping("/api/chat")
public class ChatRestController {	
    
    @Autowired
	IDAOChat daoChat;

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
	public List<ChatResponse> findByNomIgnoreCase(@PathVariable String nom) {

		return daoChat.findByNomIgnoreCase(nom)
			.stream()
			.map(ChatResponse::convert)
			.toList();
	}

	@GetMapping("/sexe/{sexe}") // TESTÉ POSTMAN
	public List<ChatResponse> findBySexe(@PathVariable ChatMF sexe) {

		return daoChat.findBySexe(sexe)
			.stream()
			.map(ChatResponse::convert)
			.toList();
	}

	@GetMapping("/age/{age}") // TESTÉ POSTMAN
	public List<ChatResponse> findByAge(@RequestParam int age) {
		return daoChat.findByAge(age)
			.stream()
			.map(ChatResponse::convert)
			.toList();
	}

	@GetMapping("/adoptable") // TESTÉ POSTMAN
	public AdoptableResponse findAdoptable() {

		List<ChatResponse> chats = daoChat.findByAdoptedFalse()
			.stream()
			.map(ChatResponse::convert)
			.toList();

		Integer nombreAdoptables = daoChat.countByAdoptedFalse();

		return new AdoptableResponse(chats, nombreAdoptables);
	}
	

}



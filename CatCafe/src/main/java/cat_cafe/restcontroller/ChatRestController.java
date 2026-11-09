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
import org.springframework.web.bind.annotation.PatchMapping;


import cat_cafe.dao.IDAOChat;
import cat_cafe.model.Chat;

@RestController
@RequestMapping("/api/chat")
public class ChatRestController {	
    
    @Autowired
	IDAOChat daoChat;

	@GetMapping // TESTÉ POSTMAN
	public List<Chat> afficherTous()
	{
	  return daoChat.findAll();
	}

	@GetMapping("/{id}") // TESTÉ POSTMAN
	public Chat afficherParId(@PathVariable Integer id)
	{
		return daoChat.findById(id).orElse(null);
	}

	@DeleteMapping("/{id}") // TESTÉ POSTMAN
	public void supprimer(@PathVariable Integer id)
	{
		daoChat.deleteById(id);
	}

	@PostMapping // TESTÉ POSTMAN
	public Chat ajouter(@RequestBody Chat chat)
	{
		daoChat.save(chat);
		return chat;
	}

	@PutMapping("/{id}") // TESTÉ POSTMAN
	public Chat modifier(@PathVariable Integer id,@RequestBody Chat chat)
	{
	  chat.setId(id);
      daoChat.save(chat);
      return chat;
	}

	@PatchMapping("/{id}") // TESTÉ POSTMAN
	public Chat modifierPartiel(@PathVariable Integer id,@RequestBody Chat chat) 
	{

      Chat chatBdd=  (Chat) daoChat.findById(id).orElse(null);

      chatBdd.setNom(chat.getNom()!=null? chat.getNom() : chatBdd.getNom());
	  chatBdd.setRace(chat.getRace()!=null? chat.getRace() : chatBdd.getRace());
	  chatBdd.setSexe(chat.getSexe()!=null? chat.getSexe() : chatBdd.getSexe());
	  chatBdd.setAge(chat.getAge()!=0? chat.getAge() : chatBdd.getAge());

      daoChat.save(chatBdd);
      return chatBdd;
	}
}



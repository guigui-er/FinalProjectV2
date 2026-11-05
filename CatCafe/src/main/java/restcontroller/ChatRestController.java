package cafe.restcontroller;

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

import cafe.dao.IDAOChat;
import cafe.model.Chat;

@RestController
@RequestMapping("/api/chat")
public class ChatRestController {	
    
    @Autowired
	IDAOChat daoChat;

	@GetMapping
	public List<Chat> afficherTous()
	{
	  return daoChat.findAll();
	}

	@GetMapping("/{id}")
	public Chat afficherParId(@PathVariable Integer id)
	{
		return daoChat.findById(id).orElse(null);
	}

	@DeleteMapping("/{id}")
	public void supprimer(@PathVariable Integer id)
	{
		daoChat.deleteById(id);
	}

	@PostMapping
	public Chat ajouter(@RequestBody Chat chat)
	{
		daoChat.save(chat);
		return chat;
	}

	@PutMapping("/{id}")
	public Chat modifier(@PathVariable Integer id,@RequestBody Chat chat)
	{
	  chat.setId(id);
      daoChat.save(chat);
      return chat;
	}
}



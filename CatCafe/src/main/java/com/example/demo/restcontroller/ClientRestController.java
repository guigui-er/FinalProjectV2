package com.example.demo.restcontroller;

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

import com.example.demo.dao.IDAOCompte;
import com.example.demo.model.Client;
import com.example.demo.model.Compte;

@RestController 
@RequestMapping ("/api/client")
public class ClientRestController {

    @Autowired
	IDAOCompte dao;
	
	@GetMapping
	public List<Client> afficherTous() 
	{
	  return dao.findAllClients();
	}

	@GetMapping("/{id}")
	public Client afficherParId(@PathVariable Integer id) 
	{
		return (Client) dao.findById(id).orElse(null);
	}
	
	@DeleteMapping("/{id}")
	public void supprimer(@PathVariable Integer id)
	{
		dao.deleteById(id);
	}

	@PostMapping
	public Client ajouter(@RequestBody Client client)
	{
		dao.save(client);
		return client;
	}
	
	@PutMapping("/{id}")
	public Client modifier(@PathVariable Integer id,@RequestBody Client client) 
	{
	  client.setId(id);
      dao.save(client);
      return client;
	}

}

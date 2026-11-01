package com.example.demo.model;

import jakarta.persistence.Entity;

@Entity
public class Client extends  Compte{

    public Client(Integer id, String login, String password, String nom, String prenom, Genre genre) {
        super(id, login, password, nom, prenom, genre);
        //TODO Auto-generated constructor stub
    }
    public Client(){}

	@Override
	public String toString() {
		return "Client [id=" + id + ", login=" + login + ", password=" + password + ", nom=" + nom + ", prenom="
				+ prenom + ", genre=" + genre + "]";
	}

}

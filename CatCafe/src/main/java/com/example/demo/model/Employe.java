package com.example.demo.model;

public abstract class Employe extends Compte {

    protected double salaire;


    public Employe(Integer id, String login, String password, String nom, String prenom, Genre genre, double salaire) {
        super(id, login, password, nom, prenom, genre);
        this.salaire = salaire;
    }

    public double getSalaire() {
        return salaire;
    }

    public void setSalaire(double salaire) {
        this.salaire = salaire;
    }
    

}

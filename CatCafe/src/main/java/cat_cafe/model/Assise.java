package cat_cafe.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity 
public class Assise {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int capacite;
    private boolean complet;

    public Assise(){}

    public Assise(int id, int capacite, boolean complet) {
        this.id = id;
        this.capacite = capacite;
        this.complet = complet;
    }

    public int getId() {
        return id;
    }

    public int getCapacite() {
        return capacite;
    }

    public void setCapacite(int capacite) {
        this.capacite = capacite;
    }

    public boolean isComplet() {
        return complet;
    }

    public void setComplet(boolean complet) {
        this.complet = complet;
    }

}



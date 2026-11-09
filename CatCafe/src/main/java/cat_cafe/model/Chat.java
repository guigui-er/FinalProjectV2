package cat_cafe.model;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="chat")
public class Chat  {

    // Pas besoin de JsonViews ici étant donné que la classe ne partage pas d'attributs avec d'autres ? 
    // Éventuellement pour l'attribut adopted ?

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Column(length = 35,nullable = false)
    protected String nom;

    @Column(length = 35,nullable = false)
    protected String race;

    @Column(length = 25,nullable = false)
    protected long age; // Mettre l'âge en mois et faire une conversion en années avec une division euclidienne

	@Enumerated(EnumType.STRING)
	@Column(name="sexe",nullable = false)
    protected ChatMF sexe; // Faire un enum plutôt ?

    @Column(length = 25,nullable = false)
    protected boolean adopted;
   
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @Column(nullable = false)
    protected LocalDate date_veto;

    @OneToOne
    @JoinColumn(name="proprietaire")
    protected Client proprietaire; 
     
    public Chat() {
    }

    public Chat(Integer id, String nom, String race, ChatMF sexe, long age, boolean adopted, LocalDate date_veto, Client proprietaire) {
        this.adopted = adopted;
        this.age = age;
        this.date_veto = date_veto;
        this.id = id;
        this.nom = nom;
        this.race = race;
        this.sexe = sexe;
        this.proprietaire = proprietaire; // Le chat n'a pas de propriétaire par défaut
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getRace() {
        return race;
    }

    public void setRace(String race) {
        this.race = race;
    }

    public long getAge() {
        return age;
    }

    public void setAge(long age) {
        this.age = age;
    }

    public ChatMF getSexe() {
        return sexe;
    }

    public void setSexe(ChatMF sexe) {
        this.sexe = sexe;
    }

    public boolean isAdopted() {
        return adopted;
    }

    public void setAdopted(boolean adopted) {
        this.adopted = adopted;
    }

    public LocalDate getDate_veto() {
        return date_veto;
    }

    public void setDate_veto(LocalDate date_veto) {
        this.date_veto = date_veto;
    }

    public Client getProprietaire() {
        return proprietaire;
    }

    public void setProprietaire(Client proprietaire) {
        this.proprietaire = proprietaire;
    }

}
    // Faire un toString avec des paramètres évolutifs (age, sexe)
/* 
- id : Integer
- nom : String
- race : string
- age : integer (en année et par quart d'année genre 1,25 1,5 1,75 2)
- sexe : String
- niveau_faim : int (0-100)
- niveau_soif : int (0-100)
- niveau_humeur : int (0-100)
- niveau_sommeil : int (0-100)
- niveau_hygiène : int (0-100)
- niveau_vaccin : double (0-100)
- adopted : bool 
- date_veto : locaDate
*/



package cafe.model;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="chat")
public class Chat  {

    // Pas besoin de JsonViews ici étant donné que la classe ne partage pas d'attributs avec d'autres ? 
    // Éventuellement pour l'attribut adopted ?

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;

    @Column(length = 25,nullable = false)
    protected String nom;

    @Column(length = 25,nullable = false)
    protected String race;


    protected int age; // Mettre l'âge en mois et faire une conversion en années avec une division euclidienne

    protected String sexe; // Faire un enum plutôt ?

    protected boolean adopted;

	@DateTimeFormat(pattern="yyyy-MM-dd")
    protected LocalDate date_veto;

    public Chat() {
    }

    public Chat(Integer id, String nom, String race, String sexe, int age, boolean adopted, LocalDate date_veto) {
        this.adopted = adopted;
        this.age = age;
        this.date_veto = date_veto;
        this.id = id;
        this.nom = nom;
        this.race = race;
        this.sexe = sexe;
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
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


}

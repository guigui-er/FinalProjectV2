package cat_cafe.model;

import java.time.LocalDate;

import org.hibernate.annotations.GeneratedColumn;
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

    @Column(name="age (mois)",nullable = false)
    protected int age; // Mettre l'âge en mois et faire une conversion en années avec une division euclidienne

    @Column(name = "age_annees", nullable = false)
    @GeneratedColumn ("age_mois DIV 12") 
    protected int ageAnnees;

	@Enumerated(EnumType.STRING)
	@Column(name="sexe",nullable = false)
    protected ChatMF sexe; // Faire un enum plutôt ?

    @Column(name = "adopté",nullable = false)
    protected boolean adopted;
   
	@DateTimeFormat(pattern="yyyy-MM-dd")
    @Column(nullable = false)
    protected LocalDate date_veto;

    @OneToOne
    @JoinColumn(name="proprietaire")
    protected Client proprietaire; 

    // Ajouts 16/11 pour la méthode caresser_chat dans le service ChatService

    /* Idée de base : 
    
    - Pas de caresse sur chat endormi

    - Niveau de satisfaction d'un chat évalué par le nombre de caresses 
      reçues et la bouffe plus tard (possibilité de lâcher une petite 
      caresse après manger quand-même).

    - Caractère des chats faisant varier le nombre de caresses avant satisfaction
      (en gros on laisse le chat s'il a déjà été caressé et qu'il est content)

    - Caresses en auto-incrément qui se reset si le chat va dormir ou manger (?)
      et qui permet de gérer la notion de satisfaction du chat (en fonction du caractère)
      (-> un chat réservé prend 3 caresses et est satisfait, un chat sociable en prend 6)
      Une fois que le chat est satisfait on ne peut plus accéder à la méthode caresser pour ne pas le déranger
    */ 

    @Column(nullable = false)
    protected boolean endormi;

    @Column(nullable = false)
    protected boolean satisfait;

    @Column(name = "caresses")
    protected int caresses;

    @Column(name = "caractère", nullable = false)
    protected String caractère;

    public Chat() {
    }

    public Chat(Integer id, String nom, String race, ChatMF sexe, int age, boolean adopted, LocalDate date_veto, Client proprietaire) {
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
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

    public boolean isEndormi() {
        return endormi;
    }

    public void setEndormi(boolean endormi) {
        this.endormi = endormi;
    }

    public boolean isSatisfait() {
        return satisfait;
    }

    public void setSatisfait(boolean satisfait) {
        this.satisfait = satisfait;
    }

    public int getCaresses() {
        return caresses;
    }

    /* // setCaresses de base, modifié pour fitter la méthode caresse
    public void setCaresses(int caresses) {
        this.caresses = caresses;
    }
    */

    public int setCaresses(int caresses) {
        this.caresses = caresses;
        return this.caresses;
    }

    public String getCaractère() {
        return caractère;
    }

    public void setCaractère(String caractère) {
        this.caractère = caractère;
    }

}
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



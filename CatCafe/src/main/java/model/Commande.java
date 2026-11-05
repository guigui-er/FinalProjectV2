package cafe.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Commande {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private LocalDateTime date;
	
	private boolean accepter_paiement;
	
	@Enumerated(EnumType.STRING)
	private StatutCommande statutCommande;
	
	@OneToMany (mappedBy = "commande")
	private List<DetailCommande> details = new ArrayList();
	
	public Commande() {}
	
	public Commande(Integer id, LocalDateTime date, boolean accepter_paiement, StatutCommande statutCommande) {
		this.id = id;
		this.date = date;
		this.accepter_paiement = accepter_paiement;
		this.statutCommande = statutCommande;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public boolean isAccepter_paiement() {
		return accepter_paiement;
	}

	public void setAccepter_paiement(boolean accepter_paiement) {
		this.accepter_paiement = accepter_paiement;
	}

	
	public StatutCommande getStatutCommande() {
		return statutCommande;
	}

	public void setStatutCommande(StatutCommande statutCommande) {
		this.statutCommande = statutCommande;
	}
	

	public List<DetailCommande> getDetails() {
		return details;
	}

	public void setDetails(List<DetailCommande> details) {
		this.details = details;
	}

	@Override
	public String toString() {
		return "Commande [id=" + id + ", date=" + date + ", accepter_paiement=" + accepter_paiement
				+ ", statutCommande=" + statutCommande + "]";
	}
	

}

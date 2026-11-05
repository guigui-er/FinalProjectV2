package cafe.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class DetailCommande {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private int qte;
	
	@Column(columnDefinition = "DECIMAL(4,2)")
	private double prix;
	
	@ManyToOne
	@JoinColumn(name = "commande_id", nullable = false)
	private Commande commande;
	
	public DetailCommande() {}
	
	public DetailCommande(Integer id, int qte, double prix) {
		this.id = id;
		this.qte = qte;
		this.prix = prix;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getQte() {
		return qte;
	}

	public void setQte(int qte) {
		this.qte = qte;
	}

	public double getPrix() {
		return prix;
	}

	public void setPrix(double prix) {
		this.prix = prix;
	}

	@Override
	public String toString() {
		return "DetailCommande [id=" + id + ", qte=" + qte + ", prix=" + prix + "]";
	}
	
	
	
	
}

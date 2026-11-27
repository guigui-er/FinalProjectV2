package cat_cafe.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity 
public class Reservation {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="date_reservation")
    private LocalDateTime dateTime;
    @Column(name="nombre_client")
    private int nbClient;

    @ManyToOne
    @JoinColumn(name="client_id")
    private Client client;

    @ManyToOne 
    @JoinColumn(name="assise_id")
    private Assise assise;

    public Reservation(){}

    // public Reservation(LocalDateTime dateTime, int nbClient) {
    //     this.dateTime = dateTime;
    //     this.nbClient = nbClient;
    // }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public int getNbClient() {
        return nbClient;
    }

    public void setNbClient(int nbClient) {
        this.nbClient = nbClient;
    }

    public Assise getAssise() {
        return assise;
    }

    public void setAssise(Assise assise) {
        this.assise = assise;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }


}

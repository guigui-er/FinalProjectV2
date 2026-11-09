package cat_cafe.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

    @OneToOne
    @JoinColumn(name="assise_id",unique=true)
    private Assise assise;

    public Reservation(){}

    public Reservation(int id, LocalDateTime dateTime, int nbClient) {
        this.id = id;
        this.dateTime = dateTime;
        this.nbClient = nbClient;
    }

    public int getId() {
        return id;
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

}

package cat_cafe;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import cat_cafe.dao.IDAOCompte;
import cat_cafe.model.Client;
import cat_cafe.model.Genre;

@SpringBootApplication
public class CatCafeApplication /*implements CommandLineRunner*/ {

	@Autowired 
	IDAOCompte dao;

	public static void main(String[] args) {
		SpringApplication.run(CatCafeApplication.class, args);
	}

	/*@Override
    public void run(String... args) {          // appelé par Spring, sur une instance → dao est injecté
        Client client1 = new Client(null, "yolo", "eh", "fred", "meid", Genre.Femme);
        Client client2 = new Client(null, "yala", "oh", "Abid", "jordan", Genre.Homme);

		client2.setGenre(Genre.NB);

		System.out.println(dao.findById(1));

		System.out.println(dao.findAllClients());
		System.out.println(dao.findByLoginAndPassword("yala", "oh"));

		dao.save(client1);
		dao.save(client2);

		

        
    }*/

}

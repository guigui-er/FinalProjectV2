package cat_cafe;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CatCafeApplication /*implements CommandLineRunner*/ {


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

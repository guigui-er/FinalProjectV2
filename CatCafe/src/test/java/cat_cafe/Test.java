package cat_cafe;

import cat_cafe.model.Client;
import cat_cafe.model.Genre;

public class Test {
public static void main(String[] args) {
    Client client1= new Client(1, "fred", "meid", Genre.Femme);

Client client2= new Client(2, "Abid", "jordan", Genre.Homme);

    System.out.println(client1);

    
    System.out.println(client2.getId());
    System.out.println(client2.getNom());
    System.out.println(client2.getPrenom());
    System.out.println(client2.getGenre());

    client1.setId(2);
    client1.setNom("aaaaa");
    client1.setPrenom("bbb");
    client1.setGenre(Genre.NB);


    System.out.println(client1);

    


}
}

package com.example.demo;

import com.example.demo.model.Client;
import com.example.demo.model.Genre;

public class Test {
public static void main(String[] args) {
    Client client1= new Client(1, "yolo", "eh", "fred", "meid", Genre.Femme);

Client client2= new Client(2, "yala", "oh", "Abid", "jordan", Genre.Homme);

    System.out.println(client1);

    
    System.out.println(client2.getId());
    System.out.println(client2.getLogin());
    System.out.println(client2.getPassword());
    System.out.println(client2.getNom());
    System.out.println(client2.getPrenom());
    System.out.println(client2.getGenre());

    client1.setId(2);
    client1.setLogin("caca");
    client1.setPassword("pipi");
    client1.setNom("aaaaa");
    client1.setPrenom("bbb");
    client1.setGenre(Genre.NB);


    System.out.println(client1);

    


}
}

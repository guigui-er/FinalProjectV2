package cat_cafe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cat_cafe.dao.IDAOChat;
import cat_cafe.dao.IDAOCompte;
import cat_cafe.model.Chat;

@Service 
public class ChatService {

    @Autowired 
    private IDAOChat daoChat;

    @Autowired 
    private IDAOCompte daoHumain;

    // Méthode caresser : utilisé par les clients, modifie les attributs du Chat
    // Vérifie qu'un chat n'est pas endormi avant de le caresser
    @Transactional 
    public Chat caresserChat(Chat chat) {

        int caresses_chat = chat.getCaresses();
        int caresse       = chat.isEndormi() ? 0 : 1;
        String caresser   = chat.isEndormi() ? "Le chat est endormi, vous ne pouvez pas le caresser." : "Vous caressez le chat, il ronronne joyeusement.";

        chat.setCaresses(caresses_chat + caresse);


        // Passer par un switch avec en case le caractère du chat ?
        return daoChat.save(chat);
    }



}

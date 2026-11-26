package cat_cafe.dto.response;

import java.time.LocalDate;
import java.util.List;

import cat_cafe.model.Chat;
import cat_cafe.model.ChatMF;

public record ChatResponse(

    Integer id,
    String nom,
    String race,
    int age,
    ChatMF sexe,
    boolean adopted,
    LocalDate date_veto,
    Integer proprietaireId,
    String caractère
   
) {

    public static ChatResponse convert(Chat chat) {
        return new ChatResponse(
            chat.getId(),
            chat.getNom(),
            chat.getRace(),
            chat.getAge(),
            chat.getSexe(),
            chat.isAdopted(),
            chat.getDate_veto(),
            chat.getProprietaire() != null ? chat.getProprietaire().getId() : null,
            chat.getCaractère()
            
        );
    }

    public record AdoptableResponse(
    List<ChatResponse> chats,
    Integer nombreAdoptables
) {}

}

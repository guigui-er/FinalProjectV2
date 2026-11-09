package cat_cafe.dto.response;

import cat_cafe.model.Gerant;

public record GerantResponse(
    Integer id,
    String login, // necessaire ??
    String nom,
    String prenom
) {

    public static GerantResponse convert(Gerant gerant){
        return new GerantResponse(
        gerant.getId(),
        gerant.getLogin(),
        gerant.getNom(),
        gerant.getPrenom());
    }

}

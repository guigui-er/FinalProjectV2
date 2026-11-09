package cat_cafe.dto.request;

public record ServeurRequest(
    String login,
    String password,
    String nom,
    String prenom
) {
}

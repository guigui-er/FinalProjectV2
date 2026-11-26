package cat_cafe.dto.response;

public record AuthResponse (boolean success, String token){
 // Rajouter String token pour implementation de la sécurité
}

package cat_cafe.dto.request;
import jakarta.validation.constraints.NotBlank;

public record AuthRequest(
    @NotBlank(message = "L'identifiant est obligatoire")
    String username, 
    @NotBlank(message = "Le mot de passe est obligatoire")
    String password
) {}

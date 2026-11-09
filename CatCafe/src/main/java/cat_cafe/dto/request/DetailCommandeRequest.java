package cat_cafe.dto.request;

public record DetailCommandeRequest(
    
    Integer qte,
    double prix,
    Integer commandeId

) {
    
}

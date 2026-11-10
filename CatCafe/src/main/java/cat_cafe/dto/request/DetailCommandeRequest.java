package cat_cafe.dto.request;

public record DetailCommandeRequest(
    
    int qte,
    double prix,
    Integer commandeId,
    Integer articleId

) {
    
}

package cat_cafe.dto.response;

import cat_cafe.model.DetailCommande;

public record DetailCommandeResponse(
   
    int qte,
    double prix,
    Integer commandeId,
    ArticleResponse article
) {

    public static DetailCommandeResponse convert(DetailCommande detailCommande) {
        Integer commandeId = null;
        ArticleResponse article = null;

        if (detailCommande.getCommande() != null) {
            commandeId = detailCommande.getCommande().getId();
        }

        if (detailCommande.getArticle() != null) {
            article = ArticleResponse.convert(
                detailCommande.getArticle()
            );
        }

        return new DetailCommandeResponse(
        
            detailCommande.getQte(),
            detailCommande.getPrix(),
            commandeId,
            article

        );
    }

}

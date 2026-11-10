package cat_cafe.dto.response;

import cat_cafe.model.DetailCommande;

public record DetailCommandeResponse(
   
    int qte,
    double prix,
    Integer commandeId
) {

    public static DetailCommandeResponse convert(DetailCommande detailCommande) {
        Integer commandeId = null;
       

        if (detailCommande.getCommande() != null) {
            commandeId = detailCommande.getCommande().getId();
        }

        return new DetailCommandeResponse(
        
            detailCommande.getQte(),
            detailCommande.getPrix(),

            commandeId

        );
    }

}

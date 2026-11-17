package cat_cafe.dto.response;

public record StatsGerantResponse(
    double montantEnCaisse,
    int nbCommandesEnCours,
    int nbClientsPresents,
    int nbTablesOccupees
) {
}

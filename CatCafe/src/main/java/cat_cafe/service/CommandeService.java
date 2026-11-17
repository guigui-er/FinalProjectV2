package cat_cafe.service;

import org.springframework.stereotype.Service;

import cat_cafe.model.Commande;

@Service
public class CommandeService {

    public double calculerPrixTotal(Commande commande) {

        return commande.getDetails()
            .stream()
            .mapToDouble(detail -> detail.getPrix() * detail.getQte())
            .sum();
    }
}

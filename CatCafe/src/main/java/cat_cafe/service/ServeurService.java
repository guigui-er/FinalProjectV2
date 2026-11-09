package cat_cafe.service;

import org.springframework.stereotype.Service;

import cat_cafe.dao.IDAOServeur;

@Service 
public class ServeurService {

    private final IDAOServeur daoServeur;

    public ServeurService(IDAOServeur daoServeur){
        this.daoServeur=daoServeur;
    }


    public void prendreCommande(){

    }

    public void apporterCommande(){
        
    }

    public void donnerRegles(){
        
    }
}

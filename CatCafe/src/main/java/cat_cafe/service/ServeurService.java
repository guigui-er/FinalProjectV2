package cat_cafe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cat_cafe.dao.IDAOCompte;

@Service 
public class ServeurService {

    @Autowired 
    IDAOCompte daoCompte;

    public ServeurService(IDAOCompte daoCompte){
        this.daoCompte=daoCompte;
    }


    public void prendreCommande(){

    }

    public void apporterCommande(){
        
    }

    public void donnerRegles(){
        
    }
}

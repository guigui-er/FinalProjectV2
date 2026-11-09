package cat_cafe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cat_cafe.dao.IDAOCompte;


@Service 
public class GerantService {

    @Autowired 
    IDAOCompte daoCompte;

    public GerantService(IDAOCompte daoCompte){
        this.daoCompte=daoCompte;
    }

    public void emmenerVeto(){

    }

    public void remplirGamelle(){

    }

    public void remplirEau(){

    }

    public void nettoyerLitiere(){
        
    }


}

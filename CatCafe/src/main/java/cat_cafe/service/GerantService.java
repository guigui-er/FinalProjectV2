package cat_cafe.service;

import org.springframework.stereotype.Service;

import cat_cafe.dao.IDAOGerant;

@Service 
public class GerantService {

    public final IDAOGerant daoGerant;

    public GerantService(IDAOGerant daoGerant){
        this.daoGerant=daoGerant;
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

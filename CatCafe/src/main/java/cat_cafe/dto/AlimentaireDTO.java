package cat_cafe.dto;

import org.springframework.beans.BeanUtils;

import cat_cafe.model.Alimentaire;
import cat_cafe.model.TypeAliment;

public class AlimentaireDTO {

    private Integer id;
    private double prix;
    private String description; 
    private TypeAliment type;

    public static AlimentaireDTO convert(Alimentaire alimentaire){
        AlimentaireDTO alimentaireDTO =  new AlimentaireDTO();
        BeanUtils.copyProperties(alimentaire, alimentaireDTO);
        return alimentaireDTO;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TypeAliment getType() {
		return type;
	}


	public void setType(TypeAliment type) {
		this.type = type;
	}


}

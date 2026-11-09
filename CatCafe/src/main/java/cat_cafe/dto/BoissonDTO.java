package cat_cafe.dto;

import org.springframework.beans.BeanUtils;

import cat_cafe.model.Boisson;
import cat_cafe.model.FormatBoisson;

public class BoissonDTO {

    private Integer id;
    private double prix;
    private String description; 
    private boolean chaud;
    private FormatBoisson format; 

    public static BoissonDTO convert(Boisson boisson){
        BoissonDTO boissonDTO = new BoissonDTO();
        BeanUtils.copyProperties(boisson, boissonDTO);
        return boissonDTO;
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

    public boolean isChaud() {
        return chaud;
    }

    public void setChaud(boolean chaud) {
        this.chaud = chaud;
    }

   public FormatBoisson getFormat() {
		return format;
	}
	public void setFormat(FormatBoisson format) {
		this.format = format;
	}
    

}


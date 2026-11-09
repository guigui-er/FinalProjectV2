package cat_cafe.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity 
public class Alimentaire extends Article{
	
	@Enumerated(EnumType.STRING)
	@Column(name="type",nullable = false)
	protected TypeAliment type;


	public Alimentaire() {}
	
	public Alimentaire(Integer id, double prix, String description, TypeAliment type) {
		super(id, prix, description);
		this.type = type;
	}


	public TypeAliment getType() {
		return type;
	}


	public void setType(TypeAliment type) {
		this.type = type;
	}


	@Override
	public String toString() {
		return "Alimentaire [type=" + type + "]";
	} 
	
	

}


package cat_cafe.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
public class Boisson extends Article{

	private boolean chaud ;
	
	@Enumerated(EnumType.STRING)
	@Column(name="format")
	protected FormatBoisson format;

	public Boisson() {}

	public Boisson(Integer id, double prix, String description, boolean chaud, FormatBoisson format) {
		super(id, prix, description);
		this.format = format;
		this.chaud= chaud; 
	}
	public boolean isChaud() {
		return chaud;
	}
	public void setChaud(boolean chaud) {
		this.chaud = chaud ;
	}
	public FormatBoisson getFormat() {
		return format;
	}
	public void setFormat(FormatBoisson format) {
		this.format = format;
	}
	@Override
	public String toString() {
		return "Boisson [Chaud=" + chaud + ", format=" + format + "]";
	}
	
	

}

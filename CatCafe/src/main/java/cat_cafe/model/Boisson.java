package cat_cafe.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
public class Boisson extends Article{

	private boolean Chaud ;
	
	@Enumerated(EnumType.STRING)
	@Column(name="format",nullable = false)
	protected FormatBoisson format;

	public Boisson() {}

	public Boisson(Integer id, double prix, String description, boolean chaud, FormatBoisson format) {
		super(id, prix, description);
		Chaud = chaud;
		this.format = format;
	}
	public boolean isChaud() {
		return Chaud;
	}
	public void setChaud(boolean chaud) {
		Chaud = chaud;
	}
	public FormatBoisson getFormat() {
		return format;
	}
	public void setFormat(FormatBoisson format) {
		this.format = format;
	}
	@Override
	public String toString() {
		return "Boisson [Chaud=" + Chaud + ", format=" + format + "]";
	}
	
	

}

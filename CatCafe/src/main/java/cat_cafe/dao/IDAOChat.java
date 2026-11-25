
package cat_cafe.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cat_cafe.model.Chat;
import cat_cafe.model.ChatMF;

public interface IDAOChat extends JpaRepository<Chat,Integer>{
/* 
    public List<Chat> findByNameContaining(String recherche);
	public List<Chat> findAllByOrderByLibelleDesc();
	public Integer countByGonades(String recherche); // Compter le nombre de mâles et de femelles ?
	public Integer countByAge(String recherche); // Compter le nombre de chatons/chats ?*/
	public List<Chat> findByNomIgnoreCase(String nom); // Optional = nom unique pour les chats, mettre en List plutôt
	public List<Chat> findBySexe(ChatMF sexe);
	// public List<Chat> findByEndormiTrue();
	public List<Chat> findByAge(int age);
	public List<Chat> findByAdoptedFalse();
	public Integer countByAdoptedFalse();
	// Pour éviter les doublons 
	public boolean existsByNomIgnoreCaseAndRaceIgnoreCaseAndAge(String nom, String race, int age); 
}

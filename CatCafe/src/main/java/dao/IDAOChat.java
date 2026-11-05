package cafe.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cafe.model.Chat;

public interface IDAOChat extends JpaRepository<Chat,Integer>{

    public List<Chat> findByNameContaining(String recherche);
	public List<Chat> findAllByOrderByLibelleDesc();
	public Integer countByGonades(String recherche); // Compter le nombre de mâles et de femelles ?
	public Integer countByAge(String recherche); // Compter le nombre de chatons/chats ?
}

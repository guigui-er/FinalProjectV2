package cat_cafe.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import cat_cafe.model.Article;

public interface IDAOArticle extends JpaRepository<Article,Integer> {

}

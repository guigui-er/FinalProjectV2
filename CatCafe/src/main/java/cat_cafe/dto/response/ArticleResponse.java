package cat_cafe.dto.response;

import cat_cafe.model.Article;

public record ArticleResponse(Integer id, double prix, String description) {

    public static ArticleResponse convert(Article article) {
        return new ArticleResponse(
            article.getId(),
            article.getPrix(),
            article.getDescription()
        );
    }

}

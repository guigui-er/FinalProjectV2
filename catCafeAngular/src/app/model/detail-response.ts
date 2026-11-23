import { ArticleResponse } from "./article-response";

export interface DetailCommandeResponse {
  qte: number;
  prix: number;
  commandeId: number;
  article: ArticleResponse;
}
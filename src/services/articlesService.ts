import { CreateArticle, UpdateArticle } from '@/types';
import { apiInstance } from '.';


export const ArticleService = {
  async getArticles() {
    try {
      const response = await apiInstance.get('article');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getOneArticle(id: string) {
    try {
      const response = await apiInstance.get(`article/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getArticlesByUserId(id: string) {
    try {
      const response = await apiInstance.get(`article/user/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async addArticle(dto: CreateArticle) {
    try {
      const response = await apiInstance.post(`article`, {
        ...dto,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async removeArticle(id: string) {
    try {
      const response = await apiInstance.delete(`article/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateArticle(id: string, dto: UpdateArticle) {
    try {
      const response = await apiInstance.put(`article/${id}`, {
        ...dto,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

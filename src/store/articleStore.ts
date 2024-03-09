import { create } from 'zustand';
import { ArticleService } from '@/services/articlesService';
import { Article, CreateArticle, UpdateArticle } from '@/types';

type ArticleState = {
  articles: Array<Article>;
  article: Article | null;
  selectedArticle: UpdateArticle | null;
};

type ArticleActions = {
  getArticles: () => Promise<void>;
  getPsychologistArticles: (id: string) => Promise<void>;
  getOneArticle: (id: string) => Promise<void>;
  addArticle: (dto: CreateArticle) => Promise<void>;
  updateArticle: (id: string, dto: UpdateArticle) => Promise<void>;
  removeArticle: (dto: string) => Promise<void>;
  setSelectedArticle: (article: Article) => Promise<void>;
};

const useArticleStore = create<ArticleState & ArticleActions>((set) => ({
  articles: [],
  article: null,
  selectedArticle: null,

  getArticles: async () => {
    try {
      const data = await ArticleService.getArticles();
      set({ articles: data });
    } catch (error) {
      console.error('Error fetching articles data:', error);
    }
  },

  getPsychologistArticles: async (id) => {
    try {
      const data = await ArticleService.getArticlesByUserId(id);
      set({ articles: data });
    } catch (error) {
      console.error('Error fetching articles data:', error);
    }
  },

  getOneArticle: async (id) => {
    try {
      const data = await ArticleService.getOneArticle(id);
      set({ article: data });
    } catch (error) {
      console.error('Error fetching articles data:', error);
    }
  },

  addArticle: async (dto) => {
    try {
      const data = await ArticleService.addArticle(dto);
      set({ article: data });
    } catch (error) {
      console.error('Error fetching articles data:', error);
    }
  },

  updateArticle: async (id, dto) => {
    try {
      const data = await ArticleService.updateArticle(id, dto);
      set({ article: data });
    } catch (error) {
      console.error('Error fetching articles data:', error);
    }
  },

  removeArticle: async (id) => {
    try {
      const data = await ArticleService.removeArticle(id);
      set({ article: data });
    } catch (error) {
      console.error('Error fetching articles data:', error);
    }
  },

  setSelectedArticle: async (article) => {
    try {
      set({ article });
    } catch (error) {
      console.error('Error on select article:', error);
    }
  },
}));

export default useArticleStore;

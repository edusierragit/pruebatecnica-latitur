export interface Author {
  id: number;
  name: string;
  email: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  publicationDate: string;
  author: Author;
}

export interface CreateBlogPostDTO {
  title: string;
  content: string;
  publicationDate: string; // Formato YYYY-MM-DD
  author: number; // ID hardcodeado del autor
}

export interface StrapiResponse<T = any> {
  data: Array<T>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiData {
  id: number;
  attributes: {
    title: string;
    content: string;
    publicationDate: string;
    author: {
      data: {
        id: number;
        attributes: {
          name: string;
          email: string;
        }
      }
    }
  }
} 
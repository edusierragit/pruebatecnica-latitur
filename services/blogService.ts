import { BlogPost, CreateBlogPostDTO } from '../types/blog';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const blogService = {
  async getPosts(): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${API_URL}/api/blog-posts?populate=*`);
      const json = await response.json();
      
      if (!json?.data) return [];

      return json.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        publicationDate: item.publicationDate,
        author: {
          id: item.author.id,
          name: item.author.name,
          email: item.author.email
        }
      }));

    } catch (error) {
      console.error('Error en getPosts:', error);
      return [];
    }
  },

  async createPost(post: CreateBlogPostDTO): Promise<BlogPost> {
    try {
      console.log('Creando post:', post);

      const response = await fetch(`${API_URL}/api/blog-posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: post }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error del servidor:', error);
        throw new Error('Error al crear el post');
      }

      const newPost = await response.json();
      console.log('Post creado:', newPost);

      return {
        id: newPost.id,
        title: newPost.title,
        content: newPost.content,
        publicationDate: newPost.publicationDate,
        author: {
          id: newPost.author.id,
          name: newPost.author.name,
          email: newPost.author.email
        }
      };
    } catch (error) {
      console.error('Error en createPost:', error);
      throw error;
    }
  }
}; 
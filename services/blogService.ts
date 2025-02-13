import { BlogPost, CreateBlogPostDTO } from '../types/blog';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const blogService = {
  async getPosts(): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${API_URL}/api/blog-posts?populate=*`);
      const json = await response.json();
      console.log('GET Response:', JSON.stringify(json, null, 2));
      
      if (!json?.data) return [];

      return json.data.map((item: any) => {
        // Verificamos si el item tiene la estructura correcta
        console.log('Procesando item:', item);

        return {
          id: item.id,
          title: item.title || item.attributes?.title,
          content: item.content || item.attributes?.content,
          publicationDate: item.publicationDate || item.attributes?.publicationDate,
          author: {
            id: item.author?.id || item.attributes?.author?.data?.id || 0,
            name: item.author?.name || item.attributes?.author?.data?.attributes?.name || 'Autor Desconocido',
            email: item.author?.email || item.attributes?.author?.data?.attributes?.email || 'no@email.com'
          }
        };
      });

    } catch (error) {
      console.error('Error en getPosts:', error);
      return [];
    }
  },

  async createPost(post: CreateBlogPostDTO): Promise<BlogPost> {
    try {
      // Estructura según la documentación de Strapi para relaciones
      const requestBody = { 
        data: {
          title: post.title,
          content: post.content,
          publicationDate: post.publicationDate,
          // Relación directa con el autor
          author: 4
        }
      };
      console.log('Request:', {
        url: `${API_URL}/api/blog-posts`,
        method: 'POST',
        body: requestBody
      });

      const response = await fetch(`${API_URL}/api/blog-posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      console.log('Response:', {
        status: response.status,
        ok: response.ok,
        data: responseData
      });

      if (!response.ok) {
        throw new Error(responseData.error?.message || 'Error al crear el post');
      }

      // Mapeamos la respuesta según la estructura que vemos en el GET
      return {
        id: responseData.data.id,
        title: responseData.data.title || responseData.data.attributes.title,
        content: responseData.data.content || responseData.data.attributes.content,
        publicationDate: responseData.data.publicationDate || responseData.data.attributes.publicationDate,
        author: {
          id: 4,
          name: 'Autor de Prueba',
          email: 'autor@test.com'
        }
      };
    } catch (error) {
      console.error('Error en createPost:', error);
      throw error;
    }
  }
}; 
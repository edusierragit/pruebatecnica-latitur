import useSWR from 'swr';
import axios from 'axios';
import { BlogPost } from '../types/blog';
import React from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export function useBlogPosts() {
  const { data, error, mutate } = useSWR(
    `${API_URL}/api/blog-posts?populate=*`,
    fetcher
  );

  const posts = React.useMemo(() => {
    if (!data?.data) {
      console.log('No hay data:', data);
      return [];
    }
    
    console.log('Data raw:', data);
    
    return data.data.map((item: any) => {
      try {
        return {
          id: item.id,
          title: item.title || 'Sin título',
          content: item.content || 'Sin contenido',
          publicationDate: item.publicationDate || new Date().toISOString().split('T')[0],
          author: {
            id: item.author?.id || 4,
            name: item.author?.name || 'Autor de Prueba',
            email: item.author?.email || 'autor@test.com'
          }
        };
      } catch (error) {
        console.error('Error procesando item:', error);
        return null;
      }
    }).filter(Boolean);
  }, [data]);

  return {
    posts,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}

export async function createPost(post: Omit<BlogPost, 'id'>, mutate?: () => void): Promise<any> {
  const response = await axios.post(`${API_URL}/api/blog-posts`, {
    data: {
      title: post.title,
      content: post.content,
      publicationDate: post.publicationDate,
      author: 4
    }
  });

  if (mutate) {
    mutate();
  }

  return response.data;
} 
import useSWR from 'swr';
import axios from 'axios';
import React from 'react';
import { BlogPost, CreateBlogPostDTO, StrapiResponse, StrapiData } from '../types/blog';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

const fetcher = async (url: string): Promise<StrapiResponse<StrapiData>> => {
  const response = await axios.get(url);
  return response.data;
};

export function useBlogPosts(page = 1, pageSize = 6) {
  const { data, error, mutate } = useSWR<StrapiResponse<StrapiData>>(
    `${API_URL}/api/blog-posts?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    fetcher
  );

  const posts = React.useMemo(() => {
    if (!data?.data) {
      console.log('No hay data:', data);
      return [];
    }
    
    console.log('Data raw:', data);
    
    return data.data.map((item: any): BlogPost | null => {
      try {
        console.log('Procesando item:', item);
        
        return {
          id: item.id,
          title: item.title || item.attributes?.title || 'Sin título',
          content: item.content || item.attributes?.content || 'Sin contenido',
          publicationDate: item.publicationDate || item.attributes?.publicationDate || new Date().toISOString().split('T')[0],
          author: {
            id: 4,
            name: 'Autor de Prueba',
            email: 'autor@test.com'
          }
        };
      } catch (error) {
        console.error('Error procesando item:', error);
        console.error('Item con error:', item);
        return null;
      }
    }).filter(Boolean) as BlogPost[];
  }, [data]);

  return {
    posts,
    isLoading: !error && !data,
    isError: error,
    mutate,
    pagination: data?.meta.pagination || {
      page: 1,
      pageSize: 6,
      pageCount: 1,
      total: 0
    }
  };
}

export async function createPost(dto: CreateBlogPostDTO, mutate?: () => void): Promise<any> {
  const response = await axios.post(`${API_URL}/api/blog-posts`, {
    data: {
      title: dto.title,
      content: dto.content,
      publicationDate: dto.publicationDate,
      author: dto.author
    }
  });

  if (mutate) {
    mutate();
  }

  return response.data;
} 
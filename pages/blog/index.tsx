'use client';

import { useBlogPosts } from '../../hooks/useBlogPosts';
import { BlogPost } from '../../types/blog';
import Link from 'next/link';
import { useState } from 'react';

export default function BlogList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, isLoading, isError, pagination } = useBlogPosts(currentPage);
  
  console.log('BlogList render:', { posts, isLoading, isError });

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar los posts</div>;
  if (!posts.length) return <div>No hay posts para mostrar</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Blog Posts ({posts.length})</h1>
          <Link 
            href="/blog/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Nuevo Post
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: BlogPost) => {
            console.log('Renderizando post:', post);
            return (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  {post.title}
                </h2>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="text-sm text-gray-600">
                  <p className="mb-1">
                    <span className="font-medium">Autor:</span> {post.author.name}
                  </p>
                  <p>
                    <span className="font-medium">Fecha:</span>{' '}
                    {new Date(post.publicationDate).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paginación */}
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Anterior
          </button>
          
          <span className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md">
            Página {currentPage} de {pagination.pageCount}
          </span>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(pagination.pageCount, p + 1))}
            disabled={currentPage === pagination.pageCount}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>

        {/* Información de resultados */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Mostrando {posts.length} de {pagination.total} posts
        </div>
      </div>
    </div>
  );
} 
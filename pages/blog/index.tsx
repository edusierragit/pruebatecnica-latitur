'use client';

import { useBlogPosts } from '../../hooks/useBlogPosts';
import { BlogPost } from '../../types/blog';
import Link from 'next/link';

export default function BlogList() {
  const { posts, isLoading, isError } = useBlogPosts();
  
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
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="text-sm text-gray-500">
                  <p>Autor: {post.author.name}</p>
                  <p>Fecha: {new Date(post.publicationDate).toLocaleDateString('es-ES')}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 
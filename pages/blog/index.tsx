import { useEffect, useState } from 'react';
import { BlogPost } from '../../types/blog';
import { blogService } from '../../services/blogService';
import Link from 'next/link';

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Hacemos el fetch directamente aquí para debug
        const response = await fetch('http://localhost:1337/api/blog-posts?populate=*');
        console.log('Response status:', response.status);
        
        const json = await response.json();
        console.log('API Response:', json);

        // Si tenemos datos, los mostramos
        if (json.data) {
          console.log('First item:', json.data[0]);
        }

        // Luego llamamos al servicio normal
        const data = await blogService.getPosts();
        setPosts(data);
      } catch (err) {
        console.error('Error real:', err);
        setError('Error al cargar los posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link 
          href="/blog/new" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Nuevo Post
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-2">{post.content.substring(0, 150)}...</p>
            <div className="text-sm text-gray-500">
              <p>Autor: {post.author.name}</p>
              <p>Fecha: {new Date(post.publicationDate).toLocaleDateString()}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 
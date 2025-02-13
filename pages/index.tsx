import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/blog');
  }, [router]);

  return (
    <div className="p-4">
      <p>Redirigiendo al blog...</p>
    </div>
  );
} 
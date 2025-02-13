'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import Link from 'next/link';
import { createPost, useBlogPosts } from '../../hooks/useBlogPosts';
import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object({
  title: Yup.string()
    .required('El título es requerido')
    .min(3, 'El título debe tener al menos 3 caracteres'),
  content: Yup.string()
    .required('El contenido es requerido')
    .min(10, 'El contenido debe tener al menos 10 caracteres'),
  publicationDate: Yup.date()
    .required('La fecha de publicación es requerida')
});

export default function NewBlogPost() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { mutate } = useBlogPosts();

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      publicationDate: new Date(),
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setSubmitError(null);
        
        const formattedDate = values.publicationDate.toISOString().split('T')[0];
        await createPost({
          title: values.title,
          content: values.content,
          publicationDate: formattedDate,
          author: {
            id: 4,
            name: 'Autor de Prueba',
            email: 'autor@test.com'
          }
        }, mutate);
        
        setSubmitSuccess(true);
        await mutate();
        router.push('/blog');
      } catch (error) {
        console.error('Error:', error);
        setSubmitError('Error al crear el post');
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Crear Nuevo Post</h1>
            <Link 
              href="/blog"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Volver al Blog
            </Link>
          </div>

          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md flex items-center justify-between">
              <span>¡Post creado exitosamente!</span>
              <Link 
                href="/blog"
                className="text-green-800 hover:text-green-900 font-medium"
              >
                Ver todos los posts →
              </Link>
            </div>
          )}

          {submitError && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
              {submitError}
            </div>
          )}

          <form 
            onSubmit={(e) => {
              console.log('Form submitted');
              e.preventDefault();
              formik.handleSubmit(e);
            }} 
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                {...formik.getFieldProps('title')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
              {formik.touched.title && formik.errors.title && (
                <div className="mt-1 text-sm text-red-600">{formik.errors.title}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenido
              </label>
              <textarea
                rows={6}
                {...formik.getFieldProps('content')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
              {formik.touched.content && formik.errors.content && (
                <div className="mt-1 text-sm text-red-600">{formik.errors.content}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Publicación
              </label>
              <DatePicker
                selected={formik.values.publicationDate}
                onChange={(date) => formik.setFieldValue('publicationDate', date)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                dateFormat="yyyy-MM-dd"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                onClick={() => console.log('Button clicked')}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
              >
                {formik.isSubmitting ? 'Creando...' : 'Crear Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
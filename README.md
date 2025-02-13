# Blog Frontend - Next.js + Strapi

## 📋 Descripción
Proyecto de blog que integra un frontend en Next.js con un backend en Strapi, desarrollado como parte de una prueba técnica. Permite listar y crear posts de blog con un sistema de paginación.

## 🚀 Características Principales
- ✨ Listado de posts con paginación
- 📝 Creación de nuevos posts
- 🔄 Actualización automática de la lista
- 📱 Diseño responsive
- ✅ Validación de formularios

## 🛠️ Tecnologías
- Next.js 14.1.0
- TypeScript
- SWR para fetching de datos
- Formik + Yup para formularios
- Tailwind CSS para estilos
- React DatePicker
- Axios

## 🏃‍♂️ Inicio Rápido

1. **Clonar el repositorio**
```bash
git clone <url-repositorio>
cd frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```
Editar `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:1337
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```
Visitar `http://localhost:3000/blog`

## 📁 Estructura del Proyecto
```
frontend/
├── hooks/
│   └── useBlogPosts.ts    # Hook para manejo de posts
├── pages/
│   ├── blog/
│   │   ├── index.tsx      # Lista de posts
│   │   └── new.tsx        # Formulario de creación
│   └── _app.tsx
├── types/
│   └── blog.ts            # Interfaces y tipos
└── package.json
```

## 💡 Funcionalidades Detalladas

### 📋 Listado de Posts (`/blog`)
- Vista en grid responsive (2 columnas en tablet, 3 en desktop)
- Paginación (6 posts por página)
- Actualización automática al crear posts

### ✏️ Creación de Posts (`/blog/new`)
- Formulario validado con Formik y Yup
- Selector de fecha con DatePicker
- Feedback visual de éxito/error
- Redirección automática post-creación

## ⚙️ Configuración Necesaria
- Backend Strapi corriendo en `http://localhost:1337`
- Modelo BlogPost configurado
- Permisos de API habilitados
- ID de autor hardcodeado (4)

## 📝 Notas de Desarrollo
- Uso de SWR para caché y revalidación automática
- DTOs para transformación de datos
- Manejo de errores centralizado
- Tipado estricto con TypeScript

## 👤 Autor
[Tu Nombre]

## 📄 Licencia
MIT

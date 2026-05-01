import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';

// https://astro.build
export default defineConfig({
    image: {
        // Esto permite que las imágenes de tus noticias se carguen correctamente
        domains: ['cdn.sanity.io']
    },
    integrations: [
        sanity({
            // Usamos process.env para que Netlify inyecte las variables correctamente
            projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
            dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
            useCdn: true,
            apiVersion: '2024-03-01', // Versión de API recomendada
            visualEditing: {
                enabled: false // Desactivado por ahora para evitar errores de pre-renderizado
            }
        })
    ],
    vite: {
        plugins: [tailwindcss()],
        server: {
            // Esto evita problemas de conexión en entornos de preview
            allowedHosts: ['.netlify.app']
        }
    },
    server: {
        port: 3000
    }
});

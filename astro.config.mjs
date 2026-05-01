import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite'; // Importación corregida
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';

// Cargamos las variables de entorno de Netlify
const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

export default defineConfig({
    image: {
        domains: ['cdn.sanity.io']
    },
    integrations: [
        sanity({
            // Usamos la constante 'env' que cargamos arriba
            projectId: env.PUBLIC_SANITY_PROJECT_ID,
            dataset: env.PUBLIC_SANITY_DATASET || 'production',
            useCdn: true,
            apiVersion: '2024-03-01',
        })
    ],
    vite: {
        plugins: [tailwindcss()],
        server: {
            allowedHosts: ['.netlify.app']
        }
    }
});

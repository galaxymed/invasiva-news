import { defineConfig, loadEnv } from 'astro/config'; // Importamos loadEnv
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';

// Cargamos las variables de entorno de Netlify manualmente
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

export default defineConfig({
    image: {
        domains: ['cdn.sanity.io']
    },
    integrations: [
        sanity({
            // Ahora usamos las constantes que cargamos arriba
            projectId: PUBLIC_SANITY_PROJECT_ID,
            dataset: PUBLIC_SANITY_DATASET || 'production',
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

import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';

// Cargamos TODAS las posibles variantes de variables
const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

const projectId = env.SANITY_STUDIO_PROJECT_ID || "";
const dataset = env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
    image: {
        domains: ['cdn.sanity.io']
    },
    integrations: [
        sanity({
            projectId: projectId,
            dataset: dataset,
            useCdn: true,
            // Desactivamos esto para asegurar que el build termine
            visualEditing: false 
        })
    ],
    vite: {
        plugins: [tailwindcss()],
        // Forzamos a Vite a reconocer estas variables en cualquier parte del código
        define: {
            'process.env.PUBLIC_SANITY_PROJECT_ID': JSON.stringify(projectId),
            'process.env.PUBLIC_SANITY_DATASET': JSON.stringify(dataset),
        },
        server: {
            allowedHosts: ['.netlify.app']
        }
    }
});

import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

export default defineConfig({
    image: {
        domains: ['cdn.sanity.io']
    },
    integrations: [
        sanity({
            // Intentamos leer PUBLIC primero, si no, usamos el de STUDIO
            projectId: env.PUBLIC_SANITY_PROJECT_ID || env.SANITY_STUDIO_PROJECT_ID,
            dataset: env.PUBLIC_SANITY_DATASET || env.SANITY_STUDIO_DATASET || 'production',
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

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
            projectId: env.PUBLIC_SANITY_PROJECT_ID,
            dataset: env.PUBLIC_SANITY_DATASET || 'production',
            useCdn: true,
            apiVersion: '2024-03-01',
        })
    ],
    vite: {
        plugins: [tailwindcss()],
        // Esto asegura que las variables estén disponibles en el cliente y servidor
        define: {
            'process.env.PUBLIC_SANITY_PROJECT_ID': JSON.stringify(env.PUBLIC_SANITY_PROJECT_ID),
            'process.env.PUBLIC_SANITY_DATASET': JSON.stringify(env.PUBLIC_SANITY_DATASET)
        },
        server: {
            allowedHosts: ['.netlify.app']
        }
    }
});

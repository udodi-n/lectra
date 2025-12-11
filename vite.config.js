import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Lectra",
        short_name: "Lectra",
        start_url: "/",
        display: "standalone",
        background_color: "#1c1c1c",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/lectra-192.png",
            sizes: "192x192",
            type: "image/png",
          },

          {
            src: "/lectra-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    })
  ],
  server: {
    historyApiFallback: true
  }
})

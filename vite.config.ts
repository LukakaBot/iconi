import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    Pages(),
    AutoImport({
      dts: 'src/types/auto-imports.d.ts',
      imports: [
        'vue',
        'vue-router',
      ],
    }),
    Components({
      dts: 'src/types/components.d.ts',
    }),
  ],
})

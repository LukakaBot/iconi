import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'container-wrapper': 'container mx-auto p-4 md:p-5',
    'color-base': 'text-gray-700 dark:text-gray-300',
  },
  presets: [
    presetWind3(),
    presetIcons(),
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})

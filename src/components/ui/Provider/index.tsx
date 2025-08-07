import type { SlotsType } from 'vue'

interface ProviderSlots {
  default?: () => VNode[]
}

export default defineComponent({
  slots: Object as SlotsType<ProviderSlots>,
  render() {
    return <div>{this.$slots.default?.()}</div>
  },
})

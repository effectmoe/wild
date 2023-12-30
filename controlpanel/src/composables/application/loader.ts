
import type { Ref } from 'vue'
export const increment = (counter: Ref<number>) => () => counter.value++
export const decrement = (counter: Ref<number>) => () => counter.value--
export const reset = (counter: Ref<number>) => () => counter.value=0

export const loader = () => {
  const loadingcount = useState('loadingcount', () => (0))
  return {
    loadingcount: readonly(loadingcount),
    showLoading: increment(loadingcount),
    hideLoading: decrement(loadingcount),
    hideLoadingForce: reset(loadingcount),
  }
}

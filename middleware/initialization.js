export default ({ store }) => {
  if (process.client && !store.state.initialized) {
    window.onNuxtReady(() => {
      store.dispatch('init')
    })
  }
}

export const state = () => ({
  currentUser: {}
})

export const mutations = {
  setUser (state, user) {
    state.currentUser = user
  }
}

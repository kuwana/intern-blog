export const state = () => ({
  currentUser: {}
})

export const mutations = {
  setUser (state, user) {
    console.log(user)
    state.currentUser = user
  }
}

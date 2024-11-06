import { supabase } from './../../supabase/supabaseClient'

export default {
  state: {
    userId: null,
    userEmail: null
  },

  mutations: {
    setAuthData(state, { type, data }) {
      state[type] = data
    }
  },

  actions: {
    async logIn({ commit }, { email, password }) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } catch (error) {
        console.error('auth.js logIn()', error)
      }

    },

    async logOut() {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      } catch (error) {
        console.error(error)
      }
    }
  },

  getters: {
    isLoggedIn: (state) => state.userId !== null,
    userEmail: state => state.userEmail,
    userId: state => state.userId
  }
}
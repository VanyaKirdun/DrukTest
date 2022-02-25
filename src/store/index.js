import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: []
  },
  getters: {
    allPosts(state){
      return state.posts.list
    }
  },
  mutations: {
    updatePosts(state, posts){
      state.posts = posts
    }
  },
  actions: {
    async fetchPosts(ctx, limit = 3){
      const res = await fetch('https://api.dev.druk.ua/api/typographies/2/products?limit='+limit);
      const posts = await res.json();
      ctx.commit('updatePosts', posts)
    }
  },
  modules: {
  }
})

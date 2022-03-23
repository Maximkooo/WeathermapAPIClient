import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: 'berlin',
    posts: undefined
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts
      console.log(state.city)
  },
    GET_CITY(state, city){
      state.city = city
      console.log(state.city)
    }
  },
  actions: {
     getPosts({ commit }) {
      Axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + '&appid=8f59285bfd7d9c55b4ed9b2240772491&lang=en&units=metric')
          .then(response => {
              commit('SET_POSTS', response.data)
      }).catch((error) => {
        alert(error);
      });
  } 
    },
  getters: {
    allCity(state){
      return state.posts
    }
  }
});

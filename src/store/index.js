import Vue from 'vue'
import Vuex from 'vuex'
import play from './module/play'
Vue.use(Vuex)

export default new Vuex.Store({

  
  modules: {
    play
  }
})

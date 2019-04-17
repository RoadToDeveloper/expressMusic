import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import tracks from "./modules/tracks.js"

export default new Vuex.Store({
	modules: {
		tracks: tracks	
	}
})

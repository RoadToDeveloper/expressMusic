<template>
	<div id="app">
		
		<app-search></app-search>
		<app-audio	v-for="(track, index) in tracks"
						:url="track.url"
						:artist="track.artist"
						:name="track.name"
						:time="track.time"
						:id="index"
		></app-audio>
		<app-controls></app-controls>
	</div>
</template>

<script>
import appControls from "./components/appControls.vue"
import appAudio from "./components/appAudio.vue"
import appSearch from "./components/appSearch.vue"
import {mapGetters} from "vuex"


export default {
	computed: {
		...mapGetters('tracks', {
			tracks: 'tracks'
		})
	},
 	components: {
 		appControls: appControls,
 		appAudio: appAudio,
 		appSearch: appSearch
 	}
}
</script>

<style lang="sass">
#app	
	height: 100vh
	overflow: hidden
	width: 80%
	position: relative
	margin: 0px auto
</style>

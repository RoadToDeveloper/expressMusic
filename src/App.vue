<template>
	<div id="app">
		<app-controls	:audio="audio"
		></app-controls>
		<app-search></app-search>
		<app-audio	v-for="(track, index) in tracks"
						:url="track.url"
						:artist="track.artist"
						:name="track.name"
						:time="track.time"
		></app-audio>
	</div>
</template>

<script>
import appControls from "./components/appControls.vue"
import appAudio from "./components/appAudio.vue"
import appSearch from "./components/appSearch.vue"
import {mapGetters} from "vuex"


export default {
	data: ()=>({
		audio: new Audio()
	}),
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
	width: 80%
	margin: 0px auto
	padding: 50px 0px 0px 0px
</style>

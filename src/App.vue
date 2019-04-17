<template>
	<div id="app">
		<h2>Express.music</h2>
		<app-search></app-search>
		<div class="audio_wrapper">
			<app-audio	v-for="(track, index) in tracks"
							:url="track.url"
							:artist="track.artist"
							:name="track.name"
							:time="track.time"
							:img="track.img"
							:id="index"
			></app-audio>
		</div>		
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
	background-color: #38406f
	overflow: hidden
	width: 80%
	position: relative
	margin: 0px auto
	padding: 0px
	display: flex
	flex-direction: column
	h2
		color: #fff
		padding-left: 20px
		font-weight: 600
		font-size: 20px
		letter-spacing: 0.5px
		margin: 20px 0px 15px
	.audio_wrapper
		overflow-y: auto
		// height: 600px
		display: flex
		flex-direction: row
		flex-wrap: wrap
		flex: 1
		padding: 0px 20px
		align-content: flex-start
		&::-webkit-scrollbar-thumb
			background-color: rgba(0, 0, 0, 0.2)
		&::-webkit-scrollbar
			background-color: transparent
			width: 4px

</style>

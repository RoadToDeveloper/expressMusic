<template>
	<div id="app">
		<h2>Express.music</h2>
		<div class="app-switch">			
			<label class="col-auto">
				<input type="checkbox" name="internet_search" @input="changeInternetSearchValue($event.target.checked)">
				<i></i>					
			</label>
			<span>Поиск в интернете</span>
		</div>
		<app-search></app-search>
		<div class="audio_wrapper">
			<app-audio	v-for="(track, index) in searchingTracks"
							:url="track.url"
							:artist="track.artist"
							:name="track.name"
							:time="track.time"
							:img="track.img"
							:id="index"
							:key="index"
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
import {mapActions} from "vuex"


export default {
	computed: {
		...mapGetters('tracks', {
			searchingTracks: 'searchingTracks'
		})
	},
	methods: {
		...mapActions('tracks', {
			changeInternetSearchValue: 'changeInternetSearchValue'
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
	width: 100%
	max-width: 1200px
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
	.app-switch
		position: absolute
		top: 20px
		right: 20px
		display: flex
		align-items: center
		color: rgba(255, 255, 255, 0.7)
		span
			margin-left: 5px
			font-weight: 600
		label
			border: 2px solid rgba(255, 216, 0, 0.8)
			border-radius: 50%
			margin-right: 3px
			width: 20px
			box-sizing: border-box
			height: 20px
			padding: 5px
			display: inline-block	
			position: relative
			transition: all 0.4s	
			&:hover
				cursor: pointer			
			i
				width: 100%
				display: inline-block
				height: 100%
				transform: scale(0)
				transition: all 0.4s
				background-color: transparent
				position: absolute
				border-radius: 50%
				transition: all 0.4s
				background-color: rgba(255, 216, 0, 0.8)
				top: 0px
				left: 0px
			input
				visibility: hidden
				position: absolute
			&>input:checked + i
				transform: scale(1.05)
	.audio_wrapper
		overflow-y: auto
		// height: 600px
		display: flex
		flex-direction: row
		flex-wrap: wrap
		flex: 1
		padding: 0px 20px 15px
		align-content: flex-start
		&::-webkit-scrollbar-thumb
			background-color: rgba(0, 0, 0, 0.2)
		&::-webkit-scrollbar
			background-color: transparent
			width: 4px
@media only screen and (max-width : 650px)
	#app h2
		text-align: center
		margin-bottom: 10px
		padding: 0px
	#app .app-switch
		position: relative
		width: 100%
		top: 0px
		right: 0px
		margin-bottom: 10px
		justify-content: center
@media only screen and (max-width : 320px)
	#app
		min-width: 320px
</style>

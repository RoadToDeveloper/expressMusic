<template>
	<div class="audio_item" @click="playTrack">		
		<span class="audio_item-artist">{{ artist }}</span> -
		<span class="audio_item-track">{{ name }}</span>
		<span class="audio_item-time">{{ time }}</span>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	import {mapGetters} from 'vuex'

	export default {
		props: {
			url: {
				type: String
			},
			artist: {
				type: String
			},
			name: {
				type: String
			},
			time: {
				type: String
			}
		},
		data: ()=>({
			play: false
		}),
		computed: {
			...mapGetters('tracks', {
				currentTrack: 'currentTrack'
			})
		},
		methods: {
			...mapMutations('tracks', {
				changeCurrentTrack: 'changeCurrentTrack'
			}),
			playTrack() {
				
				if (this.url === this.currentTrack.url) {
					document.getElementById("sound").pause()
				}
				else {
					this.changeCurrentTrack(this.url);
				} 
			}
		}
	}
</script>

<style lang="sass" scoped>
	.audio_item
		color: rgba(0, 0, 0, 0.7)
		padding: 5px 15px
		background-color: rgba(255, 255, 255, 0.7)
		transition: all 0.4s
		border-radius: 4px
		margin-bottom: 3px
		audio
			display: none
		&-time
			float: right
		&:hover
			cursor: pointer
	.active-audio_item
		background-color: #fff

</style>
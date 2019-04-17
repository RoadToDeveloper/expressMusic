<template>
	<div class="controls">
		<div class="controls-btn">
			<i class="fas fa-step-backward"></i>
			<i class="fas fa-play"></i>
			<i class="fas fa-step-forward"></i>
		</div>
		<div class="controls-time">
			<div class="controls-time-progress"></div>
		</div>
		<div class="controls-volume">
			<div class="controls-volume-progress"></div>
		</div>

		<audio id="sound" controls ref="audio" v-if="newTrack">
			<source :src="trackUrl" type="audio/mp3">			
		</audio>
		<button @click.prevent="currentTime">Время</button>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	
	export default {
		created() {
			console.log(this.audio)
		},
		data: ()=>({
			newTrack: true
		}),
		computed: {
			...mapGetters('tracks', {
				track: 'currentTrack'
			}),
			trackUrl() {
				return this.track.url
			}
		},
		props: {
			audio: {
				type: HTMLAudioElement
			}
		},
		methods: {
			currentTime() {
				console.log(this.$refs.audio.currentTime)
				this.$refs.audio.currentTime += 30
			}
		},
		watch: {
			trackUrl() {
				this.newTrack = false;
				setTimeout(()=>{
					this.newTrack = true;
					console.log(this.track.url);
				},10)
			},
			newTrack() {
				if (this.newTrack == true) {
					setTimeout(()=>{
						this.$refs.audio.play()
					}, 10)
				} 
			}
		}
	}
</script>

<style lang="sass">
	.controls
		display: flex
		justify-content: space-between
		align-items: center
		margin-bottom: 30px
		audio
			display: none
		&-btn
			display: flex
			width: 15%
			justify-content: space-between
			i
				font-size: 20px
				padding: 5px
				&:hover
					cursor: pointer
		&-time, &-volume
			border-radius: 7px
			height: 20px
			background-color: #fff
			border: 1px solid rgba(0, 0, 0, 0.7)
			width: 60%
			&-progress
				border-radius: 7px 0px 0px 7px
				background-color: lightgray
				width: 50%
				height: 100%
		&-volume
			width: 10%
				
</style>
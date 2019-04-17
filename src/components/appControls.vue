<template>
	<div class="controls">
		<div class="controls-btn">
			<i class="fas fa-step-backward" @click="changeTrack({
																				id: currentElemId,
																				type: 'prev'
																			})"
			></i>
			<i class="fas fa-play" 	@click="playTrack" v-if="pause"></i>
			<i class="fas fa-pause" @click="pauseTrack" v-else></i>
			<i class="fas fa-step-forward" @click="changeTrack({
																				id: currentElemId,
																				type: 'next'
																			})"
			></i>			
		</div>
		<div class="controls-info">
			<img class="controls-info-img" :src="tracks[currentElemId].img" alt="">
			<div class="controls-info-names" v-if="currentElemId != null">
				<p class="controls-info-names-track">{{ tracks[currentElemId].name }}</p>
				<p class="controls-info-names-artist">{{ tracks[currentElemId].artist }}</p>
			</div>
			<div class="controls-info-time_wrapper" id="time" @click="changeTrackTime">
				<div class="controls-info-time_wrapper-time">
					<div class="controls-info-time_wrapper-time-progress" id="time_progress"></div>	
					<div class="controls-info-time_wrapper-time-number">
						<span>{{ minutes }}</span> :
						<span>{{ bigSeconds }}</span>
						<span>{{ littleSeconds }}</span>
					</div>
				</div>
				<div class="controls-info-time_wrapper-runner">
					123
				</div>						
			</div>
		</div>
		
		
		<div class="controls-volume_wrapper" id="volume" @click="changeVolume">
			<div class="controls-volume_wrapper-volume">
				<div class="controls-volume_wrapper-volume-progress" id="volume_progress"></div>
			</div>			
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {mapMutations} from 'vuex'
	import {mapActions} from 'vuex'

	export default {
		created() {
			this.currentTrack.src = this.tracks[0].url;
		},
		mounted() {
			this.currentTrack.addEventListener("timeupdate", ()=>{
				this.minutes = Math.floor(this.currentTrack.currentTime / 60);
				this.bigSeconds = Math.floor(this.currentTrack.currentTime % 60 / 10);
				this.littleSeconds = Math.floor(this.currentTrack.currentTime % 60 % 10);
				document.getElementById("time_progress").style.width = `${this.currentTrack.currentTime / this.currentTrack.duration * 100}%`
			});
			this.currentTrack.addEventListener("ended", ()=>{
				this.changeTrack({id: this.currentElemId,type: 'next'});
			});
		},
		data: ()=>({
			currentTime: null,
			minutes: 0,
			bigSeconds: 0,
			littleSeconds: 0
		}),
		computed: {
			...mapGetters('tracks', {
				currentTrack: 'currentTrack',
				pause: 'pause',
				currentElemId: 'currentElemId',
				tracks: 'tracks'
			})
		},
		methods: {
			...mapMutations('tracks', {
				changePause: 'changePause'
			}),
			...mapActions('tracks', {
				changeTrack: 'changeTrack'
			}),
			playTrack() {
				if (this.currentTrack.src.length != 0) {
					this.currentTrack.play();
					this.changePause();
				}				
			},
			pauseTrack() {
				this.currentTrack.pause();
				this.changePause();
			},
			changeTrackTime(e) {
				let width = document.getElementById("time").offsetWidth;
				let currentWidth = e.offsetX;
				this.currentTrack.currentTime = currentWidth / width * this.currentTrack.duration ;
				document.getElementById("time_progress").style.width = `${currentWidth / width * 100}%`
			},
			changeVolume(e) {
				let width = document.getElementById("volume").offsetWidth;
				let currentWidth = e.offsetX;
				this.currentTrack.volume = currentWidth / width ;
				document.getElementById("volume_progress").style.width = `${currentWidth / width * 100}%`
			}
		}
	}
</script>

<style lang="sass">
	.controls
		display: flex
		position: absolute
		bottom: 0px
		padding: 30px 10px 15px
		width: 100%		
		background-color: rgba(38, 43, 85, 0.3)
		flex-direction: row
		justify-content: space-between
		align-items: flex-end
		audio
			display: none
		&-btn
			display: inline-flex
			width: 15%
			justify-content: space-between
			i
				font-size: 20px
				padding: 5px
				color: rgba(255, 255, 255, 0.7)
				&:hover
					cursor: pointer
		&-info
			width: 60%
			display: inline-block
			position: relative
			padding-left: 80px
			&-img
				position: absolute
				height: 100%
				left: 0px
				top: 0px
			&-names
				&-track, &-artist
					margin: 0px
					color: rgba(255, 255, 255, 0.9)
					font-size: 14px
				&-track
					font-weight: 600
					font-size: 14px
					margin-bottom: 5px
		&-info-time_wrapper, &-volume_wrapper
			width: 100%
			padding: 5px 0px 15px 0px
			position: relative
			bottom: -13px
			&-runner
				position: absolute
				bottom: -15px
				opacity: 0
				transition: all 0.3s
				width: 40px
				font-size: 12px
				color: #fff
				padding: 2px 0px
				text-align: center
				border-radius: 4px
				background-color: #262b55
				&:after
					content: ''
					position: absolute
					width: 4px
					height: 4px
					border
					background-color: red
					top: -4px
					left: 18px
			
			&-time, &-volume
				border-radius: 7px
				height: 3px
				background-color: rgba(255, 255, 255, 0.8)
				border: none
				width: 100%
				position: relative				
				&-progress
					border-radius: 7px
					border-radius: 7px
					position: absolute
					top: 0px
					left: 0px
					background-color: #5181b8
					width: 0%
					display: inline-block
					height: 100%
		&-volume_wrapper
			width: 10%
			display: inline-flex
			&-volume-progress
				width: 100%
		&-info-time_wrapper
			&:hover
				cursor: pointer
				.controls-info-time_wrapper-runner
					opacity: 1				
			&-time
				position: relative
				&-number
					position: absolute
					width: 35px
					right: -35px
					top: 0px
					color: rgba(255, 255, 255, 0.7)
					margin-right: 5px
					font-size: 12px
					display: flex
					height: 100%
					align-items: center
					justify-content: flex-end
					span:first-of-type
						margin-right: 1px
					span:nth-of-type(2)
						margin-left: 1px
					span
						width: 7px
						text-align: center

				
</style>
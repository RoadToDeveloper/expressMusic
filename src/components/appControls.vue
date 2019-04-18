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
			<img class="controls-info-img" :src="currentData.img" alt="">			
			<div class="controls-info-names" v-if="currentElemId != null">
				<p class="controls-info-names-track">{{ currentData.name }}</p>
				<p class="controls-info-names-artist">{{ currentData.artist }}</p>
			</div>
		</div>
			
		<i class="controls-volume_icon fas fa-volume-up"></i>	
		<div class="controls-volume_wrapper" id="volume" @click="changeVolume">			
			<div class="controls-volume_wrapper-volume">
				<div class="controls-volume_wrapper-volume-progress" id="volume_progress"></div>
			</div>			
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
		</div>
		
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {mapMutations} from 'vuex'
	import {mapActions} from 'vuex'

	export default {
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
				tracks: 'tracks',
				currentData: 'currentData'
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
					document.getElementById(this.currentElemId).firstChild.children[1].children[0].style.display = "inline";
					document.getElementById(this.currentElemId).firstChild.children[1].children[1].style.display = "none";
					this.changePause();
				}				
			},
			pauseTrack() {
				this.currentTrack.pause();
				this.changePause();
				document.getElementById(this.currentElemId).firstChild.children[1].children[0].style.display = "none";
				document.getElementById(this.currentElemId).firstChild.children[1].children[1].style.display = "inline";
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
		bottom: 0px
		left: 0px
		padding: 5px 15px 5px
		width: 100%	
		box-sizing: border-box
		background-color: rgba(38, 43, 85, 1)
		flex-direction: row
		justify-content: space-between
		align-items: center
		position: relative
		&:hover
			.controls-info-time_wrapper
				height: 18px
				top: -18px
				&-time
					&-number
						opacity: 1
		audio
			display: none
		&-btn
			display: inline-flex
			width: 10%
			padding-right: 15px
			justify-content: space-between
			i
				font-size: 20px
				padding: 5px
				color: rgba(255, 255, 255, 0.7)
				&:hover
					cursor: pointer
		
		&-info
			width: 75%
			display: inline-flex
			position: relative
			&-img
				height: 60px
				margin-right: 10px
			&-names
				display: flex
				align-items: center
				flex-direction: row
				align-content: center
				flex-wrap: wrap
				&-track, &-artist
					display: flex
					margin: 0px
					color: rgba(255, 255, 255, 0.9)
					font-size: 14px
					width: 100%
				&-track
					font-weight: 600
					font-size: 14px
					margin-bottom: 5px
		&-volume_icon
			font-size: 20px
			color: rgba(255, 255, 255, 0.7)
			margin-top: 1px
			padding: 5px
		&-volume_wrapper
			padding: 15px 0px 15px 0px
			display: flex
			align-items: center
			position: relative
			width: 13%
			display: inline-flex
			&:hover
				cursor: pointer
			i
				color: rgba(255, 255, 255, 0.7)
				font-size: 20px
				margin-right: 10px
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
			&-volume
				border-radius: 7px
				height: 7px
				background-color: rgba(255, 255, 255, 0.2)
				border: none
				width: 100%
				position: relative				
				&-progress
					border-radius: 7px
					border-radius: 7px
					position: absolute
					top: 0px
					left: 0px
					background-color: rgba(255,216,0,0.6)
					display: inline-block
					height: 100%
					width: 100%
		&-info-time_wrapper	
			width: 100%
			position: absolute
			height: 5px
			transition: all 0.4s
			background-color: rgba(255,255,255,0.2)
			top: -5px
			left: 0px
			&:hover
				cursor: pointer		
			&-time
				position: relative
				height: 100%
				&-progress
					height: 100%
					width: 0%
					background-color: rgba(255,216,0,0.6)
				&-number
					position: absolute
					user-select: none
					pointer-events: none
					width: 35px
					right: 5px
					display: flex
					opacity: 0
					transition: all 0.3s
					top: 0px
					color: rgba(255, 255, 255, 0.7)
					margin-right: 5px
					font-size: 12px
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
@media only screen and (max-width : 992px)
	.controls-btn
		min-width: 130px
	.controls-volume_wrapper
		min-width: 100px
@media only screen and (max-width : 650px)
	.controls
		flex-wrap: wrap
		justify-content: flex-start
		padding: 15px
		&-btn
			min-width: 100%
			justify-content: center	
			align-items: center
			i:not(:last-of-type)
				margin-right: 25px
			i:nth-of-type(2)
				font-size: 26px
		&-info
			width: auto
		&-volume_wrapper, &-volume_icon
			display: none
</style>
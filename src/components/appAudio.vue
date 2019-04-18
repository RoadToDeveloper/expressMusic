<template>
	<div 	class="audio_item" ref="audio_item" 
			v-show="artist.toLowerCase().indexOf(searchValue) != -1 || name.toLowerCase().indexOf(searchValue) != -1"
			@click="playTrack({
				url: url,
				elem: $refs.audio_item
			})" 
	>		
		<div class="audio_item-img_wrapper">
			<img :src="img" class="audio_item-img_wrapper-img" alt="">
			<span class="audio_item-img_wrapper-icon" id="status">
				<i class="fas fa-pause"></i>
				<i class="fas fa-play"></i>
			</span>
		</div>
		
		<p class="audio_item-names">
			<span class="audio_item-names-track">{{ name }}</span>
			<span class="audio_item-names-artist">{{ artist }}</span>			
		</p>		
		<span class="audio_item-time">{{ time }}</span>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'
	import {mapGetters} from 'vuex'

	export default {
		// mounted() {
		// 	setTimeout(()=>{
		// 		document.getElementById(0).classList.add("active-audio_item");
		// 	}, 100)			
		// },
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
			},
			img: {
				type: String
			}
		},
		computed: {
			...mapGetters('tracks', {
				searchValue: 'searchValue'
			})
		},
		methods: {
			...mapActions('tracks', {
				playTrack: 'playTrack'
			})
		}
	}
</script>

<style lang="sass" scoped>
	.audio_item
		color: rgba(255, 255, 255, 0.7)
		padding: 6px 15px
		background-color: transparent
		border: 2px solid transparent
		transition: all 0s
		border-radius: 4px
		margin-bottom: 3px
		display: flex
		align-items: center
		position: relative
		user-select: none
		font-size: 12px
		width: 100%
		max-height: fit-content
		&-img_wrapper
			position: relative
			&-img
				width: 45px
			&-icon
				position: absolute
				height: 100%
				width: 100%
				top: 0px
				display: none
				left: 0px
				background-color: rgba(0, 0, 0, 0.5)
				align-items: center
				justify-content: center
				i
					font-size: 18px
		&-time
			position: absolute
			right: 15px
		&-names
			display: flex
			flex-direction: row
			flex-wrap: wrap
			margin: 0px
			&-artist, &-track			
				width: 100%
				margin-left: 10px
			&-track
				font-weight: 600
		&:hover
			cursor: pointer
			border-color: rgba(0, 0, 0, 0.2)
	.active-audio_item
		transition: all 0.4s
		background-color: rgba(0, 0, 0, 0.2)
		#status
			display: flex
			i:first-of-type
				display: none
@media only screen and (max-width : 450px)
	.audio_item
		&-names
			flex: 1
		&-time
			position: relative
			width: 40px
			text-align: right
			right: 0px
</style>
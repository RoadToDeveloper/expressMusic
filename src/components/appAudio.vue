<template>
	<div 	class="audio_item" ref="audio_item" 
			v-if="artist.toLowerCase().indexOf(searchValue) != -1 || name.toLowerCase().indexOf(searchValue) != -1"
			@click="playTrack({
				url: url,
				elem: $refs.audio_item
			})" 
	>		
		<img :src="img" class="audio_item-img" alt="">
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
		mounted() {
			document.getElementById(0).classList.add("active-audio_item");
		},
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
		transition: all 0s
		border-radius: 4px
		margin-bottom: 3px
		display: flex
		align-items: center
		position: relative
		user-select: none
		font-size: 12px
		width: 100%
		&-img
			width: 45px
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
	.active-audio_item
		transition: all 0.4s
		background-color: rgba(0, 0, 0, 0.2)

</style>
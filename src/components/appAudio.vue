<template>
	<div 	class="audio_item" ref="audio_item" 
			v-if="artist.toLowerCase().indexOf(searchValue) != -1 || name.toLowerCase().indexOf(searchValue) != -1"
			@click="playTrack({
				url: url,
				elem: $refs.audio_item
			})" 
	>		
		<span class="audio_item-artist">{{ artist }}</span> -
		<span class="audio_item-track">{{ name }}</span>
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
		span
			user-select: none
		&:hover
			cursor: pointer
	.active-audio_item
		background-color: #fff

</style>
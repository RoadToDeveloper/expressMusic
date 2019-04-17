<template>
	<div>
		<input @input="changeSearchValue($event.target.value)" type="text" placeholder="Например: AC/DC">
		<span id="loader"></span>
	</div>
	
</template>

<script>
	import {mapActions} from 'vuex'

	export default {
		methods: {
			...mapActions('tracks', {
				changeSearchValue: 'changeSearchValue'
			})
		}
	}
</script>

<style lang="sass" scoped>
	div
		padding: 0px 20px
		margin-bottom: 10px
		max-width: 100%
		display: flex
		align-items: center
		input
			max-width: 100%
			width: 100%
			box-sizing: border-box
			margin-top: 0px
			border-radius: 15px
			padding: 8px 15px		
			background-color: #262b55
			border: 2px solid transparent
			color: rgba(255, 255, 255, 0.7)
			font-size: 14px
			font-family: "Montserrat"
			outline: none			
			transition: all 0.4s
			&::-webkit-input-placeholder
				color: rgba(255, 255, 255, 0.4)
				font-size: inherit
				font-family: inherit 
			&:hover
				border-color: rgba(255,216,0,0.4)
				cursor: pointer
			&:focus
				border-color: rgba(255,216,0,0.6)
		#loader
			position: absolute
			right: 40px
			border: 3px solid #fff
			border-radius: 50%
			border-right-color: rgba(255, 255, 255, 0)
			border-bottom-color: rgba(255, 255, 255, 0)
			width: 15px
			height: 15px
			animation: rotateLoader 0.7s linear infinite
			opacity: 0
		@keyframes rotateLoader
			0%
				transform: rotate(0deg)
			100%
				transform: rotate(1turn)
			
</style>
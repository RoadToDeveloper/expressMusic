<template>
	<div>
		<input @input="changeSearchValue($event.target.value)" type="search" placeholder="Введите имя исполнителя или название песни">
	</div>
	
</template>

<script>
	import {mapMutations} from 'vuex'

	export default {
		methods: {
			...mapMutations('tracks', {
				changeSearchValue: 'changeSearchValue'
			})
		}
	}
</script>

<style lang="sass" scoped>
	div
		padding: 0px 20px
		margin-bottom: 10px
		input
			width: 100%
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
			
</style>
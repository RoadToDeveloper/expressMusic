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
	input
		width: 100%
		margin-top: 50px
		border-radius: 15px
		padding: 10px 15px
		border: none		
		background-color: #262b55
		color: rgba(255, 255, 255, 0.7)
		font-size: 16px
		font-family: "Montserrat"
		outline: none
		margin-bottom: 30px
		&::-webkit-input-placeholder
			color: inherit
			font-size: inherit
			font-family: inherit 
</style>
export default {
	namespaced: true,
	state: {
		tracks: [
			{
				artist: 'Billie Eilish',
				url: 'https://muzlo.me/get/music/20180804/muzlome_Billie_Eilish_-_you_should_see_me_in_a_crown_57793092.mp3',
				name: 'you should see me in a crown',
				time: '03:01'
			},
			{
				artist: 'Billie Eilish',
				url: 'https://muzlo.me/get/music/20190202/muzlome_Billie_Eilish_-_bury_a_friend_61822134.mp3',
				name: 'bury a friend',
				time: '03:13'
			}
		],
		currentTrack: {
			url: ''
		}
	},
	getters: {
		tracks(state) {
			return state.tracks;
		},
		currentTrack(state) {
			return state.currentTrack;
		}
	},
	mutations: {
		changeCurrentTrack(state, url) {
			state.currentTrack.url = url
		}
	}
}
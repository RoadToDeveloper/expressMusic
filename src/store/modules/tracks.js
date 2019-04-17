import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		defaultTracks: [],
		tracks: [
			{
				artist: 'Billie Eilish',
				url: 'https://muzlo.me/get/music/20180804/muzlome_Billie_Eilish_-_you_should_see_me_in_a_crown_57793092.mp3',
				name: 'you should see me in a crown',
				time: '03:01',
				img: 'https://sun9-29.userapi.com/c855124/v855124720/1054a/WvkYIUsZyvg.jpg'
			},
			{
				artist: 'Billie Eilish',
				url: 'https://muzlo.me/get/music/20190202/muzlome_Billie_Eilish_-_bury_a_friend_61822134.mp3',
				name: 'bury a friend',
				time: '03:13',
				img: 'https://sun9-29.userapi.com/c855124/v855124720/1054a/WvkYIUsZyvg.jpg'
			},
			{
				artist: "Elvis Presley",
				img: "https://muzlo.me/cover/song/47855189.jpg",
				name: "Can't help falling in love",
				time: "01:53",
				url: "https://muzlo.me/get/music/20170830/muzlome_Elvis_Presley_-_Cant_help_falling_in_love_47855189.mp3"
			},
			{
				artist: 'Sofia Reyes',
				url: 'https://muzlo.me/get/music/20170905/muzlome_Sofia_Reyes_-_Dont_Mean_a_Thing_48263913.mp3',
				name: 'Dont Mean a Thing',
				time: '03:14',
				img: 'https://muzlo.me/cover/song/48263913.jpg'
			},
			{
				artist: "The Beatles",
				img: "https://muzlo.me/cover/song/48043760.jpg",
				name: "Hey Jude",
				time: "07:05",
				url: "https://muzlo.me/get/music/20170903/muzlome_The_Beatles_-_Hey_Jude_48043760.mp3",
			},
			{
				artist: "The Beatles",
				img: "https://muzlo.me/cover/song/48043737.jpg",
				name: "Yesterday",
				time: "02:05",
				url: "https://muzlo.me/get/music/20170903/muzlome_The_Beatles_-_Yesterday_48043737.mp3"
			},
			{
				artist: "Elvis Presley",
				img: "https://muzlo.me/cover/song/47855189.jpg",
				name: "Can't help falling in love",
				time: "01:53",
				url: "https://muzlo.me/get/music/20170830/muzlome_Elvis_Presley_-_Cant_help_falling_in_love_47855189.mp3"
			},
			{
				artist: 'Billie Eilish',
				url: 'https://muzlo.me/get/music/20190202/muzlome_Billie_Eilish_-_bury_a_friend_61822134.mp3',
				name: 'bury a friend',
				time: '03:13',
				img: 'https://sun9-29.userapi.com/c855124/v855124720/1054a/WvkYIUsZyvg.jpg'
			},
			{
				artist: 'Sofia Reyes',
				url: 'https://muzlo.me/get/music/20170905/muzlome_Sofia_Reyes_-_Dont_Mean_a_Thing_48263913.mp3',
				name: 'Dont Mean a Thing',
				time: '03:14',
				img: 'https://muzlo.me/cover/song/48263913.jpg'
			},
			{
				artist: "The Beatles",
				img: "https://muzlo.me/cover/song/48043760.jpg",
				name: "Hey Jude",
				time: "07:05",
				url: "https://muzlo.me/get/music/20170903/muzlome_The_Beatles_-_Hey_Jude_48043760.mp3",
			},
			{
				artist: "The Beatles",
				img: "https://muzlo.me/cover/song/48043737.jpg",
				name: "Yesterday",
				time: "02:05",
				url: "https://muzlo.me/get/music/20170903/muzlome_The_Beatles_-_Yesterday_48043737.mp3"
			}
		],
		currentElemId: 0,
		currentTrack: new Audio(),
		pause: true,
		searchValue: '',
		internetSearch: false
	},
	getters: {
		tracks(state) {
			return state.tracks;
		},
		currentTrack(state) {
			return state.currentTrack;
		},
		currentElemId(state) {
			return state.currentElemId
		},
		pause(state) {
			return state.pause;
		},
		searchValue(state) {
			return state.searchValue;
		},
		internetSearch(state) {
			return state.internetSearch;
		}
	},
	mutations: {
		changeCurrentTrack(state, url) {
			state.currentTrack.src = url;
		},
		changePause(state) {
			state.pause = !state.pause
		},
		removeActiveClasses(state) {
			let items = document.getElementsByClassName("audio_item");
			for (let i = 0; i < items.length; i++) {
				items[i].classList.remove("active-audio_item")
			}			
		}			
	},
	actions: {	
		changeInternetSearchValue(store, value) {
			store.state.internetSearch = value;
			if (store.state.internetSearch) {
				store.state.defaultTracks = store.state.tracks;
				if (store.state.searchValue.length >= 3) store.dispatch('getInternetTracks', store.state.searchValue);
			} 
			else store.state.tracks = store.state.defaultTracks
		},
		changeSearchValue(store, value) {
			if (store.state.internetSearch) {
				store.state.searchValue = value.toLowerCase();
				if (value.length >= 3) {
					document.getElementById("loader").style.opacity = 1;
					store.dispatch('getInternetTracks', store.state.searchValue);
					console.log(store.state.searchValue)
				} 				
			}
			else {
				if (value == null) store.state.searchValue = ''
					else store.state.searchValue = value.toLowerCase();
			}			
		},	
		getInternetTracks(store) {
			Vue.http.get(`http://80.78.248.37/?query=${store.state.searchValue}`)
				.then(response => response.json())
	         .then(data => {
	         	console.log(data)
	         	document.getElementById("loader").style.opacity = 0;
	            if (data.length == 0) return;
	            else store.state.tracks = data; 
	         })
	         .catch((error) => {
	         	document.getElementById("loader").style.opacity = 0;
	            return 0;
	         })
		},
		playTrack(store, data) {		
			if (data.elem.id === store.state.currentElemId) {
				if (store.state.currentTrack.paused) {
					store.state.currentTrack.play();
					store.state.pause = false;
					data.elem.firstChild.children[1].children[0].style.display = "inline";
					data.elem.firstChild.children[1].children[1].style.display = "none";
				}
				else {
					store.state.currentTrack.pause();
					store.state.pause = true;
					data.elem.firstChild.children[1].children[1].style.display = "inline";
					data.elem.firstChild.children[1].children[0].style.display = "none";
				} 
				data.elem.classList.add("active-audio_item")
			}
			else {
				store.commit('changeCurrentTrack', data.url);
				data.elem.firstChild.children[1].children[0].style.display = "inline";
				data.elem.firstChild.children[1].children[1].style.display = "none";
				store.state.currentTrack.play();
				store.state.pause = false;
				store.state.currentElemId = data.elem.id;
				store.commit('removeActiveClasses');
				data.elem.classList.add("active-audio_item")				
			} 
		},
		changeTrack(store, data) {
			if (store.state.currentTrack.src.length != 0) {
				let newId;
				if (data.type == 'next') {
					(data.id == store.state.tracks.length - 1) ? newId = 0 : newId = parseInt(data.id) + 1
				} 
					else {
						(data.id == 0) ? newId = parseInt(store.state.tracks.length) - 1 : newId = parseInt(data.id) - 1
					} 
				store.commit('changeCurrentTrack', store.state.tracks[newId].url);
				store.state.currentTrack.play();
				store.state.pause = false;
				store.state.currentElemId = newId;
				let items = document.getElementsByClassName("audio_item");
				store.commit('removeActiveClasses');
				document.getElementById(newId).classList.add("active-audio_item");
				document.getElementById(newId).firstChild.children[1].children[0].style.display = "inline";
				document.getElementById(newId).firstChild.children[1].children[1].style.display = "none";
			}			
		}
	}
}
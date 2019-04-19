import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		defaultTracks: [],
		searchingTracks: [],
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
		currentData: {},
		currentTrack: new Audio(),
		pause: true,
		searchValue: '',
		internetSearch: false
	},
	getters: {
		tracks(state) {
			return state.tracks;
		},
		//этот массив мы и будем использовать для отображения наших треков, чтобы не удалять/добавлять
		//элементы и массива tracks, а это нужно т.к используется сквозная нумерация по id
		searchingTracks(state) {
			if (state.searchValue.length == 0) return state.tracks;
			else return state.searchingTracks;
		},
		currentTrack(state) {
			return state.currentTrack;
		},
		currentElemId(state) {
			return state.currentElemId;
		},
		pause(state) {
			return state.pause;
		},
		searchValue(state) {
			return state.searchValue;
		},
		internetSearch(state) {
			return state.internetSearch;
		},
		currentData(state) {
			return state.currentData;
		}
	},
	mutations: {
		changeCurrentTrack(state, url) {
			state.currentTrack.src = url;
		},
		changePause(state, val) {
			if (val === null) state.pause = !state.pause
				else state.pause = val;
			
		},
		removeActiveClasses() {
			let items = document.getElementsByClassName("audio_item");
			for (let i = 0; i < items.length; i++) {
				items[i].classList.remove("active-audio_item");
			}			
		},
		playTrack(state) {
			state.currentTrack.play();
		},
		pauseTrack(state) {
			state.currentTrack.pause();
		},
		changeInternetSearch(state, value) {
			state.internetSearch = value;
		},
		changeSearchValue(state, value) {
			state.searchValue = value;
		},
		searchingTracksPush(state, elem) {
			state.searchingTracks.push(elem);
		},
		changeDefaultTracks(state, data) {
			state.defaultTracks = data;
		},
		changeSearchingTracks(state, data) {
			state.searchingTracks = data;
		},
		changeCurrentElemId(state, value) {
			state.currentElemId = value;
		}	
	},
	actions: {	
		changeInternetSearchValue(store, value) {
			store.commit("changeInternetSearch", value);			
			if (store.state.internetSearch) {
				store.commit("changeDefaultTracks", store.state.searchingTracks);
				if (store.state.searchValue.length >= 3) store.dispatch('getInternetTracks', store.state.searchValue);
			} 
			else store.commit("changeSearchingTracks", store.state.defaultTracks);			
			store.commit("removeActiveClasses");
		},
		changeSearchValue(store, value) {
			if (store.state.internetSearch) {
				store.commit("changeSearchValue", value);
				if (value.length >= 3) {
					document.getElementById("loader").style.opacity = 1;	
					//делаем задержку на запрос, чтобы не было конфликтов с респонсом и заполнением массива
					setTimeout(()=>{
						store.dispatch('getInternetTracks', store.state.searchValue);	
					}, 500)																			
				} 			
			}
			else {
				if (value == null) {
					store.commit("changeSearchValue", '');
					store.commit("changeSearchingTracks", store.state.tracks);
				} 
					else {
						store.commit("changeSearchValue", value);
						store.commit("changeSearchingTracks", []);
						for (let i = 0; i < store.state.tracks.length; i++) {
							if (store.state.tracks[i].artist.toLowerCase().indexOf(store.state.searchValue) != -1 
								|| store.state.tracks[i].name.toLowerCase().indexOf(store.state.searchValue) != -1)
							{
								store.commit("searchingTracksPush", store.state.tracks[i]);
							}
						}
					} 
			}			
		},	
		getInternetTracks(store) {
			Vue.http.get(`http://80.78.248.37/?query=${store.state.searchValue}`)
				.then(response => response.json())
				.then(data => {
					document.getElementById("loader").style.opacity = 0;
					if (data.length == 0) return;
					else store.commit("changeSearchingTracks", data); 
				})
				.catch(() => {
					document.getElementById("loader").style.opacity = 0;
					return 0;
				})
		},
		playTrack(store, data) {
			//id треков из интернета совпдает с изначальным массивом, поэтому добавлено условие,
			//гарантирующее, что если, например, играет первый трек из локального массива, то при клике
			//на первый трек из интернет массива произойдет переключение, а не постановка на паузу/воспроизведение
			
			if (data.elem.id == store.state.currentElemId && store.state.currentData.name == 
				store.getters.searchingTracks[data.elem.id].name) {

				if (store.state.currentTrack.paused) {
					store.commit('playTrack');
					store.state.pause = false;
					data.elem.firstChild.children[1].children[0].style.display = "inline";
					data.elem.firstChild.children[1].children[1].style.display = "none";
				}
				else {
					store.commit('pauseTrack');
					store.state.pause = true;
					data.elem.firstChild.children[1].children[1].style.display = "inline";
					data.elem.firstChild.children[1].children[0].style.display = "none";
				} 
				data.elem.classList.add("active-audio_item")
			}
			//иначе меняем текущий трек
			else {
				store.commit('changeCurrentTrack', data.url);
				data.elem.firstChild.children[1].children[0].style.display = "inline";
				data.elem.firstChild.children[1].children[1].style.display = "none";
				store.commit('playTrack');
				store.commit('changePause', false);	
				store.commit("changeCurrentElemId", data.elem.id);
				store.commit('removeActiveClasses');
				store.state.currentData = store.getters.searchingTracks[data.elem.id];				
				data.elem.classList.add("active-audio_item")				
			} 
		},
		changeTrack(store, data) {
			//если сейчас нет текущего трека или он не подходит к поисковому запросу, то игнорируем нажатия
			if (store.state.currentTrack.src.length != 0 && 
				(store.state.currentData.artist.toLowerCase().indexOf(store.state.searchValue) != -1 
				|| store.state.currentData.name.toLowerCase().indexOf(store.state.searchValue) != -1)) {

				let newId;
				//произошел клик по кнопке "далее"
				if (data.type == 'next') {
					//если текущий трек последний в списке - идем в начало массива, иначе берем следующий элемент
					(data.id == store.state.searchingTracks.length - 1) ? newId = 0 : newId = parseInt(data.id) + 1
				} 
					//тоже самое для кнопки "предыдущий"
					else {
						(data.id == 0) ? newId = parseInt(store.state.searchingTracks.length) - 1 : newId = parseInt(data.id) - 1
					} 
				store.state.currentData = store.getters.searchingTracks[newId];	
				store.commit("changeCurrentElemId", newId);
				store.commit('changeCurrentTrack', store.getters.searchingTracks[newId].url);
				store.commit('playTrack');				
				store.commit('removeActiveClasses');
				store.commit('changePause', false);			
							
				document.getElementById(newId).classList.add("active-audio_item");
				document.getElementById(newId).firstChild.children[1].children[0].style.display = "inline";
				document.getElementById(newId).firstChild.children[1].children[1].style.display = "none";
			}			
		}
	}
}
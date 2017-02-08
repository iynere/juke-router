import React, { Component } from 'react';
import axios from 'axios';

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import Artist from '../components/Artist';
import Artists from '../components/Artists';

import { convertAlbum, convertAlbums, skip } from '../utils';

export default class AppContainer extends Component {

	constructor (props) {
		super(props);
		this.state = initialState;

		this.toggle = this.toggle.bind(this);
		this.toggleOne = this.toggleOne.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.selectAlbum = this.selectAlbum.bind(this);
		this.selectArtist = this.selectArtist.bind(this);
	}

	componentDidMount() {  
		axios.get('/api/artists')
			.then(res => res.data)
			.then(artists => this.onLoadArtists(artists));
			
		axios.get('/api/albums/')
			.then(res => res.data)
			.then(albums => this.onLoadAlbums(convertAlbums(albums)));

		AUDIO.addEventListener('ended', () =>
			this.next());
		AUDIO.addEventListener('timeupdate', () =>
			this.setProgress(AUDIO.currentTime / AUDIO.duration));
	}

	onLoadAlbums(albums) {
		this.setState({
			albums: albums
		});
	}
	
	onLoadArtists(artists) {
		this.setState({
			artists: artists
		});
	}

	play () {
		AUDIO.play();
		this.setState({ isPlaying: true });
	}

	pause () {
		AUDIO.pause();
		this.setState({ isPlaying: false });
	}

	load (currentSong, currentSongList) {
		AUDIO.src = currentSong.audioUrl;
		AUDIO.load();
		this.setState({
			currentSong: currentSong,
			currentSongList: currentSongList
		});
	}

	startSong (song, list) {
		this.pause();
		this.load(song, list);
		this.play();
	}

	toggleOne (selectedSong, selectedSongList) {
		if (selectedSong.id !== this.state.currentSong.id)
			this.startSong(selectedSong, selectedSongList);
		else this.toggle();
	}

	toggle () {
		if (this.state.isPlaying) this.pause();
		else this.play();
	}

	next () {
		this.startSong(...skip(1, this.state));
	}

	prev () {
		this.startSong(...skip(-1, this.state));
	}

	setProgress (progress) {
		this.setState({ progress: progress });
	}

	selectAlbum(albumId) {
		axios.get(`/api/albums/${albumId}`)
			.then(res => res.data)
			.then(album => this.setState({
				selectedAlbum: convertAlbum(album)
			}));
	}
	
	selectArtist(artistId) {
		axios.get(`/api/artists/${artistId}`)
			.then(res => res.data)
			.then(artist => this.setState({
				selectedArtist: artist
			}));
	}

	render () {
		return (
			<div id="main" className="container-fluid">
		{/* jsx for children go here */}
				<div className="col-xs-2">
					<Sidebar deselectAlbum={this.deselectAlbum} />
				</div>
				<div className="col-xs-10">
					{
						this.props.children ?
							React.cloneElement(this.props.children, {
								// single-album component's props
								album: this.state.selectedAlbum,
								
								// single-artist component's page
								artist: this.state.selectedArtist,
								
								// shared b/w single-artist & single-album
								currentSong: this.state.currentSong,
								isPlaying: this.state.isPlaying,
								toggleOne: this.toggleOne,
								
								// albums component's props
								albums: this.state.albums,
								selectAlbum: this.selectAlbum,
								
								// artists component's props
								artists: this.state.artists,
								selectArtist: this.selectArtist
							}) : null
						}
				</div>
				<Player
					currentSong={this.state.currentSong}
					currentSongList={this.state.currentSongList}
					isPlaying={this.state.isPlaying}
					progress={this.state.progress}
					next={this.next}
					prev={this.prev}
					toggle={this.toggle}
				/>
			</div>
		);
	}
}

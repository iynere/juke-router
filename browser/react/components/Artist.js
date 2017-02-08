import React, {Component} from 'react';
import axios from 'axios';
import Songs from '../components/Songs';
import Albums from '../components/Albums';
import {convertAlbums, convertSongs} from '../utils';

export default class Artist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			songs: [],
			albums: []
		};
	}
	
	componentDidMount() {
		const artistId = this.props.routeParams.artistId;
		const selectArtist = this.props.selectArtist;
		
		selectArtist(artistId);
		
		axios.get(`/api/artists/${artistId}/albums`)
			.then(res => res.data)
			.then(albums => this.onLoadAlbums(albums));
		
		axios.get(`/api/artists/${artistId}/songs`)
			.then(res => res.data)
			.then(songs => this.onLoadSongs(convertSongs(songs)));
	}
	
	onLoadAlbums(albums) {
		this.setState({
			albums: convertAlbums(albums)
		});
	}
	
	onLoadSongs(songs) {
		this.setState({
			songs: songs
		});
	}
	
	render() {
		const artist = this.props.artist;
		const currentSong = this.props.currentSong;
		const isPlaying = this.props.isPlaying;
		const toggleOne = this.props.toggleOne;

		return (
			<div>
				<h3>{artist.name}</h3>
					<div>
						<Albums 
							albums={this.state.albums} />
					</div>
				<div>
					<h4>SONGS</h4>
					<Songs
						songs={this.state.songs}
						currentSong={currentSong}
						isPlaying={isPlaying}
						toggleOne={toggleOne} />
				</div>
			</div>
		);
	}
}
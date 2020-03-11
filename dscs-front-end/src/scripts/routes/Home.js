import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			url: null
		}
	}

	componentDidMount() {
		fetch('https://api.fantickets.nl/v1/getSpotifyLoginUrl')
			.then(res => res.json())
			.then(res =>
				this.setState({
					url: res.spotifyUrl
				}))
	}

	render() {
		return (
			<main id="home">
				<a href={this.state.url}>Log in</a>
			</main>
		)
	}
}

export default Home;
import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';


class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			url: null
		}
	}

	componentDidMount() {
		const cookies = new Cookies();
		let userId = cookies.get('userId');
		let checkForUserId = false;

		if(userId && checkForUserId) {
			this.setState({
				userId: userId
			})
		}

		else {
			fetch('https://api.fantickets.nl/v1/getSpotifyLoginUrl')
				.then(res => res.json())
				.then(res =>
					this.setState({
						url: res.spotifyUrl
					})
				)
		}
	}

	render() {
		return (
			<main id="home">
				{ this.state.userId ? <p>found user id</p> : this.state.url ? <a href={this.state.url}>Log in</a> : null }
			</main>
		)
	}
}

export default Home;
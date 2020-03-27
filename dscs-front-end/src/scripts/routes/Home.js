import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

import Navbar from '../components/Navbar';

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
		let checkForUserId = true;

		if(userId && userId !== 'undefined' && checkForUserId) {
			this.setState({
				userId: userId
			})
		}

		else {
			fetch(`${process.env.REACT_APP_FANTICKETS_API}getSpotifyLoginUrl`)
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
			<React.Fragment>
				<Navbar url={this.state.url} />
				<main id="home">
					<div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
						<div className="col-md-5 p-lg-5 mx-auto my-5">
							<h1 className="display-4 font-weight-normal">Fantickets</h1>
							<p className="lead font-weight-normal">{`You'll always be able to buy tickets to your favourite artists before they become public, using your Spotify account and Fantickets`}</p>
							{this.state.userId ? (
								<Link to="/profile">View profile</Link>
							) : (
								<a className="btn btn-outline-secondary" href={this.state.url}>Connect now</a>
							)}
						</div>
						<div className="product-device box-shadow d-none d-md-block"></div>
						<div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
					</div>
					<div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
						<div>
							<p className="lead font-weight-normal">{`Want to know how Fantickets works?`}</p>
							<YouTube
								videoId={`NjPdLPCtoMA`}
							/>
						</div>
					</div>
				</main>
			</React.Fragment>
		)
	}
}

export default Home;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

class Profile extends Component {

	constructor(props) {
		super(props);

		const cookies = new Cookies();
		let userId = cookies.get('userId');
		let checkForUserId = false;

		if(userId && checkForUserId) {
			fetch(`https://api.fantickets.nl/v1/getMyPreferences?userId=${userId}`)
				.then(res => res.json())
				.then(res => {
					console.log(res)
					this.setState({data: res})
				}).catch(console.log)
		} else {
			if(this.props.location.state) {
				this.state = {
					user: this.props.location.state.from.search
				}
			}

			if(this.state && this.state.user) {
				fetch(`https://api.fantickets.nl/v1/saveSpotifyAccessToken${this.state.user}`)
					.then(res => res.json())
					.then(res => {
						cookies.set('userId', res.access_token, {path: '/'})
						this.setState({data: res})
					})
			}
		}
	}

	componentDidMount() {
		//
	}

	render() {
		console.log(this.state)

		let userInfo = this.state.data && this.state.data.user ? this.state.data.user : null;
		let name = userInfo && userInfo.name ? userInfo.name : null
		let email = userInfo && userInfo.email ? userInfo.email : null
		let userId = userInfo && userInfo.id ? userInfo.id : null
		let preferences = userInfo && userInfo.preferences ? userInfo.preferences : null

		let listPref = preferences ? Object.keys(preferences).map((key, index) => {
			return (
				<li key={index}>{key}</li>
			)
		}) : null

		return (
			<main id="profile">
				{name}<br />
				{email}<br />
				{userId}<br />

				<ul>
					{listPref}
				</ul>
			</main>
		)
	}
}

export default Profile;

Profile.propTypes = {
	location: PropTypes.object
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

import Navbar from '../components/Navbar';

class Profile extends Component {

	constructor(props) {
		super(props);

		this.state = {
			foo: 'bar'
		}

		const cookies = new Cookies();
		let userId = cookies.get('userId');
		let checkForUserId = true;

		if(userId && userId !== 'undefined' && checkForUserId) {
			fetch('https://api.fantickets.nl/v1/getMyProfile', {
				method: 'GET',
				headers: new Headers({
					'authorization': `Bearer ${userId}`,
					'Content-Type': 'application/x-www-form-urlencoded'
				}),
			})
				.then(res => res.json())
				.then(res => {
					console.log(res)
					this.setState({data: res})
				})
				.catch(err => {
					console.log(err)
				})
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
						console.log(res)
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
		let name = this.state.data ? this.state.data.name : null
		let email = this.state.data ? this.state.data.email : null
		let userId = this.state.data ? this.state.data.id : null

		let listPref = this.state.data ? Object.keys(this.state.data.preferences).map((key, index) => {
			return (
				<li className="list-group-item" key={index}>{key}</li>
			)
		}) : null

		return (
			<React.Fragment>
				<Navbar />
				<main id="profile">
					{name}<br />
					{email}<br />
					{userId}<br />
					{listPref ? (
						<ul className="list-group">
							<li className="list-group-item"><strong>Favourite artists</strong></li>
							{listPref}
						</ul>
					) : null}
				</main>
			</React.Fragment>
		)
	}
}

export default Profile;

Profile.propTypes = {
	location: PropTypes.object
}
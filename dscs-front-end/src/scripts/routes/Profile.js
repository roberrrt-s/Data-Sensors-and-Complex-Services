import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Profile extends Component {

	constructor(props) {
		super(props);

		if(this.props.location.state) {
			this.state = {
				user: this.props.location.state.from.search
			}
		}

		if(this.state && this.state.user) {
			fetch(`https://api.fantickets.nl/v1/saveSpotifyAccessToken${this.state.user}`)
				.then(res => res.json())
				.then(res => {
					this.setState({data: res})
				})

			console.log(this.state.data)
		}
	}

	componentDidMount() {
		//
	}

	render() {
		return (
			<main id="profile">
				{this.state && this.state.user ? this.state.user : null}
			</main>
		)
	}
}

export default Profile;

Profile.propTypes = {
	location: PropTypes.object
}
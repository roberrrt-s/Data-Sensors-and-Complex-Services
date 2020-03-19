import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

import Navbar from '../components/Navbar';

import { subscribeUser } from '../push/subscription';

class Profile extends Component {

	constructor(props) {
		super(props);

		this.state = {
			foo: 'bar'
		}

    this.subscribeUser = subscribeUser;

		const cookies = new Cookies();
		let userId = cookies.get('userId');
		let checkForUserId = true;

		if(userId && userId !== 'undefined' && checkForUserId) {

      this.access_token = userId;

			fetch(`${process.env.REACT_APP_FANTICKETS_API}getMyProfile`, {
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
				fetch(`${process.env.REACT_APP_FANTICKETS_API}saveSpotifyAccessToken${this.state.user}`)
					.then(res => res.json())
					.then(res => {
						console.log(res)
            if(res.success === true) {
              cookies.set('userId', res.access_token, {path: '/'})
              this.setState({data: res.user})
              this.access_token = res.access_token;
            } else {
              console.log('Error during spotify callback:', res.error)
            }
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

    let listPref = null;
    if (this.state.data) {
      if (this.state.data.preferences) {
        listPref = Object.keys(this.state.data.preferences).map((key, index) => {
          return (
            <li className="list-group-item" key={index}>
              {key}
            </li>
          );
        });
      } else {
        // This annoying bug should be fixed now!
        console.log(
          "this.state.data.preferences would throw annoying undefined error",
          this.state.data
        );
      }
    }


		return (
			<React.Fragment>
				<Navbar />
				<main id="profile">
					{name}<br />
					{email}<br />
					{userId}<br />
					{listPref ? ( <button type="button" className="btn btn-primary get-notifications" onClick={() => this.subscribeUser(this.access_token)}>Get notifications</button>) : null }<br />
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

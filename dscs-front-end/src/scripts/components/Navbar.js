import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/icon.svg';

class Navbar extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav className="site-header sticky-top py-1">
				<div className="container d-flex flex-column flex-md-row justify-content-between">
					<div className="b-logo">
						<Link to="/"><Logo /></Link>
					</div>
					{this.props.url ? <a href={this.props.url}>Log in</a> : null }
				</div>
			</nav>
		)
	}
}

export default Navbar;


Navbar.propTypes = {
	url: PropTypes.string,
}
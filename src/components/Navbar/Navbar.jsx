import React from 'react';

const Navbar = () => {
	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<p className="navbar-item">
					Task App
				</p>
			</div>
			<div className="navbar-menu" id="mainMenu">
				<div className="navbar-start">
				</div>
				<div className="navbar-end">
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
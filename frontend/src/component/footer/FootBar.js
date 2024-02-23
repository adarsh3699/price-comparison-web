import React from 'react';

import logoImg from './logoSizeM.webp';

import './footer.css';

function FootBar() {
	return (
		<div id="bottomBar">
			<img className="footerLogo" src={logoImg} alt="" />
			<div>© 2024-28 (V 1.0)</div>
			<div>
				Developed by{' '}
				<a href="https://www.bhemu.me/about" target="_blank" className="aboutMe" rel="noreferrer">
					Adarsh Suman
				</a>
			</div>
		</div>
	);
}

export default FootBar;

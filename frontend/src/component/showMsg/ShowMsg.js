import React from 'react';

import './showMsg.css';

function ShowMsg({ msgText, type }) {
	return (
		msgText && (
			<div id="msgBox">
				<div id="textMsg" className={type}>
					{msgText}
				</div>
			</div>
		)
	);
}

export default ShowMsg;

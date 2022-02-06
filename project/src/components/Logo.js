import React from 'react';
import useAuth from 'src/hooks/useAuth';


const Logo = ({ color, ...props }) => {
	const { user } = useAuth();
	const styleWapper = {
		padding: '15px',
		display: 'block',
		maxWidth: '150px',
	}

	const styleLogo = {
		width: '100%',
		display: 'block'
	}

	const urlImage = {
		white: '/static/images/logo-aienesis-white.png',
		color: '/static/images/logo-aienesis-color.png'
	}

	const renderLogo = () => {
		let pathLogo;
		if(user && user.company) {
			pathLogo = user.company.full_logo_path;
		}

		if(!pathLogo) {
			pathLogo = (color) ? urlImage.color : urlImage.white;
		} else {
			pathLogo = process.env.REACT_APP_BASE_URL + pathLogo;
		}

		return(
			<img
				alt="Logo"
				{...props}
				src={pathLogo}
				style={styleLogo}
			/>
		)
	}

	return (
		<span style={styleWapper}>
		{renderLogo()}
		</span>
	);
}

export default Logo;

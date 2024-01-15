import React from "react";
import styled from "styled-components";
import Logo from "../../assets/tmdb-logo.svg";

function Footer() {
	return (
		<Wrapper>
			<Text>
				This product uses the TMDB API but is not endorsed or certified by&nbsp;
				<a href="https://www.themoviedb.org/">
					<Image src={Logo} alt="The Movie Database Logo" />
				</a>
			</Text>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
	padding: 1rem;
`;

const Image = styled.img`
	width: 80px;
`;

const Text = styled.p`
	font-size: 0.8rem;
	display: flex;
	justify-content: center;
	align-items: baseline;
`;

export default Footer;

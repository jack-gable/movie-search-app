import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

function MoviesGrid({ movies, handleSelectMovie, ...delegated }) {
	return (
		<Grid {...delegated}>
			<Wrapper>
				{movies
					.filter((movie) => movie.poster_path)
					.map((movie) => (
						<Movie key={movie.id}>
							<Toggle onClick={() => handleSelectMovie(movie)}>
								<Image
									layoutId={`movie-poster-${movie.id}`}
									src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
									alt={movie.title + " poster"}
									draggable={false}
								/>
								<Content>
									<Title>{movie.title}</Title>
									<p>Release Date: {movie.release_date}</p>
									<p>Rating: {movie.vote_average.toFixed(1)}</p>
									<Description>{movie.overview}</Description>
								</Content>
							</Toggle>
						</Movie>
					))}
			</Wrapper>
		</Grid>
	);
}

const Grid = styled.section`
	flex: 1;
`;

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	align-content: start;
	grid-gap: 8px;
	padding: 16px;
	border-radius: 8px;
`;

const Toggle = styled.button`
	position: relative;
	display: block;
	background: transparent;
	border: none;
	padding: 0;
	cursor: pointer;
	width: 100%;
`;

const Image = styled(motion.img)`
	margin: 0 auto;
	display: block;
	object-fit: cover;
	width: 100%;
	will-change: transform;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
	width: 100%;
	height: 100%;
	visibility: hidden;
	padding: 1rem;

	& > p {
		font-size: 0.8rem;
	}
`;

const Movie = styled.div`
	font-family: "Merriweather", serif;
	position: relative;
	overflow: hidden;
	border: 2px solid var(--color-gray-200);
	border-radius: 18px;

	&:hover {
		${Content} {
			opacity: 0.9;
			visibility: visible;
			transition-duration: 1000ms;
			transition-property: all;
			background: var(--color-gray-200);
			color: var(--text-gray);
		}
	}
`;

const Title = styled.h3`
	margin-bottom: 0.5rem;
`;

const Description = styled.p`
	padding-top: 1.5rem;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
	font-size: 0.8rem;
`;

export default MoviesGrid;

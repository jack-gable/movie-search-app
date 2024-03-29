import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Star } from "react-feather";
import VisuallyHidden from "../VisuallyHidden";
import Sparkles from "../Sparkles/Sparkles";

function MoviesGrid({ movies, handleSelectMovie, ...delegated }) {
	return (
		<Grid {...delegated}>
			<Wrapper>
				{movies
					.filter((movie) => movie.poster_path)
					.map((movie) => (
						<Movie key={movie.id}>
							<Image
								layoutId={`movie-poster-${movie.id}`}
								src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
								alt={movie.title + " poster"}
								draggable={false}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 60,
								}}
							/>
							<Content>
								<Title>{movie.title}</Title>
								<p>Release Date: {movie.release_date}</p>
								<p>
									Rating:&nbsp;
									{movie.vote_average.toFixed(1) >= 8 ? (
										<Sparkles>
											<span style={{ fontWeight: "900" }}>
												{movie.vote_average.toFixed(1)}
											</span>
										</Sparkles>
									) : (
										<span>{movie.vote_average.toFixed(1)}</span>
									)}
								</p>
								<Description>{movie.overview}</Description>
							</Content>
							<FavoriteBtn
								layout="position"
								onClick={() => handleSelectMovie(movie)}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 60,
								}}
							>
								<Star />
								<VisuallyHidden>Add to watch list</VisuallyHidden>
							</FavoriteBtn>
						</Movie>
					))}
			</Wrapper>
		</Grid>
	);
}

const Grid = styled.section`
	flex: 1;
`;

const Wrapper = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	align-content: start;
	grid-gap: 8px;
	padding: 16px;
	border-radius: 8px;
	list-style-type: none;
`;

const FavoriteBtn = styled(motion.button)`
	--size: 40px;
	position: absolute;
	top: 6px;
	left: 6px;
	background: var(--favorites-black);
	color: gold;
	border: none;
	width: var(--size);
	height: var(--size);
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	backdrop-filter: blur(2px);
	cursor: pointer;

	&:hover {
		svg {
			fill: gold;
		}
	}
`;

const Image = styled(motion.img)`
	margin: 0 auto;
	display: block;
	object-fit: cover;
	width: 100%;
	will-change: transform;
	border: 2px solid var(--color-gray-200);
	border-radius: 18px;
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
	border-radius: 18px;

	& > p {
		font-size: 0.8rem;
	}
`;

const Movie = styled.li`
	position: relative;

	&:hover {
		${Content} {
			opacity: 0.9;
			visibility: visible;
			transition-duration: 1000ms;
			transition-property: all;
			transition-delay: 1100ms;
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

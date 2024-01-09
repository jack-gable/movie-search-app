import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { X } from "react-feather";
import VisuallyHidden from "../VisuallyHidden";

function FavoritesList({ movies, handleRemoveMovie }) {
	const [highlightMovieIndex, setHighlightMovieIndex] = React.useState(null);

	return (
		<>
			<Wrapper
				onMouseLeave={() => {
					setHighlightMovieIndex(null);
				}}
			>
				<h2>Watch List</h2>
				<Favorites>
					{movies
						.filter((movie) => movie.poster_path)
						.map((movie, movieIndex) => {
							const reversedMovieIndex = movies.length - movieIndex - 1;
							let height = Math.max(50 - reversedMovieIndex * 5, 10);

							if (movieIndex === highlightMovieIndex) {
								height = 200;
							}

							return (
								<li
									key={movie.id}
									style={{ height }}
									onMouseEnter={() => {
										setHighlightMovieIndex(movieIndex);
									}}
								>
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
									<DeleteBtn
										layout="position"
										onClick={() => handleRemoveMovie(movie)}
										transition={{
											type: "spring",
											stiffness: 400,
											damping: 60,
										}}
										onFocus={() => setHighlightMovieIndex(movieIndex)}
									>
										<X />
										<VisuallyHidden>Remove {movie.title}</VisuallyHidden>
									</DeleteBtn>
								</li>
							);
						})}
				</Favorites>
			</Wrapper>
		</>
	);
}

const FadeIn = keyframes`
    from {
    opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

const Wrapper = styled.div`
	width: 200px;
	padding: 1rem;
	background: var(--bg-favorites);
	color: var(--color-gray-100);

	& h2 {
		margin-bottom: 16px;
		padding-bottom: 8px;
		text-align: center;
		border-bottom: 4px dotted var(--border-favorites);
		animation: ${FadeIn} 500ms both;
		animation-delay: 200ms;
	}
`;

const Favorites = styled.ol`
	list-style-type: none;
	padding: 0;

	& li {
		position: relative;
	}
`;

const Image = styled(motion.img)`
	display: block;
	object-fit: cover;
	border-radius: 4px;
	border: 2px solid var(--color-gray-200);
	box-shadow: 0px -22px 16px -16px var(--favorites-black);
	will-change: transform;
`;

const DeleteBtn = styled(motion.button)`
	--size: 40px;
	position: absolute;
	top: 4px;
	right: 4px;
	background: var(--favorites-black);
	color: white;
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
	animation: ${FadeIn} 500ms 200ms both;
`;

export default FavoritesList;

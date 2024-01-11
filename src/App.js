import React from "react";
import styled from "styled-components";
import "./App.css";
import MoviesGrid from "./components/MoviesGrid";
import FavoritesList from "./components/FavoritesList";
import { Star } from "react-feather";

export function App() {
	const [movies, setMovies] = React.useState([]);

	React.useEffect(() => {
		async function searchMovies() {
			fetch(
				"https://api.themoviedb.org/3/movie/popular?api_key=aae5b6ba2884d613a686bdec2caeaacf"
			)
				.then((response) => response.json())
				.then((data) => setMovies(data.results));
		}

		searchMovies();
	}, []);

	function toggleMovie(toggledMovie) {
		const nextMovies = movies.filter((movie) => movie.id !== toggledMovie.id);

		nextMovies.push({
			...toggledMovie,
			favorited: !toggledMovie.favorited,
		});

		setMovies(nextMovies);
	}

	const favoritedMovies = movies.filter((movie) => movie.favorited);
	const unFavoritedMovies = movies.filter((movie) => !movie.favorited);

	return (
		<>
			<Title>Welcome To Movie Search</Title>
			<SubtitleWrapper>
				<Star color="gold" fill="gold" />
				<p>&nbsp;- Add to watch list!</p>
			</SubtitleWrapper>
			<Wrapper>
				<MoviesGrid
					movies={unFavoritedMovies}
					handleSelectMovie={toggleMovie}
				/>
				{favoritedMovies.length > 0 && (
					<FavoritesList
						movies={favoritedMovies}
						handleRemoveMovie={toggleMovie}
					/>
				)}
			</Wrapper>
		</>
	);
}

const Wrapper = styled.div`
	display: flex;
	min-height: 100vh;
	min-height: 100svh;
	overflow: hidden;
`;

const Title = styled.h1`
	font-family: "Poppins", sans-serif;
	text-align: center;
	padding: 0.8rem;
`;

const SubtitleWrapper = styled.div`
	display: flex;
	justify-content: center;

	& p {
		font-weight: 700;
	}
`;

export default App;

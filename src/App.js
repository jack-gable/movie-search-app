import React from "react";
import styled from "styled-components";
import "./App.css";
import MoviesGrid from "./components/MoviesGrid";
import FavoritesList from "./components/FavoritesList";

export function App() {
	const [movies, setMovies] = React.useState([]);

	React.useEffect(() => {
		async function searchMovies() {
			// eslint-disable-next-line no-undef
			const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

			try {
				const res = await fetch(url);
				const data = await res.json();
				setMovies(data.results);
			} catch (err) {
				console.error(err);
			}
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
			<Title>Welcome to Movie Search</Title>
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

export default App;

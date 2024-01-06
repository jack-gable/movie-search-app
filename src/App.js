import React from "react";
import styled from "styled-components";
// import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";
import Form from "./components/Form";
import MoviesGrid from "./components/MoviesGrid";
import FavoritesList from "./components/FavoritesList";

export function App() {
	const [query, setQuery] = React.useState("");
	const [movies, setMovies] = React.useState([]);

	const searchMovies = async (e) => {
		e.preventDefault();

		const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`;

		try {
			const res = await fetch(url);
			const data = await res.json();
			setMovies(data.results);
		} catch (err) {
			console.error(err);
		}

		setQuery("");
	};

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
			<Form searchMovies={searchMovies} query={query} setQuery={setQuery} />
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
	overflow: hidden;
`;

const Title = styled.h1`
	font-family: "Poppins", sans-serif;
	text-align: center;
	padding: 0.8rem;
`;

export default App;

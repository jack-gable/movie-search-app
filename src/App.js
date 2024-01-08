import React from "react";
import styled from "styled-components";
import "./App.css";
import Form from "./components/Form";
import MoviesGrid from "./components/MoviesGrid";
import FavoritesList from "./components/FavoritesList";

export function App() {
	const [query, setQuery] = React.useState("");
	const [movies, setMovies] = React.useState([]);

	const searchMovies = async (e) => {
		e.preventDefault();

		// eslint-disable-next-line no-undef
		const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

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
			{movies.length <= 0 ? (
				<Subtitle>
					<em>Find Your Favorite Movies!</em> 📽️
				</Subtitle>
			) : (
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
			)}
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

const Subtitle = styled.h2`
	font-size: 1.5rem;
	font-family: "Merriweather", serif;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export default App;

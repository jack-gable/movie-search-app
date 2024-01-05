import React from "react";
import Movie from "./components/Movie/Movie";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";
import Form from "./components/Form/Form";
import Button from "./components/Button";

export function App() {
	const [query, setQuery] = React.useState("");
	const [movies, setMovies] = React.useState([]);
	const [favorites, setFavorites] = useLocalStorage("favorites", []);
	const [isFavViewOpen, setIsFavViewOpen] = React.useState(false);

	function addToFavorites(newItem) {
		setFavorites((prevItems) => [...prevItems, newItem]);
	}

	function removeFromFavorites(id) {
		setFavorites((prevItems) => prevItems.filter((item) => item.id !== id));
	}

	function emptyFavorites() {
		setFavorites([]);
	}

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

	// todo: separate rest of components out
	// todo: add favorites section like josh's book recommendation

	return (
		<div>
			<h1 className="title">Welcome to Movie Search</h1>
			<Form searchMovies={searchMovies} query={query} setQuery={setQuery} />
			<div className="btn-container">
				<Button handleClick={() => setIsFavViewOpen(!isFavViewOpen)}>
					View Favorites
				</Button>
				<Button handleClick={() => emptyFavorites()}>Clear Favorites</Button>
			</div>
			<div className="card-list">
				{isFavViewOpen
					? favorites
							.filter((favorite) => favorite.poster_path)
							.map((favorite) => (
								<Movie
									key={favorite.id}
									movie={favorite}
									favorites={favorites}
									addToFavorites={addToFavorites}
									removeFromFavorites={removeFromFavorites}
								/>
							))
					: movies
							.filter((movie) => movie.poster_path)
							.map((movie) => (
								<Movie
									key={movie.id}
									movie={movie}
									favorites={favorites}
									addToFavorites={addToFavorites}
									removeFromFavorites={removeFromFavorites}
								/>
							))}
			</div>
		</div>
	);
}

export default App;

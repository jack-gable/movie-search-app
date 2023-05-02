import React from "react";

function Movie({ movie, favorites, addToFavorites, removeFromFavorites }) {
	function starIcon() {
		const alreadyInFavorites = favorites.some((item) => item.id === movie.id);
		if (alreadyInFavorites) {
			return (
				<i
					className="ri-star-fill favorite"
					onClick={() => removeFromFavorites(movie.id)}
				></i>
			);
		} else {
			return (
				<i
					className="ri-star-line favorite"
					onClick={() => addToFavorites(movie)}
				></i>
			);
		}
	}

	return (
		<div className="card" key={movie.id}>
			{starIcon()}
			<img
				className="card--image"
				src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
				alt={movie.title + " poster"}
			/>
			<div className="card--content">
				<h3 className="card--title">{movie.title}</h3>
				<p>
					<small>RELEASE DATE: {movie.release_date}</small>
				</p>
				<p>
					<small>RATING: {movie.vote_average}</small>
				</p>
				<p className="card--desc">{movie.overview}</p>
			</div>
		</div>
	);
}

export default Movie;

// function cartIcon() {
// 	const alreadyInCart = cartItems.some((item) => item.id === img.id);
// 	if (alreadyInCart) {
// 		return (
// 			<i
// 				className="ri-shopping-cart-fill cart"
// 				onClick={() => removeFromCart(img.id)}
// 			></i>
// 		);
// 	} else if (hovered) {
// 		return (
// 			<i className="ri-add-circle-line cart" onClick={() => addToCart(img)}></i>
// 		);
// 	}
// }

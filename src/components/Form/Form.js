import React from "react";
import styled from "styled-components";
import { Search } from "react-feather";

function Form({ searchMovies, query, setQuery }) {
	return (
		<FormContainer onSubmit={searchMovies}>
			<Input
				id="query"
				type="text"
				name="query"
				placeholder="i.e. Jurassic Park"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<Button type="submit">
				<Search
					size={18}
					style={{ display: "inline-block", marginBottom: -2 }}
				/>{" "}
				Search
			</Button>
		</FormContainer>
	);
}

const FormContainer = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: 1.5rem;
`;

const Input = styled.input`
	padding: 0.5rem 1rem;
	border-radius: 20px;
	border: 1px solid var(--color-gray-200);
	margin-right: 1rem;
	width: 40%;
`;

const Button = styled.button`
	background-color: var(--primary);
	color: white;
	padding: 0.5rem 1rem;
	border: 1px solid var(--btn-border);
	border-radius: 20px;
	cursor: pointer;
	transition: background-color 250ms;

	&:hover {
		background-color: var(--btn-hover);
		border: 1.5px solid var(--btn-hover-border);
	}
`;

export default Form;

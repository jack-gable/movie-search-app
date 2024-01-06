import React from "react";
import styled from "styled-components";
import Button from "../Button";
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

const Label = styled.label`
	text-transform: uppercase;
	margin-right: 1rem;
`;

const Input = styled.input`
	padding: 0.5rem 1rem;
	border-radius: 20px;
	border: 1px solid var(--color-gray-200);
	margin-right: 1rem;
	width: 40%;
`;

export default Form;

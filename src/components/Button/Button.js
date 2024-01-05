import React from "react";
import styled from "styled-components";

function Button({ children, type, handleClick, ...delegated }) {
	if (type === "submit") {
		return (
			<Wrapper type="submit" {...delegated}>
				{children}
			</Wrapper>
		);
	} else {
		return (
			<Wrapper onClick={handleClick} {...delegated}>
				{children}
			</Wrapper>
		);
	}
}

const Wrapper = styled.button`
	background-color: var(--primary);
	color: white;
	padding: 0.5rem 1rem;
	border: 1px solid var(--btn-border);
	border-radius: 20px;
	cursor: pointer;
	transition: background-color 250ms;

	&:hover {
		background-color: var(--btn-hover);
		border: 1px solid var(--btn-hover-border);
	}
`;

export default Button;

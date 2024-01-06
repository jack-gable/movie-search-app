import React from "react";
import styled from "styled-components";

function VisuallyHidden({ children }) {
	return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.span`
	display: inline-block;
	position: absolute;
	overflow: hidden;
	clip: rect(0 0 0 0);
	height: 1;
	width: 1;
	margin: -1;
	padding: 0;
	border: 0;
`;

export default VisuallyHidden;

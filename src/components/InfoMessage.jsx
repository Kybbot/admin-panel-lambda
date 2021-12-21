import React from "react";

const InfoMessage = ({ type, message }) => {
	return <p className={`info-message info-message__${type}`}>{message}</p>;
};

export default InfoMessage;

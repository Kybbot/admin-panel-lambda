import React from "react";

import api from "../constants/api";

const useFetch = () => {
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);

	const request = React.useCallback(
		async (url, method = "GET", body = null, headers = {}) => {
			setLoading(true);

			try {
				if (body) {
					body = JSON.stringify(body);
					headers["Content-Type"] = "application/json";
					headers["Authorization"] = `Basic ${btoa("admin:qwerty123")}`;
				}

				const response = await fetch(`${api.url}${url}`, {
					method,
					body,
					headers,
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.message || "Что-то пошло не так");
				}

				setLoading(false);

				return data;
			} catch (err) {
				setLoading(false);
				setError(err.message);
			}
		},
		[]
	);

	return { loading, error, request };
};

export default useFetch;

import React from "react";

const API_URL = "https://x03xdh6x33.execute-api.us-east-1.amazonaws.com/dev";

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
				}

				const response = await fetch(`${API_URL}${url}`, {
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
				console.log(err);
			}
		},
		[]
	);

	return { loading, error, request };
};

export default useFetch;

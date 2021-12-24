import React from "react";
import { typesOfData } from "../constants";

const useFetch = () => {
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);

	const request = React.useCallback(
		async (url, method = "GET", body = null, headers = {}, type) => {
			setLoading(true);

			try {
				if (type !== typesOfData.img) {
					if (body) {
						body = JSON.stringify(body);
						headers["Content-Type"] = "application/json";
						headers["Authorization"] = `Basic ${btoa("admin:qwerty123")}`;
					}
				}

				const response = await fetch(`${url}`, {
					method,
					body,
					headers,
				});

				if (response.status !== 204) {
					const data = await response.json();

					if (!response.ok) {
						throw new Error(data.message || "Что-то пошло не так");
					}

					setLoading(false);

					return data;
				} else {
					setLoading(false);
				}
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		},
		[]
	);

	return { loading, error, request };
};

export default useFetch;

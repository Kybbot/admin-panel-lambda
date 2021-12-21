const API_URL = "https://x03xdh6x33.execute-api.us-east-1.amazonaws.com/dev";

function getAllArticles() {
	return fetch(`${API_URL}/articles`, {
		method: "GET",
	});
}

function getArticle(id = "") {
	return fetch(`${API_URL}/articles/${id}`, {
		method: "GET",
	});
}

function updateArticle(id = "", data = {}) {
	return fetch(`${API_URL}/articles/${id}`, {
		method: "PUT",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(data),
	});
}

function addArticle(data = {}) {
	return fetch(`${API_URL}/articles/create`, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(data),
	});
}

export { getAllArticles, getArticle, addArticle, updateArticle };

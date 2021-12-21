import api from "../constants/api";

function getAllArticles() {
	return fetch(`${api.url}/articles`, {
		method: "GET",
	});
}

function getArticle(id = "") {
	return fetch(`${api.url}/articles/${id}`, {
		method: "GET",
	});
}

export { getAllArticles, getArticle };

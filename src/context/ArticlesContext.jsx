import React from "react";

import {
	getAllArticles,
	getArticle,
	updateArticle,
	addArticle,
} from "../api/articles";

const ArticlesContext = React.createContext({
	articles: [],
	article: {},
	loading: true,
	error: null,
	getArticles: () => {},
	getArticleById: (id = "") => {},
	updateArticleById: (id = "", body = {}) => {},
	createArtilce: (body = {}) => {},
});

export const useArticlesContext = () => {
	return React.useContext(ArticlesContext);
};

export const ArticlesProvider = ({ children }) => {
	const [articles, setArticles] = React.useState([]);
	const [article, setArticle] = React.useState({});
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);

	const getArticlesHandler = async () => {
		setLoading(true);

		try {
			const response = await getAllArticles();
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Что-то пошло не так");
			}

			setArticles(data.items);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError(err);
		}
	};

	const getArticleByIdHandler = async (id) => {
		setLoading(true);

		try {
			const response = await getArticle(id);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Что-то пошло не так");
			}

			setArticle(data);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError(err);
		}
	};

	const updateArticleByIdHandler = async (id, body) => {
		setLoading(true);

		try {
			const response = await updateArticle(id, body);
			const data = await response.json();

			console.log(data);

			if (!response.ok) {
				throw new Error(data.message || "Что-то пошло не так");
			}

			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError(err);
		}
	};

	const createArtilceHandler = async (body) => {
		setLoading(true);

		try {
			const response = await addArticle(body);
			const data = await response.json();

			console.log(data);

			if (!response.ok) {
				throw new Error(data.message || "Что-то пошло не так");
			}

			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError(err);
		}
	};

	React.useEffect(() => {
		getArticlesHandler();
	}, []);

	const contextValue = {
		articles,
		article,
		loading,
		error,
		getArticles: getArticlesHandler,
		getArticleById: getArticleByIdHandler,
		updateArticleById: updateArticleByIdHandler,
		createArtilce: createArtilceHandler,
	};

	return (
		<ArticlesContext.Provider value={contextValue}>
			{children}
		</ArticlesContext.Provider>
	);
};

import React from "react";

import { getAllArticles, getArticle } from "../api/articles";
import { normalizeArticlesData } from "../utils";

const ArticlesContext = React.createContext({
	normalizedArticlesIds: [],
	normalizedArticles: {},
	article: {},
	loading: true,
	error: null,
	getArticles: () => {},
	getArticleById: (id = "") => {},
	updateNormalizedArticles: (articleId = "", articleData = {}) => {},
	addToNormalizedArticles: () => {},
});

export const useArticlesContext = () => {
	return React.useContext(ArticlesContext);
};

export const ArticlesProvider = ({ children }) => {
	const [normalizedArticlesIds, setNormalizedArticlesIds] = React.useState([]);
	const [normalizedArticles, setNormalizedArticles] = React.useState({});
	const [article, setArticle] = React.useState({});
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);

	const getArticles = async () => {
		setLoading(true);

		try {
			const response = await getAllArticles();
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Что-то пошло не так");
			}

			const normilizedData = normalizeArticlesData(data.items);
			setNormalizedArticlesIds(normilizedData.allIds);
			setNormalizedArticles(normilizedData.byId);

			setLoading(false);
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	};

	const getArticleById = async (id) => {
		setLoading(true);

		try {
			const response = await getArticle(id);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error.message || "Что-то пошло не так");
			}

			setArticle(data);
			setLoading(false);
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	};

	const updateNormalizedArticles = (articleId, articleData) => {
		setNormalizedArticles((prevState) => ({
			...prevState,
			[articleId]: articleData,
		}));
	};

	const addToNormalizedArticles = (articleId, articleData) => {
		setNormalizedArticlesIds((prevState) => [...prevState, articleId]);
		setNormalizedArticles((prevState) => ({
			...prevState,
			[articleId]: articleData,
		}));
	};

	React.useEffect(() => {
		getArticles();
	}, []);

	const contextValue = {
		normalizedArticlesIds,
		normalizedArticles,
		article,
		loading,
		error,
		getArticles,
		getArticleById,
		updateNormalizedArticles,
		addToNormalizedArticles,
	};

	return (
		<ArticlesContext.Provider value={contextValue}>
			{children}
		</ArticlesContext.Provider>
	);
};

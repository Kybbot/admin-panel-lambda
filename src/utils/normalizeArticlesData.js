const normalizeArticlesData = (articles) => {
	const normilezedArticlesById = articles.reduce((obj, currItem) => {
		obj[currItem.id] = currItem;
		return obj;
	}, {});

	const allIds = articles.map((article) => article.id);

	return {
		byId: normilezedArticlesById,
		allIds,
	};
};

export default normalizeArticlesData;

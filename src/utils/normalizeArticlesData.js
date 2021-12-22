const normalizeArticlesData = (articles) => {
	const normilezedArticles = articles.reduce((obj, currItem) => {
		obj[currItem.id] = {
			title: currItem.title,
		};
		return obj;
	}, {});

	return normilezedArticles;
};

export default normalizeArticlesData;

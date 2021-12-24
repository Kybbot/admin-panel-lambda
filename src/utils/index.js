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

const transformToDateFromTime = (time) => {
	const date = new Date(time);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	const transformedDate = `${day}.${month}.${year}`;

	return transformedDate;
};

export { normalizeArticlesData, transformToDateFromTime };

import React from "react";

import { useArticlesContext } from "../../context/ArticlesContext";
import ArticlesList from "./ArticlesList";

const Articles = () => {
	const { articles, loading } = useArticlesContext();

	return (
		<main className="articles">
			<div className="container">
				{loading ? <h3>Loading</h3> : <ArticlesList articles={articles} />}
			</div>
		</main>
	);
};

export default Articles;

import React from "react";

import { useArticlesContext } from "../../context/ArticlesContext";
import ArticlesList from "./ArticlesList";
import { InfoMessage } from "../../components";
import { infoMessageTypes } from "../../constants";

const Articles = () => {
	const { articles, error, loading } = useArticlesContext();

	return (
		<main className="articles">
			<div className="container">
				{loading ? (
					<InfoMessage type={infoMessageTypes.loading} message={"Загрузка"} />
				) : error ? (
					<InfoMessage type={infoMessageTypes.error} message={error} />
				) : (
					<ArticlesList articles={articles} />
				)}
			</div>
		</main>
	);
};

export default Articles;

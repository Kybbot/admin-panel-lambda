import React from "react";
import { useNavigate } from "react-router-dom";

import { useArticlesContext } from "../../context/ArticlesContext";

const Article = ({ data }) => {
	const { id, title, slug } = data;
	const { getArticleById } = useArticlesContext();
	const navigate = useNavigate();

	const buttonHandler = () => {
		getArticleById(id);
		navigate(`/article/${slug}`, { state: id });
	};

	return (
		<article className="article">
			<h2 className="article__title">{title}</h2>
			<button type="button" className="btn" onClick={buttonHandler}>
				Открыть статью
			</button>
		</article>
	);
};

export default Article;

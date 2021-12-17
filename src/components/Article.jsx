import React from "react";

const Article = () => {
	return (
		<article className="article">
			<h2 className="article__title">
				Астронавты Artemis на поверхности Луны.
			</h2>
			<p className="article__text">
				DARPA изучает возможности частного сектора по строительству заводов на
				Луне.
			</p>
			<button className="btn article__btn">Открыть пост</button>
		</article>
	);
};

export default Article;

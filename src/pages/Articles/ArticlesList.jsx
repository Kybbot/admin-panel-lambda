import React from "react";
import Article from "./Article";
import Pagination from "./Pagination";

const ArticlesList = ({ articles }) => {
	const [currentPage, setCurrentPage] = React.useState(1);

	const articlesPerPage = 5;
	const lastArticleInex = currentPage * articlesPerPage;
	const firstArticleIndex = lastArticleInex - articlesPerPage;
	const currentArticles = articles.slice(firstArticleIndex, lastArticleInex);

	const totalPages = Math.ceil(articles.length / articlesPerPage);

	const changePage = (page) => {
		setCurrentPage(page);
		window.scrollTo(0, 0);
	};

	const prevPageHandler = () => {
		setCurrentPage((prevState) => (prevState === 1 ? 1 : prevState - 1));
		window.scrollTo(0, 0);
	};

	const nextPageHandler = () => {
		setCurrentPage((prevState) =>
			prevState === totalPages ? prevState : prevState + 1
		);
		window.scrollTo(0, 0);
	};

	return (
		<>
			{currentArticles.length ? (
				<>
					<div className="articles__container">
						{currentArticles.map((article) => (
							<Article key={article.id} data={article} />
						))}
					</div>
					<Pagination
						pages={totalPages}
						currentPage={currentPage}
						changePage={changePage}
						prevPageHandler={prevPageHandler}
						nextPageHandler={nextPageHandler}
					/>
				</>
			) : (
				<p>Empty</p>
			)}
		</>
	);
};

export default ArticlesList;

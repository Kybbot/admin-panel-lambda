import React from "react";
import { useLocation } from "react-router-dom";
import Article from "./Article";
import Pagination from "./Pagination";

const ArticlesList = ({ articlesIds, articles }) => {
	const location = useLocation();

	const [currentPage, setCurrentPage] = React.useState(
		parseInt(location.search?.split("=")[1] || 1)
	);

	const articlesPerPage = 5;
	const lastArticleInex = currentPage * articlesPerPage;
	const firstArticleIndex = lastArticleInex - articlesPerPage;
	const currentArticlesIds = articlesIds.slice(
		firstArticleIndex,
		lastArticleInex
	);

	const totalPages = Math.ceil(articlesIds.length / articlesPerPage);

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
			{currentArticlesIds.length ? (
				<>
					<div className="articles__container">
						{currentArticlesIds.map((id) => (
							<Article key={id} data={articles[id]} />
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

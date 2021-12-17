import React from "react";

import Article from "./Article";
import Pagination from "./Pagination";

const Articles = () => {
	return (
		<main className="articles">
			<div className="container">
				<div className="articles__container">
					<Article />
					<Article />
					<Article />
				</div>
				<Pagination />
			</div>
		</main>
	);
};

export default Articles;

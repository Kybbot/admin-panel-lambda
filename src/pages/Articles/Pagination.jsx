import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({
	pages,
	currentPage,
	changePage,
	prevPageHandler,
	nextPageHandler,
}) => {
	const pagesCount = [];

	for (let i = 1; i <= pages; i++) {
		pagesCount.push(i);
	}

	return (
		<div className="pagination">
			<Link
				to={`${
					currentPage === 1 || currentPage - 1 === 1
						? "/"
						: `?page=${currentPage - 1}`
				}`}
				className={`pagination__left ${
					currentPage === 1 ? "pagination__disable" : ""
				}`}
				onClick={prevPageHandler}
			>
				&#60;
			</Link>
			<div className="pagination__numbers">
				{pagesCount.map((page) => (
					<Link
						to={`${page === 1 ? "/" : `?page=${page}`}`}
						key={page}
						className={`${
							currentPage === page
								? "pagination__number pagination__number--active"
								: "pagination__number"
						}`}
						onClick={() => changePage(page)}
					>
						{page}
					</Link>
				))}
			</div>
			<Link
				to={`${
					currentPage === pages ? `?page=${pages}` : `?page=${currentPage + 1}`
				}`}
				className={`pagination__right ${
					currentPage === pages ? "pagination__disable" : ""
				}`}
				onClick={nextPageHandler}
				disabled={currentPage === pages}
			>
				&#62;
			</Link>
		</div>
	);
};

export default Pagination;

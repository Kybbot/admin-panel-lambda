import React from "react";

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
			<button
				type="button"
				className="pagination__left"
				onClick={prevPageHandler}
				disabled={currentPage === 1}
			>
				&#60;
			</button>
			<div className="pagination__numbers">
				{pagesCount.map((page) => (
					<button
						type="button"
						key={page}
						className={`${
							currentPage === page
								? "pagination__number pagination__number--active"
								: "pagination__number"
						}`}
						onClick={() => changePage(page)}
					>
						{page}
					</button>
				))}
			</div>
			<button
				type="button"
				className="pagination__right"
				onClick={nextPageHandler}
				disabled={currentPage === pages}
			>
				&#62;
			</button>
		</div>
	);
};

export default Pagination;

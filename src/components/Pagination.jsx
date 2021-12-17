import React from "react";

const Pagination = () => {
	return (
		<div className="pagination">
			<button className="pagination__left">&#60;</button>
			<div className="pagination__numbers">
				<button className="pagination__number pagination__number--active">
					1
				</button>
				<button className="pagination__number">2</button>
				<button className="pagination__number">3</button>
			</div>
			<button className="pagination__right">&#62;</button>
		</div>
	);
};

export default Pagination;

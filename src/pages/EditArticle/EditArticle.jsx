import React from "react";
import { useNavigate } from "react-router-dom";

import { useArticlesContext } from "../../context/ArticlesContext";
import transformToDateFromTime from "../../utils/transformToDateFromTime";
import EditArticleForm from "./EditArticleForm";

const EditArticle = () => {
	const navigate = useNavigate();
	const { article, loading } = useArticlesContext();

	const { created_at, updated_at } = article;

	const goBackButtonHandler = () => {
		navigate(-1);
	};

	return (
		<main className="edit">
			<div className="container">
				{loading ? (
					<h3>Loading</h3>
				) : (
					<>
						<button className="btn" type="button" onClick={goBackButtonHandler}>
							Назад
						</button>
						<div className="edit__info">
							<p className="edit__time">
								Статья создана{" "}
								<time>{transformToDateFromTime(created_at)}</time>
							</p>
							<p className="edit__time">
								Последние изменение{" "}
								<time>{transformToDateFromTime(updated_at)}</time>
							</p>
						</div>
						<EditArticleForm article={article} />
					</>
				)}
			</div>
		</main>
	);
};

export default EditArticle;
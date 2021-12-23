import React from "react";
import { Link } from "react-router-dom";

import { useArticlesContext } from "../../context/ArticlesContext";

const Search = React.memo(({ articles }) => {
	const [search, setSearch] = React.useState("");
	const { getArticleById } = useArticlesContext();

	const arrOfArticles = React.useMemo(
		() => Object.values(articles),
		[articles]
	);

	const filterArticles = (data) => {
		if (search === "") {
			return data;
		} else {
			return data.filter((item) =>
				item.title.toLowerCase().includes(search.toLowerCase())
			);
		}
	};

	const filteredArticles = filterArticles(arrOfArticles);

	return (
		<aside>
			<form className="form search">
				<input
					className="form__input"
					type="text"
					name="search"
					value={search}
					onChange={(event) => setSearch(event.target.value)}
					placeholder="Поиск"
				/>
				{search && filteredArticles.length ? (
					<output className="search__output" name="searchResult">
						<ul className="search__list">
							{filteredArticles.map((article) => (
								<li className="search__item" key={article.id}>
									<Link
										className="search__link"
										onClick={() => getArticleById(article.id)}
										to={`/article/${article.slug}`}
									>
										{article.title}
									</Link>
								</li>
							))}
						</ul>
					</output>
				) : (
					""
				)}
			</form>
		</aside>
	);
});

export default Search;

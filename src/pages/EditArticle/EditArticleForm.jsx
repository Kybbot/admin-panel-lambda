import React from "react";
import MDEditor from "@uiw/react-md-editor";

import useFetch from "../../hooks/useFetch";
import { InfoMessage } from "../../components";
import { infoMessageTypes } from "../../constants";

const EditArticleForm = ({ article }) => {
	const { id, title, meta_title, meta_description, content } = article;

	const { loading, error, request } = useFetch();

	const [state, setState] = React.useState({
		title: title,
		meta_title: meta_title,
		meta_description: meta_description,
	});

	const [mdValue, setMdValue] = React.useState(content);
	const [success, setSuccess] = React.useState(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const formSubmitHandler = async (event) => {
		event.preventDefault();

		const data = {
			...state,
			content: mdValue,
		};

		const result = await request(`/articles/${id}`, "PUT", data);

		if (!loading && !error && typeof result !== "undefined") {
			setSuccess(true);
			setTimeout(() => {
				setSuccess(false);
			}, 4000);
		}
	};

	return (
		<form className="form" onSubmit={formSubmitHandler}>
			<label htmlFor="title" className="form__label">
				Название
				<input
					id="title"
					className="form__input"
					type="text"
					name="title"
					value={state.title}
					onChange={handleInputChange}
				/>
			</label>
			<label htmlFor="metaTitle" className="form__label">
				Мета название
				<input
					id="metaTitle"
					className="form__input"
					type="text"
					name="meta_title"
					value={state.meta_title}
					onChange={handleInputChange}
				/>
			</label>
			<label htmlFor="metaDesc" className="form__label">
				Мета описание
				<input
					id="metaDesc"
					className="form__input"
					type="text"
					name="meta_description"
					value={state.meta_description}
					onChange={handleInputChange}
				/>
			</label>
			<label htmlFor="content" className="form__label">
				Контент
				<MDEditor
					value={mdValue}
					onChange={setMdValue}
					enableScroll={false}
					height={450}
					textareaProps={{ id: "content" }}
				/>
			</label>

			<button className="btn" type="submit">
				Обновить статью
			</button>
			{loading && (
				<InfoMessage type={infoMessageTypes.loading} message={"Загрузка"} />
			)}
			{success && (
				<InfoMessage
					type={infoMessageTypes.success}
					message={"Статья обновлена"}
				/>
			)}
			{error && <InfoMessage type={infoMessageTypes.error} message={error} />}
		</form>
	);
};

export default EditArticleForm;

import React from "react";
import MDEditor from "@uiw/react-md-editor";

import useFetch from "../../hooks/useFetch";
import { InfoMessage } from "../../components";
import { infoMessageTypes, api, typesOfData } from "../../constants";

const EditArticleForm = ({ article, updateArticle }) => {
	const {
		id,
		title,
		slug,
		meta_title,
		meta_description,
		content,
		url,
		file_id,
	} = article;

	const { loading, error, request } = useFetch();

	const [state, setState] = React.useState({
		title: title,
		meta_title: meta_title,
		meta_description: meta_description,
	});

	const [fileData, setFileData] = React.useState(null);
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

		const result = await request(`${api.url}/articles/${id}`, "PUT", data);

		if (fileData) {
			const { url, fields } = await request(`${api.img}?fileId=${file_id}`);

			const formData = new FormData();

			Object.keys(fields).forEach((key) => {
				formData.append(key, fields[key]);
			});

			formData.append("Content-Type", fileData.type);
			formData.append("file", fileData);

			await request(url, "POST", formData, {}, typesOfData.img);
		}

		updateArticle(id, { id, title: state.title, slug });

		if (!loading && !error && typeof result !== "undefined") {
			setSuccess(true);
		}
	};

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setSuccess(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, [success]);

	return (
		<form className="form" onSubmit={formSubmitHandler}>
			<fieldset className="form__fieldset">
				<label htmlFor="file" className="form__file">
					Выбрать фото
				</label>
				<input
					id="file"
					type="file"
					name="file"
					accept="image/*"
					onChange={(event) => setFileData(event.target.files[0])}
				/>
				{fileData ? (
					<img
						className="form__img"
						src={URL.createObjectURL(fileData)}
						alt={state.title}
					/>
				) : (
					<img className="form__img" src={url} alt="" />
				)}
			</fieldset>
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

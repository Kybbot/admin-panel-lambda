import React from "react";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

import useFetch from "../../hooks/useFetch";
import { useArticlesContext } from "../../context/ArticlesContext";
import { InfoMessage } from "../../components";
import { infoMessageTypes, api, typesOfData } from "../../constants";

const CreateArticle = () => {
	const navigate = useNavigate();
	const { addToNormalizedArticles } = useArticlesContext();
	const { loading, error, request } = useFetch();

	const initialState = {
		title: "",
		meta_title: "",
		meta_description: "",
	};

	const [state, setState] = React.useState(initialState);
	const [fileData, setFileData] = React.useState();
	const [mdValue, setMdValue] = React.useState("");
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

		const { url, fields } = await request(api.img);

		const data = {
			...state,
			content: mdValue,
			file_id: fields.key,
		};

		const result = await request(`${api.url}/articles/create`, "POST", data);

		if (fileData) {
			const formData = new FormData();

			Object.keys(fields).forEach((key) => {
				formData.append(key, fields[key]);
			});

			formData.append("Content-Type", fileData.type);
			formData.append("file", fileData);

			await request(url, "POST", formData, {}, typesOfData.img);
		}

		addToNormalizedArticles(result.id, {
			id: result.id,
			title: result.title,
			slug: result.slug,
		});

		if (!loading && !error && typeof result !== "undefined") {
			setSuccess(true);
			setState(initialState);
			setFileData(null);
			setMdValue("");
		}
	};

	const goBackButtonHandler = () => {
		navigate(-1);
	};

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setSuccess(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, [success]);

	return (
		<main className="create">
			<div className="container">
				<button
					className="btn mb40"
					type="button"
					onClick={goBackButtonHandler}
				>
					Назад
				</button>
				<form className="form" onSubmit={formSubmitHandler}>
					<fieldset className="form__fieldset">
						<label htmlFor="file" className="form__file">
							Выьбрать фото
						</label>
						<input
							id="file"
							type="file"
							name="file"
							accept="image/*"
							onChange={(event) => setFileData(event.target.files[0])}
						/>
						{fileData && (
							<img
								className="form__img"
								src={URL.createObjectURL(fileData)}
								alt={state.title}
							/>
						)}
					</fieldset>
					<label htmlFor="title" className="form__label">
						Название
						<input
							id="title"
							className="form__input"
							type="text"
							name="title"
							required
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
							required
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
							required
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
						Создать статью
					</button>
					{loading && (
						<InfoMessage type={infoMessageTypes.loading} message={"Загрузка"} />
					)}
					{success && (
						<InfoMessage
							type={infoMessageTypes.success}
							message={"Статья создана"}
						/>
					)}
					{error && (
						<InfoMessage type={infoMessageTypes.error} message={error} />
					)}
				</form>
			</div>
		</main>
	);
};

export default CreateArticle;

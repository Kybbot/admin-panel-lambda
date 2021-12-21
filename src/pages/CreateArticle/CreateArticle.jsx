import React from "react";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

import useFetch from "../../hooks/useFetch";

const CreateArticle = () => {
	const navigate = useNavigate();
	const { loading, request } = useFetch();

	const [state, setState] = React.useState({
		title: "",
		meta_title: "",
		meta_description: "",
	});

	const [mdValue, setMdValue] = React.useState("");

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

		const result = await request("/articles/create", "POST", data);

		console.log(result);
	};

	const goBackButtonHandler = () => {
		navigate(-1);
	};

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
					<MDEditor
						value={mdValue}
						onChange={setMdValue}
						enableScroll={false}
						height={450}
					/>
					<button className="btn" type="submit">
						Создать статью
					</button>
					<span>{loading && "Loading"}</span>
				</form>
			</div>
		</main>
	);
};

export default CreateArticle;

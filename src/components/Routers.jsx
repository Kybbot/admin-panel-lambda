import React from "react";
import { Routes, Route } from "react-router-dom";

import { Articles, CreateArticle, EditArticle } from "../pages";

const Routers = () => {
	return (
		<Routes>
			<Route path="/" element={<Articles />} />
			<Route path="/create" element={<CreateArticle />} />
			<Route path="/article/:slug" element={<EditArticle />} />
			<Route path="*" element={<Articles />} />
		</Routes>
	);
};

export default Routers;

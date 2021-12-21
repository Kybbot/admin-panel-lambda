import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ArticlesProvider } from "./context/ArticlesContext";
import { Header, Routers } from "./components";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<ArticlesProvider>
				<Routers />
			</ArticlesProvider>
		</BrowserRouter>
	);
};

export default App;

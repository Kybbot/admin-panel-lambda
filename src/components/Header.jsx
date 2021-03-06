import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const checkLocation = location.pathname === "/create";

	const buttonHandler = () => {
		navigate("/create");
	};

	return (
		<header className="header">
			<div className="container">
				<div className="header__container">
					<h1 className="header__title">
						<Link className="header__link" to="/">
							Lambda admin-panel
						</Link>
					</h1>
					{!checkLocation && (
						<button className="btn" type="button" onClick={buttonHandler}>
							Создать статью
						</button>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;

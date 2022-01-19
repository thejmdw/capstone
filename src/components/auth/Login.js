import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { Input, Button, ThemeProvider } from "@material-ui/core"
import { theme } from "../theme.js"

export const Login = (props) => {
	const email = useRef();
	const password = useRef();
	const existDialog = useRef();
	const history = useHistory();

	const existingUserCheck = () => {
		return fetch(`https://swipe-home.herokuapp.com/users?email=${email.current.value}`)
			.then((res) => res.json())
			.then((user) => (user.length ? user[0] : false));
	};

	const handleLogin = (e) => {
		e.preventDefault();

		existingUserCheck().then((exists) => {
			if (exists) {
				localStorage.setItem("swipeHome_user", exists.id);
				history.push("/");
			} else {
				existDialog.current.showModal();
			}
		});
	};

	return (
		<ThemeProvider theme={theme}>
		<main className="container--login LoginCard__container">
			<dialog className="dialog dialog--auth" ref={existDialog}>
				<div>User does not exist</div>
				<button
					className="button--close"
					onClick={(e) => existDialog.current.close()}
				>
					Close
				</button>
			</dialog>

			<div>
				<section className=" LoginCard">
					<form className="form--login" onSubmit={handleLogin}>
						<h1>Swipe Home</h1>
						<h2>Please sign in</h2>
						<fieldset>
							<label htmlFor="inputEmail"></label>
							<Input
								inputRef={email}
								type="email"
								id="email"
								className="form-control"
								placeholder="Email address"
								required
								autoFocus
							/>
						</fieldset>
						<fieldset>
							<Button type="submit" color="primary" variant="contained">Sign in</Button>
						</fieldset>
						<section className="link--register">
							<Link to="/register">Not a member yet?</Link>
						</section>
					</form>
				</section>
			</div>
		</main>
		</ThemeProvider>
	);
};

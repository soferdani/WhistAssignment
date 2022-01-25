import "./App.css";
import Admin from "./components/Admin";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Stats from "./components/Stats";
import AppNavbar from "./components/AppNavbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<>
			<AppNavbar />
			<br />
			<div className='App'>
				<Routes>
					<Route path='/' element={<Navigate to="home" />} />
					<Route path='admin' element={<Admin />} />
					<Route path='home' element={<Home />} />
					<Route path='stats' element={<Stats />} />
					<Route
						path='*'
						element={
							<main style={{ padding: "1rem" }}>
								<p>There's nothing here!</p>
							</main>
						}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;

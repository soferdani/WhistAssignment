import "./App.css";
import Admin from "./components/Admin";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Stats from "./components/Stats";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='admin' element={<Admin />} />
				<Route path='home' element={<Home />} />
				<Route path='stats' element={<Stats />} />
			</Routes>
		</div>
	);
}

export default App;

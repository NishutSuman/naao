
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import OfficeBearers from "./pages/OfficeBearers";
import Members from "./pages/Members";
import FloatingButtons from "./components/FloatingButtons"; // Import the new component

function App() {
	return (
		<Router>
			<div className="flex flex-col min-h-screen">
				<Navbar />
				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/events" element={<Events />} />
						<Route path="/gallery" element={<Gallery />} />
						<Route path="/office-bearers" element={<OfficeBearers />} />
						<Route path="/members" element={<Members />} />
						<Route path="/contact" element={<Contact />} />
					</Routes>
				</main>
				<Footer />
				<FloatingButtons /> {/* Add FloatingButtons component here */}
			</div>
		</Router>
	);
}

export default App;

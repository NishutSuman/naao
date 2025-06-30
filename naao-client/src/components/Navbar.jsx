import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/naao-logo.png"; // Import the logo

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation(); // Get current location

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white shadow-lg sticky top-0 z-50">
			<div className="container mx-auto px-4 py-3">
				<div className="flex justify-between items-center">
					<Link to="/" className="flex items-center space-x-3">
						<img
							src={logo}
							alt="NAAO Logo"
							className="h-20 w-auto bg-slate-200"
						/>
						<div className="hidden md:block text-lg">
							<div className="font-bold">
								Navodaya Alumni Association of Odisha
							</div>
						</div>
					</Link>

					{/* Desktop Menu */}
					<div className="hidden md:flex space-x-6">
						<NavLink to="/" isActive={location.pathname === "/"}>
							Home
						</NavLink>
						<NavLink to="/about" isActive={location.pathname === "/about"}>
							About
						</NavLink>
						<NavLink to="/events" isActive={location.pathname === "/events"}>
							Events
						</NavLink>
						<NavLink to="/gallery" isActive={location.pathname === "/gallery"}>
							Gallery
						</NavLink>
						<NavLink
							to="/office-bearers"
							isActive={location.pathname === "/office-bearers"}
						>
							Office Bearers
						</NavLink>
						<NavLink to="/members" isActive={location.pathname === "/members"}>
							GB/GC
						</NavLink>
						<NavLink to="/contact" isActive={location.pathname === "/contact"}>
							Contact
						</NavLink>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={toggleMenu}
						className="md:hidden text-white focus:outline-none"
					>
						{isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
					</button>
				</div>

				{/* Mobile Menu */}
				{isOpen && (
					<div className="md:hidden mt-3 py-3 space-y-3">
						<MobileNavLink
							to="/"
							onClick={toggleMenu}
							isActive={location.pathname === "/"}
						>
							Home
						</MobileNavLink>
						<MobileNavLink
							to="/about"
							onClick={toggleMenu}
							isActive={location.pathname === "/about"}
						>
							About
						</MobileNavLink>
						<MobileNavLink
							to="/events"
							onClick={toggleMenu}
							isActive={location.pathname === "/events"}
						>
							Events
						</MobileNavLink>
						<MobileNavLink
							to="/gallery"
							onClick={toggleMenu}
							isActive={location.pathname === "/gallery"}
						>
							Gallery
						</MobileNavLink>
						<MobileNavLink
							to="/office-bearers"
							onClick={toggleMenu}
							isActive={location.pathname === "/office-bearers"}
						>
							Office Bearers
						</MobileNavLink>
						<MobileNavLink
							to="/members"
							onClick={toggleMenu}
							isActive={location.pathname === "/members"}
						>
							GB/GC
						</MobileNavLink>
						<MobileNavLink
							to="/contact"
							onClick={toggleMenu}
							isActive={location.pathname === "/contact"}
						>
							Contact
						</MobileNavLink>
					</div>
				)}
			</div>
		</nav>
	);
};

const NavLink = ({ to, isActive, children }) => (
	<Link
		to={to}
		className={`transition duration-300 font-semibold ${
			isActive
				? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
				: "hover:text-yellow-300"
		}`}
	>
		{children}
	</Link>
);

const MobileNavLink = ({ to, isActive, children, onClick }) => (
	<Link
		to={to}
		className={`block py-2 transition duration-300 text-center ${
			isActive
				? "text-yellow-300 bg-blue-900 rounded-md"
				: "hover:text-yellow-300"
		}`}
		onClick={onClick}
	>
		{children}
	</Link>
);

export default Navbar;

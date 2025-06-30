import { useState, useEffect } from "react";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa";

const FloatingButtons = () => {
	const [showScrollTop, setShowScrollTop] = useState(false);

	// Show scroll-to-top button when page is scrolled down
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 400) {
				setShowScrollTop(true);
			} else {
				setShowScrollTop(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Scroll to top function
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	// Open WhatsApp with pre-defined message
	const openWhatsApp = () => {
		const whatsappNumber = "+919381297056"; // Replace with your WhatsApp number
		const message = "Hello! I would like to know more about NAAO.";
		const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
			message
		)}`;
		window.open(whatsappUrl, "_blank");
	};

	return (
		<div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
			{/* WhatsApp Button - Always visible */}
			<button
				onClick={openWhatsApp}
				className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none"
				aria-label="Contact on WhatsApp"
			>
				<FaWhatsapp size={34} />
			</button>

			{/* Scroll to Top Button - Visible after scrolling */}
			{showScrollTop && (
				<button
					onClick={scrollToTop}
					className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none animate-fadeIn"
					aria-label="Scroll to top"
				>
					<FaArrowUp size={34} />
				</button>
			)}
		</div>
	);
};

export default FloatingButtons;

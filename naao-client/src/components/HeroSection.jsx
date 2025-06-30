import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
	// Array of hero images
	const heroImages = [
		"https://i.postimg.cc/FH4GcRhk/IMG-20240106-WA0023.jpg",
		"https://i.postimg.cc/8zNBc0bh/Whats-App-Image-2024-02-03-at-09-49-10-b03b0127.jpg",
		"https://i.postimg.cc/T2Btd0S9/IMG-20240106-WA0010.jpg",
		"https://i.postimg.cc/3RKZqbk8/IMG-0967.jpg",
	];

	// State to track current image index
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	// State to handle fade effect
	const [isTransitioning, setIsTransitioning] = useState(false);

	// Auto-rotate images every 5 seconds
	useEffect(() => {
		const intervalId = setInterval(() => {
			setIsTransitioning(true);

			// Small delay to allow fade-out animation
			setTimeout(() => {
				setCurrentImageIndex(
					(prevIndex) => (prevIndex + 1) % heroImages.length
				);
				setIsTransitioning(false);
			}, 500); // Match this with the CSS transition duration
		}, 5000); // Change image every 5 seconds

		return () => clearInterval(intervalId);
	}, [heroImages.length]);

	return (
		<section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white overflow-hidden">
			{/* Decorative elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -right-10 -top-10 w-60 h-60 rounded-full bg-yellow-500 opacity-10"></div>
				<div className="absolute -left-20 bottom-10 w-80 h-80 rounded-full bg-blue-400 opacity-10"></div>
			</div>

			<div className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center relative z-10">
				<div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
						Navodaya Alumni Association of Odisha
					</h1>
					<p className="text-xl md:text-2xl mt-6 text-blue-100">
						Connecting alumni and preserving the legacy of Navodayans
					</p>
					<div className="mt-10 space-x-4">
						<Link
							to="/about"
							className="px-8 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition duration-300"
						>
							About Us
						</Link>
						<Link
							to="/events"
							className="px-8 py-3 bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-blue-800 transition duration-300"
						>
							Our Events
						</Link>
					</div>
				</div>
				<div className="md:w-1/2 flex justify-center">
					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg transform rotate-6 opacity-40"></div>
						<div className="relative rounded-lg shadow-xl w-full max-w-md overflow-hidden">
							{/* Image with fade transition */}
							<img
								src={heroImages[currentImageIndex]}
								alt={`NAAO Alumni ${currentImageIndex + 1}`}
								className={`w-full h-full object-cover transition-opacity duration-500 ${
									isTransitioning ? "opacity-0" : "opacity-100"
								}`}
								style={{ minHeight: "300px" }}
							/>

							{/* Image indicators */}
							<div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
								{heroImages.map((_, index) => (
									<button
										key={index}
										onClick={() => {
											setIsTransitioning(true);
											setTimeout(() => {
												setCurrentImageIndex(index);
												setIsTransitioning(false);
											}, 500);
										}}
										className={`w-2 h-2 rounded-full ${
											currentImageIndex === index ? "bg-white" : "bg-white/50"
										} transition-all`}
										aria-label={`Go to image ${index + 1}`}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;

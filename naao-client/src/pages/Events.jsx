import { useState, useRef } from "react";
import {
	FaCalendarAlt,
	FaMapMarkerAlt,
	FaClock,
	FaFilter,
	FaChevronLeft,
	FaChevronRight,
	FaStar,
} from "react-icons/fa";

const Events = () => {
	const [filter, setFilter] = useState("all");
	const sliderRef = useRef(null);

	// Separate upcoming and past events
	const upcomingEvents = events.filter((event) => event.status === "upcoming");
	const pastEvents = events.filter((event) => event.status === "past");

	// Filter past events based on the selected category
	const filteredPastEvents =
		filter === "all"
			? pastEvents
			: pastEvents.filter((event) => event.category === filter);

	// Slider navigation functions
	const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
		}
	};

	return (
		<div>
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-16">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">
						Events & Programs
					</h1>
					<p className="text-xl max-w-3xl mx-auto">
						Stay connected with our community through various events, workshops,
						and gatherings
					</p>
				</div>
			</div>

			{/* Upcoming Events Highlight Section */}
			{upcomingEvents.length > 0 && (
				<section className="py-12 bg-blue-50">
					<div className="container mx-auto px-4">
						<div className="flex items-center mb-6">
							<FaStar className="text-yellow-500 mr-2" />
							<h2 className="text-2xl font-bold text-gray-800">
								Upcoming Events
							</h2>
						</div>

						<div className="grid lg:grid-cols-1 gap-6">
							{upcomingEvents.map((event, index) => (
								<div
									key={index}
									className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-blue-500 flex flex-col md:flex-row h-full"
								>
									<div className="md:w-2/5">
										<img
											src={event.image}
											alt={event.title}
											className="w-full h-64 md:h-full object-cover"
										/>
									</div>
									<div className="p-6 md:w-3/5 flex flex-col ">
										<div className="mb-2">
											<span
												className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
													event.category
												)}`}
											>
												{getCategoryText(event.category)}
											</span>
										</div>
										<h3 className="text-2xl font-bold text-gray-800 mb-3">
											{event.title}
										</h3>
										<div className="space-y-3 text-gray-600 mb-6 place-items-center">
											<div className="flex items-center">
												<FaCalendarAlt className="mr-2 text-blue-600" />
												<span>{event.date}</span>
											</div>
											<div className="flex items-center">
												<FaClock className="mr-2 text-blue-600" />
												<span>{event.time}</span>
											</div>
											<div className="flex items-center">
												<FaMapMarkerAlt className="mr-2 text-blue-600" />
												<span>{event.location}</span>
											</div>
										</div>
										<div className="mt-auto">
											<button className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 font-medium" onClick={() => window.open(event.registrationLink, "_blank")}>
												Register Now
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Past Events Section with Slider */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					{/* Event Filters */}
					<div className="mb-10 flex flex-wrap justify-between items-center">
						<h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
							Past Events
						</h2>

						<div className="flex flex-wrap gap-3">
							<button
								className={`px-4 py-2 rounded-full border ${
									filter === "all"
										? "bg-blue-600 text-white"
										: "bg-white text-gray-700"
								}`}
								onClick={() => setFilter("all")}
							>
								All Events
							</button>
							<button
								className={`px-4 py-2 rounded-full border ${
									filter === "annual-meet"
										? "bg-blue-600 text-white"
										: "bg-white text-gray-700"
								}`}
								onClick={() => setFilter("annual-meet")}
							>
								Annual Meet
							</button>
							<button
								className={`px-4 py-2 rounded-full border ${
									filter === "meeting"
										? "bg-blue-600 text-white"
										: "bg-white text-gray-700"
								}`}
								onClick={() => setFilter("meeting")}
							>
								Meetings
							</button>
							<button
								className={`px-4 py-2 rounded-full border ${
									filter === "workshop"
										? "bg-blue-600 text-white"
										: "bg-white text-gray-700"
								}`}
								onClick={() => setFilter("workshop")}
							>
								Workshops
							</button>
							<button
								className={`px-4 py-2 rounded-full border ${
									filter === "social"
										? "bg-blue-600 text-white"
										: "bg-white text-gray-700"
								}`}
								onClick={() => setFilter("social")}
							>
								Social Events
							</button>
						</div>
					</div>

					{/* Past Events Slider */}
					{filteredPastEvents.length > 0 ? (
						<div className="relative">
							{/* Slider Navigation Buttons */}
							<button
								onClick={scrollLeft}
								className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg text-blue-600 hover:bg-blue-50 focus:outline-none"
								aria-label="Scroll left"
							>
								<FaChevronLeft size={20} />
							</button>

							<div
								ref={sliderRef}
								className="flex overflow-x-auto pb-6 hide-scrollbar"
								style={{
									scrollBehavior: "smooth",
									scrollbarWidth: "none",
									msOverflowStyle: "none",
								}}
							>
								{filteredPastEvents.map((event, index) => (
									<div
										key={index}
										className="min-w-[300px] max-w-[300px] mx-2 first:ml-0 last:mr-0 flex-shrink-0"
									>
										<PastEventCard {...event} />
									</div>
								))}
							</div>

							<button
								onClick={scrollRight}
								className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white p-2 rounded-full shadow-lg text-blue-600 hover:bg-blue-50 focus:outline-none"
								aria-label="Scroll right"
							>
								<FaChevronRight size={20} />
							</button>
						</div>
					) : (
						<div className="text-center py-10 bg-gray-50 rounded-lg">
							<p className="text-gray-500">
								No past events found for this category.
							</p>
						</div>
					)}
				</div>
			</section>

			{/* Past Events Gallery */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
						Glimpses of Past Events
					</h2>

					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{pastEventImages.map((image, index) => (
							<div
								key={index}
								className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300"
							>
								<img
									src={image.src}
									alt={image.alt}
									className="w-full h-48 object-cover transform hover:scale-110 transition duration-500"
								/>
							</div>
						))}
					</div>

					<div className="text-center mt-10">
						<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
							View Event Gallery
						</button>
					</div>
				</div>
			</section>

			{/* Propose an Event */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="bg-white rounded-xl shadow-lg overflow-hidden">
						<div className="md:flex">
							<div className="md:w-1/2 bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-10">
								<h2 className="text-2xl font-bold mb-4">Have an Event Idea?</h2>
								<p className="mb-6">
									We encourage our alumni to propose events and initiatives that
									can benefit our community. Share your ideas with us, and we'll
									help you bring them to life.
								</p>
								<ul className="space-y-2">
									<li className="flex items-center">
										<span className="mr-2">✓</span>
										<span>Professional networking sessions</span>
									</li>
									<li className="flex items-center">
										<span className="mr-2">✓</span>
										<span>Skill development workshops</span>
									</li>
									<li className="flex items-center">
										<span className="mr-2">✓</span>
										<span>Alumni reunion gatherings</span>
									</li>
									<li className="flex items-center">
										<span className="mr-2">✓</span>
										<span>Community service initiatives</span>
									</li>
								</ul>
							</div>
							<div className="md:w-1/2 p-10">
								<h3 className="text-xl font-bold mb-6 text-gray-800">
									Propose Your Event
								</h3>
								<form className="space-y-4">
									<div>
										<label className="block text-gray-700 mb-2" htmlFor="name">
											Your Name
										</label>
										<input
											id="name"
											type="text"
											className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="Enter your name"
										/>
									</div>
									<div>
										<label className="block text-gray-700 mb-2" htmlFor="email">
											Email Address
										</label>
										<input
											id="email"
											type="email"
											className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="Enter your email"
										/>
									</div>
									<div>
										<label className="block text-gray-700 mb-2" htmlFor="event">
											Event Description
										</label>
										<textarea
											id="event"
											className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="Describe your event idea"
											rows="4"
										></textarea>
									</div>
									<button
										type="submit"
										className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 cursor-not-allowed"
										disabled
									>
										Submit Proposal
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

const PastEventCard = ({ title, date, time, location, image, category }) => {
	return (
		<div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full">
			<div className="relative">
				<img src={image} alt={title} className="w-full h-48 object-cover" />
				<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
				<span
					className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
						category
					)}`}
				>
					{getCategoryText(category)}
				</span>
			</div>
			<div className="p-4 flex flex-col flex-grow">
				<h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
					{title}
				</h3>
				<div className="space-y-1 text-gray-600 text-sm mb-4">
					<div className="flex items-center">
						<FaCalendarAlt className="mr-2 text-blue-600 text-xs" />
						<span>{date}</span>
					</div>
					<div className="flex items-center">
						<FaClock className="mr-2 text-blue-600 text-xs" />
						<span>{time}</span>
					</div>
					<div className="flex items-center">
						<FaMapMarkerAlt className="mr-2 text-blue-600 text-xs" />
						<span className="line-clamp-1">{location}</span>
					</div>
				</div>
				<div className="mt-auto pt-2">
					<button
						className="w-full py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed"
						disabled
					>
						Past Event
					</button>
				</div>
			</div>
		</div>
	);
};

// Keep the original EventCard component for upcoming events
const EventCard = ({ title, date, time, location, image, category }) => {
	let categoryColor;
	switch (category) {
		case "meeting":
			categoryColor = "bg-blue-100 text-blue-800";
			break;
		case "workshop":
			categoryColor = "bg-green-100 text-green-800";
			break;
		case "social":
			categoryColor = "bg-yellow-100 text-yellow-800";
			break;
		case "annual-meet":
			categoryColor = "bg-purple-100 text-purple-800";
			break;
		default:
			categoryColor = "bg-gray-100 text-gray-800";
	}

	let categoryText;
	switch (category) {
		case "meeting":
			categoryText = "Meeting";
			break;
		case "workshop":
			categoryText = "Workshop";
			break;
		case "social":
			categoryText = "Social Event";
			break;
		default:
			categoryText = "Event";
	}

	return (
		<div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col h-full">
			<div className="relative">
				<img src={image} alt={title} className="w-full h-48 object-cover" />
				<span
					className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${categoryColor}`}
				>
					{categoryText}
				</span>
			</div>
			<div className="p-6 flex flex-col flex-grow">
				<h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
				<div className="space-y-2 text-gray-600 mb-4">
					<div className="flex items-center">
						<FaCalendarAlt className="mr-2 text-blue-600" />
						<span>{date}</span>
					</div>
					<div className="flex items-center">
						<FaClock className="mr-2 text-blue-600" />
						<span>{time}</span>
					</div>
					<div className="flex items-center">
						<FaMapMarkerAlt className="mr-2 text-blue-600" />
						<span>{location}</span>
					</div>
				</div>
				<div className="mt-auto pt-4 border-t border-gray-100">
					<button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
						Register Now
					</button>
				</div>
			</div>
		</div>
	);
};

// Helper functions for category styling
function getCategoryColor(category) {
	switch (category) {
		case "meeting":
			return "bg-blue-100 text-blue-800";
		case "workshop":
			return "bg-green-100 text-green-800";
		case "social":
			return "bg-yellow-100 text-yellow-800";
		case "annual-meet":
			return "bg-purple-100 text-purple-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
}

function getCategoryText(category) {
	switch (category) {
		case "meeting":
			return "Meeting";
		case "workshop":
			return "Workshop";
		case "social":
			return "Social Event";
		case "annual-meet":
			return "Annual Meet";
		default:
			return "Event";
	}
}

// Add CSS to hide scrollbar for the slider
const style = document.createElement("style");
style.textContent = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);

// Sample data
const events = [
	{
		title: "NVS Regional Alumni Meet & NAAO Annual Meet",
		date: "August 3, 2025",
		time: "08:00 AM - 10:00 PM",
		location: "Rail Auditorium, Bhubaneswar",
		image: "https://i.postimg.cc/q7CdZMSx/nvs-meet-banner-final.jpg",
		category: "annual-meet",
		status: "upcoming",
		registrationLink: "https://digikite.net/naao-meet/"
	},
	{
		title: "7th NAAO Annual Meet",
		date: "February 3, 2024",
		time: "08:00 AM - 10:00 PM",
		location: "Rail Auditorium, Bhubaneswar",
		image:
			"https://i.postimg.cc/NjHb2Xhc/IMG-0877.jpg",
		category: "annual-meet",
		status: "past",
	},
	{
		title: "Virtual GB Meeting",
		date: "June 29, 2025",
		time: "8:00 PM - 10:00 PM",
		location: "Virtual (Zoom)",
		image:
			"https://i.postimg.cc/6pfchXQj/IMG-20240106-WA0027.jpg",
		category: "meeting",
		status: "past",
	},
	{
		title: "RAM & NAAO Anual Meet Preparatory Meeting",
		date: "June 22, 2025",
		time: "11:00 AM - 4:00 PM",
		location: "Veterinary Council center, Saheed nagar,Bhubaneswar",
		image:
			"https://i.postimg.cc/SxdfXfv5/WhatsApp_Image_2025-06-22_at_14.24.21.jpg",
		category: "meeting",
		status: "past",
	},
	{
		title: "NAAO Business Conclave",
		date: "May 25, 2025",
		time: "11:00 AM - 6:00 PM",
		location: "Hotel Suryansh, Bhubaneswar",
		image:
			"https://i.postimg.cc/52MGVghF/WhatsApp_Image_2025-06-30_at_22.42.42.jpg",
		category: "workshop",
		status: "past",
	},
	{
		title: "NAAO Premier League",
		date: "Mrch 22-23, 2023",
		time: "8:00 AM - 11:00 PM",
		location: "Dadha Cricket Ground, Baranga, Bhubaneswar",
		image:
			"https://i.postimg.cc/wjxkTzZd/WhatsApp_Image_2025-06-30_at_22.17.57.jpg",
		category: "sports",
		status: "past",
	},
	{
		title: "Seed Ball Drive",
		date: "July-August, 2024",
		time: "NA",
		location: "District School Association",
		image:
			"https://i.postimg.cc/mrzdyV8p/Whats-App-Image-2025-06-30-at-00-49-05-5.jpg",
		category: "workshop",
		status: "past",
	},
	{
		title: "Cleanliness Drive",
		date: "October 2, 2024",
		time: "07:00 AM - 10:00 AM",
		location: "Jhinkardiha, Bhubaneswar",
		image:
			"https://i.postimg.cc/VNxs4fcy/WhatsApp_Image_2025-06-30_at_00.53.15_(6).jpg",
		category: "social",
		status: "past",
	},
	{
		title: "NAAO CAN WALK",
		date: "February 2, 2024",
		time: "07:00 AM - 10:00 AM",
		location: "Buddha Park, Bhubaneswar",
		image:
			"https://i.postimg.cc/TYrJR6nd/Whats-App-Image-2024-02-03-at-09-49-03-3d6aebe3.jpg",
		category: "social",
		status: "past",
	},
];

const pastEventImages = [
	{
		src: "https://i.postimg.cc/3RKZqbk8/IMG-0967.jpg",
		alt: "Career Workshop 2022",
	},
	{
		src: "https://i.postimg.cc/6pfchXQj/IMG-20240106-WA0027.jpg",
		alt: "Annual Meet 2022",
	},
	{
		src: "https://i.postimg.cc/P5sYcF7g/IMG-1199.jpg",
		alt: "Alumni Networking Event",
	},
	{
		src: "https://i.postimg.cc/d1pj0QW1/Whats-App-Image-2024-01-21-at-09-12-34-6039067e.jpg",
		alt: "Virtual Seminar 2022",
	},
	{
		src: "https://i.postimg.cc/4NnWZMBn/IMG-0834.jpg",
		alt: "School Visit Program",
	},
	{
		src: "https://i.postimg.cc/GtTTgkx3/IMG-1374.jpg",
		alt: "Executive Meeting",
	},
	{
		src: "https://i.postimg.cc/8zNBc0bh/Whats-App-Image-2024-02-03-at-09-49-10-b03b0127.jpg",
		alt: "Sports Event 2022",
	},
	{
		src: "https://i.postimg.cc/CMHc7Rs0/WhatsApp_Image_2025-06-30_at_00.49.06_(40).jpg",
		alt: "Cultural Night 2022",
	},
];

export default Events;

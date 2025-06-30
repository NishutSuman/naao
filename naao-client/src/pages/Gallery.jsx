import { useState } from "react";
import {
	FaSearch,
	FaTimes,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";

const Gallery = () => {
	const [activeCategory, setActiveCategory] = useState("all");
	const [searchText, setSearchText] = useState("");
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

	// Filter events based on category and search text
	const filteredEvents = galleryEvents.filter((event) => {
		const matchesCategory =
			activeCategory === "all" || event.category === activeCategory;
		const matchesSearch =
			!searchText ||
			event.title.toLowerCase().includes(searchText.toLowerCase()) ||
			event.date.toLowerCase().includes(searchText.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	// Open event modal
	const openEventModal = (event) => {
		setSelectedEvent(event);
		setCurrentPhotoIndex(0);
		document.body.style.overflow = "hidden";
	};

	// Close event modal
	const closeEventModal = () => {
		setSelectedEvent(null);
		document.body.style.overflow = "auto";
	};

	// Navigate to next photo in modal
	const nextPhoto = () => {
		if (selectedEvent) {
			setCurrentPhotoIndex((prevIndex) =>
				prevIndex === selectedEvent.photos.length - 1 ? 0 : prevIndex + 1
			);
		}
	};

	// Navigate to previous photo in modal
	const prevPhoto = () => {
		if (selectedEvent) {
			setCurrentPhotoIndex((prevIndex) =>
				prevIndex === 0 ? selectedEvent.photos.length - 1 : prevIndex - 1
			);
		}
	};

	// Handle keyboard navigation
	const handleKeyDown = (e) => {
		if (selectedEvent) {
			if (e.key === "ArrowRight") nextPhoto();
			if (e.key === "ArrowLeft") prevPhoto();
			if (e.key === "Escape") closeEventModal();
		}
	};

	return (
		<div onKeyDown={handleKeyDown} tabIndex="0">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-16">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">Photo Gallery</h1>
					<p className="text-xl max-w-3xl mx-auto">
						Memories captured during our various events and gatherings
					</p>
				</div>
			</div>

			{/* Gallery Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					{/* Search and Filter */}
					<div className="mb-10">
						<div className="flex flex-col md:flex-row md:justify-between items-center">
							<div className="mb-4 md:mb-0 w-full md:w-auto">
								<div className="relative">
									<input
										type="text"
										placeholder="Search events..."
										value={searchText}
										onChange={(e) => setSearchText(e.target.value)}
										className="pl-10 pr-4 py-2 w-full md:w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								</div>
							</div>

							<div className="flex flex-wrap justify-center md:justify-end gap-2">
								<CategoryButton
									isActive={activeCategory === "all"}
									onClick={() => setActiveCategory("all")}
								>
									All Events
								</CategoryButton>
								<CategoryButton
									isActive={activeCategory === "alumni-meets"}
									onClick={() => setActiveCategory("alumni-meets")}
								>
									Alumni Meets
								</CategoryButton>
								<CategoryButton
									isActive={activeCategory === "sports"}
									onClick={() => setActiveCategory("sports")}
								>
									Sports
								</CategoryButton>
								<CategoryButton
									isActive={activeCategory === "cultural"}
									onClick={() => setActiveCategory("cultural")}
								>
									Cultural Events
								</CategoryButton>
								<CategoryButton
									isActive={activeCategory === "social"}
									onClick={() => setActiveCategory("social")}
								>
									Social Initiatives
								</CategoryButton>
								<CategoryButton
									isActive={activeCategory === "workshops"}
									onClick={() => setActiveCategory("workshops")}
								>
									Workshops
								</CategoryButton>
							</div>
						</div>
					</div>

					{/* Events Grid */}
					{filteredEvents.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredEvents.map((event, index) => (
								<EventCard
									key={index}
									event={event}
									onClick={() => openEventModal(event)}
								/>
							))}
						</div>
					) : (
						<div className="text-center py-10">
							<p className="text-xl text-gray-500">
								No events found matching your search.
							</p>
						</div>
					)}
				</div>
			</section>

			{/* Event Photos Modal */}
			{selectedEvent && (
				<div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
					<div className="relative max-w-5xl w-full h-full flex items-center justify-center">
						{/* Modal controls - repositioned */}
						<div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
							<div className="text-white text-sm bg-black bg-opacity-70 px-3 py-1 rounded-full">
								{currentPhotoIndex + 1} / {selectedEvent.photos.length}
							</div>
							<button
								onClick={closeEventModal}
								className="text-white hover:text-yellow-400 transition-colors duration-300 bg-black bg-opacity-70 p-2 rounded-full"
								aria-label="Close modal"
							>
								<FaTimes size={20} />
							</button>
						</div>

						{/* Navigation buttons */}
						<button
							onClick={prevPhoto}
							className="absolute left-2 md:left-4 z-10 text-white hover:text-yellow-400 bg-black bg-opacity-50 p-2 rounded-full transition-colors"
							aria-label="Previous photo"
						>
							<FaChevronLeft size={20} />
						</button>

						{/* Photo */}
						<div className="w-full h-full flex items-center justify-center">
							<img
								src={selectedEvent.photos[currentPhotoIndex]}
								alt={`${selectedEvent.title} - Photo ${currentPhotoIndex + 1}`}
								className="max-h-[80vh] max-w-full object-contain"
							/>
						</div>

						<button
							onClick={nextPhoto}
							className="absolute right-2 md:right-4 z-10 text-white hover:text-yellow-400 bg-black bg-opacity-50 p-2 rounded-full transition-colors"
							aria-label="Next photo"
						>
							<FaChevronRight size={20} />
						</button>
					</div>

					{/* Event information */}
					<div className="absolute bottom-4 left-0 right-0 mx-auto max-w-3xl bg-black bg-opacity-70 text-white p-4 rounded">
						<h3 className="text-xl font-bold">{selectedEvent.title}</h3>
						<p className="text-sm text-gray-300">{selectedEvent.date}</p>
					</div>
				</div>
			)}
		</div>
	);
};

// Event Card Component
const EventCard = ({ event, onClick }) => (
	<div
		className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
		onClick={onClick}
	>
		<div className="relative aspect-w-16 aspect-h-9">
			{/* Cover image */}
			<img
				src={event.coverPhoto || event.photos[0]}
				alt={event.title}
				className="w-full h-56 object-cover"
			/>

			{/* Photo count badge */}
			<div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
				{event.photos.length} photos
			</div>
		</div>

		<div className="p-4">
			<h3 className="text-xl font-bold text-gray-800 mb-1">{event.title}</h3>
			<p className="text-sm text-gray-500 mb-2">{event.date}</p>
			<div className="flex items-center text-xs text-blue-600 font-medium">
				<span>View Album</span>
				<FaChevronRight className="ml-1" size={12} />
			</div>
		</div>
	</div>
);

const CategoryButton = ({ isActive, onClick, children }) => (
	<button
		className={`px-4 py-2 rounded-full transition duration-300 ${
			isActive
				? "bg-blue-600 text-white"
				: "bg-white text-gray-700 border hover:bg-gray-100"
		}`}
		onClick={onClick}
	>
		{children}
	</button>
);

// Restructured gallery data - grouped by events
const galleryEvents = [
	{
		title: "7th NAAO Annual Meet 2023-24",
		date: "February 3, 2024",
		category: "alumni-meets",
		coverPhoto: "https://i.postimg.cc/NjHb2Xhc/IMG-0877.jpg",
		photos: [
			"https://i.postimg.cc/P5sYcF7g/IMG-1199.jpg",
			"https://i.postimg.cc/HnN4VYBn/IMG-1090.jpg",
			"https://i.postimg.cc/NjHb2Xhc/IMG-0877.jpg",
			"https://i.postimg.cc/3RKZqbk8/IMG-0967.jpg",
			"https://i.postimg.cc/fRcmhfnJ/IMG-1204.jpg",
			"https://i.postimg.cc/hvv1Dz8N/IMG-1060.jpg",
			"https://i.postimg.cc/4NnWZMBn/IMG-0834.jpg",
			"https://i.postimg.cc/TYSCP940/IMG-0835.jpg",
			"https://i.postimg.cc/tgGk3gyV/IMG-0803.jpg",
		],
	},
	{
		title: "NAAO CAN WALK 2024",
		date: "February 2, 2024",
		category: "social",
		coverPhoto:
			"https://i.postimg.cc/kGSFRrZy/Whats-App-Image-2024-02-03-at-09-49-00-a03f4f78.jpg",
		photos: [
			"https://i.postimg.cc/kGSFRrZy/Whats-App-Image-2024-02-03-at-09-49-00-a03f4f78.jpg",
			"https://i.postimg.cc/TYrJR6nd/Whats-App-Image-2024-02-03-at-09-49-03-3d6aebe3.jpg",
			"https://i.postimg.cc/Fstx5RdC/Whats-App-Image-2024-02-03-at-09-49-05-65218386.jpg",
			"https://i.postimg.cc/8zNBc0bh/Whats-App-Image-2024-02-03-at-09-49-10-b03b0127.jpg",
			"https://i.postimg.cc/fRC79fH1/Whats-App-Image-2024-02-03-at-10-06-29-817cfef4.jpg",
		],
	},
	{
		title: "General/Preparatory Meet",
		date: "Throughout 2023-24",
		category: "alumni-meets",
		coverPhoto: "https://i.postimg.cc/15xHbtFW/Whats-App-Image-2025-06-22-at-14-24-19.jpg",
		photos: [
			"https://i.postimg.cc/RVcRmBQv/Whats-App-Image-2025-06-22-at-14-24-25.jpg",
			"https://i.postimg.cc/fbbjY04b/Whats-App-Image-2025-06-22-at-14-24-27.jpg",
			"https://i.postimg.cc/k4By9Rvz/IMG-20231211-WA0026.jpg",
			"https://i.postimg.cc/pX8qp8Mt/IMG-20240106-WA0019.jpg",
			"https://i.postimg.cc/6pfchXQj/IMG-20240106-WA0027.jpg",
			"https://i.postimg.cc/5t937RYx/Whats-App-Image-2024-01-13-at-11-23-54-0809a52d.jpg",
		],
	},
	{
		title: "NAAO MEET CULTURAL 2024",
		date: "February 3, 2024",
		category: "cultural",
		coverPhoto: "https://i.postimg.cc/C1m4pH8j/IMG-1034.jpg",
		photos: [
			"https://i.postimg.cc/C1m4pH8j/IMG-1034.jpg",
			"https://i.postimg.cc/g0GRcLm4/IMG-1244.jpg",
			"https://i.postimg.cc/q7QKNB7r/IMG-1250.jpg",
			"https://i.postimg.cc/PxxwYGLw/IMG-1268.jpg",
			"https://i.postimg.cc/wvGskWJb/IMG-1283.jpg",
			"https://i.postimg.cc/c6qgprFR/IMG-1382.jpg",
			"https://i.postimg.cc/Kc19hw9j/IMG-1417.jpg",
		],
	},
	{
		title: "NAAO Premier League 2025",
		date: "March 22 & 23, 2025",
		category: "sports",
		coverPhoto:
			"https://i.postimg.cc/wjxkTzZd/Whats-App-Image-2025-06-30-at-22-17-57.jpg",
		photos: [
			"https://i.postimg.cc/wjxkTzZd/Whats-App-Image-2025-06-30-at-22-17-57.jpg",
			"https://i.postimg.cc/0NbdDf9W/Whats-App-Image-2025-06-30-at-22-18-00.jpg",
			"https://i.postimg.cc/bvW0TtJz/Whats-App-Image-2025-06-30-at-22-18-01.jpg",
			"https://i.postimg.cc/jqz6HCrb/Whats-App-Image-2025-06-30-at-22-18-02.jpg",
			"https://i.postimg.cc/MKmDSHsD/Whats-App-Image-2025-06-30-at-22-17-59.jpg",
			"https://i.postimg.cc/HkS9rK18/Whats-App-Image-2025-06-30-at-22-12-33.jpg",
			"https://i.postimg.cc/ZKHrQgRs/Whats-App-Image-2025-06-30-at-22-17-59-1.jpg",
		],
	},
	{
		title: "Seed Ball Drive",
		date: "July-August 2024",
		category: "social",
		coverPhoto:
			"https://i.postimg.cc/mrzdyV8p/Whats-App-Image-2025-06-30-at-00-49-05-5.jpg",
		photos: [
			"https://i.postimg.cc/mrzdyV8p/Whats-App-Image-2025-06-30-at-00-49-05-5.jpg",
			"https://i.postimg.cc/hGk2yxYD/Whats-App-Image-2025-06-30-at-00-49-05-2.jpg",
			"https://i.postimg.cc/x1dpc9H2/Whats-App-Image-2025-06-30-at-00-49-06-13.jpg",
			"https://i.postimg.cc/jSkgfBQJ/Whats-App-Image-2025-06-30-at-00-49-06-3.jpg",
			"https://i.postimg.cc/qR2j9qf8/Whats-App-Image-2025-06-30-at-00-49-06-31.jpg",
			"https://i.postimg.cc/L5Tv8W85/Whats-App-Image-2025-06-30-at-00-49-06-36.jpg",
			"https://i.postimg.cc/CMHc7Rs0/Whats-App-Image-2025-06-30-at-00-49-06-40.jpg",
			"https://i.postimg.cc/KjFJFbFC/Whats-App-Image-2025-06-30-at-00-49-06-44.jpg",
			"https://i.postimg.cc/ncF0Pn3D/Whats-App-Image-2025-06-30-at-00-49-06-45.jpg",
			"https://i.postimg.cc/fT8B41Pg/Whats-App-Image-2025-06-30-at-00-49-06-54.jpg",
		],
	},
	{
		title: "NAAO Business Conclave 2025",
		date: "May 25, 2025",
		category: "workshops",
		coverPhoto: "https://i.postimg.cc/W16ybrVY/Whats-App-Image-2025-06-30-at-22-41-20.jpg",
		photos: [
			"https://i.postimg.cc/zvTfyp0R/Whats-App-Image-2025-05-26-at-12-18-06-1.jpg",
			"https://i.postimg.cc/52MGVghF/Whats-App-Image-2025-06-30-at-22-42-42.jpg",
			"https://i.postimg.cc/MZBH3KqK/Whats-App-Image-2025-05-26-at-12-18-06.jpg",
			"https://i.postimg.cc/bJDrhqng/Whats-App-Image-2025-05-25-at-10-58-36.jpg",
			"https://i.postimg.cc/50h09DqV/Whats-App-Image-2025-05-26-at-12-18-13.jpg",
			"https://i.postimg.cc/W16ybrVY/Whats-App-Image-2025-06-30-at-22-41-20.jpg",
		
		],
	},
	{
		title: "School Group Photos",
		date: "On Stage During NAAO Annual Meet",
		category: "alumni-meet",
		coverPhoto: "https://i.postimg.cc/TPcVnqCZ/IMG-1161.jpg",
		photos: [
			"https://i.postimg.cc/TPcVnqCZ/IMG-1161.jpg",
			"https://i.postimg.cc/Kcp59fxb/IMG-1129.jpg",
			"https://i.postimg.cc/tC1N864x/IMG-1140.jpg",
			"https://i.postimg.cc/xTW3QdXF/IMG-1146.jpg",
			"https://i.postimg.cc/P5Yz5kZf/IMG-1155.jpg",
			"https://i.postimg.cc/g0pywBqV/IMG-1157.jpg",
			"https://i.postimg.cc/xCTK5JZq/IMG-1167.jpg",
			"https://i.postimg.cc/DZj1MfV6/IMG-1170.jpg",
			"https://i.postimg.cc/tJsFQ0pj/IMG-1185.jpg",
			"https://i.postimg.cc/Wzxgs91J/IMG-1189.jpg",
			"https://i.postimg.cc/1Rdp0zr5/IMG-1194.jpg",
		],
	},
	{
		title: "Cleanliness Drive",
		date: "October 2, 2024",
		category: "social",
		coverPhoto:
			"https://i.postimg.cc/VNxs4fcy/Whats-App-Image-2025-06-30-at-00-53-15-6.jpg",
		photos: [
			"https://i.postimg.cc/VNxs4fcy/Whats-App-Image-2025-06-30-at-00-53-15-6.jpg",
			"https://i.postimg.cc/dV00VN9f/Whats-App-Image-2025-06-30-at-00-53-15-3.jpg",
			"https://i.postimg.cc/FKdsjf8g/Whats-App-Image-2025-06-30-at-00-53-15-4.jpg",
			"https://i.postimg.cc/3xbx4jSx/Whats-App-Image-2025-06-30-at-00-53-15-2.jpg",
			"https://i.postimg.cc/5Ng01W8v/Whats-App-Image-2025-06-30-at-00-53-15-1.jpg",
			"https://i.postimg.cc/fyZzn8LB/Whats-App-Image-2025-06-30-at-00-53-15.jpg",
			"https://i.postimg.cc/MT16FCWn/Whats-App-Image-2025-06-30-at-00-53-15-7.jpg",
		],
	},
];

export default Gallery;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	FaCalendarAlt,
	FaUserFriends,
	FaGraduationCap,
	FaHandshake,
	FaTimes,
} from "react-icons/fa";
import HeroSection from "../components/HeroSection";
import MessageCard from "../components/MessageCard";
import EventCard from "../components/EventCard";
import SouvenirPdf from "../assets/Souvenir_2024_compressed.pdf";
import NaaoActivityReport from "../assets/naao-activity-report.pdf";
import PdfComp from "../components/PdfComp";

const Home = () => {
	// State for popup visibility
	const [showPopup, setShowPopup] = useState(false);

	// Show popup after 5 seconds
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowPopup(true);
		}, 5000);

		// Clear timeout if component unmounts
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="flex flex-col">
			{/* Hero Section */}
			<HeroSection />

			{/* Quick Stats */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
						<StatCard
							icon={<FaGraduationCap />}
							count="15000+"
							label="Alumni"
							color="from-blue-500 to-blue-700"
						/>
						<StatCard
							icon={<FaCalendarAlt />}
							count="50+"
							label="Events"
							color="from-green-500 to-green-700"
						/>
						<StatCard
							icon={<FaUserFriends />}
							count="31"
							label="JNVs"
							color="from-yellow-500 to-yellow-700"
						/>
						<StatCard
							icon={<FaHandshake />}
							count="9+"
							label="Years"
							color="from-purple-500 to-purple-700"
						/>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-800">About NAAO</h2>
						<div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
						<p className="text-gray-600 max-w-3xl mx-auto">
							Navodaya Alumni Association of Odisha (NAAO) connects alumni from
							all Jawahar Navodaya Vidyalayas across Odisha, fostering a strong
							community that supports both alumni and current students.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-10 items-center">
						<div className="space-y-4">
							<h3 className="text-2xl font-semibold text-gray-800">
								Our Mission
							</h3>
							<p className="text-gray-600">
								The mission of NAAO is to link all JNV alumni associations in
								Odisha to develop synergistic plans to help and support all JNV,
								students, staff, members and society as a whole to achieve its
								vision, and to enable JNV alumnus add value to society.
							</p>
							<h3 className="text-2xl font-semibold text-gray-800">
								Our Vision
							</h3>
							<p className="text-gray-600">
								To unite and create a socially conducive and symbiotic platform
								among all JNV alumni associations in Odisha for the betterment
								of alma-maters, members, and society at large.
							</p>
							<div className="pt-4">
								<Link
									to="/about"
									className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
								>
									Learn More
								</Link>
							</div>
						</div>
						<div className="rounded-lg overflow-hidden shadow-lg">
							<img
								src="https://i.postimg.cc/Kc35HLzg/Whats-App-Image-2024-02-02-at-11-19-28-AM-1.jpg"
								alt="NAAO Team"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Messages Section */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-800">
							Messages from Our Leaders
						</h2>
						<div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						<MessageCard
							name="Mr. Ashabhanu Swain"
							position="President, NAAO"
							message="As we strengthen our alumni network, I invite all Navodayans from Odisha to join hands in building a community that supports each other and gives back to our alma mater. Together, we can create impactful initiatives that benefit both alumni and current students."
							image="https://i.postimg.cc/90fSTfVj/Asha-bhai.jpg"
						/>
						<MessageCard
							name="Mr. Saroj Bag"
							position="Secretary, NAAO"
							message="Our association thrives on the active participation of all alumni. In the coming months, we have planned several events focused on professional development, mentorship programs, and social initiatives. I encourage everyone to participate and contribute to our collective growth."
							image="https://i.postimg.cc/kGhHydXR/Saroj-bhai.jpg"
						/>
					</div>
				</div>
			</section>

			{/* PDF Section */}
			<section className="bg-blue-50 py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
						{/* First PDF - Souvenir */}
						<div>
							<div className="text-center mb-8">
								<h2 className="text-3xl font-bold text-gray-800">
									NAAO Souvenir
								</h2>
								<div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
								<p className="text-gray-600 max-w-2xl mx-auto">
									The NAAO Souvenir is a commemorative publication that
									highlights the achievements and contributions of our alumni.
									It serves as a platform to showcase success stories, memorable
									moments, and the impact of our community.
								</p>
							</div>

							{/* PDF Viewer */}
							<div className="max-w-2xl mx-auto">
								<PdfComp
									pdfFile={SouvenirPdf}
									title="NAAO Souvenir 2023-24"
									downloadFileName="NAAO_Souvenir_2023-24.pdf"
									maxHeight="600px"
								/>
							</div>
						</div>

						{/* Second PDF - Activity Report */}
						<div>
							<div className="text-center mb-8">
								<h2 className="text-3xl font-bold text-gray-800">
									NAAO Activity Report
								</h2>
								<div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
								<p className="text-gray-600 max-w-2xl mx-auto">
									The NAAO Activity Report provides an overview of our
									initiatives, events, and community engagement over the past
									years. It highlights the impact we have made together for
									society and how we got strengthened as a community.
								</p>
							</div>

							{/* PDF Viewer */}
							<div className="max-w-2xl mx-auto">
								<PdfComp
									pdfFile={NaaoActivityReport}
									title="NAAO Activity Report"
									downloadFileName="NAAO_Activity_Report.pdf"
									maxHeight="600px"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Upcoming Events */}
			{/* <section className="py-16">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-800">
							Upcoming Events
						</h2>
						<div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<EventCard
							title="Annual Alumni Meet 2023"
							date="December 15, 2023"
							location="Hotel Swosti Premium, Bhubaneswar"
							image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
						/>
						<EventCard
							title="Career Guidance Workshop"
							date="November 5, 2023"
							location="Virtual Event"
							image="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
						/>
						<EventCard
							title="Scholarship Distribution Ceremony"
							date="October 22, 2023"
							location="JNV Khordha"
							image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
						/>
					</div>

					<div className="text-center mt-12">
						<Link
							to="/events"
							className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
						>
							View All Events
						</Link>
					</div>
				</div>
			</section> */}

			{/* Registration Popup */}
			{showPopup && <EventPopup onClose={() => setShowPopup(false)} />}
		</div>
	);
};

const StatCard = ({
	icon,
	count,
	label,
	color = "from-blue-500 to-blue-700",
}) => (
	<div className="relative overflow-hidden bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-b-4 border-blue-500 transform hover:-translate-y-1 group">
		{/* Background gradient that shows on hover */}
		<div
			className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
		></div>

		{/* Icon circle with animation */}
		<div className="flex justify-center mb-4">
			<div
				className={`relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${color} text-white p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}
			>
				<div className="text-2xl">{icon}</div>
				{/* Animated ripple effect on hover */}
				<div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700"></div>
			</div>
		</div>

		{/* Counter with animation */}
		<div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300">
			{count}
		</div>
		<div className="text-gray-600 font-medium">{label}</div>
	</div>
);

const EventPopup = ({ onClose }) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
			<div className="bg-white rounded-lg w-full max-w-md shadow-2xl relative overflow-hidden">
				{/* Decorative header */}
				<div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-16 w-full absolute top-0 left-0">
					{/* <div className="absolute -bottom-6 left-0 w-full h-12 bg-white rounded-full transform scale-150"></div> */}
				</div>

				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 text-white p-1 rounded-full transition-colors z-10"
				>
					<FaTimes size={20} />
				</button>

				{/* Content */}
				<div className="pt-20 px-6 pb-6">
					<div className="text-center">
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							NVS Bhopal Region Alumni Meet <br /> & <br /> NAAO Annual Meet
						</h3>
						<p className="text-gray-600 mb-6">
							Don't miss our biggest event of the year! <br/>
							Register now to secure
							your spot.
						</p>

						<div className="flex items-center justify-center space-x-4 mb-6">
							<div className="text-center">
								<div className="text-blue-600 font-bold text-lg">03</div>
								<div className="text-xs text-gray-500">August</div>
							</div>
							<div className="h-10 w-px bg-gray-300"></div>
							<div className="text-center">
								<div className="text-blue-600 font-bold text-lg">08:00 AM</div>
								<div className="text-xs text-gray-500">Onwards</div>
							</div>
							<div className="h-10 w-px bg-gray-300"></div>
							<div className="text-center">
								<div className="text-blue-600 font-bold text-lg">
									Bhubaneswar
								</div>
								<div className="text-xs text-gray-500">Rail Auditorium</div>
							</div>
						</div>

						{/* <form
							className="space-y-4 mb-4"
							// onSubmit={() =>
							// 	window.open("https://digikite.net/naao-meet/", "_blank")
							// }
						>
							<button
								type="submit"
								className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
							>
								Register Now
							</button>
						</form> */}
						<div className=" mb-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
							<Link to="/events/bram-naao-2025">Register Now</Link>
						</div>

						<div className="text-xs text-gray-500">
							Limited seats available. Registration closes on August 1st, 2025.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;

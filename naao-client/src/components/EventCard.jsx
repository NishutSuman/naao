import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const EventCard = ({ title, date, location, image }) => {
	return (
		<div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 h-full flex flex-col">
			<div className="h-48 overflow-hidden">
				<img
					src={image}
					alt={title}
					className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
				/>
			</div>
			<div className="p-6 flex flex-col flex-grow">
				<h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
				<div className="flex items-center mb-2 text-gray-600">
					<FaCalendarAlt className="mr-2 text-blue-600" />
					<span>{date}</span>
				</div>
				<div className="flex items-center text-gray-600">
					<FaMapMarkerAlt className="mr-2 text-blue-600" />
					<span>{location}</span>
				</div>
				<div className="mt-4 pt-4 border-t border-gray-100 mt-auto">
					<button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
						View Details
					</button>
				</div>
			</div>
		</div>
	);
};

export default EventCard;

import { FaQuoteLeft } from "react-icons/fa";

const MessageCard = ({ name, position, message, image }) => {
	return (
		<div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
			<div className="flex flex-col sm:flex-row gap-6">
				<div className="sm:w-1/3 flex justify-center">
					<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
						<img
							src={image}
							alt={name}
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
				<div className="sm:w-2/3">
					<div className="text-blue-600 mb-4">
						<FaQuoteLeft size={24} />
					</div>
					<p className="text-gray-700 italic mb-4">"{message}"</p>
					<div className="mt-4">
						<h4 className="text-lg font-bold text-gray-900">{name}</h4>
						<p className="text-sm text-blue-600">{position}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageCard;

import { FaEnvelope, FaLinkedin, FaPhoneAlt } from "react-icons/fa";

const OfficeBearers = () => {
	return (
		<div>
			<div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-16">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">
						Our Office Bearers
					</h1>
					<p className="text-xl max-w-3xl mx-auto">
						Meet the dedicated team leading the Navodaya Alumni Association of
						Odisha
					</p>
				</div>
			</div>

			<section className="py-16">
				<div className="container mx-auto px-4">
					{/* Executive Committee */}
					<div className="mb-16">
						<h2 className="text-2xl font-bold text-center mb-2">
							Office Executives
						</h2>
						<div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>

						<div className="grid md:grid-cols-3 gap-8">
							{executiveCommittee.map((member, index) => (
								<MemberCard key={index} {...member} />
							))}
						</div>
					</div>

					{/* Advisory Board */}
					<div className="mb-16">
						<h2 className="text-2xl font-bold text-center mb-2">
							Joint Executives
						</h2>
						<div className="w-24 h-2 bg-blue-600 mx-auto mb-12"></div>

						<div className="grid md:grid-cols-3 gap-6">
							{advisoryBoard.map((member, index) => (
								<MemberCard key={index} {...member} />
							))}
						</div>
					</div>

					{/* District Coordinators */}
					{/* <div>
						<h2 className="text-2xl font-bold text-center mb-2">
							District Coordinators
						</h2>
						<div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>

						<div className="grid md:grid-cols-4 gap-6">
							{districtCoordinators.map((member, index) => (
								<MemberCard key={index} {...member} small />
							))}
						</div>
					</div> */}
				</div>
			</section>
		</div>
	);
};

const MemberCard = ({ name, position, jnv, passoutYear, image, bio, contact, small }) => {
	return (
		<div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full">
			<div className={`${small ? "h-48" : "h-64"} overflow-hidden`}>
				<img src={image} alt={name} className="w-full h-full object-cover" />
			</div>
			<div className="p-6 flex flex-col flex-grow">
				<h3 className="text-xl font-bold text-gray-800">{name}</h3>
				<p className="text-gray-600 mb-3"> JNV {jnv}, {passoutYear}</p>
				<p className="text-blue-600 mb-3">{position}</p>
		

				{!small && bio && <p className="text-gray-600 mb-4 text-sm">{bio}</p>}

				<div className="mt-auto">
					<div className="flex gap-3 text-gray-600 justify-center">
						{contact.email && (
							<a
								href={`mailto:${contact.email}`}
								className="hover:text-blue-600"
							>
								<FaEnvelope />
							</a>
						)}
						{contact.phone && (
							<a href={`tel:${contact.phone}`} className="hover:text-blue-600">
								<FaPhoneAlt />
							</a>
						)}
						{contact.linkedin && (
							<a
								href={contact.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-blue-600"
							>
								<FaLinkedin />
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

// Sample data for office bearers
const executiveCommittee = [
	{
		name: "Mr. Ashabhanu Swain",
		position: "President",
		image: "https://i.postimg.cc/90fSTfVj/Asha-bhai.jpg",
		bio: "Mr. Ashabhanu Swain, an Educationist and proud JNV Cuttack (1996) alumnus, holds over 13 years of experience in the IT industry, having worked with leading multinational corporations.",
		jnv: "Cuttack",
		passoutYear: 1996,
		contact: {
			email: "naao.committee@gmail.com",
			phone: "+919008034884",
			linkedin: "",
		},
	},
	{
		name: "Mr. Saroj Bag",
		position: "Secretary",
		image: "https://i.postimg.cc/kGhHydXR/Saroj-bhai.jpg",
		bio: "Mr. Saroj Bag, an entrepreneur and proud JNV Koraput (1997) alumnus, brings over 12 years of rich corporate experience as a Startup Consultant, with expertise spanning FinTech, Banking, and Financial Services.",
		jnv: "Koraput",
		passoutYear: 1997,
		contact: {
			email: "naao.committee@gmail.com",
			phone: "+919381297056",
			linkedin: "",
		},
	},
	{
		name: "Mr. Sitaram Beria",
		position: "Treasurer",
		image: "https://i.postimg.cc/kgLj4cB9/Sitaram-bhai.jpg",
		bio: "Mr. Sitaram Beria is a chartered accountant by profession and manages all financial aspects of the association. He completed his schooling from JNV Bolangir in 2002.",
		jnv: "Bolangir",
		passoutYear: 2002,
		contact: {
			email: "naao.committee@gmail.com",
			phone: "+919040206604",
			linkedin: "",
		},
	},
];

const advisoryBoard = [
	{
		name: "Miss Shobha Bhanja",
		position: "Vice President",
		image: "https://i.postimg.cc/ZKm8RQbJ/Shobha-di.jpg",
		jnv: "Sundargarh",
		passoutYear: 2005,
		contact: {
			email: "",
			linkedin: "",
		},
	},
	{
		name: "Mr. Premlal Seth",
		position: "Vice President",
		image: "https://i.postimg.cc/C1S9hNQ5/Prem-bhai.jpg",
		jnv: "Sonepur",
		passoutYear: 2008,
		contact: {
			email: "",
			linkedin: "",
		},
	},
	{
		name: "Mnoj Kumar Pattnaik",
		position: "Joint Secretary",
		image: "https://i.postimg.cc/bNNVFr7X/Manoj-bhai.jpg",
		jnv: "Gajapati",
		passoutYear: 2010,
		contact: {
			email: "",
			linkedin: "",
		},
	},
	{
		name: "Smruti Ranjan Sahoo",
		position: "Joint Secretary",
		image: "https://i.postimg.cc/52N85FQG/Smruti.jpg",
		jnv: "Nayagarh",
		passoutYear: 2019,
		contact: {
			email: "",
			linkedin: "",
		},
	},
	{
		name: "Mrs. Pravasini Mohanty",
		position: "Joint Treasurer",
		image: "https://i.postimg.cc/DyjpVFhS/Prava-di.jpg",
		jnv: "Nabarangpur",
		passoutYear: 2012,
		contact: {
			email: "",
			linkedin: "",
		},
	},
	{
		name: "Nishut Suman",
		position: "Joint Treasurer",
		image: "https://i.postimg.cc/mrHTz8jS/Nishut-2.jpg",
		jnv: "Jajpur",
		passoutYear: 2016,
		contact: {
			email: "",
			linkedin: "",
		},
	},
];

// const districtCoordinators = [
// 	{
// 		name: "Vikram Singh",
// 		position: "Bhubaneswar",
// 		image:
// 			"https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
// 		contact: {
// 			phone: "+919876543220",
// 			email: "vikram@naao.org",
// 		},
// 	},
// 	{
// 		name: "Neha Pradhan",
// 		position: "Cuttack",
// 		image:
// 			"https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
// 		contact: {
// 			phone: "+919876543221",
// 			email: "neha@naao.org",
// 		},
// 	},
// 	{
// 		name: "Manoj Kumar",
// 		position: "Puri",
// 		image:
// 			"https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
// 		contact: {
// 			phone: "+919876543222",
// 			email: "manoj@naao.org",
// 		},
// 	},
// 	{
// 		name: "Divya Patnaik",
// 		position: "Sambalpur",
// 		image:
// 			"https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
// 		contact: {
// 			phone: "+919876543223",
// 			email: "divya@naao.org",
// 		},
// 	},
// ];

export default OfficeBearers;

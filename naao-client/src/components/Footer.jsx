import { Link } from "react-router-dom";
import {
	FaFacebook,
	FaTwitter,
	FaInstagram,
	FaLinkedin,
	FaEnvelope,
	FaPhone,
	FaMapMarkerAlt,
	FaYoutube,
} from "react-icons/fa";
import logo from "../assets/naao-logo.png"; // Import the logo

const Footer = () => {
	return (
		<footer className="bg-gray-900 text-white pt-12 pb-8">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
					<div className="mx-auto">
						<Link to="/" className="flex items-center space-x-3 mb-4">
							<img
								src={logo}
								alt="NAAO Logo"
								className="h-20 w-auto bg-slate-200 mx-auto"
							/>
						</Link>
						<p className="text-gray-300 mb-4">
							Navodaya Alumni Association of Odisha <br /> NAAO
						</p>
						<div className="flex space-x-6 justify-center mx-auto">
							<SocialIcon
								icon={<FaFacebook size={24} />}
								href="https://www.facebook.com/groups/naaooffice"
							/>
							{/* <SocialIcon icon={<FaTwitter />} href="https://twitter.com" /> */}
							<SocialIcon
								icon={<FaInstagram size={24} />}
								href="https://www.instagram.com/naaooffice/"
							/>
							<SocialIcon
								icon={<FaYoutube size={24} />}
								href="https://www.youtube.com/@naaoodisha"
							/>
						</div>
					</div>

					<div>
						<h3 className="text-xl font-bold mb-4">Quick Links</h3>
						<ul className="space-y-2">
							<FooterLink to="/">Home</FooterLink>
							<FooterLink to="/about">About Us</FooterLink>
							<FooterLink to="/events">Events</FooterLink>
							<FooterLink to="/gallery">Gallery</FooterLink>
							<FooterLink to="/office-bearers">Office Bearers</FooterLink>
						</ul>
					</div>

					<div>
						<h3 className="text-xl font-bold mb-4">Important Links</h3>
						<ul className="space-y-2">
							<FooterLink to="http://navodaya.gov.in/">
								Navodaya Vidyalaya Samiti
							</FooterLink>
							<FooterLink to="https://cnrobhopal.nvs.ac.in/">
								NVS RO Bhopal
							</FooterLink>
							<FooterLink to="/contact">Contact Us</FooterLink>
							<FooterLink to="https://digikite.net/naao-meet/" target="_blank">
								Donate Now
							</FooterLink>
						</ul>
					</div>

					<div className="text-center">
						<h3 className="text-xl font-bold mb-4">Contact Information</h3>

						<div className="space-y-3 text-gray-300">
							<div className="flex-col place-items-center space-x-3">
								<FaMapMarkerAlt className="text-blue-400 mb-2" />
								<span>
									1461/7705, Ground Floor, Satya Vihar, <br /> Rasulgarh,
									Bhubaneswar, <br />
									Odisha, 751010
								</span>
							</div>
							<div className="flex-col place-items-center space-x-3">
								<FaPhone className="text-blue-400 mb-2" />
								<span>
									+91 93812 97056 <br /> +91 80951 12234
								</span>
							</div>
							<div className="flex-col place-items-center space-x-3">
								<FaEnvelope className="text-blue-400 mb-2" />
								<span>naao.committee@gmail.com</span>
							</div>
						</div>
					</div>
				</div>

				<div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
					<p>
						&copy; {new Date().getFullYear()} Navodaya Alumni Association of
						Odisha. All rights reserved.
					</p>
					<p>Developed and Managed by NAAO IT Cell with ❤️</p>
				</div>
			</div>
		</footer>
	);
};

const SocialIcon = ({ icon, href }) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
	>
		{icon}
	</a>
);

const FooterLink = ({ to, children }) => (
	<li>
		<Link
			to={to}
			className="text-gray-400 hover:text-blue-400 transition-colors duration-300 "
		>
			{children}
		</Link>
	</li>
);

export default Footer;

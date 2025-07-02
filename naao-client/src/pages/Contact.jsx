import { useState } from "react";
import {
	FaMapMarkerAlt,
	FaPhone,
	FaEnvelope,
	FaFacebook,
	FaInstagram,
	FaYoutube,
	FaMap,
	FaQuestionCircle,
	FaCalendarAlt,
	FaBed,
	FaBus,
} from "react-icons/fa";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [formStatus, setFormStatus] = useState({
		submitted: false,
		error: false,
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Simulate form submission
		setFormStatus({
			submitted: true,
			error: false,
			message: "Thank you for your message. We will get back to you soon!",
		});

		// Reset form after submission
		setFormData({
			name: "",
			email: "",
			subject: "",
			message: "",
		});
	};

	return (
		<div>
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-16">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
					<p className="text-xl max-w-3xl mx-auto">
						Get in touch with the Navodaya Alumni Association of Odisha
					</p>
				</div>
			</div>

			{/* Contact Information Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-2 gap-10">
						<div className="flex flex-col h-full">
							<div className="bg-white p-8 rounded-xl shadow-lg h-full flex flex-col">
								<h2 className="text-2xl font-bold text-gray-800 mb-6">
									Get in Touch
								</h2>
								<p className="text-gray-600 mb-8">
									Have questions about our association, events, or social
									activities? We're here to help. Feel free to reach out using
									any of the contact methods below.
								</p>

								<div className="space-y-6 mb-8 flex-grow place-items-center">
									<ContactItem
										icon={<FaMapMarkerAlt className="text-xl" />}
										title="Address"
										content={
											<span>
												1461/7705, Ground Floor, Satya Vihar, <br /> Rasulgarh,
												Bhubaneswar, <br />
												Odisha, 751010
											</span>
										}
									/>
									<ContactItem
										icon={<FaPhone className="text-xl" />}
										title="Phone"
										content={
											<>
												<a
													href="tel:+918095112234"
													className="hover:text-blue-600 block"
												>
													+91 80951 12234
												</a>
												<a
													href="tel:+919381297056"
													className="hover:text-blue-600 block"
												>
													+91 93812 97056
												</a>
											</>
										}
									/>
									<ContactItem
										icon={<FaEnvelope className="text-xl" />}
										title="Email"
										content={
											<a
												href="mailto:naao.committee@gmail.com"
												className="hover:text-blue-600"
											>
												naao.committee@gmail.com
											</a>
										}
									/>
								</div>

								<div className="pt-6 border-t border-gray-100">
									<h3 className="text-lg font-semibold text-gray-800 mb-4">
										Follow Us
									</h3>
									<div className="flex space-x-4 justify-center">
										<SocialButton
											href="https://www.facebook.com/groups/naaooffice"
											icon={<FaFacebook size={18} />}
											label="Facebook"
										/>
										<SocialButton
											href="https://www.instagram.com/naaooffice/"
											icon={<FaInstagram size={18} />}
											label="Instagram"
										/>
										<SocialButton
											href="https://www.youtube.com/@naaooffice"
											icon={<FaYoutube size={18} />}
											label="YouTube"
										/>
										<SocialButton
											href="https://maps.app.goo.gl/Xs8UgTw1fXbBhN429"
											icon={<FaMap size={18} />}
											label="Google Maps"
										/>
									</div>
								</div>
							</div>
						</div>

						<div>
							<div className="bg-white p-8 rounded-xl shadow-lg h-full">
								<h2 className="text-2xl font-bold text-gray-800 mb-6">
									Send Us a Message
								</h2>

								{formStatus.submitted ? (
									<div
										className={`p-4 rounded-lg ${
											formStatus.error
												? "bg-red-100 text-red-700"
												: "bg-green-100 text-green-700"
										}`}
									>
										{formStatus.message}
									</div>
								) : (
									<form onSubmit={handleSubmit} className="space-y-6">
										<div>
											<label
												className="block text-gray-700 mb-2"
												htmlFor="name"
											>
												Your Name
											</label>
											<input
												id="name"
												name="name"
												type="text"
												value={formData.name}
												onChange={handleChange}
												required
												className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
												placeholder="Enter your name"
											/>
										</div>

										<div>
											<label
												className="block text-gray-700 mb-2"
												htmlFor="email"
											>
												Email Address
											</label>
											<input
												id="email"
												name="email"
												type="email"
												value={formData.email}
												onChange={handleChange}
												required
												className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
												placeholder="Enter your email"
											/>
										</div>

										<div>
											<label
												className="block text-gray-700 mb-2"
												htmlFor="subject"
											>
												Subject
											</label>
											<input
												id="subject"
												name="subject"
												type="text"
												value={formData.subject}
												onChange={handleChange}
												required
												className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
												placeholder="Enter message subject"
											/>
										</div>

										<div>
											<label
												className="block text-gray-700 mb-2"
												htmlFor="message"
											>
												Message
											</label>
											<textarea
												id="message"
												name="message"
												value={formData.message}
												onChange={handleChange}
												required
												rows="5"
												className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
												placeholder="Type your message here..."
											></textarea>
										</div>

										<button
											type="submit"
											disabled
											className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 cursor-not-allowed"
										>
											Send Message
										</button>
									</form>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Map Section */}
			<section className="pb-16">
				<div className="container mx-auto px-4">
					<h2 className="text-2xl font-bold text-gray-800 mb-6">
						Our Location
					</h2>
					<div className="bg-white rounded-xl overflow-hidden shadow-lg">
						<div className="h-96">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4667.452160316294!2d85.86490687608742!3d20.31032068116529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190a13aaaaaaa9%3A0x211e387e9f8e8d6e!2sNAAO!5e1!3m2!1sen!2sin!4v1751318976207!5m2!1sen!2sin"
								width="100%"
								height="100%"
								style={{ border: 0 }}
								allowFullScreen=""
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								title="NAAO Office Location"
								className="w-full h-full"
							></iframe>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
						Frequently Asked Questions
					</h2>

					<div className="max-w-3xl mx-auto space-y-6">
						{/* Membership FAQs */}
						{/* <div className="mb-8">
							<h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
								<FaQuestionCircle className="mr-2" /> About Membership
							</h3>
							<div className="space-y-4">
								<FaqItem
									question="How can I become a member of NAAO?"
									answer="Any alumnus of Jawahar Navodaya Vidyalaya from Odisha can become a member by filling out the membership form available on our website and paying the membership fee. Both lifetime and annual membership options are available."
								/>
								<FaqItem
									question="What are the benefits of becoming a NAAO member?"
									answer="Members get access to networking opportunities with fellow alumni, invitations to exclusive events, mentorship programs, professional development workshops, and the ability to participate in various social initiatives organized by the association."
								/>
							</div>
						</div> */}

						{/* Event FAQs */}
						<div className="mb-8">
							<h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
								<FaCalendarAlt className="mr-2" /> About Events & Registration
							</h3>
							<div className="space-y-4">
							<FaqItem
									question="Is it a NAAO event or NVS event?"
									answer="The BHOPAL REGION ALUMNI MEET & NAAO ANNUAL MEET 2025 is organized by Navodaya Vidyalaya Samiti (NVS) in collaboration with the Navodaya Alumni Association of Odisha (NAAO). It is also supported by Chhatishgarh Alumni Association of Navodaya (CAAN) and Madhya Pradesh Alumni Association of Navodaya (MAAN)."
								/>
								<FaqItem
									question="How do I register for the upcoming Annual Meet?"
									answer="Registration for the Annual Meet can be done through our website's Events section. Click on the 'Register Now' button for the event, you will be redirected to the registration portal, fill in your details, and complete the payment process. Early bird registrations typically get a discounted rate, so we recommend registering early."
								/>
								<FaqItem
									question="What does the event registration fee include?"
									answer="The registration fee typically includes access to all event sessions and meals during the event."
								/>
								<FaqItem
									question="Can I bring family members to NAAO events?"
									answer="Yes, NAAO events welcome family members and friends. While filling the registration form, you can indicate the number of additional guests accompanying you. Accordingly pre guest a registration fee of Rs 500 will be charged."
								/>
							</div>
						</div>

						{/* Travel & Accommodation FAQs */}
						<div className="mb-8">
							<h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
								<FaBed className="mr-2" /> Travel & Accommodation
							</h3>
							<div className="space-y-4">
								
								<FaqItem
									question="How can I find accommodation for NAAO events in Bhubaneswar?"
									answer="As Bhubaneswar is a capital city, there are many hotels and guesthouses available near to the venue. Stays can be booked through popular travel websites or directly with the hotels. NAAO volunteers can also assist with recommendations based on your budget and preferences."
								/>
								<FaqItem
									question="What's the best way to reach the event venue?"
									answer="Our main events are typically held at venues with good connectivity. From Bhubaneswar airport, taxis are readily available (20-25 minute journey). From railway station, auto-rickshaws and taxis can reach most venues within 20 minutes. NAAO volunteers might also arrange shuttle services from key locations."
								/>
								{/* <FaqItem
									question="Is there any travel assistance provided by NAAO?"
									answer="For special circumstances like student members or senior alumni requiring assistance, NAAO tries to arrange travel support or carpooling options. Please contact our support team at least two weeks before the event to request any travel assistance."
								/> */}
							</div>
						</div>

						{/* General FAQs */}
						{/* <div>
							<h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
								<FaBus className="mr-2" /> General Inquiries
							</h3>
							<div className="space-y-4">
								<FaqItem
									question="How can I update my contact information in the alumni directory?"
									answer="You can update your contact information by logging into your member account on our website or by sending an email to directory@naao.org with your updated details."
								/>
								<FaqItem
									question="Does NAAO offer any scholarships for current JNV students?"
									answer="Yes, NAAO offers several scholarships for current JNV students and alumni pursuing higher education. Details about eligibility criteria and application process can be found in the Scholarships section of our website."
								/>
								<FaqItem
									question="How can I volunteer for NAAO activities?"
									answer="We welcome volunteers for our various initiatives. You can register as a volunteer through our website's 'Get Involved' section or reach out to volunteer@naao.org specifying your interests and availability."
								/>
							</div>
						</div> */}
					</div>
				</div>
			</section>
		</div>
	);
};

const ContactItem = ({ icon, title, content }) => (
	<div className="flex gap-0">
		{/* <div className="text-blue-600 flex-shrink-0">{icon}{title}</div> */}
		<div>
			<h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
			<div className="text-gray-600">{content}</div>
		</div>
	</div>
);

const SocialButton = ({ href, icon, label }) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors duration-300"
		aria-label={label}
	>
		{icon}
	</a>
);

const FaqItem = ({ question, answer }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			<button
				className="w-full text-left p-5 flex justify-between items-center focus:outline-none"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="font-semibold text-gray-800">{question}</span>
				<span
					className={`transform transition-transform duration-300 ${
						isOpen ? "rotate-180" : ""
					}`}
				>
					▼
				</span>
			</button>

			{isOpen && (
				<div className="p-5 pt-0 text-gray-600 border-t">{answer}</div>
			)}
		</div>
	);
};

export default Contact;

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
	FaCalendarAlt,
	FaMapMarkerAlt,
	FaClock,
	FaArrowLeft,
	FaListUl,
	FaUsers,
	FaPhoneAlt,
	FaTrophy,
	FaExternalLinkAlt,
	FaCheck,
	FaWhatsapp,
} from "react-icons/fa";

// Import events data
import { events } from "./Events";

const EventDetail = () => {
	const { eventId } = useParams();
	const [event, setEvent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({
		fullName: "",
		state: "",
		jnvDistrict: "",
		batch: "",
		contactNumber: "",
		email: "",
		profession: "",
	});
	const [formStatus, setFormStatus] = useState({
		submitted: false,
		error: false,
		message: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		// Find the event with the matching ID
		const foundEvent = events.find((e) => e.id === eventId);

		if (foundEvent) {
			setEvent(foundEvent);
			setLoading(false);
			// Set page title
			document.title = `${foundEvent.title} | NAAO Events`;
		} else {
			// If no event is found, redirect to events page
			navigate("/events", { replace: true });
		}
	}, [eventId, navigate]);

	const validateForm = () => {
		const errors = {};

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.email || !emailRegex.test(formData.email)) {
			errors.email = "Please enter a valid email address";
		}

		// Phone number validation
		const phoneRegex = /^[6-9]\d{9}$/;
		if (!formData.contactNumber || !phoneRegex.test(formData.contactNumber)) {
			errors.contactNumber = "Please enter a valid 10-digit mobile number";
		}

		// Batch validation - must be a 4-digit number
		const batchRegex = /^\d{4}$/;
		if (!formData.batch || !batchRegex.test(formData.batch)) {
			errors.batch = "Please enter a valid 4-digit year (e.g., 2014)";
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error when user types
		if (formErrors[name]) {
			setFormErrors((prev) => ({ ...prev, [name]: null }));
		}
	};

	const handleBlur = (e) => {
		const { name, value } = e.target;
		if (name === "email") {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (value && !emailRegex.test(value)) {
				setFormErrors((prev) => ({
					...prev,
					email: "Please enter a valid email address",
				}));
			}
		} else if (name === "contactNumber") {
			const phoneRegex = /^[6-9]\d{9}$/;
			if (value && !phoneRegex.test(value)) {
				setFormErrors((prev) => ({
					...prev,
					contactNumber: "Please enter a valid 10-digit mobile number",
				}));
			}
		} else if (name === "batch") {
			const batchRegex = /^\d{4}$/;
			if (value && !batchRegex.test(value)) {
				setFormErrors((prev) => ({
					...prev,
					batch: "Please enter a valid 4-digit year (e.g., 2014)",
				}));
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate the form
		if (!validateForm()) {
			return;
		}

		setSubmitting(true);

		try {
			// Create the base URL for the Google Script
			const scriptURL =
				"https://script.google.com/macros/s/AKfycbzj3PP4958sfA2e02p6x88AiIkacY1ZzEuv0xxqbD0t576zQrG5wh3A6Zd9yuzL6fKJWA/exec";

			// Create FormData object for submission
			const formDataObj = new FormData();

			// Add all form fields to FormData
			Object.entries({
				...formData,
				eventTitle: event.title,
				eventId: event.id,
				registrationDate: new Date().toLocaleDateString(),
			}).forEach(([key, value]) => {
				formDataObj.append(key, value);
			});

			// Use fetch with no-cors mode to submit the form data
			fetch(scriptURL, {
				method: "POST",
				mode: "no-cors",
				body: formDataObj,
			})
				.then(() => {
					// Show success message
					setFormStatus({
						submitted: true,
						error: false,
						message:
							`Thank you for your registration! Your details have been recorded for ${event.title}.`,
					});

					// Reset form
					setFormData({
						fullName: "",
						state: "",
						jnvDistrict: "",
						batch: "",
						contactNumber: "",
						email: "",
						profession: "",
					});
				})
				.catch((error) => {
					console.error("Error submitting form:", error);
					setFormStatus({
						submitted: false,
						error: true,
						message:
							"There was a problem with your registration. Please try again.",
					});
				})
				.finally(() => {
					setSubmitting(false);
				});
		} catch (error) {
			console.error("Error in form submission:", error);
			setFormStatus({
				submitted: false,
				error: true,
				message:
					"There was a problem with your registration. Please try again.",
			});
			setSubmitting(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading event details...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gray-50 min-h-screen">
			<div className="container mx-auto px-4 py-6">
				{/* Back Button */}
				<Link
					to="/events"
					className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
				>
					<FaArrowLeft className="mr-2" /> Back to Events
				</Link>

				{/* Event Header */}
				<div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
					{/* Event Image */}
					<div className="relative w-full h-64 md:h-80">
						<img
							src={event.image}
							alt={event.title}
							className="w-full h-full object-cover"
						/>
						<div className="absolute top-4 right-4">
							<span
								className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
									event.category
								)}`}
							>
								{getCategoryText(event.category)}
							</span>
						</div>
					</div>

					{/* Event Title */}
					<div className="p-6">
						<h1 className="text-2xl md:text-4xl font-bold text-gray-800">
							{event.title}
						</h1>
					</div>
				</div>

				{/* Event Details */}
				<div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
					{/* Key Details Row */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 place-items-center">
						<div className="flex flex-col sm:flex-row items-center sm:items-center">
							<div className="bg-blue-100 p-3 rounded-full mb-4 lg:mr-4 sm:mb-0 flex-shrink-0">
								<FaCalendarAlt className="text-blue-600 text-xl" />
							</div>
							<div className="text-center">
								<h3 className="text-sm font-semibold text-gray-500 uppercase">
									Date
								</h3>
								<p className="text-lg font-medium">{event.date}</p>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row items-center sm:items-center">
							<div className="bg-blue-100 p-3 rounded-full mb-4 lg:mr-4 sm:mb-0 flex-shrink-0">
								<FaClock className="text-blue-600 text-xl" />
							</div>
							<div>
								<h3 className="text-sm font-semibold text-gray-500 uppercase">
									Time
								</h3>
								<p className="text-lg font-medium">{event.time}</p>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row items-center sm:items-center">
							<div className="bg-blue-100 p-3 rounded-full mb-4 lg:mr-4 sm:mb-0 flex-shrink-0">
								<FaMapMarkerAlt className="text-blue-600 text-xl" />
							</div>
							<div>
								<h3 className="text-sm font-semibold text-gray-500 uppercase">
									Location
								</h3>
								<p className="text-lg font-medium">{event.location}</p>
							</div>
						</div>
					</div>

					{/* Description */}
					<div className="mb-10">
						<h2 className="text-2xl font-bold mb-4">About This Event</h2>
						<p className="text-gray-700 leading-relaxed">{event.description}</p>
					</div>

					{/* Schedule */}
					{event.schedule && (
						<div className="mb-10">
							<h2 className="text-2xl font-bold mb-4 flex items-center">
								<FaListUl className="mr-2 text-blue-600" /> Schedule
							</h2>
							<ul className="space-y-2 text-gray-700">
								{event.schedule.map((item, index) => (
									<li
										key={index}
										className="border-l-4 border-blue-600 pl-4 py-2"
									>
										{item}
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Prizes (conditional) */}
					{event.prizes && (
						<div className="mb-10">
							<h2 className="text-2xl font-bold mb-4 flex items-center">
								<FaTrophy className="mr-2 text-yellow-500" /> Prizes
							</h2>
							<p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
								{event.prizes}
							</p>
						</div>
					)}

					{/* Organizers */}
					{event.organizers && (
						<div className="mb-10">
							<h2 className="text-2xl font-bold mb-4 flex items-center">
								<FaUsers className="mr-2 text-blue-600" /> Organizing Team
							</h2>
							<ul className="space-y-2 text-gray-700">
								{event.organizers.map((organizer, index) => (
									<li key={index} className="py-1">
										{organizer}
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Contact */}
					{event.contactInfo && (
						<div className="mb-10">
							<h2 className="text-2xl font-bold mb-4 flex items-center">
								<FaPhoneAlt className="mr-2 text-blue-600" /> Contact
							</h2>
							<p className="text-gray-700">{event.contactInfo}</p>
						</div>
					)}

					{/* Registration Section */}
					<div className="mt-12">
						<h2 className="text-2xl font-bold mb-6">Registration</h2>

						{/* Dynamic Registration Options */}
						{event.registrationType === "form" ? (
							<div className="bg-blue-50 p-6 rounded-lg">
								{formStatus.submitted ? (
									<div className="text-center py-8">
										<div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
											<FaCheck size={32} />
										</div>
										<h3 className="text-xl font-bold text-gray-800 mb-2">
											Registration Complete!
										</h3>
										<p className="text-gray-600 mb-6">{formStatus.message}</p>

										{/* WhatsApp Join Button */}
										{event.whatsappGroup && (
											<div className="mb-6">
												<p className="text-gray-700 mb-3">
													Join our WhatsApp group for event updates and
													discussions:
												</p>
												<a
													href={event.whatsappGroup}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
												>
													<FaWhatsapp className="mr-2 text-xl" /> Join WhatsApp
													Group
												</a>
											</div>
										)}

										<button
											onClick={() =>
												setFormStatus({
													submitted: false,
													error: false,
													message: "",
												})
											}
											className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
										>
											Register Another Person
										</button>
									</div>
								) : (
									<form onSubmit={handleSubmit} className="space-y-6">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<label
													className="block text-gray-700 font-medium mb-2"
													htmlFor="fullName"
												>
													Full Name *
												</label>
												<input
													type="text"
													id="fullName"
													name="fullName"
													value={formData.fullName}
													onChange={handleInputChange}
													required
													className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
													placeholder="Enter your full name"
												/>
											</div>

											<div>
												<label
													className="block text-gray-700 font-medium mb-2"
													htmlFor="state"
												>
													State *
												</label>
												<input
													type="text"
													id="state"
													name="state"
													value={formData.state}
													onChange={handleInputChange}
													required
													className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
													placeholder="E.g. Odisha"
												/>
											</div>

											<div>
												<label
													className="block text-gray-700 font-medium mb-2"
													htmlFor="jnvDistrict"
												>
													JNV District *
												</label>
												<input
													type="text"
													id="jnvDistrict"
													name="jnvDistrict"
													value={formData.jnvDistrict}
													onChange={handleInputChange}
													required
													className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
													placeholder="E.g. Puri"
												/>
											</div>

											<div>
												<label
													className="block text-gray-700 font-medium mb-2"
													htmlFor="batch"
												>
													Passout Batch *
												</label>
												<input
													type="text"
													id="batch"
													name="batch"
													value={formData.batch}
													onChange={handleInputChange}
													onBlur={handleBlur}
													required
													maxLength="4"
													pattern="\d{4}"
													className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
														formErrors.batch
															? "border-red-500"
															: "focus:ring-blue-500"
													}`}
													placeholder="E.g., 2014"
												/>
												{formErrors.batch && (
													<p className="text-red-500 text-sm mt-1">
														{formErrors.batch}
													</p>
												)}
											</div>

											<div>
												<label
													className="block text-gray-700 font-medium mb-2"
													htmlFor="contactNumber"
												>
													Contact Number *
												</label>
												<input
													type="tel"
													id="contactNumber"
													name="contactNumber"
													value={formData.contactNumber}
													onChange={handleInputChange}
													onBlur={handleBlur}
													required
													className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
														formErrors.contactNumber ? "border-red-500" : ""
													}`}
													placeholder="10-digit mobile number"
													maxLength="10"
												/>
												{formErrors.contactNumber && (
													<p className="text-red-500 text-sm mt-1">
														{formErrors.contactNumber}
													</p>
												)}
											</div>

											<div>
												<label
													className="block text-gray-700 font-medium mb-2"
													htmlFor="email"
												>
													Email Address *
												</label>
												<input
													type="email"
													id="email"
													name="email"
													value={formData.email}
													onChange={handleInputChange}
													onBlur={handleBlur}
													required
													className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
														formErrors.email ? "border-red-500" : ""
													}`}
													placeholder="name@example.com"
												/>
												{formErrors.email && (
													<p className="text-red-500 text-sm mt-1">
														{formErrors.email}
													</p>
												)}
											</div>

											<div>
												<label
													className="block text-gray-700 font-medium mb-2"
													htmlFor="profession"
												>
													Profession *
												</label>
												<input
													type="text"
													id="profession"
													name="profession"
													value={formData.profession}
													onChange={handleInputChange}
													required
													className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
													placeholder="Student / Working / Business"
												/>
											</div>
										</div>

										<div className="mt-6">
											<button
												type="submit"
												disabled={submitting}
												className={`w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg ${
													submitting
														? "opacity-75 cursor-not-allowed"
														: "hover:bg-blue-700"
												} transition-colors`}
											>
												{submitting ? "Submitting..." : "Complete Registration"}
											</button>
											<p className="text-sm text-gray-500 mt-2">
												* Required fields
											</p>
										</div>
									</form>
								)}
							</div>
						) : (
							// External registration link
							<div className="bg-blue-50 p-6 rounded-lg text-center">
								<p className="text-gray-900 mb-6">
									To register for this event, please click the button below
									which will take you to our registration portal.
									<br /> Our registration portal is managed by{" "}
									<span style={{ fontWeight: "bold" }}>DIGIKITE</span>, a
									trusted venture by an alumni of JNV Puri, Odisha.
								</p>
								<a
									href={event.registrationLink}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
								>
									Register Now <FaExternalLinkAlt className="ml-2" />
								</a>
							</div>
						)}
					</div>
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

export default EventDetail;

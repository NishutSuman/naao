import React, { useState, useRef } from "react";
import { FaTimes, FaDownload } from "react-icons/fa";
import participantsData from "../data/participants.json";

const Certificate = ({ isOpen, onClose }) => {
	const [email, setEmail] = useState("");
	const [participant, setParticipant] = useState(null);
	const [showPreview, setShowPreview] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);
	const [error, setError] = useState("");
	const [imageLoaded, setImageLoaded] = useState(false);
	const [certificateImage, setCertificateImage] = useState(null);
	const canvasRef = useRef(null);
	const previewCanvasRef = useRef(null);

	// Load certificate image
	const loadCertificateImage = () => {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = "anonymous";

			img.onload = () => {
				setCertificateImage(img);
				resolve(img);
			};

			img.onerror = () => {
				console.error("Failed to load certificate template");
				reject(new Error("Certificate template not found"));
			};

			// Try multiple paths
			img.src = "../src/assets/certificate-template.png";
		});
	};

	const handleEmailSubmit = (e) => {
		e.preventDefault();
		setError("");

		const foundParticipant = participantsData.find(
			(p) => p.email.toLowerCase() === email.toLowerCase()
		);

		if (foundParticipant) {
			setParticipant(foundParticipant);
			setShowPreview(true);
		} else {
			setError(
				"Email not found in our records. Please check your registered email."
			);
		}
	};

	const drawCertificate = async (canvas, isHighQuality = false) => {
		if (!canvas || !participant) return;

		const ctx = canvas.getContext("2d");
		// Use higher scale for download quality
		const scale = isHighQuality ? 3 : 1; // 3x scale for high quality download

		// Set canvas size
		const width = 800 * scale;
		const height = 600 * scale;
		canvas.width = width;
		canvas.height = height;

		// Scale for high quality
		if (isHighQuality) {
			ctx.scale(3, 3);
		}

		try {
			// Load certificate image if not already loaded
			let img = certificateImage;
			if (!img) {
				img = await loadCertificateImage();
			}

			// Clear canvas first
			ctx.clearRect(0, 0, width, height);

			// Draw the certificate template
			ctx.drawImage(img, 0, 0, 800, 600);

			// TEXT CUSTOMIZATION SECTION
			// Change font family here (e.g., "Arial", "Times New Roman", "Georgia")
			const fontFamily = "Cursive";

			// Change font size here (adjust as needed)
			const fontSize = 24;

			// Change font weight here ("normal", "bold", "bolder", "lighter")
			const fontWeight = "bold";

			// Change text color here (hex, rgb, or named colors)
			const textColor = "#2c3e50";

			// Set text properties for name
			ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
			ctx.fillStyle = textColor;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			// POSITION CUSTOMIZATION (using percentage-based positioning)
			// nameXPercentage: 0.5 = center horizontally (50% of width)
			// nameYPercentage: 0.5 = center vertically (50% of height)
			const nameXPercentage = 0.65; // Change this to adjust horizontal position (0.0 to 1.0)
			const nameYPercentage = 0.41; // Change this to adjust vertical position (0.0 to 1.0)

			// Calculate actual pixel positions
			const nameX = 800 * nameXPercentage;
			const nameY = 600 * nameYPercentage;

			// Draw the participant name
			ctx.fillText(participant.name, nameX, nameY);

			setImageLoaded(true);
		} catch (error) {
			console.error("Error drawing certificate:", error);

			// If image fails to load, create a placeholder
			ctx.fillStyle = "#f8f9fa";
			ctx.fillRect(0, 0, 800, 600);

			// Draw border
			ctx.strokeStyle = "#dee2e6";
			ctx.lineWidth = 2;
			ctx.strokeRect(20, 20, 760, 560);

			// Draw placeholder content
			ctx.fillStyle = "#6c757d";
			ctx.font = "24px Lucidia Handwriting";
			ctx.textAlign = "center";
			ctx.fillText("NAAO CERTIFICATE", 400, 150);

			ctx.font = "16px Arial";
			ctx.fillText("Certificate Template Not Found", 400, 200);
			ctx.fillText(
				"Please check if the image is placed in /src/assets/",
				400,
				220
			);

			// Draw participant name
			ctx.font = "bold 36px Arial";
			ctx.fillStyle = "#2c3e50";
			ctx.fillText(participant.name, 400, 300);

			ctx.font = "16px Arial";
			ctx.fillStyle = "#6c757d";
			ctx.fillText("Participant Name", 400, 340);

			setImageLoaded(true);
		}
	};

	const handleDownload = async () => {
		if (!participant) return;

		setIsGenerating(true);
		try {
			// Create a temporary canvas for high-quality download
			const tempCanvas = document.createElement("canvas");

			// Draw high-quality version (3x scale)
			await drawCertificate(tempCanvas, true);

			// Create download link with maximum quality
			const link = document.createElement("a");
			link.download = `NAAO_Certificate_${participant.name.replace(
				/\s+/g,
				"_"
			)}.png`;
			// Use maximum quality (1.0) and ensure proper data URL
			link.href = tempCanvas.toDataURL("image/png", 1.0);
			link.click();
		} catch (error) {
			console.error("Error generating certificate:", error);
			setError("Error generating certificate. Please try again.");
		} finally {
			setIsGenerating(false);
		}
	};

	const handleClose = () => {
		setEmail("");
		setParticipant(null);
		setShowPreview(false);
		setError("");
		setImageLoaded(false);
		setCertificateImage(null);
		onClose();
	};

	// Draw certificate when preview is shown
	React.useEffect(() => {
		if (showPreview && participant && previewCanvasRef.current) {
			setImageLoaded(false);
			drawCertificate(previewCanvasRef.current, false);
		}
	}, [showPreview, participant]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
			<div className="bg-white rounded-xl w-full max-w-3xl lg:max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-4">
				<div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
					<h2 className="text-xl sm:text-2xl font-bold text-gray-800">
						Download Certificate
					</h2>
					<button
						onClick={handleClose}
						className="text-gray-500 hover:text-gray-700 p-2"
					>
						<FaTimes size={20} />
					</button>
				</div>

				<div className="p-4 sm:p-6">
					{!showPreview ? (
						<div className="max-w-md mx-auto">
							<div className="text-center mb-6">
								<h3 className="text-lg font-semibold mb-3">
									Certificate Download
								</h3>
								<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
									<p className="text-blue-800 text-sm">
										<strong>Dear User,</strong> To download your certificate,
										please enter the email address you used to register for NSQ
										2025.
									</p>
								</div>
							</div>
							<form onSubmit={handleEmailSubmit} className="space-y-4">
								<div>
									<label className="block text-gray-700 mb-2">
										Email Address
									</label>
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="Enter your registered email"
										required
									/>
								</div>
								{error && <p className="text-red-500 text-sm">{error}</p>}
								<button
									type="submit"
									className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
								>
									Generate Certificate
								</button>
							</form>
						</div>
					) : (
						<div className="space-y-3 sm:space-y-4">
							<div className="text-center">
								<div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
									<h3 className="text-lg font-semibold mb-1 text-green-800">
										Greetings from NAAO 🎉
									</h3>
									<p className="text-green-700 text-sm">
										Dear <strong>{participant.name}</strong>, <br />
										Thank you for your valuable participation in NAAO Super Quiz
										2025.
									</p>
								</div>
								<h4 className="text-md font-medium text-gray-600">
									Certificate Preview
								</h4>
							</div>

							<div className="flex justify-center px-2 sm:px-4">
								<div className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg w-full max-w-xl">
									{!imageLoaded && (
										<div className="flex items-center justify-center bg-gray-100 aspect-[4/3] min-h-[200px] sm:min-h-[250px]">
											<div className="text-center">
												<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
												<p className="text-gray-600">Loading certificate...</p>
											</div>
										</div>
									)}
									<canvas
										ref={previewCanvasRef}
										className={`w-full h-auto ${!imageLoaded ? "hidden" : ""}`}
										style={{
											display: imageLoaded ? "block" : "none",
											maxWidth: "100%",
											height: "auto",
										}}
									/>
								</div>
							</div>

							{error && (
								<div className="text-center">
									<p className="text-red-500 text-sm">{error}</p>
								</div>
							)}

							<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center px-4">
								<button
									onClick={() => setShowPreview(false)}
									className="w-full sm:w-auto px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
								>
									Back
								</button>
								<button
									onClick={handleDownload}
									disabled={isGenerating || !imageLoaded}
									className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<FaDownload />
									<span>
										{isGenerating
											? "Generating..."
											: "Download Certificate"}
									</span>
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Certificate;

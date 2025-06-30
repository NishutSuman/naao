import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
	FaArrowLeft,
	FaArrowRight,
	FaDownload,
	FaSearchPlus,
	FaSearchMinus,
	FaSpinner,
} from "react-icons/fa";

// Ensure PDF.js worker is properly set
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// Make the component reusable by accepting props
export default function PdfComp({
	pdfFile,
	title = "PDF Document",
	downloadFileName = "document.pdf",
	maxHeight = "600px",
	className = "",
}) {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [scale, setScale] = useState(1.0);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [containerWidth, setContainerWidth] = useState(null);

	// Update container width on window resize for responsiveness
	useEffect(() => {
		function updateContainerWidth() {
			// Use a reasonable default width if the container isn't mounted yet
			const width = Math.min(window.innerWidth - 40, 900);
			setContainerWidth(width);

			// Adjust scale based on screen width for better mobile experience
			if (window.innerWidth < 640) {
				setScale(0.8);
			} else if (scale < 1.0) {
				setScale(1.0);
			}
		}

		updateContainerWidth();
		window.addEventListener("resize", updateContainerWidth);

		return () => {
			window.removeEventListener("resize", updateContainerWidth);
		};
	}, []);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setIsLoading(false);
		setError(null);
	}

	function onDocumentLoadError(error) {
		console.error("Error loading PDF:", error);
		setIsLoading(false);
		setError(
			"Failed to load the PDF. Please try again or download it instead."
		);
	}

	function changePage(offset) {
		setPageNumber((prevPageNumber) => {
			const newPageNumber = prevPageNumber + offset;
			return Math.max(1, Math.min(numPages, newPageNumber));
		});
	}

	function previousPage() {
		changePage(-1);
	}

	function nextPage() {
		changePage(1);
	}

	function zoomIn() {
		setScale((prevScale) => Math.min(prevScale + 0.2, 2.5));
	}

	function zoomOut() {
		setScale((prevScale) => Math.max(prevScale - 0.2, 0.6));
	}

	return (
		<div
			className={`flex flex-col bg-gray-50 rounded-lg shadow-md p-3 sm:p-4 w-full ${className}`}
		>
			{/* PDF Controls Header - Contained within the viewer */}
			<div className="w-full flex flex-wrap justify-between items-center mb-3 pb-3 border-b border-gray-200">
				<div className="font-semibold text-base sm:text-lg text-gray-800 mb-2 sm:mb-0">
					{title}
				</div>
				<div className="flex gap-2">
					<button
						onClick={zoomOut}
						className="p-1.5 sm:p-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
						title="Zoom Out"
						aria-label="Zoom Out"
					>
						<FaSearchMinus className="text-gray-700 text-sm sm:text-base" />
					</button>
					<button
						onClick={zoomIn}
						className="p-1.5 sm:p-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
						title="Zoom In"
						aria-label="Zoom In"
					>
						<FaSearchPlus className="text-gray-700 text-sm sm:text-base" />
					</button>
					<a
						href={pdfFile}
						download={downloadFileName}
						className="p-1.5 sm:p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center text-sm sm:text-base"
						title="Download PDF"
					>
						<FaDownload className="mr-0 sm:mr-1" />
						<span className="hidden sm:inline">Download</span>
					</a>
				</div>
			</div>

			{/* PDF Viewer - Responsive container */}
			<div
				className="w-full bg-white rounded-lg shadow-lg mb-3 p-2 sm:p-4 overflow-auto flex justify-center"
				style={{ maxHeight: maxHeight }}
			>
				{error ? (
					<div className="flex flex-col items-center justify-center h-full text-center p-6">
						<div className="text-red-500 mb-4">{error}</div>
						<a
							href={pdfFile}
							download={downloadFileName}
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center"
						>
							<FaDownload className="mr-2" /> Download PDF Instead
						</a>
					</div>
				) : (
					<Document
						file={pdfFile}
						onLoadSuccess={onDocumentLoadSuccess}
						onLoadError={onDocumentLoadError}
						loading={
							<div className="flex flex-col items-center justify-center h-full py-10">
								<FaSpinner className="animate-spin text-3xl sm:text-4xl text-blue-600 mb-4" />
								<p className="text-gray-600">Loading PDF...</p>
							</div>
						}
					>
						<Page
							pageNumber={pageNumber}
							renderTextLayer={false}
							renderAnnotationLayer={false}
							scale={scale}
							className="mx-auto"
							width={
								containerWidth ? Math.min(containerWidth - 40, 800) : undefined
							}
						/>
					</Document>
				)}
			</div>

			{/* Navigation Controls - Contained within the viewer */}
			{!error && !isLoading && (
				<div className="w-full flex items-center justify-between">
					<button
						onClick={previousPage}
						disabled={pageNumber <= 1}
						className={`px-2 py-1.5 sm:px-4 sm:py-2 flex items-center rounded-md text-sm sm:text-base ${
							pageNumber <= 1
								? "bg-gray-200 text-gray-400 cursor-not-allowed"
								: "bg-blue-600 text-white hover:bg-blue-700"
						}`}
					>
						<FaArrowLeft className="mr-1 sm:mr-2" />
						<span className="hidden sm:inline">Previous</span>
					</button>

					<p className="text-gray-700 text-sm sm:text-base font-medium px-1">
						Page {pageNumber} of {numPages || "--"}
					</p>

					<button
						onClick={nextPage}
						disabled={pageNumber >= numPages}
						className={`px-2 py-1.5 sm:px-4 sm:py-2 flex items-center rounded-md text-sm sm:text-base ${
							pageNumber >= numPages
								? "bg-gray-200 text-gray-400 cursor-not-allowed"
								: "bg-blue-600 text-white hover:bg-blue-700"
						}`}
					>
						<span className="hidden sm:inline">Next</span>
						<FaArrowRight className="ml-1 sm:ml-2" />
					</button>
				</div>
			)}
		</div>
	);
}

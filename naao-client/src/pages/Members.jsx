import { useState, useEffect } from "react";
import {
	FaSearch,
	FaDownload,
	FaSpinner,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";
import gbData from "../assets/gb.json";
import gcData from "../assets/gc.json";

const Members = () => {
	// State for member data
	const [gcMembers, setGcMembers] = useState([]);
	const [gbMembers, setGbMembers] = useState([]);
	const [activeTab, setActiveTab] = useState("gb"); // "gb" or "gc"

	// State for search
	const [searchQuery, setSearchQuery] = useState("");

	// State for UI
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Pagination state with fixed number per page
	const [currentPage, setCurrentPage] = useState(1);
	const membersPerPage = 20; // Fixed value instead of state

	// Load data from imported JSON files
	useEffect(() => {
		try {
			setGbMembers(gbData || []);
			setGcMembers(gcData || []);
			setIsLoading(false);
		} catch (err) {
			setError("Failed to load member data. Please try again later.");
			console.error(err);
			setIsLoading(false);
		}
	}, []);

	// Get current members based on active tab
	const currentMembers = activeTab === "gb" ? gbMembers : gcMembers;

	// Apply search filter to members
	const filteredMembers = currentMembers.filter((member) => {
		return (
			searchQuery === "" ||
			(member.Name &&
				member.Name.toLowerCase().includes(searchQuery.toLowerCase())) ||
			(member.District &&
				member.District.toLowerCase().includes(searchQuery.toLowerCase()))
		);
	});

	// Calculate pagination
	const indexOfLastMember = currentPage * membersPerPage;
	const indexOfFirstMember = indexOfLastMember - membersPerPage;
	const currentPageMembers = filteredMembers.slice(
		indexOfFirstMember,
		indexOfLastMember
	);
	const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const nextPage = () =>
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

	// Function to export data to CSV
	const exportToCSV = () => {
		const headers = ["Name", "District", "Passout Year"];
		const data = filteredMembers.map((member) => [
			member.Name || "",
			member.District || "",
			member.PassoutYear || "",
		]);

		const csvContent = [
			headers.join(","),
			...data.map((row) => row.join(",")),
		].join("\n");

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", `${activeTab.toUpperCase()}_Members.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// Reset pagination when search or tab changes
	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, activeTab]);

	return (
		<div>
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-16">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">
						{activeTab === "gb" ? "Governing Body" : "Governing Council"}
					</h1>
					<p className="text-xl max-w-3xl mx-auto">
						{activeTab === "gb"
							? "Meet the elected Governing Body members of our district school association who help us to take decision for our association and to execute the plan of actions."
							: "Our Governing Council consists of elected members from district school association who provide strategic guidance and oversight."}
					</p>
				</div>
			</div>

			{/* Main Content Section */}
			<div className="container mx-auto px-4 py-8">
				{/* Tabs */}
				<div className="flex border-b border-gray-200 mb-6">
					<button
						onClick={() => setActiveTab("gb")}
						className={`py-2 px-4 font-medium text-sm sm:text-base ${
							activeTab === "gb"
								? "border-b-2 border-blue-600 text-blue-600"
								: "text-gray-500 hover:text-gray-700"
						}`}
					>
						Governing Body
					</button>
					<button
						onClick={() => setActiveTab("gc")}
						className={`py-2 px-4 font-medium text-sm sm:text-base ${
							activeTab === "gc"
								? "border-b-2 border-blue-600 text-blue-600"
								: "text-gray-500 hover:text-gray-700"
						}`}
					>
						Governing Council
					</button>
				</div>

				{/* Search Section */}
				<div className="mb-6">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
						<div className="relative w-full sm:w-64">
							<input
								type="text"
								placeholder="Search by name or district..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
							/>
							<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
						</div>

						{/* Export button only */}
						<button
							onClick={exportToCSV}
							className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
						>
							<FaDownload className="mr-2" /> Export CSV
						</button>
					</div>
				</div>

				{/* Members Table */}
				<div className="overflow-x-auto bg-white rounded-lg shadow">
					{isLoading ? (
						<div className="flex items-center justify-center py-12">
							<FaSpinner className="animate-spin text-3xl text-blue-600 mr-3" />
							<span>Loading member data...</span>
						</div>
					) : error ? (
						<div className="text-center text-red-600 py-12">
							<p>{error}</p>
							<button
								onClick={() => window.location.reload()}
								className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
							>
								Retry
							</button>
						</div>
					) : filteredMembers.length === 0 ? (
						<div className="text-center py-12 text-gray-500">
							No members found matching your search.
						</div>
					) : (
						<div className="overflow-x-auto min-w-full ">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-400">
									<tr>
										<th
											scope="col"
											className="px-4 sm:px-6 py-3 text-s font-bold text-gray-600 uppercase tracking-wider w-2/5 text-center"
										>
											Name
										</th>
										<th
											scope="col"
											className="px-4 sm:px-6 py-3 text-s font-bold text-gray-600 uppercase tracking-wider w-2/5 text-center"
										>
											District
										</th>
										<th
											scope="col"
											className="px-4 sm:px-6 py-3 text-s font-bold text-gray-600 uppercase tracking-wider w-2/5 text-center"
										>
											Year
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{currentPageMembers.map((member, index) => (
										<tr
											key={index}
											className={`hover:bg-blue-50 transition-colors duration-150 ${
												index % 2 === 0 ? "bg-white" : "bg-gray-50"
											}`}
										>
											<td className="px-4 sm:px-6 py-4 truncate">
												<div className="text-sm font-medium text-gray-900 truncate">
													{member.Name || "N/A"}
												</div>
											</td>
											<td className="px-4 sm:px-6 py-4 truncate">
												<div className="text-sm text-gray-600 truncate">
													{member.District || "N/A"}
												</div>
											</td>
											<td className="px-4 sm:px-6 py-4 truncate">
												<div className="text-sm text-gray-500 font-medium">
													{member.PassoutYear || "N/A"}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>

				{/* Pagination */}
				{!isLoading && !error && filteredMembers.length > 0 && (
					<div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
						<div className="text-sm text-gray-700 order-2 sm:order-1">
							Showing{" "}
							<span className="font-medium">{indexOfFirstMember + 1}</span> to{" "}
							<span className="font-medium">
								{Math.min(indexOfLastMember, filteredMembers.length)}
							</span>{" "}
							of <span className="font-medium">{filteredMembers.length}</span>{" "}
							members
						</div>

						<div className="flex space-x-1 order-1 sm:order-2">
							<button
								onClick={prevPage}
								disabled={currentPage === 1}
								className={`px-3 py-1 rounded-md ${
									currentPage === 1
										? "bg-gray-100 text-gray-400 cursor-not-allowed"
										: "bg-gray-200 text-gray-700 hover:bg-gray-300"
								}`}
							>
								<FaChevronLeft size={14} />
							</button>

							{/* Show page numbers */}
							<div className="hidden sm:flex space-x-1">
								{[...Array(Math.min(5, totalPages)).keys()].map((_, i) => {
									// Logic to display pages around the current page
									let pageNum = currentPage;
									if (currentPage <= 3) {
										pageNum = i + 1;
									} else if (currentPage >= totalPages - 2) {
										pageNum = totalPages - 4 + i;
									} else {
										pageNum = currentPage - 2 + i;
									}

									// Only render if the page number is valid
									if (pageNum > 0 && pageNum <= totalPages) {
										return (
											<button
												key={pageNum}
												onClick={() => paginate(pageNum)}
												className={`px-3 py-1 rounded-md ${
													currentPage === pageNum
														? "bg-blue-600 text-white"
														: "bg-gray-200 text-gray-700 hover:bg-gray-300"
												}`}
											>
												{pageNum}
											</button>
										);
									}
									return null;
								})}
							</div>

							<button
								onClick={nextPage}
								disabled={currentPage === totalPages}
								className={`px-3 py-1 rounded-md ${
									currentPage === totalPages
										? "bg-gray-100 text-gray-400 cursor-not-allowed"
										: "bg-gray-200 text-gray-700 hover:bg-gray-300"
								}`}
							>
								<FaChevronRight size={14} />
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Members;

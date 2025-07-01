// import { useState, useEffect } from "react";
import {
	FaCheck,
	FaUsers,
	FaHandshake,
	FaGraduationCap,
	FaHandHoldingHeart,
	FaFilePdf,
	FaArrowLeft,
	FaArrowRight,
	FaTimes,
	FaDownload,
} from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
// Make sure pdfjs worker is configured
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

import PdfComp from "../components/PdfComp";
import bylawsPdf from "../assets/NAAO_Bylaw.pdf";

const About = () => {
	// Use useEffect to refresh the PDF component when modal opens
	// useEffect(() => {
	// 	if (showPdfModal) {
	// 		setPdfError(false);
	// 	}
	// }, [showPdfModal]);

	return (
		<div>
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-16">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">About NAAO</h1>
					<p className="text-xl max-w-3xl mx-auto">
						The Navodaya Alumni Association of Odisha (NAAO) is a community of
						alumni from Jawahar Navodaya Vidyalayas across Odisha.
					</p>
				</div>
			</div>

			{/* History & Background */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-2 gap-10 items-center">
						<div>
							<h2 className="text-2xl font-bold text-gray-800 mb-4">
								Our History & Background
							</h2>
							<p className="text-gray-600 mb-4">
								Established in 2016, NAAO began as a small group of JNV alumni
								with a vision to create a platform for Navodayans from Odisha to
								connect, collaborate, and contribute to society. From informal
								gatherings of a few dozen alumni, we have grown into a
								structured organization with thousands of members.
							</p>
							<p className="text-gray-600 mb-4">
								The association was driven as a non-profit organization. Since
								then, NAAO has been actively working on various initiatives
								focused on alumni networking, student mentorship, and social
								service.
							</p>
							<p className="text-gray-600">
								Today, we represent alumni from all 31 Jawahar Navodaya
								Vidyalayas across Odisha and continue to grow with each passing
								year as new batches of students graduate and join our community.
							</p>
						</div>
						<div className="rounded-lg overflow-hidden shadow-xl">
							<img
								src="https://i.postimg.cc/L4WWbLMc/Naao-Logo.png"
								alt="NAAO History"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Mission, Vision & Values */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-800">
							Our Mission, Vision & Objectives
						</h2>
						<div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
					</div>

					<div className="grid md:grid-cols-2 gap-10">
						<div className="bg-white p-8 rounded-lg shadow-lg">
							<div className="text-blue-600 text-3xl mb-4 flex justify-center">
								<FaUsers />
							</div>
							<h3 className="text-xl font-bold text-center mb-4">
								Our Objectives
							</h3>
							<ul className="space-y-3">
								<ListItem>
									Foster a strong community of JNV alumni from Odisha
								</ListItem>
								<ListItem>
									Facilitate networking and professional growth among alumni
								</ListItem>
								<ListItem>
									Support current JNV students through mentorship and
									scholarships
								</ListItem>
								<ListItem>
									Preserve and promote the unique Navodaya culture and values
								</ListItem>
								<ListItem>
									Contribute to social causes and community development
								</ListItem>
							</ul>
						</div>

						<div className="bg-white p-8 rounded-lg shadow-lg">
							<div className="text-blue-600 text-3xl mb-4 flex justify-center">
								<FaHandshake />
							</div>
							<h3 className="text-xl font-bold text-center mb-4">
								Our Mission
							</h3>
							<p className="text-gray-600 mb-4">
								The mission of NAAO is to link all JNV alumni associations in
								Odisha to develop synergistic plans to help and support all JNV,
								students, staff, members and society as a whole to achieve its
								vision, and to enable JNV alumnus add value to society.
							</p>

							<h3 className="text-xl font-bold text-center mb-4">Our Vision</h3>
							<p className="text-gray-600">
								To unite and create a socially conducive and symbiotic platform
								among all JNV alumni associations in Odisha for the betterment
								of alma-maters, members, and society at large.
							</p>
						</div>
					</div>

					<div className="mt-12">
						<div className="text-center mb-8">
							<h3 className="text-2xl font-bold text-gray-800">
								Our Core Values
							</h3>
						</div>

						<div className="grid md:grid-cols-3 gap-6">
							<ValueCard
								icon={<FaGraduationCap />}
								title="Excellence"
								description="We strive for excellence in all our initiatives and encourage our members to pursue the highest standards in their respective fields."
							/>
							<ValueCard
								icon={<FaHandshake />}
								title="Solidarity"
								description="We believe in the power of community and foster a spirit of unity, support, and collaboration among all Navodayans."
							/>
							<ValueCard
								icon={<FaHandHoldingHeart />}
								title="Service"
								description="We are committed to giving back to society and our alma mater through various social service initiatives and mentorship programs."
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Bylaws Section */}
			<section className="bg-blue-50 py-16">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-800">Our Bylaws</h2>
						<div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
						<p className="text-gray-600 max-w-3xl mx-auto mb-8">
							Our association operates under a set of bylaws that govern our
							activities, membership criteria, elections, and overall
							functioning. These bylaws ensure transparency and proper
							governance of NAAO.
						</p>
					</div>

					{/* PDF Viewer */}
					<div className="max-w-3xl mx-auto">
						<PdfComp
							pdfFile={bylawsPdf}
							title="NAAO Bylaws Document"
							downloadFileName="NAAO_Bylaw.pdf"
							maxHeight="700px"
						/>
					</div>
				</div>
			</section>

			{/* Key Achievements */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-800">
							Our Key Achievements
						</h2>
						<div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						<AchievementCard
							year="JULY-AUGUST 2025"
							title="Seed Ball Drive"
							description="Prepared and dispersed 80,000+ seed balls across Odisha to promote afforestation and environmental conservation with help of NVS and district school associations."
						/>
						<AchievementCard
							year="May 2025"
							title="NAAO Business Conclave"
							description="Organized a successful business conclave with 50+ alumni entrepreneurs sharing insights and networking opportunities."
						/>
						{/* <AchievementCard
							year="2021"
							title="COVID-19 Relief Work"
							description="Raised funds and provided medical supplies to JNVs and rural communities during the pandemic."
						/> */}
						<AchievementCard
							year="March 2025"
							title="NAAO Premier League"
							description="Hosted the NAAO Premier League, a cricket tournament that brought together alumni from across Odisha for 2 days of sports and camaraderie."
						/>
						{/* <AchievementCard
							year="2017"
							title="Alumni Directory"
							description="Created a comprehensive database of 3000+ alumni from all JNVs in Odisha."
						/> */}
						{/* <AchievementCard
							year="2015"
							title="Annual Conference"
							description="Established the annual NAAO conference, which now attracts 500+ participants each year."
						/> */}
					</div>
				</div>
			</section>

			{/* Join Us CTA */}
			<section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-16">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Join Our Association</h2>
					<p className="text-xl mb-8 max-w-3xl mx-auto">
						If you're a JNV alumnus from Odisha, we invite you to become a part
						of our growing community. Together, we can make a difference.
					</p>
					<button className="px-8 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition duration-300 ">
						Join NAAO
					</button>
				</div>
			</section>
		</div>
	);
};

const ListItem = ({ children }) => (
	<li className="flex items-start">
		<span className="text-green-500 mr-2 mt-1">
			<FaCheck />
		</span>
		<span className="text-gray-600">{children}</span>
	</li>
);

const ValueCard = ({ icon, title, description }) => (
	<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
		<div className="text-blue-600 text-3xl mb-4 flex justify-center">
			{icon}
		</div>
		<h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
		<p className="text-gray-600">{description}</p>
	</div>
);

const AchievementCard = ({ year, title, description }) => (
	<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-t-4 border-blue-600">
		<div className="text-sm text-blue-600 font-semibold mb-2">{year}</div>
		<h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
		<p className="text-gray-600">{description}</p>
	</div>
);

export default About;

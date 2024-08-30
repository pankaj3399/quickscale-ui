import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Logo from "../../../assets/dashboard/phonelogo.png";
import { FaArrowLeft, FaChevronDown } from "react-icons/fa";
import { Checkbox } from "antd";
import { PDFDocument, rgb } from "pdf-lib";
import { pdfjs } from "react-pdf";
import { AiOutlineEdit } from "react-icons/ai";

import "../../../Sample.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

const PdfDetails = () => {
	const location = useLocation();
	const file = location.state?.file || null;
	const [pdfUrl, setPdfUrl] = useState(null);
	const [language, setLanguage] = useState("GB");
	const [focusedIndex, setFocusedIndex] = useState(null);
	const [highlightedText, setHighlightedText] = useState(null);

	const extractedData = [
		{
			section: "Asset Characteristics",
			items: [
				{
					label: "Certificate Reference Number",
					value: "0930-1933-0364-0080-1060",
					pageNumber: 1,
				},
				{
					label: "Building Address",
					value: "Strata House, 1 Bridge Street, STAINES UPON THAMES, TW18 4TP",
					pageNumber: 1,
				},
				{ label: "Main Heating Fuel", value: "Natural Gas", pageNumber: 1 },
				{
					label: "Building Environment",
					value: "Air Conditioning",
					pageNumber: 1,
				},
				{ label: "Total Useful Floor Area", value: "9675 m2", pageNumber: 1 },
				{ label: "Building Complexity (NOS Level)", value: "5", pageNumber: 1 },
				{
					label: "Building Emission Rate",
					value: "22.66 kgCO2/m2",
					pageNumber: 1,
				},
				{
					label: "Assessment Software",
					value:
						"Virtual Environment v6.4.0 using calculation engine ApacheSim v6.4.0",
					pageNumber: 1,
				},
				{ label: "Property Reference", value: "166331800000", pageNumber: 1 },
			],
		},
		{
			section: "EPC Characteristics",
			items: [
				{
					label: "Assessor Number",
					value: "LCEA128019",
					pageNumber: 2,
				},
				{
					label: "Accreditation Scheme",
					value: "CIBSE Certification Ltd",
					pageNumber: 2,
				},
				{
					label: "Employer/Trading Name",
					value: "Miltons House Miltons Yard Godalming GU8 5LH",
					pageNumber: 2,
				},
				{
					label: "Issue Date",
					value: "21 Jul 2014",
					pageNumber: 2,
				},
				{
					label: "Valid Until",
					value: "20 Jul 2024",
					pageNumber: 2,
				},
				{
					label: "Related Party Disclosure",
					value: "Not related to the owner",
					pageNumber: 2,
				},
			],
		},
	];

	const [expandedSections, setExpandedSections] = useState(
		extractedData.map((item) => item.section)
	);

	const toggleSection = (section) => {
		setExpandedSections((prev) =>
			prev.includes(section)
				? prev.filter((item) => item !== section)
				: [...prev, section]
		);
	};

	useEffect(() => {
		if (file) {
			const fileUrl = URL.createObjectURL(file);
			setPdfUrl(fileUrl);
		}
	}, [file]);

	useEffect(() => {
		if (highlightedText && file) {
			fetchAndHighlightPdf(file, highlightedText)
				.then((bytes) => {
					const fileUrl = URL.createObjectURL(
						new Blob([bytes], { type: "application/pdf" })
					);
					setPdfUrl(fileUrl);
				})
				.catch((error) => {
					console.error("Error processing PDF:", error);
				});
		}
	}, [highlightedText, file]);

	const onChange = (e) => {
		console.log(`checked = ${e.target.checked}`);
	};

	const languages = {
		US: "English",
		GB: "English",
		FR: "Français",
		DE: "Deutsch",
		IT: "Italiano",
		ES: "Español",
		CN: "中文",
		IN: "हिन्दी",
	};

	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	// Set up PDF.js worker
	pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

	return (
		<div className="mt-4">
			<div className="grid min-h-screen grid-cols-6 gap-4 rounded-md bg-white p-4 shadow-md md:grid-cols-6 md:p-6">
				<div className="col-span-6 rounded-md xl:col-span-4">
					<div className="mb-4 flex flex-col items-start justify-between">
						<div className="mb-4 ml-4 flex items-center justify-start gap-4 sm:ml-0 md:mb-0">
							<FaArrowLeft className="text-[#70D2C2]" size={20} />
							<h2 className="text-xl font-semibold md:text-2xl">
								Editable Data
							</h2>
						</div>
						<div className="w-full flex flex-wrap gap-3">
							<div className="w-fit">
								<p className="mt-3 w-full rounded border border-gray-300 bg-[#eaeaea] px-4 py-[10px] sm:mt-2">
									Energy Performance Certificate
								</p>
							</div>
							<div className="w-fit">
								<p className="mt-3 w-full rounded border border-gray-300 bg-[#eaeaea] px-4 py-[10px] sm:mt-2">
									{languages[`${language}`]}
								</p>
							</div>
							<div className="w-fit">
								<button className="mt-3 flex w-full items-center gap-2 rounded-md bg-[#70D2C2] px-4 py-[10px] text-sm text-white transition sm:mt-2 md:text-base">
									Ask AI
									<img className="w-[18px]" src={Logo} alt="" />
								</button>
							</div>
							<div className="w-fit">
								<button className="mt-3 flex w-full items-center gap-2 rounded-md bg-[#70D2C2] px-4 py-[10px] text-sm text-white transition sm:mt-2 md:text-base">
									Save Changes
								</button>
							</div>
						</div>
					</div>
					<div className="w-full overflow-x-scroll">
						<div className="w-full min-w-[40rem] rounded-md border">
							{extractedData.map((sectionData, sectionIndex) => (
								<div key={sectionIndex}>
									<div
										className="flex cursor-pointer items-center gap-4 border-l-4 border-[#70D2C2] bg-gray-200 px-4 py-3"
										onClick={() => toggleSection(sectionData.section)}
									>
										<FaChevronDown />
										<span className="font-semibold text-[#101828]">
											{sectionData.section}
										</span>
									</div>
									{expandedSections.includes(sectionData.section) && (
										<div className="bg-white">
											{sectionData.items.map((item, index) => (
												<div
													key={index}
													className={`grid items-center gap-4 px-4 py-3 grid-cols-6 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
														}`}
												>
													<div className="flex items-center col-span-2 space-x-2">
														<Checkbox
															className="rounded-full"
															onChange={onChange}
														/>
														<span>{item.label}</span>
													</div>
													<div className="w-full col-span-3 relative flex items-center mt-0">
														<div className="relative sm:w-[220px]">
															<AiOutlineEdit
																className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${focusedIndex === index ? "text-white" : "text-gray-500"}`}
															/>
															<input
																className={`w-full pl-10 rounded-md text-start ${item.highlight ? "bg-orange-100" : "bg-transparent"} py-2 focus:bg-[#fc8043] focus:text-white focus:outline-none`}
																type="text"
																defaultValue={item.value}
																onFocus={() => setFocusedIndex(index)}
																onBlur={() => setFocusedIndex(null)}
															/>
														</div>
													</div>
													<div className="mt-0 text-right col-span-1">
														Page {item.pageNumber}
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="col-span-6 rounded-md xl:col-span-2 xl:py-1">
					<div className="text-start">
						<h2 className="mb-2 ml-4 text-xl font-semibold sm:ml-0 md:text-2xl">
							Original PDF
						</h2>
						<div className="mt-8 w-full overflow-auto">
							<div className="h-[500px] w-full rounded-md border bg-white p-2 md:h-[800px]">
								{pdfUrl ? (
									<Worker workerUrl={pdfjs.GlobalWorkerOptions.workerSrc}>
										<Viewer
											fileUrl={pdfUrl}
											plugins={[defaultLayoutPluginInstance]}
											onLoadError={(error) => {
												console.error("Error loading PDF:", error);
											}}
										/>
									</Worker>
								) : (
									<div className="text-center">Loading PDF...</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

async function fetchAndHighlightPdf(file, textToHighlight) {
	try {
		const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
		const pages = pdfDoc.getPages();

		for (const page of pages) {
			const { text } = await page.getTextContent();
			text.items.forEach((item) => {
				if (item.str.includes(textToHighlight)) {
					const { transform } = item;
					const { x, y, width, height } = transform;
					page.drawRectangle({
						x,
						y,
						width,
						height,
						color: rgb(1, 0, 0),
					});
				}
			});
		}

		const pdfBytes = await pdfDoc.save();
		return pdfBytes;
	} catch (error) {
		console.error("Error processing PDF:", error);
		throw error;
	}
}

export default PdfDetails;

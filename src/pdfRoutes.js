import React from "react";

import PDFDetails from "views/admin/PdfDetails/PdfDetails"
import PDF from "views/admin/pdf/index"
import { GoFileDirectoryFill } from "react-icons/go";
import { AiOutlineFileSearch } from "react-icons/ai";


const pdfRoutes = [
  {
    name: "Upload a new Document",
    layout: "/pdf",
    path: "extract-pdf",
    icon: <GoFileDirectoryFill className="h-6 w-6 text-[#73BDBD]" />,
    component: <PDF />,
    secondary: true,
    showInSidebar: true,
  },
  {
    name: "Review the Extraction",
    layout: "/pdf",
    path: "pdf-details",
    icon: <AiOutlineFileSearch className="h-6 w-6 text-[#73BDBD]" />,
    component: <PDFDetails />,
    secondary: true,
    showInSidebar: true,
  },
];
export default pdfRoutes;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/LoadingPage/LoadingPage";
import cloudUpload from "../../../assets/dashboard/cloud.png";
import files from "../../../assets/dashboard/file.png";
import arrow from "../../../assets/dashboard/Vector.png";
import ReactFlagsSelect from "react-flags-select";



const PDFExtractor = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("GB");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (file) {
      setLoading(true);

      setTimeout(() => {
        navigate("/pdf/pdf-details", { state: { file, fileName } });
      }, 2000);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex sm:min-h-screen flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-lg bg-white p-6 shadow-sm"
      >
        <div className="flex sm:flex-row flex-col justify-between pl-4">
          <div>
            <h1 className="mb-2 text-start text-2xl font-bold">
              Easily Extract Data from Your PDFs
            </h1>
            <p className="mb-6 text-start">
              Upload your document, and our AI will handle the rest. Fast,
              accurate, and hassle-free.
            </p>
          </div>
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="mt-1">
              <select className="rounded border border-gray-300 px-2 py-[10px] focus:outline-none">
                <option value="option1">Energy Performance Certificate</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
              </select>
            </div>
            <div>
              <ReactFlagsSelect
                selected={language}
                onSelect={(code) => setLanguage(code)}
                countries={["US", "GB", "FR", "DE", "IT", "ES", "CN", "IN"]}
                customLabels={{
                  US: "English",
                  GB: "English",
                  FR: "Français",
                  DE: "Deutsch",
                  IT: "Italiano",
                  ES: "Español",
                  CN: "中文",
                  IN: "हिन्दी",
                }}
                placeholder="Select Language"
                className="w-full rounded p-2"
              />
            </div>
          </div>
        </div>
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gradient-to-b from-purple-100 to-gray-50 px-10 py-[120px]">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-8 flex items-center justify-center gap-[40px]">
              <img className="w-full " src={cloudUpload} alt="" />
              <img className="w-full " src={arrow} alt="" />
              <img className="w-full " src={files} alt="" />
            </div>
            <p className="mb-8 text-xl text-[#151515]">
              Drag & drop your PDF file here. or
            </p>
            <div>
              <label
                htmlFor="file-upload"
                className="cursor-pointer rounded bg-[#D7DCFF] px-5 py-3 text-sm "
              >
                Browse files
              </label>
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {fileName && (
              <p className="mt-4 text-lg text-[#151515]">
                Selected File: {fileName}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mx-auto mt-5 flex items-center justify-center rounded-lg bg-[#70D2C2] px-5 py-3 text-sm text-white  hover:bg-blue-200 focus:outline-none"
        >
          Start Extraction
        </button>
        <p className="mt-7 text-center text-[#585858]">
          Click here to begin extracting data from your document.
        </p>
      </form>
    </div>
  );
};

export default PDFExtractor;

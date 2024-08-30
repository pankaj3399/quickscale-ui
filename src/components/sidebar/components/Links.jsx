import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
import { MdExpandMore } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setTheme,
  setIsFilterEnabled,
  removeSubtheme,
  addSubtheme,
} from "store/actions/Dashboard";

const dummySubThemes = [
  { theme: "Generative AI", sub_theme: "Image Generation" },
  { theme: "Generative AI", sub_theme: "Vision Language Models" },
  { theme: "Generative AI", sub_theme: "Vector Database" },
  { theme: "Generative AI", sub_theme: "Large Language Models (LLM)" },
  { theme: "Generative AI", sub_theme: "Retrieval Augmented Generation (RAG)" },
  { theme: "Generative AI", sub_theme: "Gen AI Agent workflow" },
  { theme: "Generative AI", sub_theme: "Prompt Engineering" },
  { theme: "Generative AI", sub_theme: "Diffusion Models" },
  { theme: "Generative AI", sub_theme: "LORA QLORA Fine tuning RLHF" },
  { theme: "Generative AI", sub_theme: "Style Transfer" },
  { theme: "Generative AI", sub_theme: "Music and Art Generation" },
  { theme: "Generative AI", sub_theme: "Synthetic Data Generation" },
];

export function SidebarLinks(props) {
  const dispatch = useDispatch();
  let location = useLocation();
  const { routes } = props;
  const { subThemes } = useSelector((state) => state.dashboard);

  const [generativeAISelected, setGenerativeAISelected] =
    useState("Generative AI");
  const [generativeAIDropdown, setGenerativeAIDropdown] = useState(false);
  const [subThemeDropdown, setSubThemeDropdown] = useState(false);

  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const handleSelect = (dropdown, value) => {
    dispatch(setIsFilterEnabled(true));
    if (dropdown === "generativeAI") {
      setGenerativeAISelected(value);
      dispatch(setTheme(value));
      setGenerativeAIDropdown(false);
    } else if (dropdown === "subTheme") {
      if (subThemes.includes(value)) {
        dispatch(removeSubtheme(value));
      } else {
        dispatch(addSubtheme(value));
      }
    }
  };

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  const createLinks = (routes) => {
    return routes.filter(route => route.showInSidebar)
    .map((route, index) => {
      if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl" ||
        route.layout === "/pdf"
      ) {
        if (
          route.name === "Generative AI Theme" ||
          route.name === "Sub-Theme"
        ) {
          return (
            <div key={index}>
              <div
                onClick={() => {
                  if (route.name === "Generative AI Theme") {
                    setGenerativeAIDropdown(!generativeAIDropdown);
                    setSubThemeDropdown(false);
                  } else if (route.name === "Sub-Theme") {
                    setSubThemeDropdown(!subThemeDropdown);
                    setGenerativeAIDropdown(false);
                  }
                }}
                className={`relative mx-2 mb-3 flex rounded-[12px] bg-white bg-opacity-10 py-2 hover:cursor-pointer ${
                  activeRoute(route.path) ? "border-2 border-blue-500" : ""
                }`}
              >
                <li
                  className="my-[3px] flex cursor-pointer items-center px-5"
                  key={index}
                >
                  <span
                    className={`${
                      activeRoute(route.path)
                        ? "font-bold text-white dark:text-white"
                        : "font-medium text-white"
                    }`}
                  >
                    {route.icon ? route.icon : <DashIcon />}{" "}
                  </span>
                  <p
                    className={`leading-1 flex items-center  justify-center pl-2 ${
                      activeRoute(route.path)
                        ? "font-medium text-white dark:text-white"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    {route.name}
                  </p>
                  <MdExpandMore className="ml-auto h-6 w-6 text-white" />
                </li>
              </div>
              {route.name === "Generative AI Theme" && generativeAIDropdown && (
                <div className="bg-transparent custom-scrollbar z-50 mx-4 mb-4 w-[220px] overflow-y-auto rounded-md border-2 border-white border-opacity-30 py-2 px-2 text-white shadow-lg">
                  <div className="flex flex-col">
                    <button
                      className={`mb-2 rounded-[12px] py-1 px-4 text-left hover:bg-gray-800 ${
                        generativeAISelected === "Generative AI"
                          ? "bg-gray-700 font-bold"
                          : "font-normal"
                      }`}
                      onClick={() =>
                        handleSelect("generativeAI", "Generative AI")
                      }
                    >
                      Generative AI
                    </button>
                  </div>
                </div>
              )}
              {route.name === "Sub-Theme" && subThemeDropdown && (
                <div
                  className="bg-transparent custom-scrollbar mx-4 mb-4 w-[220px] overflow-y-auto rounded-md border-2 border-white border-opacity-30 py-2 px-2 text-white shadow-lg"
                  style={{ maxHeight: "200px" }}
                >
                  <div className="flex flex-col">
                    {dummySubThemes.map((option, idx) => (
                      <button
                        key={idx}
                        className={`mb-2 rounded-[12px] py-2 px-4 text-left hover:bg-gray-800 ${
                          subThemes.includes(option.sub_theme)
                            ? "bg-gray-700 font-bold"
                            : "font-normal"
                        }`}
                        onClick={() =>
                          handleSelect("subTheme", option.sub_theme)
                        }
                      >
                        {option.sub_theme}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {route.name === "Generative AI Theme" && (
                <div className="mx-4 mb-4">
                  <div className="bg-transparent flex items-center rounded-md border-2 border-white border-opacity-30 py-2 px-4 text-white">
                    {generativeAISelected}
                  </div>
                </div>
              )}
              {route.name === "Sub-Theme" && (
                <div className="mx-4 mb-4">
                  <div
                    className="custom-scrollbar flex flex-col space-y-2 overflow-y-auto"
                    style={{ maxHeight: "200px" }}
                  >
                    {subThemes.map((subTheme, idx) => (
                      <div
                        key={idx}
                        className="bg-transparent flex items-center rounded-md border-2 border-white border-opacity-30 py-2 px-4 text-white"
                      >
                        {truncateText(subTheme, 20)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        }

        return (
          <Link key={index} to={route.layout + "/" + route.path}>
            <div
              className={`relative mx-4 mb-3 flex rounded-[12px] bg-white bg-opacity-10 py-2 hover:cursor-pointer max-w-[240px] ${
                activeRoute(route.path)
                  ? "border-2 border-white border-opacity-30"
                  : ""
              }`}
            >
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path)
                      ? "font-bold text-white dark:text-white"
                      : "font-medium text-white"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path)
                      ? "font-medium text-white dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name}
                </p>
              </li>
            </div>
          </Link>
        );
      }
    });
  };

  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;

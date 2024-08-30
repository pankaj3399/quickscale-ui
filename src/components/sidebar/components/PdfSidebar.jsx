import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DashIcon from "components/icons/DashIcon";
import Logo from "assets/dashboard/phonelogo.png";

export function PdfSidebarLinks({ routes }) {
  const location = useLocation();
  const navigate = useNavigate();

  const activeRoute = (routeName) => location.pathname.includes(routeName);

  const createLinks = (routes) => {
    return routes
      .filter((route) => route.showInSidebar)
      .map((route, index) => {
        if (route.layout === "/pdf") {
          return (
            <Link key={index} to={route.layout + "/" + route.path}>
              <div
                className={`relative mx-4 mb-3 flex items-center rounded-lg px-4 py-3 transition-all duration-200 ease-in-out ${
                  activeRoute(route.path)
                    ? "border-white border-2 border-opacity-30 bg-[#1a1a46] text-[#000031] shadow-lg"
                    : "bg-[#1a1a46] text-white hover:bg-[#14142b] transition-colors duration-300"
                }`}
              >
                <li className="flex items-center">
                  <span
                    className={`${
                      activeRoute(route.path)
                        ? "font-bold text-white dark:text-white"
                        : "font-medium text-white"
                    }`}
                  >
                    {route.icon ? route.icon : <DashIcon />}
                  </span>
                  {/* <p
                    className={`text-sm font-medium ${
                      activeRoute(route.path)
                        ? "font-medium text-white dark:text-white"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    {route.name}
                  </p> */}
                </li>
              </div>
            </Link>
          );
        }
        return null;
      });
  };

  return (
    <div className="flex sm:min-h-full h-[1000px] flex-col bg-[#000031] pb-10">
      <div className="mt-[30px] flex flex-col items-center">
        <img onClick={() => navigate("/admin/default")} className="cursor-pointer h-auto object-cover max-w-[35px]" src={Logo} alt="Logo" />
        <button
          onClick={() => navigate("/admin/default")}
          className="mt-[60px] px-4 py-3 bg-[#1a1a46] text-white rounded-lg shadow-md hover:bg-[#14142b] transition-colors duration-300"
          aria-label="Go Back"
        >
          <FaArrowLeft size={20} />
        </button>
      </div>
      <ul className="mt-4 pt-1">{createLinks(routes)}</ul>
    </div>
  );
}

export default PdfSidebarLinks;

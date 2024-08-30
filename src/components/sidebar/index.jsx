/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import routes from "routes.js";
import Logo from "assets/dashboard/logo.png";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-[#000031] pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX className="text-white" />
      </span>

      <div className={`mx-[48px] mt-[30px] flex items-center`}>
        <div className="">
          <img className="w-[160px] h-auto object-cover" src={Logo} alt="" />
        </div>
      </div>
      {/* Nav item */}

      <ul className="mb-auto pt-1 mt-[58px]">
        <Links routes={routes} />
      </ul>


    </div>
  );
};

export default Sidebar;

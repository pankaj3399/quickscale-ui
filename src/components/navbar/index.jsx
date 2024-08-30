import React from "react";
import { useLocation } from "react-router-dom";
import Dropdown from "components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { Space, DatePicker } from "antd";
import { GoFileDirectoryFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

const Navbar = (props) => {
  const { onOpenSidenav, darkmode, setDarkmode } = props;
  const location = useLocation();

  const navigate = useNavigate();

  const getBrandText = () => {
    if (
      location.pathname === "/pdf/extract-pdf" ||
      location.pathname === "/pdf/pdf-details"
    ) {
      return "Extract PDF";
    }
    return "AI Market Pulse";
  };

  const showDatePicker =
    location.pathname !== "/pdf/extract-pdf" &&
    location.pathname !== "/pdf/pdf-details";

    const showPdfButton = location.pathname !== "/pdf/extract-pdf" && location.pathname !== "/pdf/pdf-details";

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {getBrandText()}
          </Link>
        </div>
        <p className="shrink text-[28px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {getBrandText()}
          </Link>
        </p>
      </div>

      {showDatePicker && (
        <div className="ml-auto mr-4">
          <Space direction="horizontal">
            <RangePicker className="py-[12px]" />
          </Space>
        </div>
      )}
      {showPdfButton && (
      <div
        onClick={() => navigate("/pdf/extract-pdf")}
        className="mr-2 flex h-[50px] w-[100px] cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none sm:w-[50px] sm:gap-0 "
      >
        <GoFileDirectoryFill className="h-5 w-5 text-[#73BDBD]" />,
      </div>
      )}
      <div className="relative mt-[3px] flex h-[50px] w-[100px] items-center justify-center gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none sm:w-[50px] sm:gap-0 ">
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>

        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>

        <Dropdown
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    👋 Hey, Man
                  </p>{" "}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="flex flex-col p-4">
                <a
                  href=" "
                  className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Profile Settings
                </a>
                <a
                  href=" "
                  className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Newsletter Settings
                </a>
                <a
                  href=" "
                  className="mt-3 text-sm font-medium text-red-500 transition duration-150 ease-out hover:text-red-500 hover:ease-in"
                >
                  Log Out
                </a>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;

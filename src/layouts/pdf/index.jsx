import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar/components/PdfSidebar";
import Footer from "components/footer/Footer";
import ChatPopup from "components/ChatPopup/ChatPopup";
import pdfRoutes from "pdfRoutes.js";
import TopBar from "components/TopBar/TopBar";

export default function PdfSection(props) {
  const { ...rest } = props;
  const [open, setOpen] = React.useState(true);
  const [darkmode, setDarkmode] = React.useState(false);
  const location = useLocation();

  // Extract fileName from location state if it exists
  const fileName = location.state?.fileName || "";

  // Determine whether to show the ChatPopup based on the current path
  const shouldShowChatPopup = location.pathname !== "/pdf/extract-pdf";

  return (
    <div className="flex h-full w-full">
      <div className="fixed left-0 top-0 h-full">
        <Sidebar
          open={open}
          onClose={() => setOpen(false)}
          routes={pdfRoutes}
        />
      </div>
      <div className="ml-[65px] h-full flex-1 bg-[#F8F4F1] dark:!bg-navy-900">
        <div className="xl:ml-[18px] pl-10 lg:pl-8 md:pr-2">
          <TopBar fileName={fileName} />
        </div>
        <main className="h-full flex-none overflow-auto transition-all md:pr-2 xl:ml-[18px]">
          {/* <Navbar
            onOpenSidenav={() => setOpen(true)}
            logoText={"PDF Management"}
            darkmode={darkmode}
            setDarkmode={setDarkmode}
            {...rest}
          /> */}
          <div className="mx-auto mb-auto h-full min-h-[84vh] overflow-auto pl-10 lg:pl-8">
            <Routes>
              {pdfRoutes
                .filter((route) => route.layout === "/pdf")
                .map((prop, key) => (
                  <Route path={prop.path} element={prop.component} key={key} />
                ))}
            </Routes>
          </div>
          {shouldShowChatPopup && (
            <div>
              <ChatPopup darkmode={darkmode} />
            </div>
          )}
          <div className="p-3">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

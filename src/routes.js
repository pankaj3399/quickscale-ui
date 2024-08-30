import React from "react";
import { useNavigate } from "react-router-dom";

// Admin Imports
import MainDashboard from "views/admin/default";
import GenAI from "../src/components/icons/images/GenAi.png";
import SubTheme from "../src/components/icons/images/Subtheme.png";
import dashboard from "../src/components/icons/images/material-symbols-light_dashboard (1).svg";
import PDFExtractor from "views/admin/pdf";

// Create a component for MenuItem
const MenuItem = ({ name, icon, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div className="menu-item" onClick={handleClick}>
      {icon}
      <span>{name}</span>
    </div>
  );
};

// Define routes
const routes = [
  {
    name: "Generative AI Theme",
    layout: "/admin",
    path: "/generative-ai-theme",
    icon: <img src={GenAI} className="h-6 w-6 object-cover" alt="" />,
    component: "",
    showInSidebar: true,
  },
  {
    name: "Sub-Theme",
    layout: "/admin",
    path: "sub-theme",
    icon: <img src={SubTheme} className="h-4 w-4 object-cover pb-[2px]" alt="" />,
    component: "",
    showInSidebar: true,
  },
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <img src={dashboard} className="h-6 w-6 object-cover" alt="" />,
    component: <MainDashboard />,
    showInSidebar: true,
  },
];

export default routes;

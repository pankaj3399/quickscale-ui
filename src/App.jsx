import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "layouts/admin";
import PdfSection from "./layouts/pdf";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="pdf/*" element={<PdfSection />} /> 
      </Routes>
    </>
  );
};

export default App;

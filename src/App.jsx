import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import TranscriptForm from "./pages/TranscriptForm";

import Help from "./pages/Help";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Version from "./pages/Version";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<TranscriptForm />} />
        <Route path="/help" element={<Help />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/version" element={<Version />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

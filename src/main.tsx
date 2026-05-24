import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import Layout from "./components/Layout";
import Quickstart from "./pages/Quickstart";
import Architecture from "./pages/Architecture";
import Deed from "./pages/Deed";
import Tribunal from "./pages/Tribunal";
import DoctrinePacks from "./pages/DoctrinePacks";
import HoneyBox from "./pages/HoneyBox";
import Cloud from "./pages/Cloud";
import Glossary from "./pages/Glossary";
import NotFound from "./pages/NotFound";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Quickstart />} />
          <Route path="/quickstart" element={<Quickstart />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/deed" element={<Deed />} />
          <Route path="/tribunal" element={<Tribunal />} />
          <Route path="/doctrine-packs" element={<DoctrinePacks />} />
          <Route path="/honeybox" element={<HoneyBox />} />
          <Route path="/cloud" element={<Cloud />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
);

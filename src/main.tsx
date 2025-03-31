import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Home from "&src/pages";

import "./assets/css/init.css";

const dom = document.getElementById("root") as Element;
const root = createRoot(dom);

root.render(
  <StrictMode>
    <Home />
  </StrictMode>
);

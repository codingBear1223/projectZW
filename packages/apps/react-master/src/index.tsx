import ReactDom from "react-dom/client";
import React from "react";
import App from "./app";
import "./index.css";

ReactDom.createRoot(document.getElementById("app") as Element).render(<App />);

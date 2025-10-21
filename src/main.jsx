import {createRoot} from "react-dom/client";
import App from "./App";
import "./styles/register.css"
import Context from "./context/Context";

createRoot(document.getElementById("root")).render(<Context><App></App></Context>)
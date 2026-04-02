// 1. Export the CSS path helper (optional but helpful)
import "./index.css"; 

// 2. Export Utility
export * from "./lib/utils";

// 3. Export Components 
// Make sure these paths exactly match your folder names (e.g., "components" vs "Sidebar")
export * from "./components/Button";
export * from "./components/Card";
export * from "./components/Sidebar";
export * from "./components/Navbar";

// 4. Export Boilerplates
export * from './boiler-plates/dashboards/Dashboard01';
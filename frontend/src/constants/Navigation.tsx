import HomePage from "../pages/Home";
import About from "../pages/About";
import Journal from "../pages/Journal";
import Login from "../pages/Login.tsx";

export const BACKEND_BASE_PATH = "http://localhost:8080/api";

export const PATHS = [
  { link: "/", label: "Home", element: <HomePage /> },
  { link: "/journal", label: "Journal", element: <Journal /> },
  { link: "/about", label: "About", element: <About /> },
  { link: "/login", label: "Login", element: <Login /> },
];
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch blogs (public or authenticated)
  const fetchBlogs = async (authToken) => {
    try {
      if (authToken) axios.defaults.headers.common["Authorization"] = authToken;
      const { data } = await axios.get("/api/blog/all");
      if (data.success) setBlogs(data.blogs);
      else toast.error(data.message || "Failed to fetch blogs");
    } catch (error) {
      console.error("Fetch blogs error:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Verify token with backend
  const verifyToken = async (storedToken) => {
    try {
      axios.defaults.headers.common["Authorization"] = storedToken;
      const { data } = await axios.get("/api/auth/verify");
      if (data.success) {
        setToken(storedToken);
        await fetchBlogs(storedToken);
      } else {
        throw new Error("Invalid token");
      }
    } catch (error) {
      localStorage.removeItem("token");
      setToken(null);
      await fetchBlogs(); // fallback to public fetch
    }
  };

  // On mount → check token + fetch blogs
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) verifyToken(storedToken);
    else fetchBlogs(); // public fetch if no token
  }, []);

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

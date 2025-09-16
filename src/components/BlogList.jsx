import React, { useState, useEffect } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext.jsx";

const BlogList = () => {
  const { blogs, input, loading } = useAppContext();
  const [menu, setMenu] = useState("All");
  const [debouncedInput, setDebouncedInput] = useState(input || "");

  // Debounce search input to prevent excessive filtering
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedInput(input), 300);
    return () => clearTimeout(handler);
  }, [input]);

  // Combined filtering by category + search input
  const filteredBlogs = blogs.filter((blog) => {
    const matchesInput =
      !debouncedInput ||
      blog.title.toLowerCase().includes(debouncedInput.toLowerCase()) ||
      blog.category.toLowerCase().includes(debouncedInput.toLowerCase());

    const matchesMenu =
      menu === "All" || blog.category.toLowerCase() === menu.toLowerCase();

    return matchesInput && matchesMenu;
  });

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div>
      {/* ---- Blog Categories ---- */}
      <div className="flex justify-center gap-4 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`relative cursor-pointer text-gray-500 ${menu === item ? "text-white px-4 pt-0.5" : ""
                }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 top-0 w-full h-7 -z-10 bg-primary rounded-full"
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* ---- Blog Cards ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 sm:mx-16 xl:mx-40">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No blogs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogList;

import { axiosInstance } from "@/services/apisUrls/apisUrls";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Exercises() {
  const [allData, setAllData] = useState([]); // Combined objects: {link, title, description}
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [isHovered, setIsHovered] = useState({
    index: null,
    isHovered: false,
  });

  const getGalleries = async () => {
    try {
      const response = await axiosInstance.get("/gallary");
      const data = response.data.data.map((item) => ({
        link: item.link,
        title: item.title,
        description: item.description,
      }));

      setAllData(data);
      setFilteredData(data); // initially show all
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGalleries();
  }, []);

  const handleCategoryChange = (title) => {
    setSelectedTitle(title);
    if (title === "All") {
      setFilteredData(allData);
    } else {
      const filtered = allData.filter((item) => item.title === title);
      setFilteredData(filtered);
    }
  };

  const handleMouseEnter = (index) => setIsHovered({ index, isHovered: true });
  const handleMouseLeave = () => setIsHovered({ index: null, isHovered: false });

  const uniqueTitles = ["All", ...new Set(allData.map((item) => item.title))];

  return (
    <div className="bg-black min-h-screen text-white">
      <h1 className="text-5xl font-family-pri font-bold p-10 text-center">
        Exercises Guide
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-center items-center flex-wrap my-5 gap-4">
        {uniqueTitles.map((title, index) => (
          <p
            key={index}
            className={`px-6 py-3 font-family-sec font-bold rounded-2xl cursor-pointer transition-all transform ${
              selectedTitle === title
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`}
            onClick={() => handleCategoryChange(title)}
          >
            {title}
          </p>
        ))}
      </div>

      {/* Image Grid */}
      <div className="flex justify-center items-center gap-5 mt-10 flex-wrap p-3">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative">
                <img
                  src={`https://health-advisor.llearn2earn.com/storage/${item.link}`}
                  alt={item.title}
                  className="object-cover w-[300px] h-[300px] rounded-xl transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <motion.div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="absolute inset-0 flex justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white p-4 font-family-pri bg-opacity-50 rounded-lg">
                    <h2
                      className="text-2xl font-bold"
                      style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
                    >
                      {item.title}
                    </h2>
                    <p
                      className="text-lg mt-2"
                      style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg mt-5 text-center">No images available</p>
        )}
      </div>
    </div>
  );
}

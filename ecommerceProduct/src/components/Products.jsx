import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { Tooltip } from "react-tooltip";
import Model from "./Model";
import ProductItem from "../../public/products.json";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState({});
  const [hoveredItems, setHoveredItems] = useState({});

  const handleModel = (index) => {
    setIsModalOpen((prev) => ({ ...prev, [index]: true }));
  };

  const handleCloseModal = (index) => {
    setIsModalOpen((prev) => ({ ...prev, [index]: false }));
  };

  const handleMouseEnter = (index) => {
    setHoveredItems((prev) => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index) => {
    setHoveredItems((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col justify-center gap-10">
        <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-10 transition-all duration-300 ease-in-out text-center">
          This week's highlights
        </h1>
        <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {ProductItem.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-xl"
            >
              <div
                className="relative group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.mImage}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                  <img
                    src={item.highImage}
                    alt={item.title}
                    className={`absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 ease-in-out group-hover:scale-110 ${
                      hoveredItems[index] ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
                <div className="absolute top-0 left-0 p-4">
                  {item.tags.length > 0 && (
                    <div className="flex space-x-2">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`${tag.tagColor} text-white text-sm font-semibold px-2.5 py-1 rounded-full transition-all duration-300 ease-in-out`}
                        >
                          {tag.tagName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="absolute top-0 right-0 p-4">
                  <div className="flex flex-col space-y-2">
                    <span
                      className="w-12 h-12 bg-white rounded-full flex justify-center items-center cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ease-in-out transform translate-x-20 group-hover:translate-x-0"
                      data-tooltip-id={`wishlist-tooltip-${index}`}
                      data-tooltip-content="Add to Wishlist"
                      data-tooltip-place="left"
                    >
                      <FaRegHeart className="text-lg" />
                    </span>
                    <span
                      className="w-12 h-12 bg-white rounded-full flex justify-center items-center cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ease-in-out transform translate-x-20 group-hover:translate-x-0 delay-100"
                      data-tooltip-id={`quick-view-tooltip-${index}`}
                      data-tooltip-content="Quick View"
                      data-tooltip-place="left"
                    >
                      <LuEye className="text-lg" />
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-y-10 group-hover:translate-y-0">
                  <button
                    className="px-10 py-3 bg-white text-black font-semibold rounded-md hover:bg-zinc-800 hover:text-white transition-all duration-300 ease-in-out cursor-pointer z-20"
                    onClick={() => handleModel(index)}
                  >
                    Select Options
                  </button>
                </div>
              </div>

              <div className="py-4 px-3 text-left">
                <p className="text-lg font-medium mb-2 transition-colors duration-300 ease-in-out hover:text-zinc-600">
                  {item.title}
                </p>
                <p className="text-zinc-900 mb-4 block transition-colors duration-300 ease-in-out">
                  <span>${item.price}</span>
                  {item.discountPrice && <span className="ml-4 line-through text-zinc-800">${item.discountPrice}</span>}
                </p>
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {item.colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125 hover:border-gray-400"
                        style={{ backgroundColor: color.colorCode }}
                        data-tooltip-id={`color-tooltip-${index}-${colorIndex}`}
                        data-tooltip-content={color.colorName.toUpperCase()}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href="#">
            <button className="px-10 py-3 bg-white border-2 border-slate-800 text-black font-semibold rounded-md hover:bg-zinc-800 hover:text-white transition-all duration-300 ease-in-out cursor-pointer z-20">
              Shop All Products
            </button>
          </a>
        </div>
      </div>
      {ProductItem.map((item, index) => (
        <React.Fragment key={index}>
          <Tooltip id={`wishlist-tooltip-${index}`} />
          <Tooltip id={`quick-view-tooltip-${index}`} />
          {item.colors.map((color, colorIndex) => (
            <Tooltip key={colorIndex} id={`color-tooltip-${index}-${colorIndex}`} />
          ))}
        </React.Fragment>
      ))}
      {ProductItem.map((item, index) => (
        <Model
          key={index}
          isOpen={isModalOpen[index]}
          onClose={() => handleCloseModal(index)}
          item={item}
        />
      ))}
    </div>
  );
};

export default Products;
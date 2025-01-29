import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Tooltip } from "react-tooltip";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ isOpen, onClose, item }) => {
  const [quantityIndex, setQuantityIndex] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const modalRef = useRef();
  const modelQuantity = useRef(null);

  const handleQuantity = (status) => {
    const quantity = Number(modelQuantity.current.innerText);
    if (status === "next") {
      setQuantityIndex(quantity + 1);
    }
    if (status === "prev") {
      if (quantity > 1) setQuantityIndex(quantity - 1);
    }
  };

  const handleContentEditableChange = (e) => {
    const value = e.target.innerText;

    if (!isNaN(value) && value >= 0) {
      // Update your state or handle the change as needed
      console.log("New quantity:", value);
    } else {
      // Optionally, reset the content if it's invalid
      modelQuantity.current.innerText = quantityIndex;
    }
  };

  const handleClose = useCallback(() => {
    setIsActive(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose();
    };

    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setIsActive(true);
  }, [isOpen]);

  const slides = [
    {
      mImage: "2.2b.webp",
      highImage: "2.1b.webp",
      title: "Slide 1",
    },
    {
      mImage: "4.1a.webp",
      highImage: "4.1b.webp",
      title: "Slide 2",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className={`w-full max-w-4xl h-[80vh] md:h-auto rounded-lg bg-white shadow-xl overflow-auto transition-transform duration-300 ${
          isActive ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-5 h-full">
              <span onClick={handleClose} className="fixed top-1 md:top-5 right-0 md:right-5 z-36 p-2 rounded-full text-black block cursor-pointer hover:rotate-180 hover:bg-black hover:text-white transition duration-300">
              <RxCross2 />
              </span>
          <div className="md:w-1/2 h-full flex">
            <div className="relative h-full w-full overflow-hidden">
              <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="min-w-full h-full">
                    <img
                      src={slide.mImage}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 w-full px-4 flex justify-between">
                <button
                  onClick={goToPrevious}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                >
                  <MdArrowBackIos className="text-2xl" />
                </button>
                <button
                  onClick={goToNext}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                >
                  <MdArrowForwardIos className="text-2xl" />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 h-full pl-2">
            <h2 className="text-2xl mb-3">{item.title}</h2>
            <p className="text-xl mb-5">${item.price}</p>
            <p className="text-gray-600 text-sm mb-2">
              Composition contains at least: outer shell 20% of recycled cotton.
            </p>
            <a href="#" className="underline text-sm mb-5">
              View details
            </a>
            <div className="mt-4 flex justify-start items-center mb-5">
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
              </span>
              <span className="text-gray-600 ml-2">99 In stock</span>
            </div>
            <p className="text-sm mb-1">
              <b>Color</b>
              <span>: {item.colors[0].colorName}</span>
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.colors.map((color, colorIndex) => (
                <div
                  key={colorIndex}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125 hover:border-gray-400"
                  style={{ backgroundColor: color.colorCode }}
                  data-tooltip-id={`color-tooltip`}
                  data-tooltip-content={color.colorName.toUpperCase()}
                />
              ))}
            </div>
            <div className="mt-4 mb-4">
              <p className="mb-2">Quantity</p>
              <div className="flex flex-col sm:flex-row justify-start sm:items-center gap-5">
                <div className="flex items-center justify-between gap-2 border border-gray-300 rounded-md py-1 px-4">
                  <span
                    className="cursor-pointer text-2xl px-2"
                    onClick={() => handleQuantity("prev")}
                  >
                    -
                  </span>
                  <span
                    ref={modelQuantity}
                    className="text-xl px-1"
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleContentEditableChange}
                    dangerouslySetInnerHTML={{ __html: quantityIndex }}
                  />
                  <span
                    className="cursor-pointer text-2xl px-2"
                    onClick={() => handleQuantity("next")}
                  >
                    +
                  </span>
                </div>

                <button className="w-full px-1 py-2 bg-white border border-gray-300 text-black font-semibold rounded-md hover:bg-zinc-800 hover:text-white transition-all duration-300 ease-in-out cursor-pointer z-20">
                  Add to cart
                </button>
              </div>
            </div>
            <button className="w-full px-2 py-2 mb-3 bg-blue-700 border border-gray-300 text-white rounded-md hover:bg-blue-900 hover:text-white transition-all duration-300 ease-in-out cursor-pointer z-20">
              Buy with Shop Pay
            </button>
            <p className="text-center">
              <a href="#" className="underline text-sm">
                More Payment options
              </a>
            </p>
          </div>
          <Tooltip id={`color-tooltip`} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

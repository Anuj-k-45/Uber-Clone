import React from "react";

const LocationSearchPanel = ({ suggestions, onSuggestionClick }) => {
  return (
    <div>
      {Array.isArray(suggestions) &&
        suggestions.map((elem, index) => (
          <div
            key={index}
            onClick={() => onSuggestionClick(elem)}
            className="flex gap-4 border px-3 py-2 border-white active:border-black rounded-xl my-2 items-center h-[55px] w-full"
          >
            <div className="bg-[#eee] h-[30px] w-[30px] flex items-center justify-center rounded-full shrink-0">
              <i className="ri-map-pin-fill"></i>
            </div>
            <h4
              className="text-sm line-clamp-2"
              style={{ fontFamily: "'UberBold', sans-serif" }}
            >
              {elem}
            </h4>
          </div>
        ))}
    </div>
  );
};

export default LocationSearchPanel;

import { useState } from "react";

export default function QuestionCard({question, options, number}) {

  const [selected, setSelected] = useState(null);

  return (
    <div className="w-[90%] md:w-[40%] bg-white rounded-xl shadow-lg p-6 text-black space-y-6">
      {/* Question */}
      <div>
        <span className="text-sm text-gray-500 font-medium">
          Question {number+1}
        </span>
        <div className="mt-1 text-lg font-semibold text-gray-800">
          {question}?
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selected === index;
          return (
            <div
              key={index}
              onClick={() =>
                setSelected((prev) => (prev === index ? null : index)) // toggle
              }
              className={`border rounded-lg px-4 py-2 cursor-pointer transition-all 
                ${
                  isSelected
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "border-gray-300 hover:bg-blue-50 hover:border-blue-500"
                }`}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
}

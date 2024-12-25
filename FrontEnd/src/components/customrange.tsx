import React, { useState } from "react";

interface SliderProps {
  advancedOptions: {
    minSubtopics: number;
  };
  handleOptionChange: (option: string, value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  advancedOptions,
  handleOptionChange,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(
    advancedOptions.minSubtopics
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setSliderValue(value);
    handleOptionChange("minSubtopics", value);
  };

  const calculateBackground = (): string => {
    const percentage = ((sliderValue - 1) / (5 - 1)) * 100; // Calculate the percentage (min = 1, max = 5)
    return `linear-gradient(to right, red ${percentage}%, gray ${percentage}%)`;
  };

  return (
    <input
      type="range"
      min="1"
      max="5"
      value={sliderValue}
      onChange={handleChange}
      className="flex-1 h-2 rounded-lg appearance-none 
                 [&::-webkit-slider-runnable-track]:rounded-lg 
                 [&::-webkit-slider-thumb]:w-4 
                 [&::-webkit-slider-thumb]:h-4 
                 [&::-webkit-slider-thumb]:rounded-full 
                 [&::-webkit-slider-thumb]:bg-red-500"
      style={{
        background: calculateBackground(),
      }}
    />
  );
};

export default Slider;

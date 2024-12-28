import React, { useState } from "react";

interface SliderProps {
  advancedOptions: {
  minTopics: number;
  minSubtopics: number;
}
  handleOptionChange: (option: string, value: number) => void;
  option : string;
  max: number;
  min: number;
}

const Slider: React.FC<SliderProps> = ({
  advancedOptions,
  handleOptionChange,
  option,
  max,
  min = 0,
}) => {
  
  const [sliderValue, setSliderValue] = useState<number>(
   option == 'minTopics' ? advancedOptions.minTopics : advancedOptions.minSubtopics
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setSliderValue(value);
    handleOptionChange(option, value);
  };

  const calculateBackground = (): string => {
    const percentage = ((sliderValue - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--theme-from) ${percentage}%, #334155 ${percentage}%)`;
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={sliderValue}
      onChange={handleChange}
      className="flex-1 h-2 rounded-lg appearance-none 
                [&::-webkit-slider-runnable-track]:rounded-lg 
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:shadow-md 
              [&::-webkit-slider-thumb]:border-slate-400
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:bg-theme
                hover:[&::-webkit-slider-thumb]:scale-[1.17]
                [&::-webkit-slider-thumb]:transition-all
                
                 "
      style={{
        background: calculateBackground(),
      }}
    />
  );
};

export default Slider;

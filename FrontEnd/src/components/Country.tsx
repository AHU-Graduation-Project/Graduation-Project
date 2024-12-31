import React, { useState } from "react";

const CountryDropdown: React.FC = () => {
  const countries = [
    "Jordan",
    "Saudi Arabia",
    "UAE",
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "India",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "Mexico",
  ];

  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className="max-w-sm  mt-7">
      <label
        htmlFor="country"
        className="block text-sm font-semibold text-theme mb-2"
      >
        Select Country
      </label>
      <select
        id="country"
        value={selectedCountry}
        onChange={handleCountryChange}
        className="w-full p-2 text-sm bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme"
      >
        <option value="" disabled>
          Choose a country
        </option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryDropdown;

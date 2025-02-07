// HolidayForm.jsx
import React, { useEffect, useState } from "react";
import { countryName } from "./countryName";
import HolidayCard from "./HolidayCard";

const HolidayForm = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [holidays, setHolidays] = useState([]);
  const api_key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await countryName();
        setCountries(data.response.countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const fetchHolidays = async () => {
    try {
      const res = await fetch(
        `https://calendarific.com/api/v2/holidays?&api_key=${api_key}&country=${country}&year=${year}${
          month ? `&month=${month}` : ""
        }${day ? `&day=${day}` : ""}`
      );
      const data = await res.json();
      setHolidays(data.response.holidays);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchHolidays();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-teal-100 pt-10">
      <div className="px-4 sm:px-10 md:px-32 lg:px-48 xl:px-96 mb-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a country</option>
              {countries.map((c, index) => (
                <option key={index} value={c["iso-3166"]}>
                  {c.country_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="year"
            >
              Year
            </label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="1900"
              max="2100"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="month"
            >
              Month (optional)
            </label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a Month</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {new Date(2000, m - 1, 1).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="day"
            >
              Day (optional)
            </label>
            <input
              id="day"
              type="number"
              value={day}
              onChange={(e) => setDay(parseInt(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="1"
              max="31"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Find Holidays
            </button>
          </div>
        </form>
      </div>
        <HolidayCard holidays={holidays} />
    </div>
  );
};

export default HolidayForm;

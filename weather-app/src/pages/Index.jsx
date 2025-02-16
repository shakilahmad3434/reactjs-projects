import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import WeatherDetails from '@/components/WeatherDetails';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const API_KEY = '42704489c98141a4a6f172729242811';
  const { toast } = useToast();

  // State for location and weather data
  const [location, setLocation] = useState("Delhi");
  const [weatherData, setWeatherData] = useState({
    current: {
      temperature: null,
      humidity: null,
      windSpeed: null,
      feelsLike: null,
      condition: null,
    },
    forecast: [],
  });

  // Fetch weather data based on location
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=5&aqi=no&alerts=no`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();

      // Extract current weather and forecast data
      const currentWeather = {
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        feelsLike: data.current.feelslike_c,
        condition: data.current.condition.text,
      };

      const forecastData = data.forecast.forecastday.map((day) => ({
        date: day.date,
        temperature: day.day.avgtemp_c,
        condition: day.day.condition.text,
        humidity: day.day.avghumidity,
        windSpeed: day.day.maxwind_kph,
      }));

      // Update state with fetched data
      setWeatherData({
        current: currentWeather,
        forecast: forecastData,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to load weather information.",
        variant: "destructive",
      });
    }
  };

  // Handle search input
  const handleSearch = (query) => {
    setLocation(query);
    toast({
      title: "Location Updated",
      description: `Weather information for ${query} has been loaded.`,
    });
  };

  // Fetch weather data on component mount and when location changes
  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">Weather Forecast</h1>
          <p className="text-gray-600">{location}</p>
        </div>
        <SearchBar onSearch={handleSearch} />
        {weatherData.current.temperature !== null && (
          <WeatherDetails
            temperature={weatherData.current.temperature}
            humidity={weatherData.current.humidity}
            windSpeed={weatherData.current.windSpeed}
            feelsLike={weatherData.current.feelsLike}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
          {weatherData.forecast.map((day) => (
            <WeatherCard
              key={day.date}
              {...day}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
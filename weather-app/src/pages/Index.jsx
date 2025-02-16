import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import WeatherDetails from '@/components/WeatherDetails';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const API_KEY = '42704489c98141a4a6f172729242811'
  const { toast } = useToast();
  const [location, setLocation] = useState("Delhi");

  // Mockup data for demonstration
  const weatherData = {
    current: {
      temperature: 22,
      humidity: 65,
      windSpeed: 12,
      feelsLike: 24,
      condition: 'sunny',
    },
    forecast: [
      { date: 'Today', temperature: 22, condition: 'sunny', humidity: 65, windSpeed: 12 },
      { date: 'Tomorrow', temperature: 20, condition: 'cloudy', humidity: 70, windSpeed: 10 },
      { date: 'Wed', temperature: 18, condition: 'rainy', humidity: 80, windSpeed: 15 },
      { date: 'Thu', temperature: 19, condition: 'windy', humidity: 60, windSpeed: 20 },
      { date: 'Fri', temperature: 21, condition: 'sunny', humidity: 55, windSpeed: 8 },
    ],
  };

  const handleWeatherLocation = () => {
      fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`)
      .then(res => res.json())
      .then(data => {
        weatherData.current.temperature = data.current.temp_c;
        weatherData.current.humidity = data.current.humidity;
        weatherData.current.windSpeed = data.current.wind_kph;
        weatherData.current.feelsLike = data.current.feelslike_c;
        weatherData.forecast[0].temperature = data.current.temp_c;
        weatherData.forecast[0].condition = data.current.condition.text;
        weatherData.forecast[0].humidity = data.current.humidity;
        weatherData.forecast[0].windSpeed = data.current.wind_kph;
  })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    handleWeatherLocation()
  }, [])

  const handleSearch = (query) => {
    setLocation(query);
    toast({
      title: "Location Updated",
      description: `Weather information for ${query} has been loaded.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">Weather Forecast</h1>
          <p className="text-gray-600">{location}</p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <WeatherDetails
          temperature={weatherData.current.temperature}
          humidity={weatherData.current.humidity}
          windSpeed={weatherData.current.windSpeed}
          feelsLike={weatherData.current.feelsLike}
        />

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
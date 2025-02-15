import React from 'react';
import { Droplets, Thermometer, Wind } from 'lucide-react';

const WeatherDetails = ({
  temperature,
  humidity,
  windSpeed,
  feelsLike,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto mb-8">
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3 animate-fade-up">
        <Thermometer className="w-8 h-8 text-weather-sunny" />
        <div>
          <p className="text-sm text-gray-500">Temperature</p>
          <p className="font-semibold">{temperature}°C</p>
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <Droplets className="w-8 h-8 text-weather-rainy" />
        <div>
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="font-semibold">{humidity}%</p>
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <Wind className="w-8 h-8 text-weather-clear" />
        <div>
          <p className="text-sm text-gray-500">Wind Speed</p>
          <p className="font-semibold">{windSpeed} km/h</p>
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
        <Thermometer className="w-8 h-8 text-weather-stormy" />
        <div>
          <p className="text-sm text-gray-500">Feels Like</p>
          <p className="font-semibold">{feelsLike}°C</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
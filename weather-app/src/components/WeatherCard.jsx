import React from 'react';
import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';
import { Card } from '@/components/ui/card';

const WeatherIcon = ({ condition }) => {
  const iconProps = {
    className: "w-12 h-12 mb-4 transition-transform hover:scale-110",
    strokeWidth: 1.5
  };

  switch (condition) {
    case 'sunny':
      return <Sun {...iconProps} className={`${iconProps.className} text-weather-sunny`} />;
    case 'rainy':
      return <CloudRain {...iconProps} className={`${iconProps.className} text-weather-rainy`} />;
    case 'cloudy':
      return <Cloud {...iconProps} className={`${iconProps.className} text-weather-cloudy`} />;
    case 'windy':
      return <Wind {...iconProps} className={`${iconProps.className} text-weather-clear`} />;
    default:
      return <Sun {...iconProps} />;
  }
};

const WeatherCard = ({
  date,
  temperature,
  condition,
  humidity,
  windSpeed,
}) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-white/80 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 animate-fade-up">
      <div className="flex flex-col items-center">
        <p className="text-sm font-medium text-gray-500 mb-2">{date}</p>
        <WeatherIcon condition={condition} />
        <h2 className="text-3xl font-bold mb-4">{temperature}°C</h2>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="text-center">
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="font-medium">{humidity}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Wind</p>
            <p className="font-medium">{windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
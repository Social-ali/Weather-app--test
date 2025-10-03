import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from "lucide-react";

interface WeatherData {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: { speed: number };
  visibility: number;
}

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="w-24 h-24 text-primary" data-testid="weather-icon-sun" />;
      case "clouds":
        return <Cloud className="w-24 h-24 text-primary" data-testid="weather-icon-cloud" />;
      case "rain":
      case "drizzle":
        return <CloudRain className="w-24 h-24 text-primary" data-testid="weather-icon-rain" />;
      default:
        return <Cloud className="w-24 h-24 text-primary" data-testid="weather-icon-default" />;
    }
  };

  return (
    <Card 
      className="p-8 bg-card/80 backdrop-blur-lg border-2 border-border shadow-2xl animate-fade-in"
      data-testid="weather-card"
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-foreground mb-2" data-testid="city-name">
          {data.name}, {data.sys.country}
        </h2>
        <p className="text-muted-foreground capitalize" data-testid="weather-description">
          {data.weather[0].description}
        </p>
      </div>

      <div className="flex items-center justify-center mb-8 gap-8">
        {getWeatherIcon(data.weather[0].main)}
        <div>
          <div className="text-7xl font-bold text-foreground" data-testid="temperature">
            {Math.round(data.main.temp)}°C
          </div>
          <div className="text-lg text-muted-foreground" data-testid="feels-like">
            Feels like {Math.round(data.main.feels_like)}°C
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg" data-testid="humidity-card">
          <Droplets className="w-8 h-8 text-primary mb-2" />
          <div className="text-sm text-muted-foreground">Humidity</div>
          <div className="text-xl font-semibold text-foreground" data-testid="humidity-value">
            {data.main.humidity}%
          </div>
        </div>

        <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg" data-testid="wind-card">
          <Wind className="w-8 h-8 text-primary mb-2" />
          <div className="text-sm text-muted-foreground">Wind Speed</div>
          <div className="text-xl font-semibold text-foreground" data-testid="wind-value">
            {data.wind.speed} m/s
          </div>
        </div>

        <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg" data-testid="visibility-card">
          <Eye className="w-8 h-8 text-primary mb-2" />
          <div className="text-sm text-muted-foreground">Visibility</div>
          <div className="text-xl font-semibold text-foreground" data-testid="visibility-value">
            {(data.visibility / 1000).toFixed(1)} km
          </div>
        </div>

        <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg" data-testid="pressure-card">
          <Gauge className="w-8 h-8 text-primary mb-2" />
          <div className="text-sm text-muted-foreground">Pressure</div>
          <div className="text-xl font-semibold text-foreground" data-testid="pressure-value">
            {data.main.pressure} hPa
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;

import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun } from "lucide-react";

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  dt_txt: string;
}

interface ForecastData {
  list: ForecastItem[];
}

interface ForecastCardProps {
  forecastData: ForecastData;
}

const ForecastCard = ({ forecastData }: ForecastCardProps) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="w-8 h-8 text-primary" />;
      case "clouds":
        return <Cloud className="w-8 h-8 text-primary" />;
      case "rain":
      case "drizzle":
        return <CloudRain className="w-8 h-8 text-primary" />;
      default:
        return <Cloud className="w-8 h-8 text-primary" />;
    }
  };

  // Get one forecast per day (at noon)
  const dailyForecasts = forecastData.list.filter((item) => 
    item.dt_txt.includes("12:00:00")
  ).slice(0, 5);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <Card 
      className="p-8 bg-card/80 backdrop-blur-lg border-2 border-border shadow-2xl animate-fade-in w-full max-w-4xl"
      data-testid="forecast-card"
    >
      <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
        5-Day Forecast
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecasts.map((forecast, index) => (
          <div
            key={forecast.dt}
            className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors"
            data-testid={`forecast-day-${index}`}
          >
            <div className="text-sm font-medium text-muted-foreground mb-2">
              {formatDate(forecast.dt_txt)}
            </div>
            
            <div className="my-3">
              {getWeatherIcon(forecast.weather[0].main)}
            </div>

            <div className="text-xs text-muted-foreground capitalize mb-2">
              {forecast.weather[0].description}
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-lg font-bold text-foreground">
                {Math.round(forecast.main.temp_max)}°
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(forecast.main.temp_min)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ForecastCard;

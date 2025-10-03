import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const API_KEY = "6557810176c36fac5f0db536711a6c52";
const API_CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

const Index = () => {
  const [city, setCity] = useState("London");
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["weather", city],
    queryFn: async () => {
      const response = await fetch(
        `${API_CURRENT_URL}?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error("City not found");
      }
      
      return response.json();
    },
    enabled: city.length > 0,
    retry: false,
  });

  const { data: forecastData } = useQuery({
    queryKey: ["forecast", city],
    queryFn: async () => {
      const response = await fetch(
        `${API_FORECAST_URL}?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error("Forecast not available");
      }
      
      return response.json();
    },
    enabled: city.length > 0 && !!data,
    retry: false,
  });

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch weather data",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="min-h-screen bg-sky-gradient p-4 md:p-8">
      <div className="max-w-6xl mx-auto py-12">
        <header className="text-center mb-12 animate-fade-in" data-testid="header">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Weather App
          </h1>
          <p className="text-xl text-white/90 drop-shadow">
            Get real-time weather information for any city
          </p>
        </header>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {isLoading && (
          <div className="flex justify-center items-center py-20" data-testid="loading-spinner">
            <Loader2 className="w-12 h-12 animate-spin text-white" />
          </div>
        )}

        {data && !isLoading && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <WeatherCard data={data} />
            </div>
            
            {forecastData && (
              <div className="flex justify-center">
                <ForecastCard forecastData={forecastData} />
              </div>
            )}
          </div>
        )}

        {!data && !isLoading && (
          <div className="text-center py-20 text-white/80" data-testid="no-data-message">
            <p className="text-xl">Search for a city to see the weather</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

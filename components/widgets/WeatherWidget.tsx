"use client";

import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, Moon } from "lucide-react";

interface WeatherData {
  temperature: number;
  isDay: boolean;
  weatherCode: number;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState("Bengaluru");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // 1. Get location from IP
        let lat = 12.9716;
        let lon = 77.5946;
        let city = "Bengaluru";

        try {
          const locRes = await fetch("https://ipapi.co/json/");
          if (locRes.ok) {
            const locData = await locRes.json();
            if (locData.latitude && locData.longitude) {
              lat = locData.latitude;
              lon = locData.longitude;
              city = locData.city || locData.region || "Local";
            }
          }
        } catch (e) {
          console.warn("Location fetch failed, using default");
        }

        setLocationName(city);

        // 2. Fetch Weather
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,weather_code&timezone=auto`
        );
        const data = await res.json();
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          isDay: data.current.is_day === 1,
          weatherCode: data.current.weather_code,
        });
      } catch (error) {
        console.error("Failed to fetch weather", error);
      }
    };

    fetchWeather();
  }, []);

  if (!weather) return null;

  const getWeatherIcon = () => {
    // Simple mapping for Open-Meteo WMO codes
    // 0: Clear sky
    // 1, 2, 3: Mainly clear, partly cloudy, and overcast
    // 45, 48: Fog
    // 51-55: Drizzle
    // 61-65: Rain
    const { weatherCode, isDay } = weather;

    if (weatherCode <= 1)
      return isDay ? (
        <Sun className="w-4 h-4 text-yellow-500" />
      ) : (
        <Moon className="w-4 h-4 text-gray-400" />
      );
    if (weatherCode <= 3) return <Cloud className="w-4 h-4 text-gray-400" />;
    if (weatherCode >= 51) return <CloudRain className="w-4 h-4 text-gray-500" />;

    return <Sun className="w-4 h-4 text-orange-400" />;
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-black/50 border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
      {getWeatherIcon()}
      <span>{locationName}, {weather.temperature}°C</span>
    </div>
  );
}

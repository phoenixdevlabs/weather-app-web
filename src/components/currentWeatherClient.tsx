"use client";

import "./currentWeatherClient.scss";
import { WeatherComponent } from "@/lib/weather/components/weather/WeatherComponent";
import { useWeather } from "@/lib/weather/context/weatherContext";

export const CurrentWeatherClient = () => {
    const { currentWeather, error } = useWeather();

    if (error) {
        return (
            <div>
                <h2>Error</h2>
                <p>{error.message}</p>
            </div>
        );
    }

    if (!currentWeather) {
        return (
            <div className="loading-page">
                <h2>Loading...</h2>
            </div>
        );
    }

    return <WeatherComponent currentWeather={currentWeather} />;
};

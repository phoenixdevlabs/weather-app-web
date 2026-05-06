import "./current-weather-temperature.scss";
import { CurrentWeatherType } from "../../../types";
import { useRef } from "react";
import { useAnimationOnIntersection } from "./useAnimationOnIntersection";

export const CurrentWeatherTemperature = ({
    currentWeather,
}: {
    currentWeather: CurrentWeatherType;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useAnimationOnIntersection({ ref, className: "enter" });

    if (!currentWeather) return;

    return (
        <div className="current-temperature" ref={ref}>
            <div className="current-temperature__real">
                <div className="current-temperature__real--value">
                    {currentWeather.current.temperature_2m?.toFixed(0)}
                </div>
                <div className="current-temperature__real--unit">&deg;</div>
            </div>

            <div className="current-temperature__feels-like">
                <div className="current-temperature__feels-like--value">
                    Feels like{" "}
                    {currentWeather.current.apparent_temperature?.toFixed(0)}
                    <div className="current-temperature__feels-like--unit">
                        &deg;
                    </div>
                </div>
            </div>
        </div>
    );
};

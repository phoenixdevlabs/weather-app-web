import "./current-weather-description.scss";
import { CurrentWeatherType } from "../../../types";
import { getWeatherDescriptionByCode } from "../../../weatherCodes";
import { useRef } from "react";
import { useAnimationOnIntersection } from "./useAnimationOnIntersection";

export const CurrentWeatherDescription = ({
    currentWeather,
}: {
    currentWeather: CurrentWeatherType;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useAnimationOnIntersection({ ref, className: "enter" });

    if (!currentWeather) return;
    return (
        <div className="description" ref={ref}>
            {getWeatherDescriptionByCode(currentWeather.current.weather_code!)}
        </div>
    );
};

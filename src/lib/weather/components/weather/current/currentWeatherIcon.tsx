import "./current-weather-icon.scss";
import { WeatherIcon } from "../../../reactIcons";
import { CurrentWeatherType } from "../../../types";
import { getWeatherIcon } from "../../../weatherCodes";
import { useRef } from "react";
import { useAnimationOnIntersection } from "./useAnimationOnIntersection";

export const CurrentWeatherIcon = ({
    currentWeather,
}: {
    currentWeather: CurrentWeatherType;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useAnimationOnIntersection({ ref, className: "enter" });

    if (!currentWeather) return;
    return (
        <div className="current-icon" ref={ref}>
            <div className="current-icon--large">
                <WeatherIcon
                    icon={
                        getWeatherIcon({
                            code: currentWeather.current.weather_code!,
                            isDay: currentWeather.current.is_day!,
                        })!
                    }
                    size={200}
                    colorCode={"#25316d"}
                />
            </div>
            <div className="current-icon--small">
                <WeatherIcon
                    icon={
                        getWeatherIcon({
                            code: currentWeather.current.weather_code!,
                            isDay: currentWeather.current.is_day!,
                        })!
                    }
                    size={120}
                    colorCode={"#25316d"}
                />
            </div>
        </div>
    );
};

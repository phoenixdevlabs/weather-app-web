import "./current-weather-highlights.scss";
import { CurrentWeatherType } from "../../../types";
import { CurrentWeatherHighlightsItem } from "./CurrentWeatherHighlightsItem";
import type { WeatherItemType } from "./CurrentWeatherHighlightsItem";

export const CurrentWeatherHighlights = ({
    currentWeather,
}: {
    currentWeather: CurrentWeatherType;
}) => {
    if (!currentWeather) return;

    type HighlightedItem = WeatherItemType & { key: number };
    const highlightedItems: HighlightedItem[] = [
        {
            key: 1,
            icon: <i className="wi wi-rain"></i>,
            unit: "mm",
            value:
                Number(currentWeather.current.precipitation?.toFixed(1)) ?? 0,
        },
        {
            key: 2,
            icon: <i className="wi wi-strong-wind"></i>,
            unit: "km/h",
            value:
                Number(currentWeather.current.wind_speed_10m?.toFixed(1)) ?? 0,
        },
        {
            key: 3,
            icon: <i className="wi wi-humidity"></i>,
            unit: "%",
            value:
                Number(
                    currentWeather.current.relative_humidity_2m?.toFixed(1),
                ) ?? 0,
        },
    ];

    return (
        <div className="highlights">
            {highlightedItems.map((item) => {
                return (
                    <CurrentWeatherHighlightsItem
                        key={item.key}
                        icon={item.icon}
                        unit={item.unit}
                        value={item.value}
                    />
                );
            })}
        </div>
    );
};

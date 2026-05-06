import "./current-weather-highlights-item.scss";

export type WeatherItemType = {
    icon: React.ReactNode;
    value: number;
    unit: string;
};

export const CurrentWeatherHighlightsItem = ({
    icon,
    value,
    unit,
}: WeatherItemType) => {
    return (
        <div className="item">
            <div className="icon">{icon}</div>
            <div className="value">{value}</div>
            <div className="unit">
                <span>{unit}</span>
            </div>
        </div>
    );
};

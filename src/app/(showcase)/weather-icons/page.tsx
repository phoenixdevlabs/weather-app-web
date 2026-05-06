import { WeatherIcon } from "@/lib/weather/reactIcons";
import {
    getWeatherDescriptionByCode,
    getWeatherIcon,
} from "@/lib/weather/weatherCodes";

export default function Showcase() {
    const codes = [
        0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75,
        77, 80, 81, 82, 85, 86, 95, 96, 99,
    ];

    return codes.map((code) => {
        return [1, 0].map((isDay) => {
            return (
                <div key={`${code}-${isDay}`}>
                    <p>
                        {code}{" "}
                        {getWeatherDescriptionByCode(code)}
                        { isDay ? " (Day)" : " (Night)" }
                        </p>
                    <WeatherIcon
                        icon={
                            getWeatherIcon({
                                code,
                                isDay,
                            })!
                        }
                        size={128}
                        colorName={"BurlyWood"}
                    />
                </div>
            );
        });
    });
}

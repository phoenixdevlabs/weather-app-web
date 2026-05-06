import "./today.scss";
import { WeatherIcon } from "@/lib/weather/reactIcons";
import { CurrentWeatherType } from "@/lib/weather/types";
import { weekday } from "@/lib/weather/utils";
import { getWeatherIcon } from "@/lib/weather/weatherCodes";

export const TodayData = ({
    currentWeather,
}: {
    currentWeather: CurrentWeatherType;
}) => {
    if (!currentWeather) return;

    return (
        <div className="today">
            {currentWeather.daily.time.map((date, index) => {
                
                const currentDate = new Date(date);

                if (currentDate.getDate() !== new Date().getDate()) {
                    return null;
                }

                const maxTemp =
                    currentWeather.daily.temperature_2m_max![index]?.toFixed(0);

                const minTemp =
                    currentWeather.daily.temperature_2m_min![index]?.toFixed(0);

                const uvIndex =
                    currentWeather.daily.uv_index_max![index]?.toFixed(0);

                const precipitationSum =
                    currentWeather.daily.precipitation_sum![index]?.toFixed(1);

                const precipitationProbability =
                    currentWeather.daily.precipitation_probability_mean![
                        index
                    ]?.toFixed(1);

                const currentWeekday = weekday(
                    new Date(currentWeather.daily.time![index]).getDay(),
                );

                const day = new Date(
                    currentWeather.daily.time![index],
                ).toLocaleDateString();

                return (
                    <div key={currentWeather.daily.time![index].toString()} className="today__cell">
                        <div className="today__cell__item date">
                            <h3 className="today__cell__item date--weekday">
                                {currentWeekday}
                            </h3>
                            <h4 className="today__cell__item date--datestring">
                                {day}
                            </h4>
                            <WeatherIcon
                                icon={
                                    getWeatherIcon({
                                        code: currentWeather.daily
                                            .weather_code![index],
                                        isDay: 1,
                                    })!
                                }
                                size={50}
                                colorCode={"#25316d"}
                            />
                        </div>
                        <div className="today__cell__item">
                            <div className="label">Max: </div>
                            <div className="today__cell__item__data">
                                <div className="value">{maxTemp}</div>
                                <div className="unit">
                                    &deg;
                                </div>
                            </div>
                        </div>
                        <div className="today__cell__item">
                            <div className="label">Min: </div>
                            <div className="today__cell__item__data">
                                <div className="value">{minTemp}</div>
                                <div className="unit">
                                    &deg;
                                </div>
                            </div>
                        </div>
                        <div className="today__cell__item">
                            <div className="label">UV Index</div>
                            <div className="today__cell__item__data">
                                <div className="value">
                                    <span>{uvIndex}</span>
                                </div>
                            </div>
                        </div>
                        <div className="today__cell__item">
                            <div className="label">Precipitation:</div>
                            <div className="today__cell__item__data today__cell__item__data--precipitation">
                                <div className="today__cell__item__data--precipitation__data">
                                    <div className="value">
                                        {precipitationSum}
                                    </div>
                                    <div className="unit">mm</div>
                                </div>
                                <div className="today__cell__item__data--precipitation__data">
                                    <div className="value">
                                        {precipitationProbability}
                                    </div>
                                    <div className="unit">%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

"use client";

import "@/lib/weather/icons/weather-icons/sass/weather-icons.min.scss";
import "@/lib/weather/icons/weather-icons/sass/weather-icons-wind.min.scss";
import "./weather-component.scss";

import { CurrentWeatherType } from "../../types";
import { useWeather } from "../../context/weatherContext";
import { weekday } from "../../utils";
import { Geocoding } from "../geocoding/geocoding";
import { ReverseGeocoding } from "../reverseGeocoding/reverseGeocoding";
import { CurrentWeatherTemperature } from "./current/currentWeatherTemperature";
import { CurrentWeatherIcon } from "./current/currentWeatherIcon";
import { CurrentWeatherDescription } from "./current/currentWeatherDescription";
import { CurrentWeatherHighlights } from "./current/currentWeatherHighlights";
import { TodayData } from "./daily/todayData";
import { HourlyData } from "./daily/hourlyData";
import { NextDaysData } from "./daily/nextDaysData";

export const WeatherComponent = ({
    currentWeather,
}: {
    currentWeather: CurrentWeatherType;
}) => {
    const { updateCurrentWeather, loadingWeather } = useWeather();

    if (!currentWeather) return null;

    return (
        <div className="weather">
            <header className="weather__header">
                <h2 className="weather__header__heading">
                    Weather Data
                </h2>
                <Geocoding />

                <ReverseGeocoding
                    lat={currentWeather.latitude}
                    lon={currentWeather.longitude}
                />
                <div className="weather__header__info">
                    <p className="weather__header__datetime">
                        <span className="weather__header__datetime--weekday">
                            {weekday(
                                new Date(currentWeather.current.time).getDay(),
                            )}
                        </span>
                        {" - "}
                        <span className="weather__header__datetime--date">
                            {new Date(
                                currentWeather.current.time,
                            ).toLocaleDateString()}
                        </span>
                        {" - "}
                        <span className="weather__header__datetime--time">
                            {new Date(
                                currentWeather.current.time,
                            ).toLocaleTimeString()}
                        </span>
                    </p>
                    <p className="weather__header__location">
                        <span>Lat: {currentWeather.latitude.toFixed(5)}</span>
                        {", "}
                        <span>Lon: {currentWeather.longitude.toFixed(5)}</span>
                    </p>
                    <p className="weather__header__timezone">
                        <span>{currentWeather.timezone?.replaceAll("/", " / ").replaceAll("_", " ")}</span>{", "}
                        <span>{currentWeather.timezoneAbbreviation}</span>
                    </p>
                </div>

                <button
                    className="weather__header__btn--reload"
                    onClick={() => updateCurrentWeather()}
                    disabled={loadingWeather}
                >
                    <span className={loadingWeather ? "spinning" : ""}>
                        <i className="wi wi-refresh"></i>
                    </span>
                </button>
            </header>

            <main className="weather__main">
                <div className="current-data">
                    <CurrentWeatherTemperature
                        currentWeather={currentWeather}
                    />

                    <CurrentWeatherIcon currentWeather={currentWeather} />
                    <CurrentWeatherDescription
                        currentWeather={currentWeather}
                    />

                    <CurrentWeatherHighlights currentWeather={currentWeather} />
                </div>

                <div className="daily-data">
                    <div className="daily-data__today">
                        <h3>Today</h3>
                        <TodayData currentWeather={currentWeather} />
                    </div>
                    <div className="daily-data__hourly-data-for-today">
                        <h4>Next hours</h4>
                        <HourlyData currentWeather={currentWeather} />
                    </div>
                    <div className="daily-data__next-days">
                        <h3>Next days</h3>
                        <NextDaysData currentWeather={currentWeather} />
                    </div>
                </div>
            </main>
        </div>
    );
};


"use client";

import { getHourlyWeather } from "@/lib/weather/actions";
import { useGeolocation } from "@/lib/weather/context/geolocationContext";
import { HourlyWeatherType } from "@/lib/weather/types";
import { useCallback, useEffect, useState } from "react";

export const HourlyDataClient = () => {
    const { geolocation } = useGeolocation();
    const { latitude, longitude } = geolocation;
    const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherType>();

    const getHourlyData = useCallback(() => {
        if (!latitude || !longitude) return null;
        getHourlyWeather({ lat: latitude, lon: longitude })
            .then((r) => {
                setHourlyWeather(r);
                console.log(r);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [latitude, longitude]);

    useEffect(() => {
        getHourlyData();
    }, [getHourlyData]);
    

    return (
        <div>
            <p>
                {latitude}, {longitude}
            </p>

            <div>
                {hourlyWeather?.hourly.time.map((time, index) => (
                    <div key={index}>
                        {index}: {new Date(time).toString()}
                    </div>
                ))}
            </div>
        </div>
    );
};

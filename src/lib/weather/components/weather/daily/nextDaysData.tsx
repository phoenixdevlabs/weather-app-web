import "./nextdays.scss";
import { WeatherIcon } from "@/lib/weather/reactIcons";
import { CurrentWeatherType } from "@/lib/weather/types";
import { weekday } from "@/lib/weather/utils";
import { getWeatherIcon } from "@/lib/weather/weatherCodes";
import Link from "next/link";
import { RefObject, useEffect, useRef, useState } from "react";

export const NextDaysData = ({
    currentWeather,
}: {
    currentWeather: CurrentWeatherType;
}) => {
    const nextdaysRef = useRef<HTMLDivElement>(null);

    useIntersectionObserver(nextdaysRef);

    if (!currentWeather) return null;

    return (
        <div className="next-days" ref={nextdaysRef}>
            {currentWeather.daily &&
                currentWeather.daily.time.map((date, index) => {
                    const today = new Date().getTime();
                    const currentDate = new Date(date).getTime();

                    if (currentDate <= today) {
                        return null;
                    }

                    const day = new Date(date).toLocaleDateString();
                    const currentDateString = `${new Date(date).getFullYear()}-${(new Date(date).getMonth() + 1).toString().padStart(2, "0")}-${new Date(
                        date,
                    )
                        .getDate()
                        .toString()
                        .padStart(2, "0")}`;

                    const currentWeekday = weekday(
                        new Date(currentWeather.daily.time[index]).getDay(),
                    );

                    const maxTemp =
                        currentWeather.daily.temperature_2m_max![
                            index
                        ]?.toFixed(0);

                    const minTemp =
                        currentWeather.daily.temperature_2m_min![
                            index
                        ]?.toFixed(0);

                    const precipitationSum =
                        currentWeather.daily.precipitation_sum![index]?.toFixed(
                            1,
                        );

                    const uvIndex =
                        currentWeather.daily.uv_index_max![index]?.toFixed(0);

                    const windSpeed =
                        currentWeather.daily.wind_speed_10m_max![
                            index
                        ]?.toFixed(0);

                    return (
                        <Link href={`/hourly/${currentDateString}`} key={index}>
                            <div className="next-days__cell">
                                <div className="next-days__cell__item date">
                                    <h3 className="next-days__cell__item date--weekday">
                                        {currentWeekday}
                                    </h3>
                                    <h4 className="next-days__cell__item date--datestring">
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
                                        size={60}
                                        colorCode={"#25316d"}
                                    />
                                </div>

                                <div className="next-days__cell__item">
                                    <div className="label">Max</div>
                                    <div className="value">
                                        <span>{maxTemp}</span>
                                        &deg;
                                    </div>
                                </div>
                                <div className="next-days__cell__item">
                                    <div className="label">Min</div>
                                    <div className="value">
                                        <span>{minTemp}</span>
                                        &deg;
                                    </div>
                                </div>
                                <div className="next-days__cell__item">
                                    <div className="label">UV Index</div>
                                    <div className="value">
                                        <span>{uvIndex}</span>
                                    </div>
                                </div>
                                <div className="next-days__cell__item">
                                    <div className="label">
                                        Precipitation Sum
                                    </div>
                                    <div className="value">
                                        <span>{precipitationSum}</span>
                                        <span>mm</span>
                                    </div>
                                </div>
                                <div className="next-days__cell__item">
                                    <div className="label">Wind</div>
                                    <div className="value">
                                        <span>{windSpeed}</span>
                                        <span>km/h</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
        </div>
    );
};

const useIntersectionObserver = (ref: RefObject<HTMLElement | null>) => {
    const observing = useRef<boolean>(false);

    useEffect(() => {
        const currentRef = ref.current;

        const observer = new IntersectionObserver(
            (entry) => {
                console.log(
                    entry[0].target.textContent,
                    entry[0].isIntersecting,
                    entry[0].intersectionRect,
                );

                if (entry[0].isIntersecting) {
                    entry[0].target.classList.add("show");
                } else {
                    //entry[0].target.classList.remove("show");
                }
            },
            { rootMargin: "0px 1000px 0px 0px", threshold: 0 },
        );

        const observeNodes = () => {
            if (currentRef) {
                currentRef.childNodes.forEach((element) => {
                    observer.observe(element as Element);
                    observing.current = true;
                });
            }
        };

        const unobserveNodes = () => {
            if (currentRef) {
                currentRef.childNodes.forEach((element) => {
                    observer.unobserve(element as Element);
                    observing.current = false;
                    (element as Element).classList.add("show");
                });
            }
        };

        const checkMedia = () => {
            const mediaQuery = window.matchMedia("(min-width: 513px)");

            if (mediaQuery.matches) {
                if (!observing.current) {
                    observeNodes();
                }
            } else {
                unobserveNodes();
            }
        };

        checkMedia();

        const onResizeWindow = () => {
            checkMedia();
        };

        window.addEventListener("resize", onResizeWindow);

        return () => {
            window.removeEventListener("resize", onResizeWindow);
        };
    }, [ref]);

    return {};
};

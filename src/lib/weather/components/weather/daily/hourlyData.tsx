import "./hourly.scss";
import { WeatherIcon } from "@/lib/weather/reactIcons";
import { CurrentWeatherType } from "@/lib/weather/types";
import { getWeatherIcon } from "@/lib/weather/weatherCodes";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useCallback, useEffect, useRef } from "react";

export const HourlyData = ({
    currentWeather,
}: {
    currentWeather: CurrentWeatherType;
}) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const buttonLeftRef = useRef<HTMLButtonElement>(null);
    const buttonRightRef = useRef<HTMLButtonElement>(null);

    const scrollCarousel = useCallback((direction: "left" | "right") => {
        const carousel = carouselRef.current;

        const cellWidth = Number(carousel?.firstElementChild?.clientWidth);

        const left = direction === "left" ? -3 : 3;

        carousel?.scrollBy({
            behavior: "smooth",
            left: left * cellWidth,
            top: 0,
        });
    }, []);

    const updateScrollButtons = (carousel: HTMLDivElement | null) => {
        const leftBtn = buttonLeftRef.current;
        const rightBtn = buttonRightRef.current;

        const carouselScrollLeft = carousel?.scrollLeft || 0;
        const carouselScrollWidth = carousel?.scrollWidth || 0;
        const carouselVisibleWidth = carousel?.getClientRects()[0].width || 0;
        const carouselScrollRight =
            carouselScrollWidth - carouselScrollLeft - carouselVisibleWidth;

        const classDisabled = "disabled";

        if (carouselScrollLeft === 0) {
            leftBtn?.classList.add(classDisabled);
        } else {
            leftBtn?.classList.remove(classDisabled);
        }

        if (carouselScrollRight === 0) {
            rightBtn?.classList.add(classDisabled);
        } else {
            rightBtn?.classList.remove(classDisabled);
        }
    };

    useEffect(() => {
        const carousel = carouselRef.current;

        updateScrollButtons(carousel);

        const onCarouselScrollEnd = () => {
            updateScrollButtons(carousel);
        };

        carousel?.addEventListener("scrollend", onCarouselScrollEnd);

        return () => {
            carousel?.removeEventListener("scrollend", onCarouselScrollEnd);
        };
    }, []);

    if (!currentWeather) return null;

    return (
        <div className="hourly-data">
            <button
                className="hourly-data__button hourly-data__button--left"
                onClick={() => scrollCarousel("left")}
                ref={buttonLeftRef}
            >
                <IconArrowLeft />
            </button>

            <div className="hourly-data__carousel" ref={carouselRef}>
                {currentWeather.hourly &&
                    currentWeather.hourly.time.map((date, index) => {
                        const currentDate = new Date(date);
                        const today = new Date();

                        if (
                            currentDate.getTime() <= today.getTime() ||
                            currentDate.getTime() >
                                today.getTime() + 3600 * 24 * 1000
                        )
                            return null;

                        const hour = currentDate.getHours();
                        const isDay = currentWeather.hourly.is_day![index];
                        const code = currentWeather.hourly.weather_code![index];

                        return (
                            <div
                                key={(currentWeather.hourly.time[
                                    index
                                ]).toString()}
                                className="hourly-data__date-cell"
                            >
                                <h5 className="hourly-data__date-cell__item">
                                    {hour}
                                    {hour > 1 ? "hs" : "h"}
                                </h5>
                                <div className="hourly-data__date-cell__item icon">
                                    <WeatherIcon
                                        icon={getWeatherIcon({
                                            code,
                                            isDay,
                                        })}
                                        colorCode="#25316d"
                                        size={48}
                                    />
                                </div>
                                <div className="hourly-data__date-cell__item">
                                    <span className="hourly-data__date-cell__item__value temperature">
                                        {currentWeather.hourly.temperature_2m![
                                            index
                                        ].toFixed(0)}
                                    </span>
                                    <span className="hourly-data__date-cell__item__unit temperature">
                                        &deg;
                                    </span>
                                </div>
                                <div className="hourly-data__date-cell__item">
                                    <span className="hourly-data__date-cell__item__icon">
                                        <i className="wi wi-raindrops"></i>
                                    </span>
                                    <span className="hourly-data__date-cell__item__value">
                                        {currentWeather.hourly.precipitation![
                                            index
                                        ].toFixed(1)}
                                    </span>
                                    <span className="hourly-data__date-cell__item__unit">
                                        {} {/* mm */}
                                    </span>
                                </div>
                                <div className="hourly-data__date-cell__item">
                                    <div className="hourly-data__date-cell__item__icon">
                                        <i className="wi wi-humidity"></i>
                                    </div>
                                    <span className="hourly-data__date-cell__item__value">
                                        {currentWeather.hourly.relative_humidity_2m![
                                            index
                                        ].toFixed(0)}
                                    </span>
                                    <span className="hourly-data__date-cell__item__unit">
                                        %
                                    </span>
                                </div>
                                <div className="hourly-data__date-cell__item">
                                    <div className="hourly-data__date-cell__item__icon">
                                        <i className="wi wi-strong-wind"></i>
                                    </div>
                                    <span className="hourly-data__date-cell__item__value">
                                        {currentWeather.hourly.wind_speed_10m![
                                            index
                                        ].toFixed(0)}
                                    </span>
                                    <span className="hourly-data__date-cell__item__unit">
                                        km/h
                                    </span>
                                </div>
                            </div>
                        );
                    })}
            </div>

            <button
                className="hourly-data__button hourly-data__button--right"
                onClick={() => scrollCarousel("right")}
                ref={buttonRightRef}
            >
                <IconArrowRight />
            </button>
        </div>
    );
};
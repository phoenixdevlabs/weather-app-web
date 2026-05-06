"use client";

import {
    useContext,
    createContext,
    useState,
    useEffect,
    useCallback,
    Dispatch,
    SetStateAction,
} from "react";
import { useGeolocation } from "./geolocationContext";
import { CurrentWeatherType } from "../types";
import { getCurrentWeather } from "../actions";

type ErrorType = { message: string } | undefined;

interface InitialValue {
    currentWeather: CurrentWeatherType;
    updateCurrentWeather: () => void;
    loadingWeather: boolean;
    setLoadingWeather: Dispatch<SetStateAction<boolean>>;
    error: ErrorType;
    setError: Dispatch<SetStateAction<ErrorType>>;
}

const initialValue: InitialValue = {
    currentWeather: undefined,
    updateCurrentWeather: () => {},
    loadingWeather: false,
    setLoadingWeather: () => {},
    error: undefined,
    setError: () => {},
};

const Context = createContext(initialValue);

export default function WeatherContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const { geolocation } = useGeolocation();
    const [currentWeather, setCurrentWeather] =
        useState<CurrentWeatherType>(undefined);
    const [loadingWeather, setLoadingWeather] = useState<boolean>(false);
    const [error, setError] = useState<ErrorType>(undefined);

    const updateCurrentWeather = useCallback(() => {
        setLoadingWeather(true);

        const { latitude, longitude } = geolocation;

        if (!latitude || !longitude) return;

        getCurrentWeather({ lat: latitude, lon: longitude })
            .then((r) => {
                setCurrentWeather(r);
            })
            .catch((err) => {
                console.log(
                    "An error ocurred while fetching current weather data: ",
                    err,
                );
                setError({ message: "Failed to fetch current weather data" });
            })
            .finally(() => {
                setLoadingWeather(false);
            });
    }, [geolocation]);

    useEffect(() => {
        (() => {
            updateCurrentWeather();
        })();
    }, [updateCurrentWeather]);

    useEffect(() => {
        const onFocus = () => {
            console.log("Window focused, updating current weather...");
            updateCurrentWeather();
        };

        window.addEventListener("visibilitychange", onFocus);

        return () => {
            window.removeEventListener("visibilitychange", onFocus);
        };
    }, [updateCurrentWeather]);

    return (
        <Context.Provider
            value={{
                currentWeather,
                updateCurrentWeather,
                loadingWeather,
                setLoadingWeather,
                error,
                setError,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export const useWeather = () => useContext(Context);

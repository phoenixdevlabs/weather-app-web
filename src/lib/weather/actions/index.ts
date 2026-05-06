"use server";

import { CurrentWeatherType, HourlyWeatherType } from "../types";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000/api/v1";

console.log("API_BASE_URL:", API_BASE_URL);

export const getCurrentWeather = async ({
    lat,
    lon,
}: {
    lat: number;
    lon: number;
}) => {
    const searchparams = `?lat=${lat}&lon=${lon}`.toString();
    const url = `${API_BASE_URL}/weather/current${searchparams}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "x-api-key": process.env.WEATHER_API_KEY || "",
        },
    });

    if (!response.ok) {
        console.log("Failed to fetch current weather data. Status:", response.status);
        console.log("Response body:", await response.text());
        throw new Error("Failed to fetch current weather data");
    }
    
    const data = await response.json();
 
    return data as CurrentWeatherType;
};

export const getHourlyWeather = async ({
    lat,
    lon,
}: {
    lat: number;
    lon: number;
}) => {
    const searchparams = `?lat=${lat}&lon=${lon}`.toString();
    const url = `${API_BASE_URL}/weather/hourly${searchparams}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "x-api-key": process.env.WEATHER_API_KEY || "",
        },
    });

    if (!response.ok) {
        console.log("Failed to fetch hourly weather data. Status:", response.status);
        console.log("Response body:", await response.text());
        throw new Error("Failed to fetch hourly weather data");
    }
    
    const data = await response.json();
 
    return data as HourlyWeatherType;
};

export const getGeocodingData = async ({
    name,
    count = 10,
    language,
}: {
    name: string;
    count?: number;
    language: string;
}) => {
    const searchParams =
        `?name=${name}&count=${count}&language=${language}`.toString();
    const url = `${API_BASE_URL}/geocoding${searchParams}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "x-api-key": process.env.WEATHER_API_KEY || "",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch geocoding data");
    }

    const geocodingData = await response.json();

    return geocodingData;
};

export const reverseGeocoding = async ({
    lat,
    lon,
}: {
    lat: number;
    lon: number;
}) => {
    const searchParams = `?lat=${lat}&lon=${lon}`.toString();

    const url = `${API_BASE_URL}/reverse-geocoding${searchParams}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "x-api-key": process.env.WEATHER_API_KEY || "",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch reverse geocoding data");
    }

    const reverseGeocodingData = await response.json();

    return reverseGeocodingData;
};

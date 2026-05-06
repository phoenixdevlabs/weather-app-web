/* Weather variable documentation */
/* WMO Weather interpretation codes (WW) */
/* Code	Description */

/* 
0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy
95 *	Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail
 */

/* (*) Thunderstorm forecast with hail is only available in Central Europe */

export const getWeatherDescriptionByCode = (code: number) => {
    switch (code) {
        case 0:
            return "Clear sky";
        case 1:
            return "Mainly clear";
        case 2:
            return "Partly cloudy";
        case 3:
            return "Overcast";
        case 45:
            return "Fog";
        case 48:
            return "Depositing rime fog";
        case 51:
            return "Drizzle: Light intensity";
        case 53:
            return "Drizzle: Moderate intensity";
        case 55:
            return "Drizzle: Dense intensity";
        case 56:
            return "Freezing Drizzle: Light intensity";
        case 57:
            return "Freezing Drizzle: Dense intensity";
        case 61:
            return "Rain: Slight intensity";
        case 63:
            return "Rain: Moderate intensity";
        case 65:
            return "Rain: Heavy intensity";
        case 66:
            return "Freezing Rain: Light intensity";
        case 67:
            return "Freezing Rain: Heavy intensity";
        case 71:
            return "Snow fall: Slight intensity";
        case 73:
            return "Snow fall: Moderate intensity";
        case 75:
            return "Snow fall: Heavy intensity";
        case 77:
            return "Snow grains";
        case 80:
            return "Rain showers: Slight";
        case 81:
            return "Rain showers: Moderate";
        case 82:
            return "Rain showers: Violent";
        case 85:
            return "Snow showers slight";
        case 86:
            return "Snow showers heavy";
        case 95:
            return "Thunderstorm: Slight or moderate";
        case 96:
            return "Thunderstorm with slight hail";
        case 99:
            return "Thunderstorm with heavy hail";
        default:
            throw new Error(`Invalid weather code: ${code}`);
    }
};

export const getWeatherIcon = ({
    code,
    isDay,
}: {
    code: number;
    isDay: number;
}) => {
    switch (code) {
        /* Clear sky */
        case 0:
            if (!!isDay) {
                return "daySunny";
            }
            return "nightClear";

        /* Mainly clear */
        case 1:
            if (!!isDay) {
                return "daySunnyOvercast";
            }
            return "nightPartlyCloudy";

        /* Partly cloudy */
        case 2:
            if (!!isDay) {
                return "dayCloudy";
            }
            return "nightCloudy";

        /* Overcast */
        case 3:
            if (!!isDay) {
                return "cloudy";
            }
            return "cloudy";

        /* Fog */
        case 45:
            if (!!isDay) {
                return "dayFog";
            }
            return "nightFog";

        /* Depositing rime fog */
        case 48:
            if (!!isDay) {
                return "fog";
            }
            return "fog";

        /* Drizzle: Light intensity */
        case 51:
            if (!!isDay) {
                return "daySprinkle";
            }
            return "nightSprinkle";

        /* Drizzle: Moderate intensity */
        case 53:
            if (!!isDay) {
                return "daySprinkle";
            }
            return "nightSprinkle";

        /* Drizzle: Dense intensity */
        case 55:
            if (!!isDay) {
                return "daySprinkle";
            }
            return "nightSprinkle";

        /* Freezing Drizzle: Light intensity */
        case 56:
            if (!!isDay) {
                return "daySleet";
            }
            return "nightSleet";

        /* Freezing Drizzle: Dense intensity */
        case 57:
            if (!!isDay) {
                return "daySleet";
            }
            return "nightSleet";

        /* Rain: Slight intensity */
        case 61:
            if (!!isDay) {
                return "dayRain";
            }
            return "nightRain";

        /* Rain: Moderate intensity */
        case 63:
            if (!!isDay) {
                return "dayRain";
            }
            return "nightRain";

        /* Rain: Heavy intensity */
        case 65:
            if (!!isDay) {
                return "dayRain";
            }
            return "nightRain";

        /* Freezing Rain: Light intensity */
        case 66:
            if (!!isDay) {
                return "dayRainMix";
            }
            return "nightRainMix";

        /* Freezing Rain: Heavy intensity */
        case 67:
            if (!!isDay) {
                return "dayRainMix";
            }
            return "nightRainMix";

        /* Snow fall: Slight intensity */
        case 71:
            if (!!isDay) {
                return "daySnow";
            }
            return "nightSnow";

        /* Snow fall: Moderate intensity */
        case 73:
            if (!!isDay) {
                return "daySnow";
            }
            return "nightSnow";

        /* Snow fall: Heavy intensity */
        case 75:
            if (!!isDay) {
                return "daySnow";
            }
            return "nightSnow";

        /* Snow grains */
        case 77:
            if (!!isDay) {
                return "daySnow";
            }
            return "nightSnow";

        /* Rain showers: Slight */
        case 80:
            if (!!isDay) {
                return "dayShowers";
            }
            return "nightShowers";

        /* Rain showers: Moderate */
        case 81:
            if (!!isDay) {
                return "dayShowers";
            }
            return "nightShowers";

        /* Rain showers: Violent */
        case 82:
            if (!!isDay) {
                return "dayShowers";
            }
            return "nightShowers";

        /* Snow showers slight */
        case 85:
            if (!!isDay) {
                return "daySnow";
            }
            return "nightSnow";

        /* Snow showers heavy */
        case 86:
            if (!!isDay) {
                return "daySnow";
            }
            return "nightSnow";

        /* Thunderstorm: Slight or moderate */
        case 95:
            if (!!isDay) {
                return "dayThunderstorm";
            }
            return "nightThunderstorm";

        /* Thunderstorm with slight hail */
        case 96:
            if (!!isDay) {
                return "dayThunderstorm";
            }
            return "nightThunderstorm";

        /* Thunderstorm with heavy hail */
        case 99:
            if (!!isDay) {
                return "dayThunderstorm";
            }
            return "nightThunderstorm";
        default:
            return "na";
    }
};

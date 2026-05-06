"use client";

import "./geocoding.scss";
import { getGeocodingData } from "@/lib/weather/actions";
import { GeocodingResponse, GeocodingResults } from "@/lib/weather/types";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useState,
} from "react";
import { useGeolocation } from "../../context/geolocationContext";
import { IconLoader, IconX } from "@tabler/icons-react";

type defaultValueType = {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    results: GeocodingResults | undefined;
    setResults: Dispatch<SetStateAction<GeocodingResults | undefined>>;
    working: boolean;
    setWorking: Dispatch<SetStateAction<boolean>>;
};

const defaultValue: defaultValueType = {
    name: "",
    setName: () => {},
    results: undefined,
    setResults: () => {},
    working: false,
    setWorking: () => {},
};

const Context = createContext(defaultValue);

const GeocodingContext = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState("");
    const [results, setResults] = useState<GeocodingResults | undefined>(
        undefined,
    );
    const [working, setWorking] = useState<boolean>(false);

    return (
        <Context.Provider
            value={{ name, setName, results, setResults, working, setWorking }}
        >
            {children}
        </Context.Provider>
    );
};

const useGeocoding = () => useContext(Context);

export const Geocoding = () => {
    return (
        <div className="geocoding">
            <GeocodingContext>
                <InputGroup />
                <Results />
            </GeocodingContext>
        </div>
    );
};

const InputGroup = () => {
    const { name, setName, setResults, setWorking } = useGeocoding();

    const searchLocation = useCallback(async () => {
        setWorking(true);

        const response = (await getGeocodingData({
            language: "en",
            name,
            count: 20,
        })) as GeocodingResponse;

        if (response) {
            setResults(response.results);
            setWorking(false);
        }
    }, [name, setResults, setWorking]);

    return (
        <div className="geocoding__input-group">
            <label
                htmlFor="location-name-input"
                className="geocoding__input-group__label"
            >
                Location
            </label>
            <input
                type="search"
                id="location-name-input"
                className="geocoding__input-group__input"
                placeholder="Enter location"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <button
                className="geocoding__input-group__button geocoding__input-group__button--search"
                onClick={() => searchLocation()}
            >
                Search
            </button>
        </div>
    );
};

const Results = () => {
    const { updateGeolocation } = useGeolocation();
    const { results, setName, setResults, working } = useGeocoding();

    return (
        <div
            className={
                results || working
                    ? "geocoding__results__active"
                    : "geocoding__results"
            }
        >
            <div className="geocoding__results__loader">
                {working && (
                    <IconLoader className="geocoding__results__loader__icon" />
                )}
            </div>

            {results && (
                <div className={`geocoding__results__active__box`}>
                    <div className="geocoding__results__active__box__heading">
                        <h3>Results</h3>

                        <button
                            className="geocoding__results__active__box__heading__button-close"
                            onClick={() => {
                                setResults(undefined);
                                setName("");
                            }}
                        >
                            <IconX />
                        </button>
                    </div>

                    <div className="geocoding__results__active__box__results-list">
                        {results.map((result, index) => {
                            return (
                                <div
                                    key={result.id}
                                    className="geocoding__results__item"
                                    onClick={() => {
                                        updateGeolocation({
                                            latitude: result.latitude,
                                            longitude: result.longitude,
                                        });
                                        setName("");
                                        setResults(undefined);
                                    }}
                                >
                                    <div className="geocoding__results__item__header">
                                        {`${index + 1}) `}
                                        {result.name}
                                    </div>
                                    <div className="geocoding__results__item__coordinates">
                                        <div className="geocoding__results__item__coordinates--latitude">
                                            Latitude: {result.latitude}
                                        </div>
                                        <div className="geocoding__results__item__coordinates--longitude">
                                            Longitude: {result.longitude}
                                        </div>
                                    </div>

                                    <div className="geocoding__results__item__region">
                                        {result.admin1}, {result.admin2}
                                    </div>
                                    <div className="geocoding__results__item__country">
                                        {result.country}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

"use client";

import { getGeocodingData } from "@/lib/weather/actions";
import { GeocodingResponse, GeocodingResults } from "@/lib/weather/types";
import { useCallback, useEffect, useState } from "react";

export const GeocodeComponent = () => {
    const [name, setName] = useState("");
    const [results, setResults] = useState<GeocodingResults>();

    const searchLocation = useCallback(async () => {
        const response = await getGeocodingData({
            language: "en",
            name,
            count: 15,
        }) as GeocodingResponse;

        if (response) {
            setResults(response.results);
        }
    }, [name]);

    useEffect(() => {
        console.log(results);
    }, [results]);

    return (
        <div className="geocoding">
            <div className="input-group">
                <label htmlFor="location-name-input">Location</label>
                <input
                    type="search"
                    id="location-name-input"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <button className="btn search" onClick={() => searchLocation()}>
                    Search
                </button>
            </div>

            <div>
                {results &&
                    results.map((result) => {
                        return (
                            <div key={result.id}>
                                <div>{result.name}</div>
                                <div>{result.latitude}</div>
                                <div>{result.longitude}</div>
                                <div>{result.country}</div>
                                <br />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

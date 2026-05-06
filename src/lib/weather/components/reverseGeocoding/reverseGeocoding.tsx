import "./reverse-geocoding.scss";
import { useCallback, useEffect, useState } from "react";
import { ReverseGeocodingResponse } from "../../types";
import { reverseGeocoding } from "../../actions";

export const ReverseGeocoding = ({
    lat,
    lon,
}: {
    lat: number;
    lon: number;
}) => {
    const [data, setData] = useState<ReverseGeocodingResponse>();

    const results = useCallback(() => {
        reverseGeocoding({ lat, lon })
            .then((r) => {
                console.log(r);
                setData(r);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [lat, lon]);

    useEffect(() => {
        results();
    }, [results]);

    return (
        <div className="reverse-geocoding">
            <span>{data?.address.city}, </span>

            <span>{data?.address.state}, </span>

            <span>{data?.address.country_code.toUpperCase()}</span>
        </div>
    );
};

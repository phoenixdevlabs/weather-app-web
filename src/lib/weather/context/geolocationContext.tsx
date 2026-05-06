"use client";

import {
    useContext,
    createContext,
    useCallback,
    useState,
    useEffect,
} from "react";

type GeolocationType = {
    latitude: number | undefined;
    longitude: number | undefined;
};

interface InitialValue {
    geolocation: GeolocationType;
    getGeolocation: () => GeolocationType;
    updateGeolocation: ({ latitude, longitude }: { latitude: number, longitude: number }) => void;
}

const initialValue: InitialValue = {
    geolocation: { latitude: undefined, longitude: undefined },
    getGeolocation: () => ({ latitude: undefined, longitude: undefined }),
    updateGeolocation: () => {},
};

const Context = createContext(initialValue);

export default function GeolocationContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const [geolocation, setGeolocation] = useState<GeolocationType>(
        initialValue.geolocation,
    );

    useEffect(() => {
        if (!window) throw("Window is not defined!");

        window.navigator.geolocation.getCurrentPosition((value) => {
            console.log("NAVIGATOR GEOPOSITION: ", value);

            console.log("Time: ", new Date(value.timestamp));

            const { latitude, longitude } = value.coords;

            setGeolocation({ latitude, longitude });
        });
    }, []);

    const getGeolocation = useCallback(() => {        
        return geolocation;
    }, [geolocation]);

    const updateGeolocation = useCallback(({ latitude, longitude }: { latitude: number, longitude: number }) => {
        console.log("UPDATING GEOLOCATION!");
        setGeolocation({ latitude, longitude });
    }, []);

    return (
        <Context.Provider value={{ geolocation, getGeolocation, updateGeolocation }}>
            {children}
        </Context.Provider>
    );
}

export const useGeolocation = () => useContext(Context);

"use client";

import GeolocationContext from "@/lib/weather/context/geolocationContext";
import WeatherContext from "@/lib/weather/context/weatherContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <GeolocationContext>
                    <WeatherContext>{children}</WeatherContext>
                </GeolocationContext>
            </body>
        </html>
    );
}

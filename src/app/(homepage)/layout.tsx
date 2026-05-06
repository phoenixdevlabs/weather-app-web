import "@/lib/sass/index.scss";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Weather App",
    description: "A new weather app",
};

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

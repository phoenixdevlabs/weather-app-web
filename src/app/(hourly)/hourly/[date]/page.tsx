import { HourlyDataClient } from "@/components/hourlyDataClient";

export default async function HourlyPage({
    params,
}: {
    params: Promise<{ date: string }>;
}) {
    const { date } = await params;

    return <div>
        Hourly Weather Page for date: {date}
        
        <HourlyDataClient />
        </div>;
}

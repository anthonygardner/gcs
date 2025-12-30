import type { IMUData } from "./types";

interface Props {
    data: IMUData | null;
    connected: boolean;
}

export function IMUDataDisplay({ data, connected }: Props) {
    if (!connected) {
        return <div>Disconnected</div>;
    }

    if (!data) {
        return <div>Waiting for data...</div>;
    }

    return (
        <div>
            <h3>Accelerometer (g)</h3>
            <p>X: {data.ax.toFixed(2)}</p>
            <p>Y: {data.ay.toFixed(2)}</p>
            <p>Z: {data.az.toFixed(2)}</p>

            <h3>Gyroscope (°/s)</h3>
            <p>X: {data.gx.toFixed(2)}</p>
            <p>Y: {data.gy.toFixed(2)}</p>
            <p>Z: {data.gz.toFixed(2)}</p>

            <h3>Temperature (°C)</h3>
            <p>{data.temp.toFixed(2)}</p>
        </div>
    )
}